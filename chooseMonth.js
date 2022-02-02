const puppeteer = require('puppeteer');
(async function scrape() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.oree.com.ua/index.php/pricectr');
    await page.waitForSelector('.datepicker');
    await page.click('.datepicker')

    const choosenMonth = 5;
    const aElementsWithHi = await page.$$(".month");
    console.log(aElementsWithHi);
    await aElementsWithHi[choosenMonth].click();
    await page.waitForTimeout(1500);


    /* await page.waitForSelector('tbody');
    await page.waitForTimeout(1500);
    const RDNdata = await page.$$eval("tbody", (nodes) =>
        nodes.map((n) => n.innerText)
    );
    RDNdata.splice(RDNdata.length / 2, RDNdata.length / 2);
    const dateData = RDNdata[0].split("\n");
    const values2 = dateData.map(x => x.split(/\s/g));
    values2.map(x=>x.shift());
    let values = values2.map(x=>x.map(Number)); */
    await browser.close();
})();