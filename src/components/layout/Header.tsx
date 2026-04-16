"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  // If we are on the Studio page, do not render the Header at all
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeEnquireModal = () => setIsEnquireOpen(false);

  // --- THE NEW LOGIC ---
  const isHome = pathname === "/";

  // The header is ONLY transparent if we are on the Home page AND haven't scrolled down yet.
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isTransparent ? "bg-transparent py-4" : "bg-white shadow-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="transition-all duration-300">
              <Image
                src="/assets/lokayan-logo-new.svg"
                alt="Lokayan IAS Academy Logo"
                width={120}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-10 font-semibold transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-[#0a1c43]"
            }`}
          >
            <Link href="/" className="hover:text-[#ed1c24] transition-colors">
              Home
            </Link>
            <Link
              href="/courses"
              className="hover:text-[#ed1c24] transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/resources"
              className="hover:text-[#ed1c24] transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/faculty"
              className="hover:text-[#ed1c24] transition-colors"
            >
              Faculty
            </Link>
            <Link
              href="/events"
              className="hover:text-[#ed1c24] transition-colors"
            >
              Events
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button text="Enquire Now" onClick={() => setIsEnquireOpen(true)} />
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* ENQUIRE NOW MODAL (Pop-up Form)             */}
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-2">
                Request a Callback
              </h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Utkarsh Sharma"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interested In
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all bg-white text-gray-800">
                  <option value="">Select a program</option>
                  <option value="foundation">UPSC Foundation Course</option>
                  <option value="mains">Mains Test Series</option>
                  <option value="interview">Interview Guidance</option>
                  <option value="other">General Counseling</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific questions or doubts?"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all resize-none text-gray-800"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#ed1c24] text-white font-bold py-3.5 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Submit Enquiry
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
