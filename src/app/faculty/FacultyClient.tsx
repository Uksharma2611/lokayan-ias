"use client";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/src/components/layout/Footer";
import { urlFor } from "@/src/sanity/lib/image"; // ✅ Added import

// Define the shape of our data coming from Sanity
interface FacultyMember {
    _id: string;
    name: string;
    designation: string;
    imageUrl: string;
    department: string;
    exams: string[];
    experience: string;
    credentials: string;
    bio: string;
}

interface FacultyClientProps {
    initialFaculty: FacultyMember[];
    homepageData: any; // ✅ Added homepageData prop
}

const DEPARTMENTS = [
    "All",
    "General Studies",
    "Optional Subjects",
    "Language & CSAT",
    "Interview Panel",
];

export default function FacultyClient({ initialFaculty, homepageData }: FacultyClientProps) {
    const [activeDepartment, setActiveDepartment] = useState("All");
    const [facultyList] = useState<FacultyMember[]>(initialFaculty);
    const [visibleCount, setVisibleCount] = useState(6);

    // Filter logic
    const filteredFaculty = facultyList.filter((member) => {
        return activeDepartment === "All" || member.department === activeDepartment;
    });

    const visibleFaculty = filteredFaculty.slice(0, visibleCount);

    // ✅ Generate optimized Sanity URL for Founder
    const founderImgUrl = homepageData?.founderImage
        ? urlFor(homepageData.founderImage).width(400).quality(90).url()
        : "/assets/founder-img.png";

    return (
        <>
            <main className="bg-slate-50 min-h-screen pb-20 mt-12">
                {/* 1. HERO HEADER */}
                <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Meet Your Mentors
                        </h1>
                        <p className="text-white/80 text-sm md:text-base font-light">
                            Learn from a handpicked team of veteran educators, retired bureaucrats, and subject matter experts dedicated to your success.
                        </p>
                    </div>
                </section>

                {/* 2. DIRECTOR'S DESK SECTION */}
                <section className="bg-white py-16 px-6 border-b border-slate-200">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="w-full md:w-3/5 order-2 md:order-1">
                            <span className="text-[#ed1c24] font-bold tracking-widest text-sm uppercase mb-2 block">
                                Message from the Director
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1c43] mb-6">
                                Guiding the Next Generation of Leaders
                            </h2>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                                <p>
                                    "At Lokayan, we believe that clearing the civil services examination requires more than just reading books—it requires the right strategy, rigorous discipline, and uncompromising mentorship."
                                </p>
                                <p>
                                    "Every faculty member here has been chosen not just for their profound knowledge, but for their ability to break down complex concepts and ignite a passion for public service in our students. We don't just teach; we mentor, we guide, and we walk alongside you until you reach your destination."
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="font-bold text-[#0a1c43] text-lg">Bhushan Deshmukh</p>
                                <p className="text-sm text-gray-500">Director & Chief Mentor, Lokayan IAS</p>
                            </div>
                        </div>

                        {/* ✅ Now using optimized Sanity URL */}
                        <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-full border-[8px] border-slate-50 shadow-xl overflow-hidden shrink-0 order-1 md:order-2">
                            <Image
                                src={founderImgUrl}
                                alt="Lokayan Founder"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 224px, 320px"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. FACULTY FILTERS */}
                <section className="max-w-7xl mx-auto px-6 mt-16 mb-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#0a1c43]">Our Core Faculty</h2>
                        <div className="w-16 h-1.5 bg-[#ed1c24] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="w-full flex justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex gap-2 shrink-0">
                            {DEPARTMENTS.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => {
                                        setActiveDepartment(dept);
                                        setVisibleCount(6);
                                    }}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeDepartment === dept
                                        ? "bg-[#0a1c43] text-white shadow-md"
                                        : "bg-white text-gray-500 border border-slate-200 hover:bg-slate-100 hover:text-[#0a1c43]"
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. FACULTY GRID */}
                <section className="max-w-7xl mx-auto px-6">
                    {filteredFaculty.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {visibleFaculty.map((member) => (
                                    <div
                                        key={member._id}
                                        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ed1c24] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>

                                        <div className="relative w-32 h-32 rounded-full border-4 border-slate-50 shadow-md mb-5 overflow-hidden">
                                            <Image
                                                src={member.imageUrl || "/assets/placeholder.png"}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="128px"
                                            />
                                        </div>

                                        {member.exams && member.exams.length > 0 && (
                                            <div className="flex gap-2 mb-4">
                                                {member.exams.map((exam) => (
                                                    <span
                                                        key={exam}
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider ${exam === 'UPSC' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-[#ed1c24]'
                                                            }`}
                                                    >
                                                        {exam}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <h3 className="text-xl font-bold text-[#0a1c43] mb-1">{member.name}</h3>
                                        <p className="text-[#ed1c24] font-medium text-sm mb-5">{member.designation}</p>

                                        <div className="w-full bg-slate-50 rounded-lg p-3 mb-5 space-y-1">
                                            {member.experience && (
                                                <p className="text-xs text-gray-600 font-semibold flex items-center justify-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 text-[#0a1c43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {member.experience}
                                                </p>
                                            )}
                                            {member.credentials && (
                                                <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {member.credentials}
                                                </p>
                                            )}
                                        </div>

                                        <p className="text-gray-600 text-sm font-light leading-relaxed flex-grow">
                                            "{member.bio}"
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {filteredFaculty.length > visibleCount && (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + 6)}
                                        className="px-8 py-3 bg-white border-2 border-[#0a1c43] text-[#0a1c43] font-bold rounded-full hover:bg-[#0a1c43] hover:text-white transition-colors shadow-sm"
                                    >
                                        Load More Mentors
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold text-[#0a1c43] mb-2">Faculty profiles coming soon</h3>
                            <p className="text-gray-500">We are currently updating our mentor profiles. Please check back shortly!</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}