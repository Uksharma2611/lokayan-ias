"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Button from "../ui/Button";

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NEW: Form State and Logic ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: ""
  });

  const programOptions = [
    { value: "foundation", label: "UPSC Foundation Course" },
    { value: "mains", label: "Mains Test Series" },
    { value: "interview", label: "Interview Guidance" },
    { value: "other", label: "General Counseling" }
  ];

  // Validation Logic
  const isNameValid = /^[a-zA-Z\s]{2,50}$/.test(formData.name);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
  const isPhoneValid = /^(\+\d{1,3}[-\s]?)?\d{10}$/.test(formData.phone);
  const isProgramValid = formData.program !== "";

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && isProgramValid;

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeEnquireModal = () => {
    setIsEnquireOpen(false);
    // Reset success state and form after the modal fades out
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", program: "", message: "" });
    }, 300);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === href) {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Remember to replace 'your_form_id' with your actual Formspree ID
      const response = await fetch("https://formspree.io/f/xeevgqve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto-close the modal after a few seconds
        setTimeout(() => {
          closeEnquireModal();
        }, 3000);
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("A network error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Resources", href: "/resources" },
    { name: "Faculty", href: "/faculty" },
    { name: "Events", href: "/events" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isTransparent && !isMobileMenuOpen ? "bg-transparent py-5" : "bg-white shadow-md py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group relative z-[60]"
          >
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

          <nav
            className={`hidden md:flex items-center gap-10 font-semibold transition-colors duration-300 ${isTransparent ? "text-white" : "text-[#0a1c43]"
              }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors hover:text-[#ed1c24] ${pathname === link.href ? "text-[#ed1c24]" : ""
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative z-[60]">
            <div className="hidden md:block">
              <Button text="Enquire Now" onClick={() => setIsEnquireOpen(true)} />
            </div>

            <button
              className={`md:hidden p-2 transition-colors ${isTransparent && !isMobileMenuOpen ? "text-white" : "text-[#0a1c43]"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-white z-[50] flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl font-bold transition-colors ${pathname === link.href ? "text-[#ed1c24]" : "text-[#0a1c43]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4">
              <Button text="Enquire Now" onClick={() => { setIsEnquireOpen(true); setIsMobileMenuOpen(false); }} />
            </div>
          </nav>
        </div>
      </header>

      {/* ENQUIRE NOW MODAL */}
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

            {!isSuccess ? (
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Utkarsh Sharma"
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all text-gray-800 ${formData.name && !isNameValid
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43]"
                      }`}
                  />
                  {formData.name && !isNameValid && (
                    <p className="text-red-500 text-xs mt-1">Letters only, no special characters.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all text-gray-800 ${formData.email && !isEmailValid
                          ? "border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43]"
                        }`}
                    />
                    {formData.email && !isEmailValid && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all text-gray-800 ${formData.phone && !isPhoneValid
                          ? "border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43]"
                        }`}
                    />
                    {formData.phone && !isPhoneValid && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit number.</p>
                    )}
                  </div>
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
                          ? "Select a program"
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
                          Select a program
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific questions or doubts?"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] focus:border-[#0a1c43] outline-none transition-all resize-none text-gray-800"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full text-white font-bold py-3.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 ${isSubmitting || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-[#ed1c24] hover:bg-red-700"
                      }`}
                  >
                    {isSubmitting ? "Sending..." : "Submit Enquiry"}
                    {!isSubmitting && isFormValid && (
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
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0a1c43] mb-2">Request Received!</h2>
                <p className="text-gray-600 mb-6 font-light">Thank you. A counselor will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}