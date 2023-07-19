import React from "react";
import Login from "./login";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "./head";

export default function Layout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // If user is unauthenticated, redirect to login page
  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status]);

  // If user is anything other than explicitly authenticated (ie "loading"), show empty page
  if (status !== "authenticated") {
    return <Head />;
  }

  // Only show directory if confirmed authenticated
  return (
    <>
      <Head />

      <Login />

      <main>{children}</main>
    </>
  );
}
