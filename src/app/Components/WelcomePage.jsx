"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { getCurrentURL, joinPaths } from "../utils/commFuncs";
import { useUserStore } from "../store/user";
const WelcomePage = () => {
  const { userId, email, userName, isSignedIn } = useUserStore(
    (state) => state.userData
  );

  const addUserToDb = () => {
    const path = getCurrentURL();
    const url = joinPaths(path, "userinfo");
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ userName, userId, email }),
    });
  };
  const fetchUserFromDb = async () => {
    const path = getCurrentURL();
    const url = joinPaths(path, "userinfo?");
    const resp = await fetch(
      url +
        new URLSearchParams({
          id: userId,
        })
    );
    const data = await resp.json();
    if (data.length == 0) {
      addUserToDb();
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUserFromDb();
    }
  }, [isSignedIn]);
  return (
    // <div className="max-h-screen flex flex-col items-center">
    //   <header className="text-center py-10">
    //     <h1 className="text-4xl font-extrabold text-green-400">
    //       Welcome {userName} to Crypto Tracker
    //     </h1>
    //     <p className="text-lg mt-4">
    //       Your gateway to tracking and managing cryptocurrency like a pro.
    //     </p>
    //   </header>

    //   <main className="flex-1 w-full max-w-4xl px-6">
    //     <section className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
    //       <h2 className="text-2xl font-semibold text-green-300 mb-4">
    //         Features
    //       </h2>
    //       <ul className="list-disc list-inside text-lg space-y-2 text-gray-300">
    //         <li>Track details of top cryptocurrencies.</li>
    //         <li>Monitor your bookmarked currencies in real-time.</li>
    //         <li>Stay updated with the latest crypto news & information.</li>
    //       </ul>
    //     </section>

    //     <section className="text-center bg-gray-800 shadow-lg rounded-lg p-6">
    //       <h2 className="text-2xl font-semibold text-blue-400 mb-4">
    //         Get Started
    //       </h2>
    //       <SignedOut>
    //         <p className="text-lg mb-6 text-gray-300">
    //           Sign up or log in to start tracking your favorite cryptocurrencies
    //           today!
    //         </p>
    //         <div className="space-x-4">
    //           <SignInButton
    //             mode="modal"
    //             style={{ color: "white" }}
    //             className="px-6 py-3 bg-green-500 text-white text-xl font-medium rounded-md shadow-md hover:bg-green-600"
    //           />
    //         </div>
    //       </SignedOut>
    //       <SignedIn>
    //         <p className="text-lg mb-6 text-gray-300">
    //           Proceed to dashboard!
    //           <Link
    //             href="/dashboard"
    //             className="ml-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600"
    //           >
    //             Proceed
    //           </Link>
    //         </p>
    //       </SignedIn>
    //     </section>
    //   </main>
    // </div>
    <div className="flex flex-col items-center justify-center h-screen py-4">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-6">
        CryptoTrack
      </h1>

      <p className="text-lg md:text-xl text-gray-200 text-center max-w-3xl">
        🚀{" "}
        <span className="font-semibold text-white">
          Your Gateway to Smarter Crypto Investments
        </span>{" "}
        🚀
      </p>

      <div className="mt-6 text-center max-w-3xl">
        <ul className="space-y-4">
          <li>
            📊{" "}
            <span className="text-purple-200 font-medium">
              Live Market Data:
            </span>{" "}
            Real-time prices, market caps, and price changes.
          </li>
          <li>
            📈{" "}
            <span className="text-purple-200 font-medium">
              Historical Insights:
            </span>{" "}
            Analyze performance with customizable time ranges.
          </li>
          <li>
            🔖{" "}
            <span className="text-purple-200 font-medium">
              Personalized Bookmarks:
            </span>{" "}
            Save your favorite coins for quick access and insights.
          </li>
          <li>
            🛠️{" "}
            <span className="text-purple-200 font-medium">
              User-Friendly Interface:
            </span>{" "}
            Easy-to-navigate dashboards and detailed coin pages.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        {/* <a
          href="/dashboard"
          className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Get Started
        </a> */}
        <SignedOut>
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 flex flex-col justify-center">
            <p className="text-lg mb-6 text-gray-800">
              Sign up or log in to start tracking your favorite cryptocurrencies
              today!
            </p>
            <SignInButton
              mode="modal"
              style={{ color: "white" }}
              className="px-6 py-3 bg-green-500 text-white text-xl font-medium rounded-md shadow-md hover:bg-green-600"
            />
          </div>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </SignedIn>
      </div>

      <p className="mt-4 text-gray-300 text-sm">
        🔒 <span className="font-medium text-gray-100">Pro Tip:</span> Log in to
        unlock bookmarking and tailored insights.
      </p>
    </div>
  );
};

export default WelcomePage;
