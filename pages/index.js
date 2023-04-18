import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import formatDistance from "date-fns/formatDistance";
import React, { useState } from "react";

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function getStaticProps() {
  try {
    await client.connect();
    const db = client.db("db");

    const samples = await db
      .collection("samples")
      .find({})
      .sort({ cronUpdateDate: -1 })
      .limit(4)
      .toArray();

    return {
      props: {
        samples: JSON.parse(JSON.stringify(samples)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({ samples }) {
  const router = useRouter();

  // const refreshData = () => {
  //   router.replace(router.asPath);
  // };

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleEmailChange(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValid(validateEmail(inputEmail));
  }

  function validateEmail(inputEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save email");
        }
        alert("Success! You're in :) Make sure to check your spam folder.");
      })
      .catch((error) => {
        console.error(error);
        alert("Ooops that didn't work, try again");
      });

    setEmail("");
  }

  return (
    <div className="container">
      <Head>
        <title>QT Swim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to QT Swim</h1>

        <p>For those who love swimming in Lake Wakatipu.</p>

        <Image
          src='/qtswim.png'
          alt='view of Lake Wakatipu with Kelvin Heights Peninsula in the background'
          width={850}
          height={300}
        />
        <p className='img-src'>Image courtesy of <a href='https://openai.com/product/dall-e-2'>Dall-E 2</a></p>

        <p>
          Every few weeks, <a href="https://www.lawa.org.nz/">LAWA</a> tests the water quality for beautiful Lake Wakatipu. Rather
          than{" "}
          <a href="https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite">
            check this website
          </a>
          , sign up for free email alerts.
        </p>

        <p>
          Get notified every time there is an update (once or twice a month). Easy as.
        </p>

        <form className="main-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Sign up for free water quality alerts:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={isValid ? "" : "error"}
            placeholder="Your Email"
          />
          {!isValid && (
            <p className="error-msg">Please enter a valid email address.</p>
          )}
          <button type="submit" disabled={!isValid}>
            Let&apos;s swim!
          </button>
        </form>

        <h2>Recent Samples:</h2>
        {/* <button onClick={refreshData}>Refresh Data</button> */}

        <div className="grid">
          {samples.map((sample) => {
            return (
              <div key={sample.cronUpdateDate} className="card">
                {/* <h3>{sample.lawaSampleDate}</h3> */}
                <p>
                  Lake Status: <strong>{sample.status}</strong>
                </p>
                <p>
                  Time since we last checked LAWA:{" "}
                  {formatDistance(sample.cronUpdateDate, new Date())}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      <footer>
        <p>
          Created with &#x1F499; by{" "}
          <a href="https://www.linkedin.com/in/salo-mizrachi-0b885432/">Salo</a>
        </p>
        <p><a href='https://github.com/salo18/qt_swim_final'>Code for this project</a></p>
        <Link href="/privacy" className="footerLink">
          Privacy
        </Link>
        <Link href="/terms" className="footerLink">
          Terms and Conditions
        </Link>
      </footer>
    </div>
  );
}
