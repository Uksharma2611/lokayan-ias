import Image from 'next/image';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. Optimized Local Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/public/assets/header-bg.png" // Exact path to your file
          alt="Lokayan IAS Academy Background"
          fill
          priority // Ensures this loads first
          className="object-cover"
        />
        {/* 2. The Dark Tint (Overlay) */}
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* 3. The Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Your Path to <span className="text-blue-400 font-serif italic">IAS Success</span> 
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
          At Lokayan, we guide aspirants toward their dream of becoming an IAS officer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button text="Begin Your Journey" />
          <button className="px-8 py-3 rounded-full font-semibold border-2 border-white/70 text-white hover:bg-white hover:text-blue-900 transition-all duration-300">
            All Courses
          </button>
        </div>
      </div>
    </section>
  );
}