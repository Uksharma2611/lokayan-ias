"use client";
import React, { useState } from "react";
import Footer from "@/src/components/layout/Footer";

// Define the shape of our data coming from Sanity
interface LokayanEvent {
  _id: string;
  title: string;
  eventDate: string;
  location: string;
  isFeatured: boolean;
  description: string;
  recordingUrl?: string;
}

interface EventsClientProps {
  initialEvents: LokayanEvent[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  // Initialize state with the data fetched from the server
  const [events] = useState<LokayanEvent[]>(initialEvents);

  // Modal States
  const [selectedEvent, setSelectedEvent] = useState<LokayanEvent | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Input States
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // --- NEW: Validation Logic ---
  const isNameValid = formData.name.trim().length >= 3;
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
  // Accepts 10 digits, with optional +91 or +91- at the start
  const isPhoneValid = /^(\+\d{1,3}[-\s]?)?\d{10}$/.test(formData.phone); 
  
  // Form is only valid if ALL fields pass validation
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.eventDate) >= now);
  const pastEvents = events.filter((e) => new Date(e.eventDate) < now).reverse();
  const displayedEvents = activeTab === "Upcoming" ? upcomingEvents : pastEvents;

  // Handle Form Submission -> Send to Google Apps Script
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return; // Extra safeguard

    setIsSubmitting(true);
    
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby7_PQGYSbE2xwag-e1tH4soIdzFTq2j37u7YzZsxODHWL7sD_D0BPyX6YPmsOz1cfLjA/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventTitle: selectedEvent?.title,
          eventDate: selectedEvent?.eventDate,
          location: selectedEvent?.location
        }),
      });
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "" }); // Reset form
    } catch (error) {
      console.error("Registration failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-20 mt-12">
        {/* 1. HERO HEADER */}
        <section className="bg-[#0a1c43] py-12 md:py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Events & Seminars
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light">
              Master the syllabus with our expertly curated digital library—featuring previous year papers, authentic topper notes, high-yield current affairs, and rigorous mock tests.
            </p>
          </div>
        </section>

        {/* 2. TABS CONTROL */}
        <section className="max-w-7xl mx-auto px-6 mt-8 mb-8">
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 inline-flex relative">
              <button
                onClick={() => setActiveTab("Upcoming")}
                className={`w-44 relative z-10 py-2.5 rounded-full text-md font-bold whitespace-nowrap transition-colors duration-300 ${
                  activeTab === "Upcoming" ? "text-white" : "text-gray-500 hover:text-[#0a1c43]"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("Past")}
                className={`w-44 relative z-10 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                  activeTab === "Past" ? "text-white" : "text-gray-500 hover:text-[#0a1c43]"
                }`}
              >
                Past Events
              </button>
              
              {/* The Sliding Pill */}
              <div 
                className={`absolute top-1.5 bottom-1.5 w-44 bg-[#0a1c43] rounded-full transition-transform duration-300 ease-in-out left-1.5 ${
                  activeTab === "Upcoming" ? "translate-x-0" : "translate-x-full"
                }`}
              />
            </div>
          </div>
        </section>

        {/* 3. EVENTS GRID */}
        <section className="max-w-7xl mx-auto px-6">
          {displayedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedEvents.map((evt) => {
                const dateObj = new Date(evt.eventDate);
                const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const day = dateObj.getDate();
                const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={evt._id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all group relative overflow-hidden">
                    {evt.isFeatured && activeTab === "Upcoming" && (
                      <div className="absolute top-4 right-[-30px] bg-[#ed1c24] text-white text-[10px] font-black uppercase tracking-widest px-10 py-1 rotate-45 shadow-sm">
                        Featured
                      </div>
                    )}

                    <div className="w-20 h-24 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-[#0a1c43] transition-colors duration-300">
                      <span className="text-[#ed1c24] text-sm font-bold">{month}</span>
                      <span className="text-[#0a1c43] text-3xl font-black group-hover:text-white transition-colors">{day}</span>
                    </div>

                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-[#0a1c43] mb-2">{evt.title}</h3>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500 font-medium mb-3">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {evt.location}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm font-light mb-6 line-clamp-2">{evt.description}</p>
                      
                      {activeTab === "Upcoming" ? (
                        <button 
                          onClick={() => { setSelectedEvent(evt); setIsSuccess(false); setFormData({ name: "", email: "", phone: "" }); }}
                          className="w-fit px-6 py-2.5 bg-[#ed1c24] text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md text-sm"
                        >
                          Register for Free &rarr;
                        </button>
                      ) : (
                        evt.recordingUrl ? (
                          <a href={evt.recordingUrl} target="_blank" rel="noopener noreferrer" className="w-fit px-6 py-2.5 bg-[#0a1c43] text-white font-bold rounded-lg hover:bg-blue-900 transition-colors shadow-md text-sm">
                            Watch Recording
                          </a>
                        ) : (
                          <span className="text-sm font-bold text-gray-400">Event Concluded</span>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-[#0a1c43] mb-2">No {activeTab.toLowerCase()} events</h3>
              <p className="text-gray-500">Stay tuned! We are currently planning our next big session.</p>
            </div>
          )}
        </section>

        {/* 4. REGISTRATION MODAL */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0a1c43]/70 backdrop-blur-sm transition-opacity" onClick={() => !isSubmitting && setSelectedEvent(null)} />
            
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in duration-300">
              <button onClick={() => !isSubmitting && setSelectedEvent(null)} className="absolute top-5 right-5 text-gray-400 hover:text-[#ed1c24] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {!isSuccess ? (
                /* FORM VIEW */
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold text-[#ed1c24] uppercase tracking-wider block mb-1">Secure Your Seat</span>
                    <h2 className="text-2xl font-bold text-[#0a1c43] leading-tight">{selectedEvent.title}</h2>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input 
                        type="text" required 
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                          formData.name.length > 0 && !isNameValid ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-[#0a1c43]"
                        }`} 
                        placeholder="Enter your name" 
                      />
                      {formData.name.length > 0 && !isNameValid && (
                        <p className="text-red-500 text-xs mt-1">Name must be at least 3 characters.</p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input 
                        type="email" required 
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                          formData.email.length > 0 && !isEmailValid ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-[#0a1c43]"
                        }`} 
                        placeholder="you@example.com" 
                      />
                      {formData.email.length > 0 && !isEmailValid && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input 
                        type="tel" required 
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                          formData.phone.length > 0 && !isPhoneValid ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-[#0a1c43]"
                        }`} 
                        placeholder="9876543210" 
                      />
                      {formData.phone.length > 0 && !isPhoneValid && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number.</p>
                      )}
                    </div>
                    
                    {/* Submit Button (Dynamically Disabled) */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !isFormValid} 
                      className={`w-full mt-2 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md flex justify-center items-center ${
                        isSubmitting || !isFormValid 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-[#0a1c43] hover:bg-blue-900"
                      }`}
                    >
                      {isSubmitting ? "Registering..." : "Confirm Registration"}
                    </button>
                  </form>
                </>
              ) : (
                /* SUCCESS VIEW */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a1c43] mb-2">Registration Confirmed!</h2>
                  <p className="text-gray-600 mb-6 font-light text-sm">
                    We have sent an official calendar invitation to your email address. It contains the event link and will notify you 1 hour before we start.
                  </p>
                  
                  <button onClick={() => setSelectedEvent(null)} className="w-full bg-[#ed1c24] text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}