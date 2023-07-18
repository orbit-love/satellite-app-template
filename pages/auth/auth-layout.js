import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // If user is authenticated, redirect to member directory
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  // TODO: Better loading state (including Head)
  if (status !== "unauthenticated") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Member Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white">{children}</main>
    </>
  );
}
