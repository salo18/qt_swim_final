// import Image from "next/image";
// import styles from "./page.module.css";
import Head from "next/head";
const { MongoClient } = require("mongodb");
import formatDistance from "date-fns/formatDistance";
import { useRouter } from "next/router";

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

  return (
    <div className="container">
      <Head>
        <title>QT Swim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">QT Water Alert</h1>

        <h2 className="subtitle">Welcome to your ?</h2>

        <h2>Recent Samples:</h2>
        <button onClick={refreshData}>Refresh Data</button>

        <div className="grid">
          {samples.map(sample => {
            return (
              <div key={sample.cronUpdateDate} className="card">
                <h3>{sample.lawaSampleDate}</h3>
                <p>
                  Lake Status: <strong>{sample.status}</strong>
                </p>
                <p>
                  Time since last check:{" "}
                  {formatDistance(sample.cronUpdateDate, new Date())}
                </p>
              </div>
            );
          })}
        </div>

        <p className="description">The problem:</p>
      </main>

      <footer>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Created with &#x1F499; by Salo
        </a>
      </footer>
    </div>
  );
}
