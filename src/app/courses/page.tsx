"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react"; // 1. Import the Lenis hook
import Footer from "@/src/components/layout/Footer";
import { client } from "@/src/sanity/lib/client";

// --- DATA STRUCTURE ---
const programData = {
  UPSC: {
    title: "UPSC Civil Services Examination",
    description:
      "Our flagship 1-year foundation program designed to take you from absolute basics to interview-ready. Covers NCERTs, standard reference books, daily answer writing, and rigorous mock tests.",
    about: [
      {
        heading: "What is the UPSC CSE?",
        text: "The Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by the Union Public Service Commission. It is conducted for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service (IAS), Indian Foreign Service (IFS), and Indian Police Service (IPS).",
      },
      {
        heading: "Examination Structure",
        text: "The exam is conducted in three sequential stages: the Preliminary examination (objective type) for the selection of candidates for the Main examination, the Main examination (written/subjective) to assess academic and analytical expertise, and finally, the Interview (Personality Test) to evaluate the candidate's suitability for a career in public service.",
      },
      {
        heading: "Why Choose Lokayan?",
        text: "Our UPSC program focuses on building a rock-solid foundation starting with NCERTs, followed by advanced analytical sessions. We emphasize answer writing practice from day one, coupled with personalized mentorship from experienced faculty who have successfully navigated the process.",
      },
    ],
    eligibility: [
      { criteria: "Nationality", details: "Must be a citizen of India." },
      {
        criteria: "Age Limit",
        details: [
          "Minimum Age is 21 years.",
          "General: Upper Age Limit is 32 Years.",
          "OBC (with Certificate): Upper Age Limit is 35 Years.",
          "SC/ST: Upper Age Limit is 37 Years.",
          "Physically Handicapped (PwD): Upper Age Limit is 42 Years.",
          "Disabled & Discharged Defence service personnel: Relaxed to 37 (Gen), 38 (OBC), 40 (SC/ST).",
        ],
      },
      {
        criteria: "Education",
        details: "A degree from a recognized university.",
      },
      {
        criteria: "Attempts",
        details: [
          "General: 6 Attempts",
          "OBC: 9 Attempts",
          "SC/ST: Unlimited Attempts",
          "Physically Handicapped (PwD): 9 for Gen/OBC, Unlimited for SC/ST.",
        ],
      },
    ],
  },
  MPSC: {
    title: "MPSC State Services Examination",
    description:
      "A highly targeted program tailored specifically for the Maharashtra Public Service Commission. Includes deep dives into Maharashtra's geography, history, and Marathi/English language papers.",
    about: [
      {
        heading: "What is the MPSC State Service Exam?",
        text: "The Maharashtra Public Service Commission (MPSC) conducts the State Services Examination to recruit capable officers into the administrative branches of the Maharashtra State Government. Successful candidates are appointed to prestigious roles such as Deputy Collector, Deputy Superintendent of Police (DSP), and Tehsildar.",
      },
      {
        heading: "Examination Structure",
        text: "Similar to the UPSC, the MPSC exam consists of three rigorous stages: Prelims (objective type), Mains (which tests deep subject knowledge and language proficiency), and a final Interview. A profound understanding of Maharashtra's geography, history, and socio-economic landscape is essential.",
      },
      {
        heading: "Why Choose Lokayan?",
        text: "We provide highly specialized modules focusing strictly on the Maharashtra-specific syllabus. Our expert faculty delivers comprehensive lectures and test series in both Marathi and English, ensuring you are fully equipped to excel at every stage of the MPSC examination.",
      },
    ],
    eligibility: [
      {
        criteria: "Nationality",
        details:
          "Must be a citizen of India (Domicile of Maharashtra preferred).",
      },
      {
        criteria: "Age Limit",
        details: [
          "General: Lower age limit is 19 years, Upper age limit is 38 years.",
          "OBC: Relaxed upper age limit is 41 years (Relaxation of 3 years).",
          "SC/ST: Relaxed upper age limit is 43 years (Relaxation of 5 years).",
          "PwD: Maximum Age Limit is 45 Years.",
        ],
      },
      {
        criteria: "Education",
        details:
          "A degree from a recognized university. Knowledge of Marathi is mandatory.",
      },
      {
        criteria: "Attempts",
        details: [
          "General: 6 Attempts",
          "OBC: 9 Attempts",
          "SC/ST: Unlimited Attempts",
        ],
      },
    ],
  },
};

export default function CoursesPage() {
  const lenis = useLenis(); // 2. Initialize the hook

  const [selectedProgram, setSelectedProgram] = useState<
    "UPSC" | "MPSC" | null
  >(null);

  const [isPrelimsOpen, setIsPrelimsOpen] = useState(false);
  const [isMainsOpen, setIsMainsOpen] = useState(false);

  const [syllabusLinks, setSyllabusLinks] = useState<{ [key: string]: string }>(
    {},
  );

  // Scroll Reset Logic: Smoothly scroll to top whenever the program selection changes
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0);
    }
  }, [selectedProgram, lenis]);

  useEffect(() => {
    const fetchSyllabusLinks = async () => {
      const query = `*[_type == "syllabus"] {
        courseId,
        "pdfUrl": pdfFile.asset->url
      }`;
      try {
        const data = await client.fetch(query);
        const links: { [key: string]: string } = {};
        data.forEach((item: any) => {
          if (item.courseId && item.pdfUrl) {
            links[item.courseId] = item.pdfUrl;
          }
        });
        setSyllabusLinks(links);
      } catch (error) {
        console.error("Error fetching syllabus links:", error);
      }
    };

    fetchSyllabusLinks();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const program = params.get("program")?.toUpperCase();

      if (program === "UPSC" || program === "MPSC") {
        setSelectedProgram(program as "UPSC" | "MPSC");
      }
    }
  }, []);

  const handleBack = () => {
    setSelectedProgram(null);
    setIsPrelimsOpen(false);
    setIsMainsOpen(false);
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-10 mt-12">
        {/* 1. HEADER SECTION */}
        {!selectedProgram && (
          <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Our Programs
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto">
              Choose your target examination below to view eligibility criteria,
              detailed syllabus, and recommended reading lists.
            </p>
          </section>
        )}

        {/* 2. CONTENT CONTAINER */}
        <section
          className={`max-w-7xl mx-auto px-6 ${selectedProgram ? "mt-24" : "mt-5"}`}
        >
          {!selectedProgram && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UPSC Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative overflow-hidden border border-blue-100 pt-3 px-3 pb-6">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/upsc.png"
                      alt="UPSC Logo"
                      fill
                      className="object-contain mix-blend-multiply scale-[1.25]"
                      sizes="96px"
                    />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1c43] mb-4">
                  {programData.UPSC.title}
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow">
                  {programData.UPSC.description}
                </p>
                <button
                  onClick={() => setSelectedProgram("UPSC")}
                  className="w-full bg-[#0a1c43] text-white font-bold py-3.5 rounded-full hover:bg-[#ed1c24] transition-colors shadow-md"
                >
                  Learn More
                </button>
              </div>

              {/* MPSC Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mb-6 relative overflow-hidden border border-red-100 pt-3 px-3 pb-6">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/mpsc.png"
                      alt="MPSC Logo"
                      fill
                      className="object-contain mix-blend-multiply scale-[1.25]"
                      sizes="96px"
                    />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1c43] mb-4">
                  {programData.MPSC.title}
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow">
                  {programData.MPSC.description}
                </p>
                <button
                  onClick={() => setSelectedProgram("MPSC")}
                  className="w-full bg-[#0a1c43] text-white font-bold py-3.5 rounded-full hover:bg-[#ed1c24] transition-colors shadow-md"
                >
                  Learn More
                </button>
              </div>
            </div>
          )}

          {selectedProgram && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-[#ed1c24] font-medium mb-8 transition-colors"
              >
                &larr; Back to Programs
              </button>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-slate-100 pb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1c43]">
                    {programData[selectedProgram].title}
                  </h2>
                  <span className="inline-block px-3 py-1 mt-3 bg-red-50 text-[#ed1c24] text-xs font-bold uppercase rounded-md mb-3">
                    Target Examination
                  </span>
                </div>

                {syllabusLinks[selectedProgram] ? (
                  <a
                    href={`${syllabusLinks[selectedProgram]}?dl=`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ed1c24] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm shrink-0 mt-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Syllabus PDF
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-white font-semibold rounded-lg shadow-sm shrink-0 mt-1 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Syllabus Unavailable
                  </button>
                )}
              </div>

              <div className="mb-12 space-y-8 border-b border-slate-100 pb-12">
                {programData[selectedProgram].about.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-bold text-[#0a1c43] mb-3">
                      {section.heading}
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-[#0a1c43] mb-6">Eligibility Criteria</h3>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {programData[selectedProgram].eligibility.map((item, index) => (
                          <tr key={index} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                            <th className="py-4 px-6 bg-slate-50/50 font-semibold text-[#0a1c43] w-1/3 border-r border-slate-200">
                              {item.criteria}
                            </th>
                            <td className="py-4 px-6 text-gray-600 font-light">
                              {Array.isArray(item.details) ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {item.details.map((detail, dIdx) => (
                                    <li key={dIdx}>{detail}</li>
                                  ))}
                                </ul>
                              ) : (
                                item.details
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}