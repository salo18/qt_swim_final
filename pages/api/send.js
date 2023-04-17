const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const nodemailer = require("nodemailer");

export default async function main(req, res) {
  try {
    async function connectDB() {
      try {
        await client.connect();
        const db = client.db("db");
        const samples = db.collection("samples");

        // get values of last two samples
        let mongoArr =  await samples.find().sort({cronUpdateDate: -1}).limit(2).toArray();
        let lastTwo = mongoArr.map(x => [x.status, x.lawaSampleDate]);

        // populate email list
        const users = db.collection('users');
        let rawList = await users.find().toArray();
        let emailList = rawList.map(x => x.email);

        // if there is a new reading with a valid date (not null) AND the last two dates are not the same, send a message
        if (lastTwo[0][1] !== null && lastTwo[0][0] !== 'No recent data' && lastTwo[0][1] !== lastTwo[1][1]) {
        // if (1) {
          async function sendEmail() {
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

              const message = {
                from: `QT SWIM <${process.env.MY_EMAIL}>`,
                to: process.env.MY_EMAIL,
                bcc: emailList,
                subject: "New water quality report for Frankton Beach",
                html: `
                <p>Hey there,</p>
                <p>We noticed that council took a new water sample on ${lastTwo[0][1]} for Frankton Beach.</p>
                <p>Here is the status: ${lastTwo[0][0]} </p>
                <p>Enjoy your time on the lake you legend!</p>
                <p>Cheers,</p>
                <p>QT Swim</p>
                <p>PS want to unsubscribe? No worries. Just reply "unsubscribe" and we'll take you off the list.</p>
                `,
              }

              const info = await transporter.sendMail(message);

              // console.log(info.messageId);
              // console.log(info.accepted); // Array of emails that were successful
              // console.log(info.rejected); // Array of unsuccessful emails
            } catch(err) {
              console.log(err)
            }
          }
          sendEmail()
        }
      } finally {
        await client.close();
      }
    }
    connectDB().catch(console.dir);

    res.status(200).json({ message: 'email sent successfully'});
  } catch (err) {
    res.status(500).json({ error: "internal error", message: err });
    console.log(err);
  }
}