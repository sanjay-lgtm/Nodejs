// const axios = require('axios');
// const fs = require('fs')
// const cheerio = require('cheerio')

// const pageUrl = "https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2"

// const getPageData = async () => {
//     try {
//         const res = await axios.get(pageUrl)
//         const data = res.data;
//         console.log(data)
//         // fs.writeFileSync();
//     } catch (error) {
//         console.log(error)
//     }
// }
// getPageData();

// const pageData = fs.readFileSync("pageData.txt")
// const $ = cheerio.load(pageData.toString())
// console.log($);
// const titles = $("")

// const products = [];
// titles.each((index, ele) => {
//     const title = $(ele).text();
//     products.push({
//         name: title,
//     })
// })

const cheerio = require('cheerio');
const axios = require('axios');

const url = `https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch`;

const fetchData = async () => {
  console.log("fetching data")
  const result = await fetch(url, {
    headers: {
      "Content-Type": "text/html",
    },
  });
  return cheerio.load(await result.text());
};

const getResults = async () => {
  console.log("run")
  const $ = await fetchData();
  console.log($.text(), "data");
  const getPhoneListing = $('.cust-job-tuple.layout-wrapper.lay-2.sjw__tuple');

  const result = [];

  getPhoneListing.each((i, phone) => {
    const obj = {};
    obj.title = $(phone).text();
    console.log(obj.title);
  })

}

getResults();