// const cron = require('node-cron');
// const fetch = require('node-fetch');
// // import fetch from 'node-fetch';
// const { MongoClient } = require('mongodb');
// const uri = process.env.MONGODB_URI;


// // Schedule a cron job to run twice a day at 6am and 6pm
// cron.schedule('* * * * *', async () => {
//   try {
//     // Fetch data from API endpoint
//     // https://qt-swim-final-m3aurdkyc-salocode14-gmailcom.vercel.app
//     const response = await fetch('http://localhost:3000/api/recent');
//     const data = await response.json();

//     // Connect to MongoDB database
//     const client = new MongoClient(uri);
//     await client.connect();

//     const db = client.db("db");
//     const coll = db.collection("samples");
//     // const result = await coll.insertOne(lakeReading);
//     await coll.insertOne(data);
//     console.log('new document added to Mongodb')

//     // Close database connection
//     await client.close();
//   } catch (error) {
//     console.error(error);
//   }
// });







// // import cron from 'node-cron';
// // import { getLakeReading } from './scraper.js';
// // const cron = require('node-cron');

// // // import { getLakeReading } from '/lib/scraper'

// // cron.schedule('* * * * *', () => {
// //   console.log('cronning!!!!')
// // });

// // module.exports = cron;

// // const { MongoClient } = require("mongodb");

// // const uri = process.env.MONGODB_URI;
// // const client = new MongoClient(uri);


// // function runCron() {
// //   const lakeReading = await Promise.any([getLakeReading()]);

// //   async function run() {
// //     try {
// //       await client.connect();
// //       // connect to db
// //       const db = client.db("db");
// //       const coll = db.collection("samples");

// //       // const result = await coll.insertOne(lakeReading);
// //       await coll.insertOne(lakeReading);

// //     } finally {
// //       // close client when finished
// //       await client.close();
// //     }
// //   }
// //   run().catch(console.dir);
// // }

// // // cron.schedule('0 */12 * * *', () => {
// // //   console.log('cronning!!!!')
// // //   runCron();
// // // })

// // cron.schedule('* * * * *', () => {
// //   runCron();
// // })



