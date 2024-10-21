// test.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ]
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Check if the page contains 'Hello World'
    const content = await page.evaluate(() => document.body.textContent);
    if (content.includes('Hello World')) {
        console.log('Test passed: "Hello World" is displayed.');
    } else {
        console.log('Test failed: "Hello World" is not displayed.');
    }

    await browser.close();
})();
