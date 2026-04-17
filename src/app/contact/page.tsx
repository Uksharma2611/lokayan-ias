import { Metadata } from "next";
import ContactClient from "./ContactClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Contact Us | Lokayan IAS Academy",
  description: "Get in touch with Lokayan IAS Academy. Enquire about our UPSC and MPSC foundation courses, test series, and personalized mentorship programs.",
  openGraph: {
    title: "Contact Lokayan IAS Academy",
    description: "Start your journey toward civil services. Contact us today for admission details and counseling.",
    url: "https://www.lokayan.com/contact", // Remember to update this with your actual live domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}