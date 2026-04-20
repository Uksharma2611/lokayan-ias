import { Metadata } from "next";
import Header from '@/src/components/layout/Header';
import HomePageContent from '@/src/components/home/HomePageContent';
import Footer from '@/src/components/layout/Footer';
import { client } from "@/src/sanity/lib/client";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
  // ... (keep your existing metadata here)
};

export default async function Home() {
  // Fetch articles AND the new homepage settings
  const articlesQuery = `*[_type == "article"] | order(_createdAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, "imageUrl": mainImage.asset->url, _createdAt, body
  }`;

  const homepageQuery = `*[_type == "homepage"][0]`;

  let initialArticles = [];
  let homepageData = null;

  try {
    initialArticles = await client.fetch(articlesQuery);
    homepageData = await client.fetch(homepageQuery);
  } catch (error) {
    console.error("Failed to fetch data on server:", error);
  }

  return (
    <>
      <Header />
      <HomePageContent
        initialArticles={initialArticles}
        homepageData={homepageData}
      />
      <Footer />
    </>
  );
}