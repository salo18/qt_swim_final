// import Image from "next/image";
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

    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save email');
        }
        alert("Success! You're in :)");
      })
      .catch((error) => {
        console.error(error);
        alert("Oops that didn't work, try again");
      });

    setEmail('');
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

        <p>
          Every few weeks, <a href="https://www.lawa.org.nz/">LAWA</a> publishes
          the results of their water testing for beautiful Lake Wakatipu. Rather
          than{" "}
          <a href="https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite">
            check this website
          </a>
          , sign up to get notified the next time a water quality sample for
          Lake Wakatipu is released.
        </p>

        <p>
          LAWA tests once or twice a month and you will only get notified when there is a new test.
        </p>

        <form className='main-form' onSubmit={handleSubmit}>
          <label htmlFor="email">Sign up for a free:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={isValid ? "" : "error"}
          />
          {!isValid && (
            <p className="error-msg">Please enter a valid email address.</p>
          )}
          <button type="submit" disabled={!isValid}>
            Submit
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
        <p>Created with &#x1F499; by Salo</p>
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
