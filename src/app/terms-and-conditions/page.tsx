import React from "react";
import Link from "next/link";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | Lokayan IAS Academy",
  description:
    "Terms and Conditions for Lokayan IAS Academy students and visitors.",
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "April 7, 2026";

  return (
    <>
      <main className="bg-slate-50 min-h-screen pb-10">
        {/* HEADER SECTION */}
        <section className="bg-[#0a1c43] py-10 mt-10 px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Lokayan IAS Academy website and
                enrolling in our coaching programs, you accept and agree to be
                bound by the terms and provisions of this agreement. If you do
                not agree to abide by these terms, please do not use our
                services or website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                2. Use of Academy Services
              </h2>
              <p className="mb-2">
                Our services are designed to assist aspirants in their
                preparation for the UPSC and MPSC examinations. By using our
                services, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[#ed1c24]">
                <li>
                  <strong>Provide Accurate Information:</strong> Ensure that all
                  registration and enrollment details provided to the academy
                  are truthful and up-to-date.
                </li>
                <li>
                  <strong>Maintain Discipline:</strong> Maintain a respectful
                  and professional demeanor in all online and offline
                  interactions with faculty, staff, and peers.
                </li>
                <li>
                  <strong>Personal Use Only:</strong> Use the provided access
                  portals, mock interviews, and student dashboards solely for
                  your personal educational benefit.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                3. Intellectual Property Rights
              </h2>
              <p className="mb-2">
                All content provided by Lokayan IAS Academy is strictly
                protected by copyright laws:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[#ed1c24]">
                <li>
                  Study materials, PDF notes, question banks, and recorded
                  videos are the exclusive property of Lokayan IAS Academy.
                </li>
                <li>
                  You may not reproduce, distribute, modify, or commercially
                  exploit any of our proprietary educational content without
                  explicit written consent.
                </li>
                <li>
                  Sharing dashboard access credentials with non-enrolled
                  individuals is strictly prohibited and will result in
                  immediate termination of enrollment.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                4. Fee Payment and Refund Policy
              </h2>
              <p>
                All course fees must be paid in accordance with the fee
                structure provided at the time of admission. Please note that
                fees once paid are generally non-refundable and
                non-transferable, unless expressly stated otherwise in a
                specific program's enrollment agreement. Lokayan IAS Academy
                reserves the right to modify course fees for future batches at
                its discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                While Lokayan IAS Academy provides high-quality mentorship, test
                series, and study materials, we do not guarantee success in the
                UPSC, MPSC, or any other competitive examination. Your success
                depends entirely on your own hard work, dedication, and
                individual performance. We shall not be held liable for any
                direct, indirect, or consequential loss arising from the use of
                our educational materials.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                6. Modifications to Terms
              </h2>
              <p>
                Lokayan IAS Academy reserves the right to update or modify these
                Terms & Conditions at any time without prior notice. Your
                continued use of the website and academy resources following any
                changes indicates your acceptance of the new terms.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#0a1c43] mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding these Terms &
                Conditions, please contact us at:
              </p>
              <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="font-medium text-[#0a1c43]">
                  Lokayan IAS Academy
                </p>
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
      <Footer />
    </>
  );
}
