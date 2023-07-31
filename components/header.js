import Image from "next/image";
import React from "react";
import Signin from "./signin";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex gap-x-6 justify-between items-center p-6 mx-auto w-full max-w-7xl lg:px-8">
      <Link className="flex" href="/">
        <Image
          className="hidden w-auto h-28 dark:block"
          src="/brand-icon-light.svg"
          alt="Home"
          width={50}
          height={50}
        />

        <Image
          className="block w-auto h-28 dark:hidden"
          src="/brand-icon-dark.svg"
          alt="Home"
          width={50}
          height={50}
        />
      </Link>

      {session ? (
        ""
      ) : (
        <Link
          className="text-brand-dark dark:text-brand-light text-xl font-light hover:underline focus:underline"
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
