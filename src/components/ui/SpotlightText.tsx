'use client';

import { useState, useRef } from 'react';

export default function SpotlightText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // REMOVED padding (px-8 py-8) to eliminate the bounding box
      className="relative cursor-default select-none inline-block"
    >
      {/* 1. THE GHOST LAYER */}
      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white/10">
        {text}
      </h1>

      {/* 2. THE REVEAL LAYER */}
      <h1 
        // REMOVED padding here too
        className="absolute top-0 left-0 text-6xl md:text-9xl font-bold tracking-tighter text-white pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, black 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, black 0%, transparent 70%)`,
          
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          
          opacity: opacity,
          transition: 'opacity 0.2s ease', 
        }}
      >
        {text}
      </h1>
      
      {/* 3. THE GLOW */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen"
        style={{
            background: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, rgba(0, 240, 255, 0.5), transparent 70%)`,
            opacity: opacity,
            transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  );
}