"use client";
import React, { useState } from "react";
import Footer from "@/src/components/layout/Footer";

// Reusing your existing FAQ data
const faqs = [
    {
        question: "What is the duration of the UPSC Foundation Course?",
        answer: "Our UPSC Foundation Course spans 12 months, covering both Prelims and Mains syllabi comprehensively, followed by dedicated interview guidance."
    },
    {
        question: "Do you provide study materials for MPSC?",
        answer: "Yes, we provide meticulously curated physical and digital study materials, including previous year paper analyses, standard reference books, and monthly current affairs magazines tailored for MPSC."
    },
    {
        question: "Are there mock tests included in the curriculum?",
        answer: "Absolutely. Both offline and online mock tests are conducted weekly. We also offer specialized full-length test series prior to the actual preliminary and main examinations."
    },
    {
        question: "How can I access recorded lectures if I miss a class?",
        answer: "All enrolled students get access to our dedicated student portal where recorded sessions are uploaded within 24 hours of the live class."
    },
    {
        question: "Who are the faculty members at Lokayan IAS Academy?",
        answer: "Our faculty comprises experienced educators, subject matter experts, and former civil servants who bring years of practical administrative experience and academic expertise."
    }
];

export default function FAQClient() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isEnquireOpen, setIsEnquireOpen] = useState(false);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const closeEnquireModal = () => setIsEnquireOpen(false);

    return (
        <>
            <main className="bg-slate-50 min-h-screen pb-20 mt-12">
                {/* 1. HERO HEADER */}
                <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-white/80 text-sm md:text-base font-light">
                            Find answers to common questions about our courses, methodology, and admission process.
                        </p>
                    </div>
                </section>

                {/* 2. FAQ ACCORDION SECTION */}
                <section className="max-w-4xl mx-auto px-6 mt-12">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none group"
                                    >
                                        <span className={`font-bold text-lg pr-4 transition-colors duration-300 ${isOpen ? "text-[#ed1c24]" : "text-[#0a1c43]"}`}>
                                            {faq.question}
                                        </span>
                                        <span className={`text-[#ed1c24] transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>

                                    {/* Smooth Slide Container */}
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-slate-50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. CONTACT CTA */}
                <section className="max-w-4xl mx-auto px-6 mt-12 text-center">
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-xl font-bold text-[#0a1c43] mb-2">Still have questions?</h3>
                        <p className="text-gray-600 mb-6">Our counseling team is here to assist you with your preparation strategy.</p>
                        {/* UPDATED: onClick now triggers the modal state */}
                        <button
                            onClick={() => setIsEnquireOpen(true)}
                            className="inline-block bg-[#ed1c24] text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                        >
                            Contact Us
                        </button>
                    </div>
                </section>
            </main>

            {/* ========================================= */}
            {/* ENQUIRE NOW MODAL (Synced with Header)     */}
            {/* ========================================= */}
            {isEnquireOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0a1c43]/70 backdrop-blur-sm transition-opacity"
                        onClick={closeEnquireModal}
                    ></div>

                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={closeEnquireModal}
                            className="absolute top-5 right-5 text-gray-400 hover:text-[#ed1c24] transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#0a1c43] mb-2">Request a Callback</h2>
                        </div>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Form submitted! (Showcase only)");
                                closeEnquireModal();
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Utkarsh Sharma"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all text-gray-800"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all text-gray-800"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all bg-white text-gray-800">
                                    <option value="">Select a program</option>
                                    <option value="foundation">UPSC Foundation Course</option>
                                    <option value="mains">Mains Test Series</option>
                                    <option value="interview">Interview Guidance</option>
                                    <option value="other">General Counseling</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-[#ed1c24] text-white font-bold py-3.5 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
                                >
                                    Submit Enquiry
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}