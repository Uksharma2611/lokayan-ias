"use client";
import React, { useState } from "react";
import Footer from "@/src/components/layout/Footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "upsc",
    message: ""
  });

  // --- VALIDATION LOGIC ---
  // Name: Letters and spaces only, minimum 2 characters
  const isNameValid = /^[a-zA-Z\s]{2,50}$/.test(formData.name);
  
  // Email: Standard RFC email regex
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
  
  // Phone: 10 digits, optional +91 or +91- prefix
  const isPhoneValid = /^(\+\d{1,3}[-\s]?)?\d{10}$/.test(formData.phone);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", program: "upsc", message: "" });
    }, 1500);
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-20 mt-12">
        {/* 1. HERO HEADER */}
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

        {/* 2. SPLIT LAYOUT SECTION */}
        <section className="max-w-7xl mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT: ENQUIRY FORM */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              {!isSuccess ? (
                <>
                  <h2 className="text-2xl font-bold text-[#0a1c43] mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                            formData.name && !isNameValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                          }`} 
                          placeholder="Utkarsh Sharma" 
                        />
                        {formData.name && !isNameValid && (
                          <p className="text-red-500 text-xs mt-1">Letters only, no special characters.</p>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                            formData.phone && !isPhoneValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                          }`} 
                          placeholder="9876543210" 
                        />
                        {formData.phone && !isPhoneValid && (
                          <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit number.</p>
                        )}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                          formData.email && !isEmailValid ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:ring-[#0a1c43]"
                        }`} 
                        placeholder="you@example.com" 
                      />
                      {formData.email && !isEmailValid && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interested In</label>
                      <select 
                        value={formData.program}
                        onChange={(e) => setFormData({...formData, program: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all bg-white"
                      >
                        <option value="upsc">UPSC Civil Services</option>
                        <option value="mpsc">MPSC State Services</option>
                        <option value="test-series">Test Series</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1c43] outline-none transition-all resize-none" 
                        placeholder="How can we assist you?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || !isFormValid}
                      className={`w-full text-white font-bold py-3.5 rounded-lg transition-colors shadow-md flex justify-center items-center ${
                        isSubmitting || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-[#ed1c24] hover:bg-red-700"
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
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-[#ed1c24] mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="font-bold text-[#0a1c43]">Email Support</h3>
                  <p className="text-gray-500 text-sm">contact@lokayan.com</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-[#ed1c24] mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <h3 className="font-bold text-[#0a1c43]">Call Us</h3>
                  <p className="text-gray-500 text-sm">+91 91234 56789</p>
                </div>
              </div>

              {/* MAP */}
              <div className="bg-slate-200 rounded-2xl h-[350px] overflow-hidden border border-slate-200 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.393439401861!2d73.84992447600858!3d18.51111666946487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c065f44383c7%3A0xe5c149d63f9e9882!2sLokayan%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
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