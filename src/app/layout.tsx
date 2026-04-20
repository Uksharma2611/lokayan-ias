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

// --- GLOBAL SEO METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lokayan.com"), // Important: Replace with your actual live domain
  title: {
    default: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
    template: "%s | Lokayan IAS Academy", // Automatically appends the academy name to subpage titles
  },
  description:
    "Empowering the Next Generation of Civil Servants. Lokayan IAS Academy offers expert coaching, foundation courses, test series, and mentorship for UPSC and MPSC examinations.",
  keywords: [
    "UPSC coaching",
    "MPSC coaching",
    "IAS academy",
    "civil services preparation",
    "Lokayan IAS Academy",
    "UPSC foundation course",
    "MPSC state services",
    "IAS preparation Maharashtra"
  ],
  authors: [{ name: "Lokayan IAS Academy" }],
  creator: "Lokayan IAS Academy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
    description:
      "Empowering the Next Generation of Civil Servants with expert coaching and mentorship for UPSC and MPSC.",
    siteName: "Lokayan IAS Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
    description:
      "Empowering the Next Generation of Civil Servants with expert coaching and mentorship for UPSC and MPSC.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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