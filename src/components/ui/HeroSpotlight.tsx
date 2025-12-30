'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Detect Screen Size
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 2. Track Mouse Relative to Container
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // TEXT CONTENT: "NOVA"
  const textContent = (
    <span className="block">NOVA</span>
  );

  return (
    <div 
      ref={containerRef} 
      className="relative z-10 flex flex-col items-center justify-center pointer-events-none p-4 md:p-0"
    >
      
      {/* LAYER 1: THE DARK BASE (Always Visible, Dim) */}
      {/* CHANGED: Reduced size from text-[16rem] back to text-9xl range.
          Mobile: text-7xl, Desktop: text-9xl
      */}
      <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-center leading-none text-[#111] select-none">
        {textContent}
      </h1>

      {/* LAYER 2: THE BRIGHT REVEAL (Masked) */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          // Radius: 100px
          maskImage: isMobile 
            ? 'none' 
            : `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          WebkitMaskImage: isMobile 
            ? 'none' 
            : `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
        }}
      >
        <h1 className={`text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-center leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 select-none ${isMobile ? 'animate-pulse' : ''}`}>
          {textContent}
        </h1>
      </div>

      {/* MOBILE DECORATION */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
             <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
        </div>
      )}

    </div>
  );
}