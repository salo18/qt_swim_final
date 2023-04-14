const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const nodemailer = require("nodemailer");


// async function sendEmail() {

// }

// async function lastTwoDocs() {

// }


export default async function main(req, res) {
  try {
    let lastTwo;
    let mongoArr;

    async function run() {
      try {
        await client.connect();
        // connect to db
        const db = client.db("db");
        const samples = db.collection("samples");
        mongoArr =  await samples.find().sort({cronUpdateDate: -1}).limit(2).toArray();

        // do it by date?
        lastTwo = mongoArr.map(x => x.status);


        // populate email list
        const users = db.collection('users');
        let rawList = await users.find().toArray();

        let emailList = rawList.map(x => x.email);
        console.log(emailList);

        // if the last two readings don't have the same value, send a message
        // if (lastTwo[0] !== lastTwo[1] && lastTwo[0] !== 'No recent data' && lastTwo[1] !== 'No recent data') {

        if (1) {
          // SEND EMAIL

          async function main() {
            try {
              let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                  user: process.env.MY_EMAIL,
                  pass: process.env.MY_EMAIL_PW,
                },
              });

              const info = await transporter.sendMail({
                from: `QT SWIM <${process.env.MY_EMAIL}>`,
                to: emailList,
                subject: "New water quality report for Frankton Beach",
                html: `
                <h1>Hey there,</h1>
                <p>We noticed that council took a new water sample for Frankton Beach.</p>
                <p>Here is the status: ${lastTwo[1]} </p>
                <p>Enjoy your time on the lake you legend!</p>
                <p>Cheers,</p>
                <p>QT Swim</p>
                <p>PS want to unsubscribe? No worries. Just reply "unsubscribe" and we'll take you off the list.</p>
                `,
              });

              // console.log(info.messageId);
              // console.log(info.accepted); // Array of emails that were successful
              // console.log(info.rejected); // Array of unsuccessful emails
            } catch(err) {
              console.log(err)
            }
          }
          main()
        }
      } finally {
        // close client when finished
        await client.close();
      }
    }
    run().catch(console.dir);

    res.status(200).json({ message: 'email sent successfully'});
  } catch (err) {
    res.status(500).json({ error: "internal error", message: err });
    console.log(err);
  }
}