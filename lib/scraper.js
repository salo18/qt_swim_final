import puppeteer from 'puppeteer';

export async function getLakeReading() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite');

  const date = await page.$eval('#sample-date', el => el.innerText.split(' ').slice(2).join(' '));

  const status = await page.$eval('.grade-icon--label', el => el.textContent.split(' ').slice(0, -4).join(' '));

  browser.close();

  return {
    lawaSampleDate: date,
    status,
    cronUpdateDate: Date.now(),
  }
}
