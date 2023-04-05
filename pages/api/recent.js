// import { NextApiRequest, NextApiResponse } from 'next'

import { getLakeReading } from "../../lib/scraper";
const { MongoClient } = require("mongodb");

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


