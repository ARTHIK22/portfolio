import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(path.join(root, 'public', 'icons'), { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:#09090b;color:#f7f3f1;font-family:Arial,sans-serif"><main style="position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;width:1200px;height:630px;padding:76px 88px;box-sizing:border-box;background:radial-gradient(ellipse at 82% 95%,rgba(246,92,133,.30),transparent 46%),#09090b"><div style="position:absolute;right:85px;top:68px;width:340px;height:340px;border:1px solid rgba(246,141,166,.30);border-radius:50%;box-shadow:0 0 90px rgba(246,92,133,.18)"></div><p style="margin:0 0 24px;color:#f68da6;font:600 18px monospace;letter-spacing:4px">AI / MACHINE LEARNING ENGINEER</p><h1 style="position:relative;max-width:1000px;margin:0;font-size:86px;line-height:.95;letter-spacing:-5px;font-weight:800">ARTHIK<br><span style="color:#f68da6">DWIVEDI</span></h1><p style="margin:28px 0 0;color:#b9b1b3;font-size:22px">Engineering Intelligence. Building What Comes Next.</p><div style="position:absolute;right:118px;bottom:130px;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,#f68da6 0 2px,transparent 3px);background-size:15px 15px;mask-image:radial-gradient(circle,#000 12%,transparent 68%);opacity:.6"></div><p style="position:absolute;right:88px;bottom:56px;color:#f68da6;font:14px monospace;letter-spacing:2px">ARTHIKDWIVEDI.COM</p></main></body></html>`);
  await page.screenshot({ path: path.join(root, 'public', 'og-image.png') });
  const icon = await readFile(path.join(root, 'public', 'icons', 'icon.svg'), 'utf8');
  for (const size of [192, 512]) {
    const iconPage = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await iconPage.setContent(icon, { waitUntil: 'load' });
    await iconPage.screenshot({ path: path.join(root, 'public', 'icons', `icon-${size}.png`) });
    await iconPage.close();
  }
} finally { await browser.close(); }
