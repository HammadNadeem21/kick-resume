"use client"; // ✅ Zaroori hai kyunki SessionProvider ek client component hai

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar/>
          {children}
          <Footer/>
          </SessionProvider> {/* ✅ Wrap your app */}
      </body>
    </html>
  );
}
