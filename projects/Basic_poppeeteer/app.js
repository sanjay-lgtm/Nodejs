import puppeteer from 'puppeteer';

(async () => {
     // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

     await page.goto("https://www.flipkart.com/search?q=iphone+14");

    //Set screen size.
    // await page.setViewport({width: 1080, height: 1024});

    //Take screenShot
    // await page.screenshot({path: 'screenshot.png'});

    //Create PDF
    // await page.pdf({path: 'screenshot.pdf', format: 'A4'});
})();