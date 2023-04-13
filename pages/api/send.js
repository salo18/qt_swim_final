const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
// 	username: 'api',
// 	key: process.env.MAILGUN_KEY,
// });

export default async function sendMessage(req, res) {
  try {
    let lastTwo;
    let mongoArr;
    async function run() {
      try {
        await client.connect();
        // connect to db
        const db = client.db("db");
        const coll = db.collection("samples");
        mongoArr =  await coll.find().sort({cronUpdateDate: -1}).limit(2).toArray();

        lastTwo = mongoArr.map(x => x.status);

        // if the last two readings don't have the same value, send a message
        if (lastTwo[0] !== lastTwo[1] && lastTwo[0] !== 'No recent data' && lastTwo[1] !== 'No recent data') {
          // SEND TEXT
          console.log('send message');


          // SEND EMAIL
          // mg.messages
          //   .create(sandboxc3553884a3ad44c6a6c931be982adc93.mailgun.org, {
          //     from: "Mailgun Sandbox <postmaster@sandboxc3553884a3ad44c6a6c931be982adc93.mailgun.org>",
          //     to: [process.env.MY_EMAIL],
          //     subject: "Hello",
          //     text: "Testing some Mailgun awesomness!",
          //   })
          //   .then(msg => console.log(msg)) // logs response data
          //   .catch(err => console.log(err)); // logs any error`;
        }
        console.log(lastTwo);
        console.log(mongoArr);
      } finally {
        // close client when finished
        await client.close();
      }
    }
    run().catch(console.dir);

    res.status(200);
    // res.status(200).json({lastTwo});
  } catch (err) {
    res.status(500).json({ error: "internal error", message: err });
    console.log(err);
  }
}



// // Download the helper library from https://www.twilio.com/docs/node/install
// // Set environment variables for your credentials
// // Read more at http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
// client.messages
//   .create({ body: "Hello from Twilio", from: process.env.TWILIO_NUMBER, to: "process.env.MY_NUMBER" })
//   .then(message => console.log(message.sid));