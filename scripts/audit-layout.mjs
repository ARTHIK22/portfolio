import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = process.env.AUDIT_STAGE || 'after';
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173/';
const viewports = (process.env.AUDIT_WIDTHS || '360,390,768,1024,1440,1920').split(',').map(Number).filter(Number.isFinite);
const captureSections = ['hero', 'about', 'projects', 'statement', 'light-story', 'skills', 'certifications', 'github', 'profiles', 'resume', 'contact'];
const failures = [];
const report = [];

function contrastRatio(foreground, background) {
  const rgb = (value) => {
    const hex = value.match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1];
    if (hex) {
      const full = hex.length === 3 ? [...hex].map((part) => part + part).join('') : hex;
      return [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16) / 255);
    }
    const channels = value.match(/rgba?\(([^)]+)\)/i)?.[1].split(',').slice(0, 3).map(Number);
    return channels?.map((channel) => channel / 255) || null;
  };
  const luminance = (color) => {
    const channels = rgb(color);
    if (!channels) return null;
    const [r, g, b] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const a = luminance(foreground); const b = luminance(background);
  if (a === null || b === null) return null;
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const browser = await chromium.launch({ headless: true, channel: process.env.AUDIT_CHANNEL || 'msedge' });
try {
  for (const width of viewports) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => failures.push(`${width}px page error: ${error.message}`));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(4000);
    const rootLayout = await page.evaluate(() => ({
      width: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      overflowing: [...document.querySelectorAll('body *')].flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.position === 'fixed' || rect.width === 0 || rect.height === 0) return [];
        if (rect.left >= -1 && rect.right <= window.innerWidth + 1) return [];
        const clipped = [...function* ancestors(node) { for (let p = node.parentElement; p; p = p.parentElement) yield p; }(element)].some((ancestor) => {
          const overflow = getComputedStyle(ancestor).overflowX;
          const ancestorRect = ancestor.getBoundingClientRect();
          return ['clip', 'hidden', 'auto', 'scroll'].includes(overflow) && (rect.left < ancestorRect.left || rect.right > ancestorRect.right);
        });
        return [{ selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() + (element.classList.length ? `.${[...element.classList].join('.')}` : ''), left: Math.round(rect.left), right: Math.round(rect.right), clipped }];
      }),
      textOverlaps: [...document.querySelectorAll('main section')].flatMap((section) => {
        const candidates = [...section.querySelectorAll('h1,h2,h3,p')].filter((element) => {
          const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && element.innerText.trim();
        });
        const overlaps = [];
        for (let i = 0; i < candidates.length; i += 1) for (let j = i + 1; j < candidates.length; j += 1) {
          if (candidates[i].contains(candidates[j]) || candidates[j].contains(candidates[i])) continue;
          const a = candidates[i].getBoundingClientRect(); const b = candidates[j].getBoundingClientRect();
          const x = Math.min(a.right, b.right) - Math.max(a.left, b.left); const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (x > 2 && y > 2) overlaps.push({ section: section.id || section.className, a: candidates[i].tagName, aText: candidates[i].innerText.trim().slice(0, 50), b: candidates[j].tagName, bText: candidates[j].innerText.trim().slice(0, 50), overlap: [Math.round(x), Math.round(y)] });
        }
        return overlaps;
      }),
      textClipped: [...document.querySelectorAll('main h1, main h2, main h3, main p')].flatMap((element) => {
        const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
        if (element.scrollWidth <= element.clientWidth + 2 || style.overflowX === 'visible') return [];
        return [{ text: element.innerText.trim().slice(0, 70), left: Math.round(rect.left), right: Math.round(rect.right), scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }];
      }),
    }));
    console.log(`\n[${width}px] document ${rootLayout.documentWidth}/${rootLayout.width}; out-of-view: ${rootLayout.overflowing.length}; text overlaps: ${rootLayout.textOverlaps.length}; clipped text: ${rootLayout.textClipped.length}`);
    if (rootLayout.documentWidth > rootLayout.width) failures.push(`${width}px horizontal page overflow: ${rootLayout.documentWidth}px`);
    report.push({ width, ...rootLayout, headerContrast: [] });
    if (rootLayout.overflowing.length) console.log(`  out-of-view elements: ${rootLayout.overflowing.slice(0, 8).map((element) => element.selector).join(', ')}${rootLayout.overflowing.length > 8 ? `, … (${rootLayout.overflowing.length} total in report)` : ''}`);
    if (rootLayout.textOverlaps.length) {
      for (const overlap of rootLayout.textOverlaps) console.log(`  overlap ${JSON.stringify(overlap)}`);
      failures.push(`${width}px text boxes overlap: ${rootLayout.textOverlaps.length}`);
    }
    if (rootLayout.textClipped.length) {
      for (const clipped of rootLayout.textClipped) console.log(`  clipped text ${JSON.stringify(clipped)}`);
      failures.push(`${width}px text clipped: ${rootLayout.textClipped.length}`);
    }

    await page.evaluate(async () => {
      const step = Math.max(280, Math.floor(innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 24));
      }
      window.scrollTo(0, 0);
    });

    const headerContrast = [];
    for (const section of await page.locator('main [data-nav-theme]').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);
      const sample = await section.evaluate((node) => {
        const header = document.querySelector('.site-header');
        const link = header?.querySelector('.nav-side a');
        const linkStyle = link ? getComputedStyle(link) : null;
        const style = getComputedStyle(node);
        const before = getComputedStyle(node, '::before');
        let expectedTheme = node.dataset.navTheme;
        if (node.matches('.light-story')) {
          const clip = Number.parseFloat(node.style.getPropertyValue('--light-clip') || '50');
          const rect = node.getBoundingClientRect();
          expectedTheme = rect.top + rect.height * clip / 100 <= 0 && rect.bottom > 0 ? 'light' : 'dark';
        }
        const rawCandidates = [style.backgroundColor, before.backgroundColor, ...[style.backgroundImage, before.backgroundImage].flatMap((image) => image.match(/#[\da-f]{3,8}\b/gi) || [])]
          .filter((color) => color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)');
        const candidates = expectedTheme === 'dark' ? ['#09090b'] : rawCandidates;
        if (!candidates.length) candidates.push(node.dataset.navTheme === 'light' ? '#e8e4e3' : '#09090b');
        return { section: node.id || node.className, foreground: linkStyle?.color || 'rgb(255,255,255)', backgrounds: [...new Set(candidates)], theme: header?.dataset.theme || 'unset', expectedTheme };
      });
      headerContrast.push(sample);
      if (sample.theme !== sample.expectedTheme) failures.push(`${width}px header theme is ${sample.theme} inside ${sample.section}, expected ${sample.expectedTheme}`);
    }
    for (const sample of headerContrast) {
      const ratios = sample.backgrounds.map((background) => contrastRatio(sample.foreground, background)).filter((ratio) => ratio !== null);
      const ratio = ratios.length ? Math.min(...ratios) : null;
      if (ratio !== null && ratio < 4.5) failures.push(`${width}px header contrast below AA over #${sample.section} (${ratio.toFixed(2)}:1)`);
      sample.background = sample.backgrounds[0];
      sample.ratios = ratios;
      delete sample.backgrounds;
    }
    report.at(-1).headerContrast = headerContrast.map((sample) => ({ ...sample, ratio: sample.ratios.length ? Math.min(...sample.ratios) : null }));

    const captureDir = path.join(root, 'docs', 'audit', stage, String(width));
    await mkdir(captureDir, { recursive: true });
    for (const sectionId of captureSections) {
      const section = page.locator(`#${sectionId}`);
      if (await section.count()) {
        await section.evaluate((node) => node.scrollIntoView({ block: 'start', behavior: 'instant' }));
        await page.waitForTimeout(220);
        await section.locator('img').evaluateAll((images) => Promise.all(images.filter((image) => {
          const rect = image.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
        }).map((image) => image.decode().catch(() => undefined))));
        await page.screenshot({ path: path.join(captureDir, `${sectionId}.png`), animations: 'disabled' });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

const reportPath = path.join(root, 'docs', 'audit', stage, 'layout-audit.json');
let previousReport = [];
try { previousReport = JSON.parse(await readFile(reportPath, 'utf8')); } catch { /* start a new audit record */ }
const mergedReport = new Map(previousReport.map((sample) => [sample.width, sample]));
for (const sample of report) mergedReport.set(sample.width, sample);
await writeFile(reportPath, JSON.stringify([...mergedReport.values()].sort((a, b) => a.width - b.width), null, 2));

if (failures.length) {
  console.error(`\nAUDIT FAILED (${failures.length} issues):\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('\nAUDIT PASSED');
}

