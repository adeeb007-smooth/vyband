'use client';

import { motion } from 'framer-motion';

type TeamCardProps = {
  name: string;
  role: string;
  image: string; // URL to image
  stats: string[]; // e.g., ["React", "Three.js", "Node"]
};

export default function TeamCard({ name, role, image, stats }: TeamCardProps) {
  return (
    <div className="group relative w-full max-w-sm h-[400px] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-cyan-500/50">
      
      {/* 1. THE IMAGE */}
      <div className="absolute inset-0 z-0">
        {/* We use a colored gradient overlay that disappears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Placeholder Image Div (Since we don't have real photos yet) */}
        <div 
          className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
          style={{ backgroundImage: `url(${image})`, backgroundColor: '#333' }}
        />
      </div>

      {/* 2. THE SCANNER LINE (Animation) */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#00F0FF] z-20 opacity-0 group-hover:opacity-100"
        initial={{ y: 0 }}
        whileHover={{ y: 400 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* 3. THE INFO HUD */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-30 flex flex-col justify-end h-full">
        
        {/* Role Badge */}
        <div className="self-start px-2 py-1 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-cyan-400 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Operative
        </div>

        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-1">
          {name}
        </h3>
        <p className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-4">
          // {role}
        </p>

        {/* Stats Grid (Reveals on Hover) */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {stats.map((stat, i) => (
            <span key={i} className="px-2 py-1 text-[10px] border border-white/20 text-gray-300 uppercase tracking-wider">
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* 4. DECORATIVE CORNERS */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30" />
    </div>
  );
}