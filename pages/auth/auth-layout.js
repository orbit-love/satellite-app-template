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

  // If user is anything other than explicitly unauthenticated (ie "loading"), show empty page
  if (status !== "unauthenticated") {
    return <Head />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head />

      <main className="isolate relative px-6 py-48 mx-auto max-w-2xl text-center lg:px-8 lg:py-64">
        {children}
      </main>
    </div>
  );
}
