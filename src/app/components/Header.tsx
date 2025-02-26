"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="flex flex-row justify-around py-4 space-x-12 max-w-3xl mx-auto">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "underline cursor-default hidden"
              : "hover:font-bold"
          }
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "underline hidden cursor-default"
              : "hover:font-bold"
          }
        >
          About us
        </Link>
        <Link
          href="/services"
          className={
            pathname === "/services"
              ? "underline hidden cursor-default"
              : "hover:font-bold"
          }
        >
          Our Services
        </Link>
      </div>
    </header>
  );
}
