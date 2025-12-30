'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// --- PLACEHOLDER IMPORTS (SWAP THESE WITH YOUR TEAM PHOTOS) ---
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';

// Mock Data
const operatives = [
  {
    id: "OP_01",
    name: "ALEX V.",
    role: "ARCHITECT",
    status: "ONLINE",
    stats: { code: 98 },
    image: img1
  },
  {
    id: "OP_02",
    name: "SARAH J.",
    role: "NEURAL NET",
    status: "BUSY",
    stats: { code: 96 },
    image: img2
  },
  {
    id: "OP_03",
    name: "DAVIDE R.",
    role: "SECURITY",
    status: "ONLINE",
    stats: { code: 99 },
    image: img3
  },
  {
    id: "OP_04",
    name: "ELENA K.",
    role: "VISUALS",
    status: "OFFLINE",
    stats: { code: 94 },
    image: img4
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full py-20 md:py-32 px-4 bg-[#050505] overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-16 text-center">
        <p className="text-cyan font-mono text-xs uppercase tracking-[0.3em] mb-4">
          [ UNITE THE COLLECTIVE ]
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          ACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-600">OPERATIVES</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* =======================================
            PC VIEW: TACTICAL GRID (Unchanged)
           ======================================= */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {operatives.map((op, i) => (
            <DesktopCard key={op.id} op={op} index={i} />
          ))}
        </div>


        {/* =======================================
            MOBILE VIEW: 2x2 COMPACT GRID
            (Displays 4 in a single view, no swipe)
           ======================================= */}
        <div className="md:hidden grid grid-cols-2 gap-3 px-2">
          {operatives.map((op) => (
             <MobileCompactCard key={op.id} op={op} />
          ))}
        </div>

      </div>

    </section>
  );
}

// ------------------------------------------------------------------
// SUB-COMPONENT: PC CARD (Standard Large Card)
// ------------------------------------------------------------------
function DesktopCard({ op, index }: { op: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[400px] border border-white/10 bg-white/5 overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={op.image} 
          alt={op.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="absolute inset-0 bg-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
        <div className="flex items-center justify-between mb-2">
           <span className="text-cyan font-mono text-xs">{op.id}</span>
           <div className={`w-2 h-2 rounded-full ${op.status === 'ONLINE' ? 'bg-green-500 shadow-[0_0_10px_#00ff00]' : 'bg-red-500'}`} />
        </div>
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-1">{op.name}</h3>
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{op.role}</p>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// SUB-COMPONENT: MOBILE CARD (Compact Grid Version)
// ------------------------------------------------------------------
function MobileCompactCard({ op }: { op: any }) {
  return (
    <div className="relative w-full h-[260px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col group">
      
      {/* 1. TOP SECTION: IMAGE (65% Height) */}
      <div className="relative h-[65%] w-full overflow-hidden">
        
        <Image 
          src={op.image} 
          alt={op.name}
          fill
          className="object-cover opacity-80"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-cyan/10 mix-blend-overlay" />

        {/* Scanner Line (Animation preserved but thinner) */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-cyan/60 shadow-[0_0_10px_#00F0FF] z-10"
        />
        
        {/* Status Dot (Top Right) */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full z-20 ${op.status === 'ONLINE' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#00ff00]' : 'bg-red-500'}`} />
      </div>

      {/* 2. BOTTOM SECTION: COMPACT DATA (35% Height) */}
      <div className="h-[35%] px-3 pb-3 flex flex-col justify-end relative bg-[#0a0a0a]">
        
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/30" />

        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-[2px] leading-tight">
          {op.name}
        </h3>
        <p className="text-[10px] text-cyan font-mono uppercase tracking-widest mb-2 opacity-80">
          {op.role}
        </p>
        
        {/* Mini Stats Row */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2">
           <span className="text-[9px] text-gray-500 font-mono">RATING</span>
           <span className="text-[9px] text-white font-mono font-bold">{op.stats.code}/100</span>
        </div>

        {/* ID Watermark (Very faint) */}
        <span className="absolute bottom-2 right-2 text-[20px] font-bold text-white/[0.04] pointer-events-none select-none">
          {op.id.split('_')[1]}
        </span>
      </div>

    </div>
  );
}