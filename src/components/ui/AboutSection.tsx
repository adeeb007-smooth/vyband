'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// --- SUB-COMPONENT: ANIMATED NUMBER ---
function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group hover:border-cyan/50 transition-colors">
      <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
        {count}{value === 100 ? '%' : '+'}
      </h3>
      <p className="text-cyan font-mono text-xs uppercase tracking-widest">{label}</p>
      
      {/* Hover Scan Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan/50 opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all duration-1000" />
    </div>
  );
}

// --- SUB-COMPONENT: TECH STACK BAR ---
function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono text-gray-400 uppercase">{skill}</span>
        <span className="text-xs font-mono text-cyan">{level}%</span>
      </div>
      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-cyan shadow-[0_0_10px_#00F0FF]"
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="mission" className="relative w-full py-32 px-4 bg-black flex justify-center">
      
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. THE MANIFESTO (Left, spans 7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-center p-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
            SYSTEM <span className="text-cyan">CORE</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
            We are not just developers; we are <strong className="text-white">architects of the digital void</strong>. 
            Standard interfaces are obsolete. In an era of AI and hyper-speed data, your platform needs to be a kinetic weapon.
          </p>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Nova Synthesis builds bespoke, high-performance engines tailored for the next generation of the web. 
            <span className="text-cyan block mt-4">{">"} INITIALIZING PROTOCOLS...</span>
          </p>
        </div>

        {/* 2. THE METRICS (Right, spans 5 cols, vertical stack) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <Counter value={50} label="Projects Shipped" />
          <Counter value={100} label="System Uptime" />
          <Counter value={12} label="Elite Operatives" />
          <Counter value={99} label="Client Satisfaction" />
        </div>

        {/* 3. THE TECH SPECS (Bottom, full width) */}
        <div className="md:col-span-12 p-8 border border-white/10 bg-black rounded-2xl flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-2">Tech Architecture</h3>
            <p className="text-xs text-gray-500 font-mono">
              Our stack is optimized for maximum frame rates and zero latency.
            </p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <SkillBar skill="Next.js / React" level={98} />
            <SkillBar skill="WebGL / Three.js" level={95} />
            <SkillBar skill="Rust / WASM" level={85} />
            <SkillBar skill="Solidity / Web3" level={90} />
          </div>
        </div>

      </div>

    </section>
  );
}