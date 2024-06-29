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

// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = `https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2`;

// const fetchData = async () => {
//   console.log("fetching data")
//   const result = await fetch(url, {
//     headers: {
//       "Content-Type": "text/html",
//     },
//   });
//   return cheerio.load(await result.text());
// };

// const getResults = async () => {
//   console.log("run")
//   const $ = await fetchData();
//   console.log($.text(), "data");
//   const getPhoneListing = $('.cust-job-tuple.layout-wrapper.lay-2.sjw__tuple');

//   const result = [];

//   getPhoneListing.each((i, phone) => {
//     const obj = {};
//     obj.title = $(phone).text();
//     console.log(obj.title);
//   })

// }

// getResults();

// const cheerio = require("cheerio");
// const xlsx = require("xlsx");

// const url = `https://www.geeksforgeeks.org/jobs`;

// // const url = `https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch`

// const fetchDataAndLoadCheerio = async () => {
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "text/html",
//     },
//   })
//     .then(async (response) => await response.text())
//     .catch((err) => console.log(err));

//   return cheerio.load(res);
// };

// const phoneData = [];

// const getPhoneData = async () => {
//   const $ = await fetchDataAndLoadCheerio();
//   console.log($.text());
//   console.log($(".jobs_jobs_animation_parent__PtUER").length);

//   $(".jobs_jobs_animation_parent__PtUER").each((index, element) => {
//     const data = {};
//     data.id = index;
//     data.title = $(element).find(".jobs_designation__fVwb4").text();
//     data.company = $(element).find(".jobs_company_name__vfAr8").text();
//     data.img = $(element).find(".ui.image.jobs_logo__s9Hn_").attr("src");
//     phoneData.push(data);
//   });
//   console.log(phoneData);
//   return phoneData;
// };

// getPhoneData();

// const createExcelFile = async () => {
//   const data = await getPhoneData();
//   const ws = xlsx.utils.json_to_sheet(data);
//   const wb = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(wb, ws, "Phones");
//   xlsx.writeFile(wb, "phones.xlsx");
// }

// createExcelFile();
// 

import fetch from "node-fetch";
import cheerio from "cheerio";
import xlsx from "xlsx";

const url = `https://www.geeksforgeeks.org/jobs`;

const fetchDataAndLoadCheerio = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/html",
      },
    });
    const body = await response.text();
    return cheerio.load(body);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

const jobData = [];

const getJobData = async () => {
  const $ = await fetchDataAndLoadCheerio();

  if (!$) {
    console.error("Failed to load the website.");
    return [];
  }

  $(".jobs_jobs_animation_parent__PtUER").each((index, element) => {
    const data = {};
    data.id = index + 1;  // Ensure id starts from 1
    data.title = $(element).find(".jobs_designation__fVwb4").text().trim();
    data.company = $(element).find(".jobs_company_name__vfAr8").text().trim();
    data.img = $(element).find(".ui.image.jobs_logo__s9Hn_").attr("src") || "N/A";  // Provide default value if src is missing
    jobData.push(data);
  });

  console.log(jobData);
  return jobData;
};

const createExcelFile = async () => {
  const data = await getJobData();

  if (data.length === 0) {
    console.error("No data to write to the Excel file.");
    return;
  }

  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Jobs");
  xlsx.writeFile(wb, "jobs.xlsx");

  console.log("Data written to jobs.xlsx successfully.");
};

// Use top-level await to call the async function
await createExcelFile();
