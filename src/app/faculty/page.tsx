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
  // Fetch faculty data on the SERVER for maximum SEO visibility
  const query = `*[_type == "faculty"] | order(_createdAt asc) {
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

  let initialFaculty = [];
  try {
    initialFaculty = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch faculty on server:", error);
  }

  // Pass the server-fetched data to the client component
  return <FacultyClient initialFaculty={initialFaculty} />;
}