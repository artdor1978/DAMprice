const puppeteer = require('puppeteer');
module.exports = async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1480
    });
    await page.goto('https://docs.google.com/spreadsheets/d/1PXj2pH6VJd5O8QyWn-4qElAvHwJQiBRsZIHU93rAlC8/edit#gid=1823202329');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'example.png', fullPage: true });
    await browser.close();
};