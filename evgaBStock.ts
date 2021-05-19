const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = {
    /**
     *@param desire: An array defining the products you want from b-stock
     */
    getBSTOCK: async (desire: Array<string>) => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://www.evga.com/products/productlist.aspx?type=8');
        const data = await page.content();
        const $ = await cheerio.load(data);
        let products = [];
        $('div.list-item')
            .find('div > div > a')
            .each(function (index, element) {
                //['600', '700'] Elements we want to look for
                //The some() method tests whether some element in the array passes the test implemented by the provided function.
                //allowed are the elements to test inside of the array
                if ([desire].some(allowed => $(element).text().includes(allowed)))
                    products.push($(element).text());
            });
        console.log(products)
    }

}