// import puppeteer from "puppeteer";

// export async function getLakeReading() {
//   const browser = await puppeteer.launch();

//   const page = await browser.newPage();

//   await page.goto(
//     "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
//   );

//   const date = await page.$eval("#sample-date", (el) =>
//     el.innerText.split(" ").slice(2).join(" ")
//   );

//   const status = await page.$eval(".grade-icon--label", (el) =>
//     el.textContent.split(" ").slice(0, -4).join(" ")
//   );

//   browser.close();

//   return {
//     lawaSampleDate: date,
//     status,
//     cronUpdateDate: Date.now(),
//   };
// }



// TRY WITH PLAYWRIGHT
import playwright from "playwright";

export async function getLakeReading() {
  const browser = await playwright.chromium.launch();

  const page = await browser.newPage();

  await page.goto(
    "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
  );

  const date = await page.$eval("#sample-date", (el) =>
    el.innerText.split(" ").slice(2).join(" ")
  );

  const status = await page.$eval(".grade-icon--label", (el) =>
    el.textContent.split(" ").slice(0, -4).join(" ")
  );

  browser.close();

  return {
    lawaSampleDate: date,
    status,
    cronUpdateDate: Date.now(),
  };
}












// import puppeteerCore from "puppeteer-core";
// import puppeteer from 'puppeteer';
// import chromium from 'chrome-aws-lambda';

// let chrome = {};
// let pup;

// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   chrome = aws;
//   pup = puppeteerCore;
// } else {
//   pup = puppeteer;
// }

// export async function getLakeReading() {

//   let options = {
//     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
//     defaultViewport: chromium.defaultViewport,
//     executablePath: await chromium.executablePath,
//     headless: true,
//     ignoreHTTPSErrors: true,
//   };

//   // if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   //   options = {
//   //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
//   //     defaultViewport: chromium.defaultViewport,
//   //     executablePath: await chromium.executablePath,
//   //     headless: true,
//   //     ignoreHTTPSErrors: true,
//   //   };
//   // }

//   const browser = await pup.launch(options);

//   const page = await browser.newPage();

//   await page.goto(
//     "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
//   );

//   const date = await page.$eval("#sample-date", (el) =>
//     el.innerText.split(" ").slice(2).join(" ")
//   );

//   const status = await page.$eval(".grade-icon--label", (el) =>
//     el.textContent.split(" ").slice(0, -4).join(" ")
//   );

//   browser.close();

//   return {
//     lawaSampleDate: date,
//     status,
//     cronUpdateDate: Date.now(),
//   };

//   // res.send(await {
//   //   lawaSampleDate: date,
//   //     status,
//   //     cronUpdateDate: Date.now(),
//   // });
// }


// const playwright = require('playwright');
// async function main() {
//     const browser = await playwright.chromium.launch({
//         headless: false // setting this to true will not run the UI
//     });

//     const page = await browser.newPage();
//     await page.goto('https://finance.yahoo.com/world-indices');
//     await page.waitForTimeout(5000); // wait for 5 seconds
//     await browser.close();
// }

// main();

