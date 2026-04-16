import React from "react";
import Link from "next/link";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | Lokayan IAS Academy",
  description: "Privacy Policy for Lokayan IAS Academy students and visitors.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 7, 2026";

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-10">
      {/* HEADER SECTION */}
      <section className="bg-[#0a1c43] py-10 px-6 mt-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-white/80 text-sm md:text-base font-light">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-6 mt-5 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <div className="space-y-8 text-gray-700 font-light leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to Lokayan IAS Academy. We respect your privacy and are
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you visit our website or enroll in our coaching programs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-2">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#ed1c24]">
              <li>
                <strong>Personal Identification Information:</strong> Name,
                email address, phone number, and mailing address when you fill
                out our "Enquire Now" forms or register for events.
              </li>
              <li>
                <strong>Academic Information:</strong> Your target examination
                (UPSC/MPSC), educational background, and optional subjects.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, and
                operating system collected automatically through cookies to
                improve website performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-2">
              The information we collect is used in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#ed1c24]">
              <li>
                To provide, operate, and maintain our educational services and
                website.
              </li>
              <li>
                To communicate with you regarding course schedules, mock
                interview slots, and academy updates.
              </li>
              <li>
                To respond to your inquiries and provide customer support.
              </li>
              <li>
                To analyze website usage and improve our digital resources and
                user experience.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security
              measures designed to protect the security of any personal
              information we process. However, please note that no electronic
              transmission over the Internet or information storage technology
              can be guaranteed to be 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              5. Third-Party Services
            </h2>
            <p>
              We may use third-party services (such as Google Calendar or Sanity
              CMS) to manage event bookings and deliver content. These third
              parties have access to your Personal Data only to perform these
              tasks on our behalf and are obligated not to disclose or use it
              for any other purpose.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to the personal data we hold
              about you, or ask that we correct, update, or delete it. To
              exercise these rights, please contact us using the information
              provided below.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <p className="font-medium text-[#0a1c43]">Lokayan IAS Academy</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@lokayanias.com"
                  className="text-[#ed1c24] hover:underline"
                >
                  info@lokayanias.com
                </a>
              </p>
              <p>Phone: +91 XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
