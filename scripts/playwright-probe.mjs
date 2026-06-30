import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    console.log(`CONSOLE ${msg.type()} ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    console.log(`PAGEERROR ${err.message}`);
  });

  const response = await page.goto('http://localhost:4200', { waitUntil: 'domcontentloaded' });
  console.log(`STATUS ${response?.status()}`);

  await page.waitForTimeout(5000);

  const state = await page.evaluate(() => ({
    hasHeader: !!document.querySelector('tk-header, app-header'),
    hasFooter: !!document.querySelector('tk-footer, app-footer'),
    textSample: document.body.innerText.slice(0, 160),
  }));

  console.log(`STATE ${JSON.stringify(state)}`);

  await context.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
