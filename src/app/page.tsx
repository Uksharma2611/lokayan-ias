import { Metadata } from "next";
import Header from '@/src/components/layout/Header';
import HomePageContent from '@/src/components/home/HomePageContent';
import Footer from '@/src/components/layout/Footer';
import { client } from "@/src/sanity/lib/client";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
  description: "Start your journey to civil services success with Lokayan IAS Academy. We offer expert guidance, foundation courses, test series, and personalized mentorship for UPSC and MPSC examinations.",
  openGraph: {
    title: "Lokayan IAS Academy | Premier UPSC & MPSC Coaching",
    description: "Join Lokayan IAS Academy for comprehensive UPSC and MPSC preparation. Learn from expert faculty, retired bureaucrats, and access premium study materials.",
    url: "https://www.lokayan.com", 
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default async function Home() {
  // Fetch the 3 latest articles on the SERVER for maximum SEO visibility
  const query = `*[_type == "article"] | order(_createdAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, "imageUrl": mainImage.asset->url, _createdAt, body
  }`;
  
  let initialArticles = [];
  try {
    initialArticles = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch articles on server:", error);
  }

  return (
    <>
      <Header />
      <HomePageContent initialArticles={initialArticles} />
      <Footer />
    </>
  );
}