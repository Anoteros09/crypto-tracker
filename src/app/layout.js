import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="description"
            content="Web Site created using Next.js. Its a CryptoCurreny Tracker App. FullStack app built using Next.js by utilising Authentication Feature from Clerk and Database hosted using vercel."
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <title>Crypto Tracker</title>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-gray-200 min-h-screen`}
        >
          <Navbar />
          <section>{children}</section>

          <footer className="py-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Crypto Tracker. All rights
            reserved.
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
