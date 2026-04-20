import { Metadata } from "next";
import { client } from "@/src/sanity/lib/client";
import EventsClient from "./EventsClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Events, Seminars & Topper Talks | Lokayan IAS Academy",
  description: "Register for upcoming UPSC and MPSC mega seminars, scholarship tests, strategy masterclasses, and topper talks at Lokayan IAS Academy.",
  openGraph: {
    title: "Events & Seminars | Lokayan IAS Academy",
    description: "Join our expert-led strategy sessions, scholarship tests, and topper talks to accelerate your civil services preparation.",
    url: "https://www.lokayan.com/events", // Update with your actual domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default async function EventsPage() {
  // Fetch events data on the SERVER for maximum SEO visibility
  const query = `*[_type == "event"] | order(eventDate asc) {
    _id, title, eventDate, location, isFeatured, description, recordingUrl
  }`;

  let initialEvents = [];
  try {
    initialEvents = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch events on server:", error);
  }

  // Pass the server-fetched data to the client component
  return <EventsClient initialEvents={initialEvents} />;
}