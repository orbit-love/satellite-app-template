import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../components/head";

export default function AuthLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // If user is authenticated, redirect to member directory
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  if (status !== "unauthenticated") {
    return <Head />;
  }

  return (
    <>
      <Head />

      <main className="bg-white">{children}</main>
    </>
  );
}
