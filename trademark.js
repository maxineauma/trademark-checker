const puppeteer = require('puppeteer');
const lib = require('./lib');
const fs = require('fs');
const table = require('table');

(async() => {

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto("https://www3.wipo.int/branddb/en/");

    // Search
    let args = process.argv.slice(2);
    const query = args[0];

    if(!query) {
        console.log("Please provide a search query.");
        process.exit(1);
    }

    await page.click("#BRAND_input");
    await page.type("#BRAND_input", query);
    await page.click("[href='#country_search']");
    await page.click("#OO_input");
    await page.type("#OO_input", "US GB");
    await page.waitForTimeout(2500);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(2500);

    // How many pages?
    let el = await page.waitForSelector(".skipWindow");
    let val = await el.evaluate(e => e.textContent);
    let pages = parseInt(val.replace(" / ", "").replace(/,/g, ""));

    // Now, get every single fucking page lol

    let tab = [];

    for(y = 0; y<pages; y++) { 
        console.log("[STATUS] Scraping "+query+" results: " + (y+1) + "/"+pages+"...");
        let page_html = await page.$eval(".ui-jqgrid-btable", e => {  return e.innerHTML; });

        let brands = await lib.scrapeBrand(page_html);
        let status = await lib.scrapeStatus(page_html);
        let origin = await lib.scrapeOrigin(page_html);
        let owners = await lib.scrapeOwner(page_html);
        let dates  = await lib.scrapeDate(page_html);

        for(x = 0; x<brands.length; x++) {
            tab.push([brands[x], status[x], origin[x], owners[x], dates[x]]); 
        }

        await page.click("[aria-label='next page']");
        await page.waitForTimeout(2000);
    }

    data = table.table(tab);
    fs.writeFile('./report_' + query + '.txt', data, err => { console.log(err); }); 
    console.log("[STATUS] Finished! Find your report in report_"+query+".txt in your working directory.");

    await browser.close();
    
})();