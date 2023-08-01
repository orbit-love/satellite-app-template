import Image from "next/image";
import React from "react";
import Signin from "./signin";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex gap-x-6 justify-between items-center p-6 mx-auto w-full max-w-7xl lg:px-8">
      <Link className="flex" href="/">
        <Image
          className="hidden w-auto h-14 dark:block"
          src="/brand-icon-light.svg"
          alt="Home"
          width={50}
          height={50}
        />

        <Image
          className="block w-auto h-14 dark:hidden"
          src="/brand-icon-dark.svg"
          alt="Home"
          width={50}
          height={50}
        />
      </Link>

      <div className="flex flex-1 gap-x-6 justify-end items-center">
        <Signin />
      </div>
    </header>
  );
}
