"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/src/components/layout/Footer";
import { client } from "@/src/sanity/lib/client";

// Define the shape of our data coming from Sanity
interface Resource {
  _id: string;
  title: string;
  exam: "UPSC" | "MPSC";
  category: string;
  displayDate: string;
  fileUrl: string;
}

const CATEGORIES = ["All", "Previous Year Papers", "Mock Tests", "Toppers' Notes", "Current Affairs"];

export default function ResourcesPage() {
  const [activeExam, setActiveExam] = useState<"UPSC" | "MPSC">("UPSC");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // New States for Sanity Data
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: State to track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch Resources from Sanity
  useEffect(() => {
    const fetchResources = async () => {
      // GROQ query to get all resources, ordered by newest first
      const query = `*[_type == "resource"] | order(_createdAt desc) {
        _id,
        title,
        exam,
        category,
        displayDate,
        "fileUrl": pdfFile.asset->url
      }`;
      try {
        const data = await client.fetch(query);
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Logic to filter the fetched documents
  const filteredResources = resources.filter((resource) => {
    const matchesExam = resource.exam === activeExam;
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    return matchesExam && matchesCategory;
  });

  // NEW: Get only the items that should currently be visible
  const visibleResources = filteredResources.slice(0, visibleCount);

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-20 mt-12">
        {/* 1. HEADER SECTION */}
        <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Study Resources
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light">
              Master the syllabus with our expertly curated digital library—featuring previous year papers, authentic topper notes, high-yield current affairs, and rigorous mock tests.
            </p>
          </div>
        </section>

        {/* 2. CONTROLS SECTION */}
        <section className="max-w-7xl mx-auto px-6 mt-8 mb-10">
          <div className="flex flex-col items-center gap-8">
            
            {/* Exam Toggle Switch */}
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 inline-flex relative">
              <button
                onClick={() => { 
                  setActiveExam("UPSC"); 
                  setActiveCategory("All"); 
                  setVisibleCount(6); // Reset count on tab change
                }}
                className={`relative z-10 px-8 py-2.5 rounded-full text-md font-bold transition-colors duration-300 ${
                  activeExam === "UPSC" ? "text-white" : "text-gray-500 hover:text-[#0a1c43]"
                }`}
              >
                UPSC Civil Services
              </button>
              <button
                onClick={() => { 
                  setActiveExam("MPSC"); 
                  setActiveCategory("All"); 
                  setVisibleCount(6); // Reset count on tab change
                }}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                  activeExam === "MPSC" ? "text-white" : "text-gray-500 hover:text-[#0a1c43]"
                }`}
              >
                MPSC State Services
              </button>
              
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#0a1c43] rounded-full transition-transform duration-300 ease-in-out ${
                  activeExam === "UPSC" ? "translate-x-0 left-1.5" : "translate-x-full left-[3px]"
                }`}
              />
            </div>

            {/* Category Filters */}
            <div className="w-full flex justify-start md:justify-center overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-2 shrink-0">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setVisibleCount(6); // Reset count on category change
                    }}
                    className={`px-5 py-2 rounded-lg text-md font-medium transition-all whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-red-50 text-[#ed1c24] border border-red-100"
                        : "bg-white text-gray-500 border border-slate-200 hover:bg-slate-100 hover:text-[#0a1c43]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        </section>

        {/* 3. RESOURCES GRID */}
        <section className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-xl p-5 border border-slate-100 h-24 animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
                  <div className="flex-grow space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
                </div>
              ))}
            </div>
          ) : filteredResources.length > 0 ? (
            // Real Data Grid
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* FIXED: Changed to map over visibleResources instead of filteredResources */}
                {visibleResources.map((resource) => (
                  <div 
                    key={resource._id}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-red-50 text-[#ed1c24] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#ed1c24] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-grow overflow-hidden">
                      <h3 className="font-bold text-[#0a1c43] text-md md:text-base truncate mb-1">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-[#ed1c24] bg-red-50 px-2 py-0.5 rounded">
                          {resource.category}
                        </span>
                        {resource.displayDate && (
                          <>
                            <span>•</span>
                            <span>{resource.displayDate}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <a 
                      href={`${resource.fileUrl}?dl=`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:bg-[#0a1c43] hover:text-white transition-colors shrink-0"
                      aria-label="Download file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>

              {/* NEW: Load More Button */}
              {filteredResources.length > visibleCount && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 bg-white border-2 border-[#0a1c43] text-[#0a1c43] font-bold rounded-full hover:bg-[#0a1c43] hover:text-white transition-colors shadow-sm"
                  >
                    Load More Resources
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0a1c43] mb-2">No resources found</h3>
              <p className="text-gray-500">Check back later! We are constantly updating our digital library.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}