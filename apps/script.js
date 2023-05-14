const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
    ],
    // executablePath: '/usr/bin/google-chrome-stable',
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  console.log(await page.title());
  await browser.close();
})();


