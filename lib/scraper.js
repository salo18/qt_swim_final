import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

// import puppeteer from "puppeteer";

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


export async function getLakeReading() {
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })

  // const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(
    "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
  );

  let date;

  try {
    date = await page.$eval("#sample-date", (el) =>
    el.innerText.split(" ").slice(2).join(" "));
  } catch {
    date = null;
  }

  console.log(`date is ${date}`);
  // const date = null || await page.$eval("#sample-date", (el) =>
  //   el.innerText.split(" ").slice(2).join(" ")
  // );

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



// TRY WITH PLAYWRIGHT
// import playwright from "playwright";
// import {chromium} from 'playwright-core';
// import bundledChromium  from 'chrome-aws-lambda';

// export async function getLakeReading() {
//   // const browser = await playwright.chromium.launch();

//   try {
//     const browser = await playwright.chromium.launch({
//       args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
//       executablePath:
//         process.env.NODE_ENV === "production"
//           ? await chromium.executablePath
//           : "/usr/local/bin/chromium",
//       headless:
//         process.env.NODE_ENV === "production" ? chromium.headless : true,
//     });

//     // const browser = await Promise.resolve(bundledChromium.executablePath).then(
//     //   (executablePath) => {
//     //     if (!executablePath) {
//     //       // local execution
//     //       return chromium.launch({});
//     //     }
//     //     return chromium.launch({ executablePath });
//     //   }
//     // );

//     const page = await browser.newPage();

//     await page.goto(
//       "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
//     );

//     const date = await page.$eval("#sample-date", (el) =>
//       el.innerText.split(" ").slice(2).join(" ")
//     );

//     const status = await page.$eval(".grade-icon--label", (el) =>
//       el.textContent.split(" ").slice(0, -4).join(" ")
//     );

//     await browser.close();

//     // return {
//     //   lawaSampleDate: date,
//     //   status,
//     //   cronUpdateDate: Date.now(),
//     // };

//     return res.status(200).json({
//       lawaSampleDate: date,
//       status,
//       cronUpdateDate: Date.now(),
//     });
//   } catch (error) {
//     return res.status(error.statusCode || 500).json({ error: error.message });
//   }
// }












// // import puppeteerCore from "puppeteer-core";
// // import puppeteer from 'puppeteer';
// // import chromium from 'chrome-aws-lambda';

// // let chrome = {};
// // let pup;

// // if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
// //   chrome = aws;
// //   pup = puppeteerCore;
// // } else {
// //   pup = puppeteer;
// // }

// // export async function getLakeReading() {

// //   let options = {
// //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
// //     defaultViewport: chromium.defaultViewport,
// //     executablePath: await chromium.executablePath,
// //     headless: true,
// //     ignoreHTTPSErrors: true,
// //   };

// //   // if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
// //   //   options = {
// //   //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
// //   //     defaultViewport: chromium.defaultViewport,
// //   //     executablePath: await chromium.executablePath,
// //   //     headless: true,
// //   //     ignoreHTTPSErrors: true,
// //   //   };
// //   // }

// //   const browser = await pup.launch(options);

// //   const page = await browser.newPage();

// //   await page.goto(
// //     "https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite"
// //   );

// //   const date = await page.$eval("#sample-date", (el) =>
// //     el.innerText.split(" ").slice(2).join(" ")
// //   );

// //   const status = await page.$eval(".grade-icon--label", (el) =>
// //     el.textContent.split(" ").slice(0, -4).join(" ")
// //   );

// //   browser.close();

// //   return {
// //     lawaSampleDate: date,
// //     status,
// //     cronUpdateDate: Date.now(),
// //   };

// //   // res.send(await {
// //   //   lawaSampleDate: date,
// //   //     status,
// //   //     cronUpdateDate: Date.now(),
// //   // });
// // }


// // const playwright = require('playwright');
// // async function main() {
// //     const browser = await playwright.chromium.launch({
// //         headless: false // setting this to true will not run the UI
// //     });

// //     const page = await browser.newPage();
// //     await page.goto('https://finance.yahoo.com/world-indices');
// //     await page.waitForTimeout(5000); // wait for 5 seconds
// //     await browser.close();
// // }

// // main();

