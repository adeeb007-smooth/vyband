'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- IMPORT LOCAL IMAGES ---
// Make sure your images are exactly in src/components/images/
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';
import img5 from '../images/image.5.jpg';
import img6 from '../images/image.6.jpg';

const projects = [
  {
    id: 1,
    title: "NEON NEXUS",
    category: "Fintech Core",
    desc: "High-frequency trading interface.",
    image: img1,
  },
  {
    id: 2,
    title: "VOID ENGINE",
    category: "WebGL Framework",
    desc: "Proprietary rendering engine.",
    image: img2,
  },
  {
    id: 3,
    title: "CIPHER WALL",
    category: "Cyber Security",
    desc: "AI-driven threat detection.",
    image: img3,
  },
  {
    id: 4,
    title: "HYPER GRID",
    category: "Data Visualization",
    desc: "Real-time big data processing node.",
    image: img4,
  },
  {
    id: 5,
    title: "QUANTUM UI",
    category: "Design System",
    desc: "Atomic design library.",
    image: img5,
  },
  {
    id: 6,
    title: "AETHER SYNC",
    category: "Cloud Infrastructure",
    desc: "Decentralized edge computing.",
    image: img6,
  },
];

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0); 

  const getCardStyle = (index: number) => {
    const total = projects.length;
    
    // 1. Calculate Distance (Circular)
    let diff = (index - activeIndex) % total;
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;

    const absDiff = Math.abs(diff);

    // 2. Logic: Center vs Background
    // We do NOT use display:none. Everything is always rendered.
    
    return {
      // Scale: Center is 1, neighbors get smaller
      scale: 1 - (absDiff * 0.15), 
      
      // Layering: Center is top (50), further away is lower
      zIndex: 50 - absDiff, 
      
      // X Position:
      // 0% is center. 
      // 20% overlaps them tightly (Deck of cards look).
      // 55% spreads them out wide (Gallery look).
      // Let's use 18% for a nice "Stack" look.
      x: `${diff * 18}%`, 
      
      // Visibility: 
      // Center is bright. Background is dark.
      filter: `brightness(${1 - (absDiff * 0.3)}) blur(${absDiff * 1}px)`,
      
      // Opacity: Fade out the ones extremely far back to avoid clutter
      opacity: absDiff > 3 ? 0 : 1,
      
      pointerEvents: 'auto' as const, 
    };
  };

  return (
    <section id="work" className="relative w-full py-32 px-4 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <div className="mb-20 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
          ARTIFACTS
        </h2>
        <div className="h-[1px] w-24 bg-cyan mx-auto shadow-[0_0_10px_#00F0FF]" />
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center perspective-1000">
        
        {projects.map((project, index) => {
          const style = getCardStyle(index);
          
          return (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={false}
              animate={{
                scale: style.scale,
                zIndex: style.zIndex,
                x: style.x,
                opacity: style.opacity,
                filter: style.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 150, 
                damping: 20,    
                mass: 1.1       
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`absolute w-[60%] md:w-[600px] aspect-[16/9] rounded-2xl border border-white/10 bg-black overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${index === activeIndex ? 'border-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.2)]' : 'border-white/5'}`}
            >
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index === activeIndex} 
                placeholder="blur"
              />
              
              {/* CONTENT OVERLAY (Only visible on active card) */}
              <motion.div 
                animate={{ opacity: index === activeIndex ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end"
              >
                <p className="text-cyan font-mono text-xs uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter mb-2">{project.title}</h3>
                <p className="text-gray-300 font-mono text-xs md:text-sm">{project.desc}</p>
              </motion.div>
            </motion.div>
          );
        })}

      </div>

      <p className="mt-8 text-xs font-mono text-gray-600 uppercase tracking-widest animate-pulse">
        [ HOVER TO EXPLORE ]
      </p>

    </section>
  );
}