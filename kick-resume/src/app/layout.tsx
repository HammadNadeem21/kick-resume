"use client"; // ✅ Zaroori hai kyunki SessionProvider ek client component hai

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ResumeProvider } from "@/context/ReaumeContext";
import { ResumeDataProvider } from "@/context/ResumeBuilderData";
import { CreditsProvider } from "@/context/CreditsContext";
import { usePathname } from "next/navigation";
import { AiResumeBuilderProvider } from "@/context/AiResumeBuilder";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = pathname === "/auth/login" || pathname === "/auth/signup";

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CreditsProvider>
            {!hideLayout && <Navbar />}
            <ResumeProvider>
              <AiResumeBuilderProvider>{children}</AiResumeBuilderProvider>
            </ResumeProvider>

            {!hideLayout && <Footer />}
          </CreditsProvider>
        </SessionProvider>{" "}
        {/* ✅ Wrap your app */}
      </body>
    </html>
  );
}
