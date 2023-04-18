const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const nodemailer = require("nodemailer");

async function sendEmail(userEmail) {
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
      to: userEmail,
      subject: "Success! You're signed up.",
      html: `
      <p>Thanks for signing up to QT Swim!</p>
      <p>You'll receive an email whenever there is a new update for the water quality of Lake Wakatipu.</p>
      <p>This is a free project so if you like it, share with a friend :) </p>
      <p>Enjoy your time on the lake you legend!</p>
      <p>QT Swim</p>
      <p>PS want to unsubscribe? No worries. Just reply "unsubscribe" and we'll take you off the list.</p>
      `,
    }

    const info = await transporter.sendMail(message);
  } catch(err) {
    console.log(err)
  }
}

export default async function addEmail(req, res) {
  try {
    async function run() {
      try {
        await client.connect();
        const db = client.db("db");
        const coll = db.collection("users");

        const { email } = req.body;
        await coll.insertOne({ email, emailAddDate: Date.now() });

        sendEmail(email);

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