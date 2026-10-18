import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const targets = [
  ['projectsense-ai', 'https://ai-power-academic-project-evaluatio.vercel.app/'],
  ['neoestate-ai', 'https://neoestate-ai-1.onrender.com/'],
  ['student-performance-clustering', 'https://student-performance-clustering-syst.vercel.app/'],
];
await mkdir('public/projects', { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  for (const [id, url] of targets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: `public/projects/${id}.png`, fullPage: false });
      console.log(`CAPTURED ${id} ${await page.title()}`);
    } catch (error) { console.log(`SKIPPED ${id}: ${error.message}`); }
    await page.close();
  }
} finally { await browser.close(); }
