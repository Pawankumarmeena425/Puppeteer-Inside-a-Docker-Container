const puppeteer = require('puppeteer');
 
(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
 
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
 
    // Get the body text content
    const text = await page.evaluate(() => document.body.textContent || '');
    console.log(text)
 
    // Check if the response contains "Hello, World!"
    if (text == 'Hello World!') {
        console.log('Test Passed: Found "Hello World!"');
    } else {
        console.log('Test Failed: "Hello World!" not found');
    }
 
    // Close the browser
    await browser.close();
})();