"use client";
import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
    }`}>
      <button
        onClick={scrollToTop}
        className="group flex items-center gap-3 bg-white border border-slate-200 shadow-xl pl-2 pr-6 py-2 rounded-full hover:border-[#ed1c24] transition-all duration-300 hover:shadow-2xl"
        aria-label="Scroll to top"
      >
        {/* Icon Circle - Now First */}
        <div className="bg-[#ed1c24] text-white p-2.5 rounded-full shadow-sm group-hover:bg-[#0a1c43] transition-colors">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.5" 
              d="M5 11l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </div>

        {/* Text - font-medium for better visibility */}
        <span className="text-sm font-medium tracking-wide text-[#0a1c43] group-hover:text-[#ed1c24] transition-colors">
          Scroll to top
        </span>
      </button>
    </div>
  );
}