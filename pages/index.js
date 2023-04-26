import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Form from '../components/Form'
import Footer from '../components/Footer'
import Grid from '../components/Grid'

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
          Every few weeks, LAWA tests the water quality for beautiful Lake Wakatipu. Rather
          than{" "}
          <a href="https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite">
            check this website
          </a>
          , sign up for free email alerts.
        </p>

        <p>
          Get notified every time there is an update (once or twice a month). Easy as.
        </p>

        <Form />
        
        <Grid samples={samples} />
      </main>

      <Footer />
    </div>
  );
}
