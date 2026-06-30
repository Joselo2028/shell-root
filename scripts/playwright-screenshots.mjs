import { chromium, devices } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '..', 'screenshots');

const url = 'http://localhost:4200';

async function captureDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  await page.screenshot({
    path: path.join(outputDir, 'home-desktop.png'),
    fullPage: false,
  });

  await context.close();
}

async function captureMobile(browser) {
  const iphone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iphone });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  await page.screenshot({
    path: path.join(outputDir, 'home-mobile.png'),
    fullPage: false,
  });

  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    await captureDesktop(browser);
    await captureMobile(browser);
    console.log('Screenshots captured successfully.');
    console.log(path.join(outputDir, 'home-desktop.png'));
    console.log(path.join(outputDir, 'home-mobile.png'));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
