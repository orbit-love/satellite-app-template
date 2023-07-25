import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "./head";
import Footer from "./footer";
import Header from "./header";

export default function LayoutUnauthenticated({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // If user is authenticated, redirect to member directory
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  // If user is anything other than explicitly unauthenticated (ie "loading"), show empty page
  if (status !== "unauthenticated") {
    return <Head />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head />
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
