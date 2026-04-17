import { Metadata } from "next";
import { client } from "../../sanity/lib/client";
import ArticlesClient from "./ArticlesClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Latest Articles & Current Affairs | Lokayan IAS Academy",
  description: "Stay updated with daily current affairs, strategy guides, and academy announcements to boost your UPSC and MPSC preparation.",
  openGraph: {
    title: "Latest Articles | Lokayan IAS Academy",
    description: "Stay updated with daily current affairs, strategy guides, and academy announcements.",
    url: "https://www.lokayan.com/articles", // Update with your actual domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

const ARTICLES_PER_PAGE = 6;

export default async function ArticlesPage() {
  // Fetch initial data on the SERVER for maximum SEO visibility
  const query = `*[_type == "article"] | order(_createdAt desc)[0...${ARTICLES_PER_PAGE}] {
    _id, title, "slug": slug.current, excerpt, "imageUrl": mainImage.asset->url, _createdAt, body
  }`;

  let initialArticles = [];
  try {
    initialArticles = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch initial articles on server:", error);
  }

  // Pass the server-fetched data to the client component
  return <ArticlesClient initialArticles={initialArticles} />;
}