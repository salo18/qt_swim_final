import { getLakeReading } from "../../lib/scraper";
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function returnReading(req, res) {
  try {
    // await object returned by getLakeReading function
    const lakeReading = await getLakeReading();

    // insert object into "samples" collection
    async function run() {
      try {
        await client.connect();
        const db = client.db("db");
        const coll = db.collection("samples");

        await coll.insertOne(lakeReading);

      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);

    res.status(200).json( lakeReading );
  } catch(err) {
    res.status(500).json({ error: "internal error", message: err });
    console.log(err);
  }
}


