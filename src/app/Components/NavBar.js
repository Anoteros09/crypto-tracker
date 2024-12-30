"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/user";
import { useDashboardStore } from "../store/dashboard";
import { MenuItem, Select } from "@mui/material";
import { useGlobalStore } from "../store/global";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const resetUserData = useUserStore((state) => state.resetUserData);
  const resetStore = useDashboardStore((state) => state.resetStore);
  const currency = useGlobalStore((state) => state.globalValues.currency);
  const setGlobalValues = useGlobalStore((state) => state.setGlobalValues);
  const { user, isSignedIn } = useUser();
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (isSignedIn) {
      setUser({
        userId: user.id,
        userName: user.username,
        email: user.primaryEmailAddress.emailAddress,
        isSignedIn,
      });
      fetchUserData(user.id);
    } else {
      resetUserData();
      resetStore();
    }
  }, [isSignedIn, user]);

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
              <Link href="/bookmark">
                <li className="mr-10 p-4 rounded-xl text-xl hover:bg-gray-700">
                  Bookmark
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex w-full justify-end mr-5 items-center">
            <div className="mr-10 currency-select">
              <Select
                value={currency}
                id="currency-select"
                onChange={(e) => setGlobalValues({ currency: e.target.value })}
                className="h-8"
                sx={{ borderColor: "white", border: "white", color: "white" }}
              >
                <MenuItem value={"inr"}>INR</MenuItem>
                <MenuItem value={"usd"}>USD</MenuItem>
                <MenuItem value={"gbp"}>GBP</MenuItem>
                <MenuItem value={"eur"}>EUR</MenuItem>
                <MenuItem value={"jpy"}>JPY</MenuItem>
                <MenuItem value={"cny"}>CNY</MenuItem>
                <MenuItem value={"rub"}>RUB</MenuItem>
              </Select>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton className="text-nowrap text-xl py-2 px-4 rounded-md hover:bg-gray-700" />
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
            <Link
              href="/bookmark"
              onClick={() => handleMenuOpen()}
              className="text-lg m-4"
            >
              <li>Bookmark</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
