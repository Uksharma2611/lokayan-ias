import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header"; // Make sure this path matches your setup!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lokayan IAS Academy",
  description: "Empowering the Next Generation of Civil Servants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Added bg-white so the background stays clean! */}
      <body className="min-h-full flex flex-col bg-white">
        <Header />

        {/* This "children" automatically renders page.tsx, courses/page.tsx, etc. */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}