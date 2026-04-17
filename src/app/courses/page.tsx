import { Metadata } from "next";
import CoursesClient from "./CourseClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "UPSC & MPSC Foundation Courses | Lokayan IAS Academy",
  description: "Explore our flagship UPSC Civil Services and specialized MPSC State Services foundation programs. View eligibility, detailed syllabus, and expert guidance at Lokayan.",
  openGraph: {
    title: "UPSC & MPSC Courses | Lokayan IAS Academy",
    description: "Comprehensive foundation programs for UPSC and MPSC examinations. Build a rock-solid foundation from absolute basics to interview-ready.",
    url: "https://www.lokayan.com/courses", // Update this with your actual live domain
    siteName: "Lokayan IAS Academy",
    type: "website",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}