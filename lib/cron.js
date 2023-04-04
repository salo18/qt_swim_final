import cron from 'node-cron'
import { getLakeReading } from './scraper.js'
// import { getLakeReading } from '/lib/scraper'

// cron.schedule('* * * * *', () => {
//   console.log('cronning!!!!')
// });

// module.exports = cron;

// const { MongoClient } = require("mongodb");

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);


// function runCron() {
//   const lakeReading = await Promise.any([getLakeReading()]);

//   async function run() {
//     try {
//       await client.connect();
//       // connect to db
//       const db = client.db("db");
//       const coll = db.collection("samples");

//       // const result = await coll.insertOne(lakeReading);
//       await coll.insertOne(lakeReading);

//     } finally {
//       // close client when finished
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
// }

// // cron.schedule('0 */12 * * *', () => {
// //   console.log('cronning!!!!')
// //   runCron();
// // })

// cron.schedule('* * * * *', () => {
//   runCron();
// })



