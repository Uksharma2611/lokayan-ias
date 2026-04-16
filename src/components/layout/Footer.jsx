"use client"; // 1. Add this directive
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // 2. Add this import

export default function Footer() {
  const pathname = usePathname(); // 3. Get the current URL

  // 4. Hide the Footer on the Studio page
  if (pathname.startsWith('/studio')) {
      return null; 
  }

  return (
    <footer className="bg-gray-300 text-slate-700 pt-12 pb-8 px-6 border-t-4 border-[#0a1c43]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col items-start lg:col-span-1">
          <Link href="/" className="inline-block mb-6 transition-all duration-300">
            <Image
              src="/assets/lokayan-logo-new.svg"
              alt="Lokayan IAS Academy Logo"
              width={140} 
              height={60} 
              className="object-contain"
            />
          </Link>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            At Lokayan, we guide aspirants toward their dream of becoming an IAS officer with dedication, integrity, and hard work.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-bold mb-5 text-[#0a1c43] tracking-wide mt-[4px]">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><Link href="/" className="hover:text-[#ed1c24] transition-colors">Home</Link></li>
            <li><Link href="/courses" className="hover:text-[#ed1c24] transition-colors">Courses</Link></li>
            <li><Link href="/resources" className="hover:text-[#ed1c24] transition-colors">Resources</Link></li>
            <li><Link href="/faculty" className="hover:text-[#ed1c24] transition-colors">Faculty</Link></li>
            <li><Link href="/events" className="hover:text-[#ed1c24] transition-colors">Events</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Support */}
        <div>
          <h3 className="text-base font-bold mb-5 text-[#0a1c43] tracking-wide mt-[4px]">Support</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><Link href="/contact" className="hover:text-[#ed1c24] transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-[#ed1c24] transition-colors">FAQs</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[#ed1c24] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-[#ed1c24] transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-base font-bold mb-5 text-[#0a1c43] tracking-wide mt-[4px]">Contact Us</h3>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#ed1c24] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="leading-relaxed">2nd Floor, Kotwal Wada, Narayan Peth, Pune, Maharashtra Pin- 411030</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#ed1c24] shrink-0 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>+91 8788376179</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#ed1c24] shrink-0 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>info@lokayanias.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Social Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-300 pt-8 flex flex-col items-center justify-center gap-6">
        
        {/* Centered Social Icons */}
        <div className="flex items-center gap-6">
          <Link href="#" className="text-slate-400 hover:text-[#ed1c24] transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-[#ed1c24] transition-colors">
            <span className="sr-only">X (Twitter)</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-[#ed1c24] transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-[#ed1c24] transition-colors">
            <span className="sr-only">YouTube</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-[#ed1c24] transition-colors">
            <span className="sr-only">WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          </Link>
        </div>

        {/* Centered Copyright Text */}
        <p className="text-slate-500 text-sm font-medium text-center">
          &copy; {new Date().getFullYear()} Lokayan IAS Academy. All rights reserved.
        </p>

      </div>
    </footer>
  );
}