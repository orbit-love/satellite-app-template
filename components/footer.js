import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center mx-auto max-w-7xl h-24 text-gray-600 border-t border-gray-100 dark:text-gray-200 dark:border-gray-700">
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
          className="block w-auto h-6 dark:hidden"
        />
        <Image
          src="/orbit-logo-white.svg"
          width={50}
          height={50}
          alt="Orbit"
          className="hidden w-auto h-6 dark:block"
        />
      </Link>
    </footer>
  );
}
