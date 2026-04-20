"use client";
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const isStudio = pathname?.startsWith("/studio");

  // This effect fires every time the URL changes
  useEffect(() => {
    if (lenis) {
      // immediate: true makes it snap to top instantly without an extra animation
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}