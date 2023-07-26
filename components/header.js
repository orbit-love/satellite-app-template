import Image from "next/image";
import React from "react";
import Signin from "./signin";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex gap-x-6 justify-between items-center p-6 mx-auto max-w-7xl lg:px-8">
      <Link className="flex" href="/">
        <Image
          className="w-auto h-12"
          src="/orbit-icon-purple.svg"
          alt="Home"
          width={50}
          height={50}
        />
      </Link>

      {session ? (
        ""
      ) : (
        <Link
          className="text-xl font-light text-brand-dark hover:underline focus:underline dark:text-brand-light"
          href="/preview"
        >
          Preview
        </Link>
      )}

      <div className="flex flex-1 gap-x-6 justify-end items-center">
        <Signin />
      </div>
    </header>
  );
}
