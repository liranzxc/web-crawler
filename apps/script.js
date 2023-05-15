const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--no-zygote',
      '--disable-gpu',
      '--disable-audio-output',
      '--headless',
      '--single-process'
    ],
    executablePath: '/usr/bin/chromium-browser',
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  console.log(await page.title());
  await browser.close();
})();


