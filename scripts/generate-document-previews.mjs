import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = process.env.PREVIEW_BASE_URL || 'http://127.0.0.1:4173/';
const source = await readFile(path.join(root, 'src', 'data', 'certificates.ts'), 'utf8');
const documents = [...source.matchAll(/\bid:\s*'([^']+)'[\s\S]*?\bpdfPath:\s*'([^']+)'/g)].map(([, id, pdfPath]) => ({ id, pdfPath }));
if (!documents.length) throw new Error('No certificate PDF paths found in src/data/certificates.ts');

const outputDir = path.join(root, 'public', 'document-previews');
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.AUDIT_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  for (const document of documents) {
    const pdfUrl = new URL(document.pdfPath.split('/').map(encodeURIComponent).join('/').replace(/^%2F/, '/'), baseUrl);
    pdfUrl.hash = 'page=1&toolbar=0&navpanes=0&view=FitH';
    await page.goto(pdfUrl.href, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(250);
    const output = path.join(outputDir, `${document.id}.png`);
    await page.screenshot({ path: output, animations: 'disabled' });
    console.log(`Rendered ${document.id}`);
  }
} finally {
  await browser.close();
}
console.log(`Rendered ${documents.length} first-page PDF thumbnails to public/document-previews/`);
