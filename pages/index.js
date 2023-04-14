// import Image from "next/image";
import Head from "next/head";
const { MongoClient } = require("mongodb");
import formatDistance from "date-fns/formatDistance";
import { useRouter } from "next/router";
import Link from "next/link";
// import cron from 'node-cron';

// import '../lib/cron';
// import '/lib/cron';
// import {cron} from '../lib/cron'

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

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const submitForm = () => {

  }

  return (
    <div className="container">
      <Head>
        <title>QT Swim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to QT Swim</h1>

        <p>For those who love swimming in Lake Wakatipu</p>

        <p>Every few weeks, <a href='https://www.lawa.org.nz/'>LAWA</a> publishes the results of their water testing for beautiful Lake Wakatipu. Rather than <a href='https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite'>check this website</a>, sign up to get notified the next time a water quality sample for Lake Wakatipu is published.</p>

        <p>They usually test once or twice a month so you will only get notified when there is a new test.</p>

        <p>Sign up for a free:</p>
        <form>
          <input
            type='text'
            placeholder='Name'
          />
           <input
            type='email'
            placeholder='Email'
          />
          <button onClick={submitForm}>Keen to swim!</button>
        </form>

        <h2>Recent Samples:</h2>
        {/* <button onClick={refreshData}>Refresh Data</button> */}

        <div className="grid">
          {samples.map(sample => {
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
        <Link href="/privacy" className='footerLink'>Privacy</Link>
        <Link href="/terms" className='footerLink'>Terms and Conditions</Link>
      </footer>
    </div>
  );
}
