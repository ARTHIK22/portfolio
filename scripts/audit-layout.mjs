import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = process.env.AUDIT_STAGE || 'after';
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173/';
const viewports = (process.env.AUDIT_VIEWPORTS || '1366x768,1440x700,1440x900,1920x900,390x844')
  .split(',').map((value) => value.trim().split('x').map(Number)).filter(([width, height]) => Number.isFinite(width) && Number.isFinite(height)).map(([width, height]) => ({ width, height }));
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

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const { width, height } = viewport;
    const viewportLabel = `${width}x${height}`;
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => failures.push(`${viewportLabel} page error: ${error.message}`));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(4000);
    const rootLayout = await page.evaluate(() => ({
      width: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
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
      textOverlaps: [...document.querySelectorAll('main h1,main h2,main h3,main h4')].flatMap((heading, index, all) => {
        const candidates = all.slice(index + 1).filter((element) => heading.parentElement === element.parentElement && (() => {
          const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && Number(style.opacity) > .8;
        })());
        const firstStyle = getComputedStyle(heading);
        if (firstStyle.display === 'none' || firstStyle.visibility === 'hidden' || Number(firstStyle.opacity) <= .8) return [];
        const overlaps = [];
        for (const element of candidates) {
          const a = heading.getBoundingClientRect(); const b = element.getBoundingClientRect();
          const x = Math.min(a.right, b.right) - Math.max(a.left, b.left); const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (x > 2 && y > 2) overlaps.push({ a: heading.innerText.trim().slice(0, 50), b: element.innerText.trim().slice(0, 50), overlap: [Math.round(x), Math.round(y)] });
        }
        return overlaps;
      }),
      textClipped: [...document.querySelectorAll('main h1, main h2, main h3, main p')].flatMap((element) => {
        const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
        if (element.scrollWidth <= element.clientWidth + 2 || style.overflowX === 'visible') return [];
        return [{ text: element.innerText.trim().slice(0, 70), left: Math.round(rect.left), right: Math.round(rect.right), scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }];
      }),
      excessiveRadii: [...document.querySelectorAll('body *')].flatMap((element) => {
        const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
        const radii = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius]
          .map((radius) => Number.parseFloat(radius) || 0);
        const maximum = Math.max(...radii);
        if (maximum <= 24) return [];
        // A true capsule or circle uses a radius at least half its short side.
        const isPercentageCircle = style.borderTopLeftRadius.includes('%') && Math.abs(rect.width - rect.height) <= 2;
        const isPillOrCircle = isPercentageCircle || maximum >= Math.min(rect.width, rect.height) / 2 - 1;
        if (isPillOrCircle) return [];
        return [{ selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() + (element.classList.length ? `.${[...element.classList].join('.')}` : ''), radius: Math.round(maximum), size: [Math.round(rect.width), Math.round(rect.height)] }];
      }),
    }));
    console.log(`\n[${viewportLabel}] document ${rootLayout.documentWidth}/${rootLayout.width}; out-of-view: ${rootLayout.overflowing.length}; sibling heading overlaps: ${rootLayout.textOverlaps.length}; clipped text: ${rootLayout.textClipped.length}; non-pill radii >24px: ${rootLayout.excessiveRadii.length}`);
    if (rootLayout.documentWidth > rootLayout.width) failures.push(`${viewportLabel} horizontal page overflow: ${rootLayout.documentWidth}px`);
    report.push({ width, height, ...rootLayout, headerContrast: [] });
    if (rootLayout.overflowing.length) console.log(`  out-of-view elements: ${rootLayout.overflowing.slice(0, 8).map((element) => element.selector).join(', ')}${rootLayout.overflowing.length > 8 ? `, … (${rootLayout.overflowing.length} total in report)` : ''}`);
    if (rootLayout.textOverlaps.length) {
      for (const overlap of rootLayout.textOverlaps) console.log(`  overlap ${JSON.stringify(overlap)}`);
      failures.push(`${viewportLabel} text boxes overlap: ${rootLayout.textOverlaps.length}`);
    }
    if (rootLayout.textClipped.length) {
      for (const clipped of rootLayout.textClipped) console.log(`  clipped text ${JSON.stringify(clipped)}`);
      failures.push(`${viewportLabel} text clipped: ${rootLayout.textClipped.length}`);
    }
    if (rootLayout.excessiveRadii.length) {
      for (const element of rootLayout.excessiveRadii) console.log(`  excessive non-pill radius ${JSON.stringify(element)}`);
      failures.push(`${viewportLabel} non-pill elements with computed border-radius above 24px: ${rootLayout.excessiveRadii.length}`);
    }

    await page.evaluate(async () => {
      const step = Math.max(280, Math.floor(innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 24));
      }
      if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });

    const stageChecks = [];
    // Only the project gallery is pinned on desktop. The other sections use normal document flow.
    for (const stageId of ['projects']) {
      for (const progress of [0, .5, .99]) {
        const metrics = await page.locator(`#${stageId}`).evaluate((section, progressValue) => {
          const fallbackStart = window.scrollY + section.getBoundingClientRect().top;
          const start = Number(section.dataset.scrollStart) || fallbackStart;
          const measuredEnd = Number(section.dataset.scrollEnd);
          const travel = measuredEnd > start ? measuredEnd - start : Math.max(0, section.offsetHeight - window.innerHeight);
          const target = start + travel * progressValue;
          if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(target, { immediate: true });
          else window.scrollTo({ top: target, behavior: 'instant' });
          return target;
        }, progress);
        // Let the gallery's GSAP scrub reach the requested scroll position before measuring.
        await page.waitForTimeout(width > 760 ? 800 : 180);
        const sample = await page.evaluate((stageIdValue) => {
          const stageSelector = { projects: '.showcase-pin' }[stageIdValue];
          const stage = document.querySelector(stageSelector);
          const isPinnedStage = innerWidth > 760 && stageIdValue === 'projects';
          const navLinks = [...document.querySelectorAll('.nav-side a')];
          const projectCards = [...(stage?.querySelectorAll('.showcase-card') || [])];
          const primaryProjectCard = projectCards.reduce((best, card) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs((rect.left + rect.right) / 2 - innerWidth / 2);
            return !best || distance < best.distance ? { card, distance } : best;
          }, null)?.card;
          const isRendered = (node) => {
            const style = getComputedStyle(node); const rect = node.getBoundingClientRect();
            if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < .05 || rect.width <= 0 || rect.height <= 0) return false;
            if (node.closest('.skill-stack-card') && !node.closest('.skill-stack-card').classList.contains('is-active')) return false;
            if (stageIdValue === 'projects' && node.closest('.showcase-card') && node.closest('.showcase-card') !== primaryProjectCard) return false;
            return true;
          };
          const isInViewport = (node) => { const rect = node.getBoundingClientRect(); return Math.min(rect.right, innerWidth) - Math.max(rect.left, 0) > 1 && Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0) > 1; };
          const intersects = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
          const candidates = isPinnedStage ? [...(stage?.querySelectorAll('h1,h2,h3,h4,p,button,a,[class*="caption"],.showcase-meta') || [])].filter(isRendered) : [];
          const clipped = candidates.flatMap((node) => {
            const rect = node.getBoundingClientRect();
            if (rect.top < -1 || rect.bottom > innerHeight + 1 || rect.left < -1 || rect.right > innerWidth + 1) {
              return [{ selector: node.tagName.toLowerCase() + (node.className?.baseVal || node.className ? `.${String(node.className?.baseVal || node.className).split(' ').join('.')}` : ''), top: Math.round(rect.top), bottom: Math.round(rect.bottom), left: Math.round(rect.left), right: Math.round(rect.right) }];
            }
            return [];
          });
          const navOverlaps = [...document.querySelectorAll('main h1,main h2,main h3,main h4,main p,main a,main button,[class*="caption"]')]
            .filter((node) => isRendered(node) && isInViewport(node))
            .flatMap((node) => {
              const rect = node.getBoundingClientRect();
              return navLinks.filter((link) => isRendered(link) && isInViewport(link)).filter((link) => intersects(rect, link.getBoundingClientRect())).map((link) => ({
                text: (node.innerText || node.getAttribute('aria-label') || '').trim().slice(0, 55),
                link: link.innerText.trim(),
                box: [Math.round(rect.left), Math.round(rect.top), Math.round(rect.right), Math.round(rect.bottom)],
                selector: node.tagName.toLowerCase() + (node.className?.baseVal || node.className ? `.${String(node.className?.baseVal || node.className).split(' ').join('.')}` : ''),
              }));
            });
          const siblingHeadingOverlaps = [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
            .filter((node) => isRendered(node) && isInViewport(node))
            .flatMap((a, index, all) => all.slice(index + 1).filter((b) => a.parentElement === b.parentElement && intersects(a.getBoundingClientRect(), b.getBoundingClientRect())).map((b) => ({
              a: (a.innerText || '').trim().slice(0, 45), b: (b.innerText || '').trim().slice(0, 45),
            })));
          const gallery = stageIdValue === 'projects' ? {
            track: stage?.querySelector('.showcase-track')?.getBoundingClientRect().toJSON(),
            cards: [...(stage?.querySelectorAll('.showcase-card') || [])].map((card) => ({
              title: card.querySelector('h3')?.innerText,
              meta: card.querySelector('.showcase-meta')?.getBoundingClientRect().toJSON(),
            })),
          } : null;
          return { stage: stageIdValue, clipped, navOverlaps, siblingHeadingOverlaps, gallery };
        }, stageId);
        stageChecks.push({ progress, ...sample });
        if (sample.clipped.length) failures.push(`${viewportLabel} ${stageId} stage clips ${sample.clipped.length} heading/caption/button boxes at ${progress}`);
        if (sample.navOverlaps.length) failures.push(`${viewportLabel} ${stageId} stage has ${sample.navOverlaps.length} text/nav overlaps at ${progress}`);
        if (sample.siblingHeadingOverlaps.length) failures.push(`${viewportLabel} ${stageId} stage has ${sample.siblingHeadingOverlaps.length} overlapping sibling headings at ${progress}`);
      }
    }
    report.at(-1).stageChecks = stageChecks;

    const projectOpen = page.locator('.showcase-card .project-open-button').first();
    if (await projectOpen.count()) {
      try {
        const projectStart = await page.locator('#projects').getAttribute('data-scroll-start');
        if (projectStart) await page.evaluate((start) => {
          if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(Number(start) + 1, { immediate: true });
          else window.scrollTo({ top: Number(start) + 1, behavior: 'instant' });
        }, projectStart);
        await page.waitForTimeout(180);
        await projectOpen.scrollIntoViewIfNeeded({ timeout: 3000 });
        await projectOpen.click({ timeout: 3000 });
        const dialog = page.locator('[role="dialog"][aria-modal="true"]');
        if (!(await dialog.count())) failures.push(`${viewportLabel} project details button did not open its dialog`);
        else {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(80);
          if (await dialog.count()) failures.push(`${viewportLabel} project dialog did not close on Escape`);
        }
      } catch (error) { failures.push(`${viewportLabel} project dialog interaction failed: ${error.message}`); }
    }
    if (width <= 760) {
      const menuButton = page.locator('.nav-menu-button');
      try {
        await menuButton.click({ timeout: 2000 });
        if (await menuButton.getAttribute('aria-expanded') !== 'true') failures.push(`${viewportLabel} mobile navigation did not open`);
        await page.locator('#mobile-navigation a[href="#projects"]').click({ timeout: 2000 });
        if (await menuButton.getAttribute('aria-expanded') !== 'false') failures.push(`${viewportLabel} mobile navigation did not close after link activation`);
      } catch (error) { failures.push(`${viewportLabel} mobile navigation interaction failed: ${error.message}`); }
    }

    const headerContrast = [];
    for (const section of await page.locator('main [data-nav-theme]').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(360);
      const sample = await section.evaluate((node) => {
        const header = document.querySelector('.site-header');
        const link = header?.querySelector('.nav-side a');
        const linkStyle = link ? getComputedStyle(link) : null;
        const style = getComputedStyle(node);
        const before = getComputedStyle(node, '::before');
        const rawCandidates = [style.backgroundColor, before.backgroundColor, ...[style.backgroundImage, before.backgroundImage].flatMap((image) => image.match(/#[\da-f]{3,8}\b/gi) || [])]
          .filter((color) => color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)');
        const candidates = header?.dataset.theme === 'light' ? (rawCandidates.length ? rawCandidates : ['#f2f1ef']) : ['#09090b'];
        if (!candidates.length) candidates.push(node.dataset.navTheme === 'light' ? '#e8e4e3' : '#09090b');
        const headerBg = header ? getComputedStyle(header).backgroundColor : 'transparent';
        const headerAlpha = Number.parseFloat(headerBg.match(/,\s*([\d.]+)\s*\)$/)?.[1] || (headerBg.startsWith('rgb(') ? '1' : '0'));
        const headerBlur = header ? Number.parseFloat(getComputedStyle(header).backdropFilter.replace(/[^\d.]/g, '')) : 0;
        return { section: node.id || node.className, foreground: linkStyle?.color || 'rgb(255,255,255)', backgrounds: [...new Set(candidates)], theme: header?.dataset.theme || 'unset', headerAlpha, headerBlur };
      });
      headerContrast.push(sample);
      if (sample.headerAlpha < .7 || sample.headerBlur < 1) failures.push(`${viewportLabel} header is not opaque/blurred inside ${sample.section}`);
    }
    for (const sample of headerContrast) {
      const ratios = sample.backgrounds.map((background) => contrastRatio(sample.foreground, background)).filter((ratio) => ratio !== null);
      const ratio = ratios.length ? Math.min(...ratios) : null;
      if (ratio !== null && ratio < 4.5) failures.push(`${viewportLabel} header contrast below AA over #${sample.section} (${ratio.toFixed(2)}:1)`);
      sample.background = sample.backgrounds[0];
      sample.ratios = ratios;
      delete sample.backgrounds;
    }
    report.at(-1).headerContrast = headerContrast.map((sample) => ({ ...sample, ratio: sample.ratios.length ? Math.min(...sample.ratios) : null }));

    const captureDir = path.join(root, 'docs', 'audit', stage, `${width}x${height}`);
    await mkdir(captureDir, { recursive: true });
    for (const sectionId of captureSections) {
      const section = page.locator(`#${sectionId}`);
      if (await section.count()) {
        await section.evaluate((node) => {
          const target = node.id === 'about' ? node.querySelector('#about-heading') || node : node;
          const pinStart = Number(node.dataset.scrollStart);
          const pinEnd = Number(node.dataset.scrollEnd);
          const captureProgress = { about: .5, projects: .5, statement: .99, 'light-story': .99, skills: .5 };
          const progress = captureProgress[node.id] ?? 0;
          const rect = target.getBoundingClientRect();
          const offset = node.id === 'about' ? (innerHeight - rect.height) / 2 : 0;
          const top = pinEnd > pinStart
            ? Math.max(0, pinStart + (pinEnd - pinStart) * progress)
            : Math.max(0, window.scrollY + rect.top - offset);
          if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(top, { immediate: true });
          else window.scrollTo({ top, behavior: 'instant' });
        });
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
const mergedReport = new Map(previousReport.filter((sample) => viewports.some((size) => size.width === sample.width && size.height === sample.height)).map((sample) => [`${sample.width}x${sample.height}`, sample]));
for (const sample of report) mergedReport.set(`${sample.width}x${sample.height}`, sample);
await writeFile(reportPath, JSON.stringify([...mergedReport.values()].sort((a, b) => a.width - b.width || a.height - b.height), null, 2));

if (failures.length) {
  console.error(`\nAUDIT FAILED (${failures.length} issues):\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('\nAUDIT PASSED');
}

