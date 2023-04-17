const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function addEmail(req, res) {
  try {
    async function run() {
      try {
        await client.connect();
        const db = client.db("db");
        const coll = db.collection("users");

        const { email } = req.body;
        await coll.insertOne({ email, emailAddDate: Date.now() });
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);

    res.status(200).json({ message: "user successfully added" });
  } catch (err) {
    res.status(500).json({ error: "internal error", message: err });
    console.log(err);
  }
}