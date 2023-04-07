// import { NextApiRequest, NextApiResponse } from 'next'

// import { getLakeReading } from "../../lib/scraper";
const { MongoClient } = require("mongodb");


import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

// import puppeteer from "puppeteer";

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


async function getLakeReading() {
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

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function returnReading(req, res) {
  const lakeReading = await getLakeReading();

  async function run() {
    try {
      await client.connect();
      // connect to db
      const db = client.db("db");
      const coll = db.collection("samples");

      // const result = await coll.insertOne(lakeReading);
      await coll.insertOne(lakeReading);

    } finally {
      // close client when finished
      await client.close();
    }
  }
  run().catch(console.dir);

  res.status(200).json({ lakeReading });
}


