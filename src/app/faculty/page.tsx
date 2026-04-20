import { Metadata } from "next";
import { client } from "@/src/sanity/lib/client";
import FacultyClient from "./FacultyClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Our Faculty & Mentors | Lokayan IAS Academy",
  description: "Meet the expert faculty at Lokayan IAS Academy. Learn from veteran educators, retired bureaucrats, and subject matter experts dedicated to your UPSC and MPSC success.",
  openGraph: {
    title: "Meet Your Mentors | Lokayan IAS Academy",
    description: "Our handpicked team of educators and retired bureaucrats provides uncompromising mentorship for UPSC and MPSC aspirants.",
    url: "https://www.lokayan.com/faculty", // Update with your actual domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default async function FacultyPage() {
  // 1. Define queries for both Faculty members and Homepage settings
  const facultyQuery = `*[_type == "faculty"] | order(_createdAt asc) {
    _id,
    name,
    designation,
    "imageUrl": image.asset->url,
    department,
    exams,
    experience,
    credentials,
    bio
  }`;

  const homepageQuery = `*[_type == "homepage"][0]{ founderImage }`;

  let initialFaculty = [];
  let homepageData = null;

  try {
    // 2. Fetch both datasets in parallel for better performance
    const [facultyResult, homepageResult] = await Promise.all([
      client.fetch(facultyQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(homepageQuery, {}, { next: { revalidate: 60 } })
    ]);

    initialFaculty = facultyResult;
    homepageData = homepageResult;
  } catch (error) {
    console.error("Failed to fetch faculty data on server:", error);
  }

  // 3. Pass both faculty list and homepage data to the client component
  return <FacultyClient initialFaculty={initialFaculty} homepageData={homepageData} />;
}