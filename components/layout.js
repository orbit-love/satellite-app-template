import React from "react";
import Login from "./login";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "./head";
import Link from "next/link";
import Image from "next/image";

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

      <header className="flex gap-x-6 justify-between items-center p-6 mx-auto max-w-7xl bg-white lg:px-8">
        <div className="flex lg:flex-1">
          <Image
            className="w-auto h-12"
            src="/orbit-logo-purple.svg"
            alt="Orbit"
            width={50}
            height={50}
          />
        </div>

        <div className="flex flex-1 gap-x-6 justify-end items-center">
          <Login />
        </div>
      </header>

      <main>{children}</main>

      <footer className="flex justify-center items-center mx-auto max-w-7xl h-24 text-gray-700 border-t border-gray-100">
        <Link
          href="https://orbit.love/"
          className="inline-flex gap-1 items-center"
          target="_blank"
          rel="noreferrer noopener"
        >
          Powered by
          <Image
            src="/orbit-logo-color.png"
            width={50}
            height={50}
            alt="Orbit"
            className="w-auto h-6"
          />
        </Link>
      </footer>
    </>
  );
}
