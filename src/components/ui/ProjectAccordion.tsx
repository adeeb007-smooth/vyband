'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';

// IMPORT LOCAL IMAGES
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';
import img5 from '../images/image.5.jpg';
import img6 from '../images/image.6.jpg';

const projects = [
  { id: 1, title: "NEON NEXUS", category: "FINTECH", image: img1 },
  { id: 2, title: "VOID ENGINE", category: "WEBGL", image: img2 },
  { id: 3, title: "CIPHER WALL", category: "SECURITY", image: img3 },
  { id: 4, title: "HYPER GRID", category: "DATA", image: img4 },
  { id: 5, title: "QUANTUM UI", category: "DESIGN", image: img5 },
  { id: 6, title: "AETHER SYNC", category: "CLOUD", image: img6 },
];

export default function ProjectAccordion() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // MOUSE PHYSICS (Desktop Only)
  const mouseX = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const val = (e.clientX - left) / width;
    mouseX.set(val);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
  };

  return (
    <section 
      id="work" 
      className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      
      {/* HEADER */}
      <div className="mb-12 text-center z-10">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          [ EXPLORE THE ARCHIVE ]
        </p>
      </div>

      {/* THE HYBRID STRIP */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col md:flex-row w-full max-w-[1400px] h-[800px] md:h-[500px] px-4 gap-2 md:gap-4"
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            activeId={activeId} 
            setActiveId={setActiveId}
          />
        ))}
      </div>

    </section>
  );
}

// SUB-COMPONENT
function ProjectCard({ project, activeId, setActiveId }: any) {
  const isActive = activeId === project.id;

  return (
    <motion.div
      layout
      onClick={() => setActiveId(project.id)}
      onMouseEnter={() => setActiveId(project.id)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[0.22,1,0.36,1] group border border-white/5`}
      style={{
        flex: isActive ? 5 : 1,
        filter: isActive ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.5)",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          // --- THE ZOOM FIX IS HERE ---
          // 1. duration-1000: Makes the zoom slow and cinematic.
          // 2. scale-110: Zooms in when active.
          // 3. scale-100: Resets when inactive.
          className={`object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Dark Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* ACTIVE CONTENT */}
      <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full transition-opacity duration-300 ${isActive ? 'opacity-100 delay-200' : 'opacity-0'}`}>
        <p className="text-cyan font-mono text-xs uppercase tracking-widest mb-2">
          {project.category}
        </p>
        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter whitespace-nowrap">
          {project.title}
        </h3>
        
        <div className="md:hidden mt-2 h-1 w-12 bg-cyan shadow-[0_0_10px_#00F0FF]" />
      </div>

      {/* DESKTOP COLLAPSED LABEL */}
      <div className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${!isActive ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest rotate-[-90deg] whitespace-nowrap origin-center">
          {project.category}
        </p>
      </div>

      {/* MOBILE COLLAPSED LABEL */}
      <div className={`md:hidden absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isActive ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-lg font-bold text-white/50 uppercase tracking-widest">
          {project.title}
        </h3>
      </div>

    </motion.div>
  );
}