import { Metadata } from "next";
import { client } from "@/src/sanity/lib/client";
import ResourcesClient from "./ResourcesClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Study Resources & Downloads | Lokayan IAS Academy",
  description: "Access our free digital library of UPSC and MPSC study materials, including previous year papers, mock tests, topper notes, and current affairs magazines.",
  openGraph: {
    title: "Study Resources | Lokayan IAS Academy",
    description: "Download expertly curated study materials for UPSC and MPSC preparation.",
    url: "https://www.lokayan.com/resources", // Update with your actual domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default async function ResourcesPage() {
  // Fetch resources data on the SERVER for maximum SEO visibility
  const query = `*[_type == "resource"] | order(_createdAt desc) {
    _id,
    title,
    exam,
    category,
    displayDate,
    "fileUrl": pdfFile.asset->url
  }`;

  let initialResources = [];
  try {
    initialResources = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch resources on server:", error);
  }

  // Pass the server-fetched data to the client component
  return <ResourcesClient initialResources={initialResources} />;
}