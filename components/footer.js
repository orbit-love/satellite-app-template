import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-brand-dark-highlight border-brand-light-highlight dark:text-brand-light-highlight dark:border-brand-dark-highlight flex justify-center items-center mt-16 mx-auto max-w-7xl h-24 border-t">
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
