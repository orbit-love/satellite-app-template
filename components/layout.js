"use client";

import React from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function Layout({ session, children }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Member Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </SessionProvider>
  );
}
