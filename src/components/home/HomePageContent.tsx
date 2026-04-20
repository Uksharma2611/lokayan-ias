"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  _createdAt: string;
  body: any;
}

interface HomePageContentProps {
  initialArticles: Article[];
}

// --- UPDATED COURSES DATA (ONLY UPSC AND MPSC) ---
const coursesData = [
  {
    id: 1,
    slug: "upsc",
    badge: "Flagship Program",
    title: "UPSC Civil Services",
    image: "/assets/upsc.png",
    shortDesc:
      "Our 1-year foundation program designed to take you from absolute basics to interview-ready.",
    longDesc:
      "Our flagship foundation course is built from the ground up for absolute beginners. We take you through a meticulously planned journey starting with basic NCERTs, advancing to standard reference materials, and culminating in intense answer writing and interview prep.",
    features: [
      "Daily Live Classes",
      "Printed Study Material",
      "Weekly Prelims & Mains Tests",
      "1-on-1 Mentorship",
    ],
  },
  {
    id: 2,
    slug: "mpsc",
    badge: "State Services",
    title: "MPSC State Services",
    image: "/assets/mpsc.png",
    shortDesc:
      "A highly targeted program tailored specifically for the Maharashtra Public Service Commission.",
    longDesc:
      "We provide highly specialized modules focusing strictly on the Maharashtra-specific syllabus. Our expert faculty delivers comprehensive lectures and test series in both Marathi and English, ensuring you are fully equipped to excel at every stage of the MPSC examination.",
    features: [
      "Maharashtra-Specific Modules",
      "Marathi & English Medium",
      "Dedicated Test Series",
      "Expert Mentorship",
    ],
  },
];

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-[#0a1c43] mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-[#0a1c43] mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-[#0a1c43] mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#ed1c24] pl-4 italic my-6 text-gray-600 bg-slate-50 py-2 pr-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 marker:text-[#ed1c24]">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2 marker:text-[#0a1c43] font-medium">
        {children}
      </ol>
    ),
  },
};

export default function HomePageContent({ initialArticles }: HomePageContentProps) {
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof coursesData)[0] | null
  >(null);

  // Initialize state with the pre-fetched data from the server
  const [articles] = useState<Article[]>(initialArticles || []);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Prevent Background Scrolling Effect
  useEffect(() => {
    if (selectedCourse || selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCourse, selectedArticle]);

  const closeCourseModal = () => setSelectedCourse(null);
  const closeArticleModal = () => setSelectedArticle(null);

  return (
    <main className="bg-white">
      {/* 1. HERO SECTION (Restored) */}
      <section
        className="relative w-full h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/assets/header-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0f172a",
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Your Path to{" "}
            <span className="text-[#ed1c24] font-serif italic">
              IAS Success
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
            At Lokayan, we guide aspirants toward their dream of becoming an IAS
            officer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#ed1c24] text-white rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              Begin Your Journey
            </Link>
            <Link
              href="/courses"
              className="px-7 py-3.5 rounded-full font-semibold border-2 border-white/70 text-white hover:bg-white hover:text-[#0a1c43] transition-all duration-300"
            >
              All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VISION SECTION */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1c43] mb-4">
              Our Vision
            </h2>
            <div className="border-l-[6px] border-[#0a1c43] pl-6 mb-3">
              <p className="text-lg md:text-xl text-gray-700 italic font-light leading-relaxed">
                &ldquo;True guidance is about illuminating the path, not just
                pointing at the destination. We strive to mold administrators of
                integrity and excellence.&rdquo;
              </p>
            </div>
            <p className="text-base text-gray-500 font-medium pl-8">
              - Director, Lokayan IAS
            </p>
          </div>
          <div className="relative w-40 h-40 md:w-[220px] md:h-[220px] rounded-full border-[6px] border-white shadow-lg overflow-hidden shrink-0">
            <Image
              src="/assets/founder-img.png"
              alt="Founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 220px"
            />
          </div>
        </div>
      </section>

      {/* 3. LATEST ARTICLES SECTION */}
      <section className="bg-slate-50 py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1c43] mb-4 tracking-tight">
                Latest from Lokayan
              </h2>
              <div className="w-20 h-1.5 bg-[#ed1c24] rounded-full"></div>
            </div>
            <Link
              href="/articles"
              className="mt-4 md:mt-0 font-semibold text-[#0a1c43] hover:text-[#ed1c24] transition-colors flex items-center gap-2 underline underline-offset-8"
            >
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.length > 0
              ? articles.map((article) => (
                <button
                  key={article._id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left w-full"
                >
                  <div className="relative w-full h-48 bg-slate-200 overflow-hidden shrink-0">
                    <Image
                      src={article.imageUrl || "/assets/placeholder.png"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow w-full">
                    <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                      {new Date(article._createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                    </p>
                    <h3 className="text-lg font-bold text-[#0a1c43] mb-3 line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-light text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                    <span className="text-sm font-bold text-[#ed1c24] group-hover:text-[#0a1c43] transition-colors mt-auto flex items-center gap-2">
                      Read Article &rarr;
                    </span>
                  </div>
                </button>
              ))
              : [1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80 animate-pulse flex flex-col"
                />
              ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE PROGRAMS SECTION */}
      <section className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1c43] mb-3 tracking-tight">
                Explore Our Programs
              </h2>
              <p className="text-gray-500 font-normal text-lg">
                Structured learning paths tailored for your success.
              </p>
            </div>
            <Link
              href="/courses"
              className="mt-6 md:mt-0 px-6 py-2.5 rounded-full font-medium text-[#0a1c43] border border-[#0a1c43] hover:bg-[#0a1c43] hover:text-white transition-colors duration-300"
            >
              View All Courses &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {coursesData.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="cursor-pointer group rounded-xl border-2 border-gray-300 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl hover:border-[#0a1c43] hover:scale-[1.01] transition-all duration-500 text-left w-full focus:outline-none bg-white shadow-sm"
              >
                <div className="w-full sm:w-1/3 h-48 sm:h-auto relative shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-100 bg-slate-50/50 flex items-center justify-center p-6">
                  <div className="relative w-full h-full max-h-32">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center w-full">
                  <span className="text-[11px] font-black tracking-[0.2em] text-[#ed1c24] uppercase mb-2">
                    {course.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0a1c43] mb-3 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 mb-6 font-normal text-sm line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>
                  <span className="text-sm font-bold text-[#0a1c43] group-hover:text-[#ed1c24] transition-all duration-300 flex items-center gap-2 w-fit">
                    PROGRAM DETAILS <span className="font-black">&rarr;</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section className="bg-slate-50 py-16 md:py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1c43] mb-4">
            Success Stories
          </h2>
          <div className="w-20 h-1.5 bg-[#ed1c24] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 font-light max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;Hear from our students who have successfully cleared the
            examination and are now serving the nation.&rdquo;
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative">
            <p className="text-gray-700 font-light italic mb-6 leading-relaxed">
              "Lokayan's test series and personalized mentorship were the
              game-changers in my UPSC journey."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0a1c43] rounded-full flex items-center justify-center text-white font-bold text-xs">
                AS
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#0a1c43]">Anjali Sharma</h4>
                <p className="text-sm text-[#ed1c24] font-semibold">
                  AIR 45, UPSC 2024
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative">
            <p className="text-gray-700 font-light italic mb-6 leading-relaxed">
              "The comprehensive study materials and the faculty's dedication
              made all the difference in my preparation."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0a1c43] rounded-full flex items-center justify-center text-white font-bold text-xs">
                RD
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#0a1c43]">Rahul Deshmukh</h4>
                <p className="text-sm text-[#ed1c24] font-semibold">
                  AIR 12, MPSC 2023
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative">
            <p className="text-gray-700 font-light italic mb-6 leading-relaxed">
              "From foundational concepts to the final mock interviews, the
              guidance I received here was unparalleled."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0a1c43] rounded-full flex items-center justify-center text-white font-bold text-xs">
                PS
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#0a1c43]">Priya Singh</h4>
                <p className="text-sm text-[#ed1c24] font-semibold">
                  AIR 89, UPSC 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0a1c43]/60 backdrop-blur-sm transition-opacity"
            onClick={closeCourseModal}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 md:p-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeCourseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#ed1c24] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="inline-block px-3 py-1 bg-red-50 text-[#ed1c24] text-xs font-bold uppercase rounded-md mb-4">
              {selectedCourse.badge}
            </span>
            <h2 className="text-3xl font-bold text-[#0a1c43] mb-4">
              {selectedCourse.title}
            </h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              {selectedCourse.longDesc}
            </p>
            <h4 className="font-bold text-[#0a1c43] mb-4 border-b pb-2 text-sm uppercase tracking-widest">
              Course Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {selectedCourse.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 font-light"
                >
                  <svg
                    className="w-5 h-5 text-green-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 pt-6 border-t">
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-2.5 bg-[#ed1c24] text-white rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-md flex items-center justify-center text-sm"
                >
                  Enquire Now
                </Link>
                <button
                  onClick={closeCourseModal}
                  className="px-5 py-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-all text-sm font-medium"
                >
                  Close
                </button>
              </div>
              <Link
                href={`/courses?program=${selectedCourse.slug.toUpperCase()}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0a1c43] text-white rounded-full font-semibold hover:bg-[#ed1c24] transition-all text-sm shadow-md"
              >
                Full Curriculum &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-[#0a1c43]/80 backdrop-blur-md transition-opacity"
            onClick={closeArticleModal}
          />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeArticleModal}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-800 hover:text-[#ed1c24] p-2 rounded-full transition-colors shadow-sm"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c43]/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="text-red-400 font-bold text-sm uppercase mb-2">
                  {new Date(selectedArticle._createdAt).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" },
                  )}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>
            <div className="p-8 sm:px-12 sm:py-10">
              <PortableText
                value={selectedArticle.body}
                components={portableTextComponents}
              />
              <div className="mt-12 pt-6 border-t border-gray-200 flex justify-center">
                <button
                  onClick={closeArticleModal}
                  className="px-8 py-3 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}