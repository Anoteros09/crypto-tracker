"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav
        className="w-full h-20 shadow-xl bg-gray-800 sticky top-0 "
        style={{ zIndex: 5 }}
      >
        <div className="flex justify-between items-center w-full h-full px-10 text-2xl">
          <Link href="/" className="mr-10">
            CryptoTracker
          </Link>
          <div className="hidden sm:flex mr-auto">
            <ul className="hidden sm:flex">
              <Link href="/">
                <li className="mr-10 p-4 rounded-xl text-xl hover:bg-gray-700">
                  Home
                </li>
              </Link>
              <Link href="/dashboard">
                <li className="mr-10 p-4 rounded-xl text-xl hover:bg-gray-700">
                  Dashboard
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex w-full justify-end mr-5 items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton className="text-nowrap text-xl bg-green-500 py-2 rounded-md" />
            </SignedOut>
          </div>
          <div
            onClick={handleMenuOpen}
            className="sm:hidden cursor-pointer -mt-1"
          >
            <HamburgerIcon />
          </div>
        </div>
      </nav>
      <div
        className={`bg-gray-700 fixed w-full rounded-b-xl shadow-xl sm:hidden p-3 ease-in-out duration-500 ${
          menuOpen ? "top-20" : "top-[-25%]"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="flex-col justify-end px-6">
          <ul>
            <Link
              href="/"
              onClick={() => handleMenuOpen()}
              className="text-lg m-4"
            >
              <li>Home</li>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => handleMenuOpen()}
              className="text-lg m-4"
            >
              <li>Dashboard</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
