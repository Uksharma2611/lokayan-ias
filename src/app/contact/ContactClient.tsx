"use client";
import React, { useState } from "react";
import Footer from "@/src/components/layout/Footer";

export default function ContactClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        program: "",
        message: ""
    });

    const programOptions = [
        { value: "upsc", label: "UPSC Civil Services" },
        { value: "mpsc", label: "MPSC State Services" },
        { value: "test-series", label: "Test Series" },
        { value: "other", label: "General Inquiry" }
    ];

    // --- VALIDATION LOGIC ---
    const isNameValid = /^[a-zA-Z\s]{2,50}$/.test(formData.name);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
    const isPhoneValid = /^(\+\d{1,3}[-\s]?)?\d{10}$/.test(formData.phone);
    const isProgramValid = formData.program !== "";

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isProgramValid;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/xeevgqve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: "", email: "", phone: "", program: "", message: "" });
            } else {
                alert("Oops! There was a problem submitting your form. Please check the backend configuration.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("A network error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <main className="bg-slate-50 min-h-screen pb-20 mt-12">
                <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Contact Us
                        </h1>
                        <p className="text-white/80 text-sm md:text-base font-light">
                            Have questions about our programs or admission process? Our team is here to help.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            {!isSuccess ? (
                                <>
                                    <h2 className="text-2xl font-bold text-[#0a1c43] mb-6">Send a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${formData.name && !isNameValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                                                        }`}
                                                    placeholder="John Doe"
                                                />
                                                {formData.name && !isNameValid && (
                                                    <p className="text-red-500 text-xs mt-1">Letters only, no special characters.</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${formData.phone && !isPhoneValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                                                        }`}
                                                    placeholder="9876543210"
                                                />
                                                {formData.phone && !isPhoneValid && (
                                                    <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit number.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${formData.email && !isEmailValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                                                    }`}
                                                placeholder="you@example.com"
                                            />
                                            {formData.email && !isEmailValid && (
                                                <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Interested In *</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all bg-white flex justify-between items-center ${isDropdownOpen ? "border-[#0a1c43] ring-2 ring-[#0a1c43]" : "border-gray-300 hover:border-gray-400"
                                                        }`}
                                                >
                                                    <span className={formData.program === "" ? "text-gray-500" : "text-gray-800"}>
                                                        {formData.program === ""
                                                            ? "Select an option"
                                                            : programOptions.find(p => p.value === formData.program)?.label}
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                <div
                                                    className={`absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                                                        }`}
                                                >
                                                    <ul className="py-2">
                                                        <li className="px-4 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed">
                                                            Select an option
                                                        </li>
                                                        {programOptions.map((option) => (
                                                            <li
                                                                key={option.value}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, program: option.value });
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.program === option.value
                                                                    ? "bg-red-50 text-[#ed1c24] font-semibold"
                                                                    : "text-gray-700 hover:bg-slate-50 hover:text-[#0a1c43]"
                                                                    }`}
                                                            >
                                                                {option.label}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all resize-none"
                                                placeholder="How can we assist you?"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !isFormValid}
                                            className={`w-full text-white font-bold py-3.5 rounded-lg transition-colors shadow-md flex justify-center items-center ${isSubmitting || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-[#ed1c24] hover:bg-red-700"
                                                }`}
                                        >
                                            {isSubmitting ? "Sending..." : "Submit Inquiry"}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#0a1c43] mb-2">Message Sent!</h2>
                                    <p className="text-gray-600 mb-6 font-light">Thank you. A counselor will contact you within 24 hours.</p>
                                    <button onClick={() => setIsSuccess(false)} className="text-[#ed1c24] font-bold hover:underline">Send another message</button>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: CONTACT INFO & MAP */}
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <a
                                    href="mailto:contact@lokayan.com"
                                    className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:scale-105 hover:border-[#ed1c24]/30 transition-all duration-300 block"
                                >
                                    <div className="text-[#ed1c24] mb-3 group-hover:scale-110 transition-transform origin-left">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-[#0a1c43] mb-1">Email Support</h3>
                                    <p className="text-gray-500 text-sm group-hover:text-[#ed1c24] transition-colors">
                                        contact@lokayan.com
                                    </p>
                                </a>

                                <a
                                    href="tel:+919123456789"
                                    className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:scale-105 hover:border-[#ed1c24]/30 transition-all duration-300 block"
                                >
                                    <div className="text-[#ed1c24] mb-3 group-hover:scale-110 transition-transform origin-left">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-[#0a1c43] mb-1">Call Us</h3>
                                    <p className="text-gray-500 text-sm group-hover:text-[#ed1c24] transition-colors">
                                        +91 91234 56789
                                    </p>
                                </a>
                            </div>

                            <div className="bg-slate-200 rounded-2xl h-[350px] overflow-hidden border border-slate-200 relative group">
                                <div className="absolute inset-0 bg-transparent z-10 pointer-events-none md:pointer-events-auto md:hover:pointer-events-none transition-all"></div>
                                <iframe
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Lokayan%20IAS%20Academy,%20Bal%20Ganesh%20Tower,%20Thane%20West+(Lokayan%20IAS%20Academy)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="relative z-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}