import { Metadata } from "next";
import FAQClient from "./FAQClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Lokayan IAS Academy",
  description: "Find answers to common questions about Lokayan IAS Academy's UPSC and MPSC foundation courses, study materials, mock tests, and admission process.",
  openGraph: {
    title: "FAQ | Lokayan IAS Academy",
    description: "Got questions about your civil services preparation? Find answers about our courses, methodology, and faculty here.",
    url: "https://www.lokayan.com/faq", // Update with your actual live domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default function FAQPage() {
  return <FAQClient />;
}