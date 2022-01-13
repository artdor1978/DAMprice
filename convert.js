const { google } = require('googleapis');
const puppeteer = require('puppeteer');

module.exports = async function scrape() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox']  });
    const page = await browser.newPage();
    await page.goto('https://www.oree.com.ua/index.php/pricectr');
    await page.waitForSelector('tbody');
    await page.waitForTimeout(1500);
    const RDNdata = await page.$$eval("tbody", (nodes) =>
        nodes.map((n) => n.innerText)
    );
    RDNdata.splice(RDNdata.length / 2, RDNdata.length / 2);
    const dateData = RDNdata[0].split("\n");
    const values2 = dateData.map(x => x.split(/\s/g));
    values2.map(x=>x.shift());
    let values = values2.map(x=>x.map(Number));
    await browser.close();

    const sheets = google.sheets('v4');
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const spreadsheetId = "1PXj2pH6VJd5O8QyWn-4qElAvHwJQiBRsZIHU93rAlC8";

    const auth = new google.auth.GoogleAuth({
            scopes: SCOPES,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
    const authClient = await auth.getClient();
    const resource = {
        values,
    };
    
    sheets.spreadsheets.values.update(
        {
            spreadsheetId,
            auth:authClient,
            range: "'РДН-Январь 2022'!C17",
            valueInputOption: 'RAW',
            resource,
        },
        (err, result) => {
            if (err) {
                // Handle error
                console.log(err);
            } else {
                 console.log(
                    result.data
                ); 
            }
        }
    );
    
};