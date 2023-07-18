import React from "react";
import Head from "next/head";

export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Member Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
}
