import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const failures = [];
try {
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const anchors = await page.locator('nav[aria-label="Main navigation"] a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  for (const href of anchors) if (!href || !await page.locator(href).count()) failures.push(`Navigation target missing: ${href}`);
  console.log(`Navigation targets: ${anchors.length} checked`);

  const pdfLinks = await page.locator('a[href$=".pdf"]').evaluateAll((links) => [...new Map(links.map((link) => [link.href, link])).values()].map((link) => ({ href: link.href, download: link.getAttribute('download') })));
  for (const link of pdfLinks) {
    const response = await page.request.get(link.href);
    const type = response.headers()['content-type'] || '';
    if (!response.ok() || !type.includes('application/pdf')) failures.push(`PDF unavailable or wrong content type (${response.status()} ${type}): ${link.href}`);
  }
  console.log(`PDF destinations: ${pdfLinks.length} checked (HTTP 200, application/pdf)`);

  const certificateDownload = page.locator('#certifications .certificate-actions a[download]').first();
  await certificateDownload.scrollIntoViewIfNeeded();
  const certificateDownloadEvent = page.waitForEvent('download');
  await certificateDownload.click();
  const certificateDownloadResult = await certificateDownloadEvent;
  console.log(`Certificate download: ${certificateDownloadResult.suggestedFilename()}`);

  const resumeDownload = page.locator('#resume a[download]');
  await resumeDownload.scrollIntoViewIfNeeded();
  const resumeDownloadEvent = page.waitForEvent('download');
  await resumeDownload.click();
  const resumeDownloadResult = await resumeDownloadEvent;
  console.log(`Resume download: ${resumeDownloadResult.suggestedFilename()}`);

  const expectedContact = ['mailto:arthikdwivedi07@gmail.com', 'https://www.linkedin.com/in/arthik-dwivedi', 'https://github.com/ARTHIK22'];
  const contactLinks = await page.locator('#contact .contact-actions a').evaluateAll((links) => links.map((link) => link.href));
  for (const href of expectedContact) if (!contactLinks.includes(href)) failures.push(`Contact link missing: ${href}`);
  console.log(`Contact links: ${expectedContact.length} checked`);

  await page.evaluate(() => {
    const section = document.querySelector('#projects');
    if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + 100);
  });
  await page.waitForTimeout(250);
  const projectButton = page.locator('#projects .project-open-button').first();
  if (await projectButton.count()) {
    await projectButton.click();
    if (!await page.getByRole('dialog').count()) failures.push('Project detail dialog did not open');
    await page.keyboard.press('Escape');
    if (await page.getByRole('dialog').count()) failures.push('Project detail dialog did not close with Escape');
  } else failures.push('Project dialog trigger not found');
  console.log('Project dialog: open and Escape-close checked');

  await page.locator('nav[aria-label="Main navigation"] a[href="#skills"]').click();
  await page.waitForTimeout(1500);
  const skillPosition = await page.locator('#skills').evaluate((node) => node.getBoundingClientRect().top);
  if (Math.abs(skillPosition) > 400) failures.push(`Smooth navigation to Skills did not settle near the section (${Math.round(skillPosition)}px)`);
  console.log(`Smooth anchor navigation: Skills section reached (${Math.round(skillPosition)}px)`);

  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\nLINK AUDIT FAILED (${failures.length} issues):\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else console.log('\nLINK AUDIT PASSED');
