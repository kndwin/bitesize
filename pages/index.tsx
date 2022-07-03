import Head from "next/head";

import { Landing } from "modules/landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bite Size</title>
      </Head>
      <Landing />
    </>
  );
}
