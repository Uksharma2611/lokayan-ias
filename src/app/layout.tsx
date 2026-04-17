import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import SmoothScrolling from "@/src/components/providers/SmoothScrolling";
import ScrollToTop from "@/src/components/ui/ScrollToTop";

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
      <body className="min-h-full flex flex-col bg-white">
        {/* Wrapping with Lenis Smooth Scrolling */}
        <SmoothScrolling>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <ScrollToTop />
        </SmoothScrolling>
      </body>
    </html>
  );
}