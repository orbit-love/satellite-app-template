import React from "react";
import Signout from "./signout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "./head";
import Image from "next/image";
import Footer from "./footer";

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
    <div className="bg-white dark:bg-gray-900">
      <Head />

      <header className="flex gap-x-6 justify-between items-center p-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex lg:flex-1">
          <Image
            className="w-auto h-12"
            src="/orbit-icon-purple.svg"
            alt="Orbit"
            width={50}
            height={50}
          />
        </div>

        <div className="flex flex-1 gap-x-6 justify-end items-center">
          <Signout />
        </div>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
}
