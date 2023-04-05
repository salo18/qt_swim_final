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





import puppeteerCore from "puppeteer-core";
import puppeteer from 'puppeteer';
import aws from 'chrome-aws-lambda';

let chrome = {};
let pup;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = aws;
  pup = puppeteerCore;
} else {
  pup = puppeteer;
}

export async function getLakeReading() {

  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  const browser = await pup.launch(options);

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
