import Image from "next/image";
import React from "react";
import Signout from "./signout";

export default function Header() {
  return (
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
        Sign in...
        <Signout />
      </div>
    </header>
  );
}
