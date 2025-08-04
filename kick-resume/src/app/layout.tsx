"use client"; // ✅ Zaroori hai kyunki SessionProvider ek client component hai

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { ResumeProvider } from "@/context/ReaumeContext";
import { ResumeDataProvider } from "@/context/ResumeBuilderData";
import { CreditsProvider } from "@/context/CreditsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CreditsProvider>
            <Navbar />
            <ResumeProvider>
              <ResumeDataProvider>{children}</ResumeDataProvider>
            </ResumeProvider>

            <Footer />
          </CreditsProvider>
        </SessionProvider>{" "}
        {/* ✅ Wrap your app */}
      </body>
    </html>
  );
}
