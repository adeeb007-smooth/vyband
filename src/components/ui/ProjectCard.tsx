'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

type ProjectCardProps = {
  title: string;
  category: string;
  color: string;
  size?: 'small' | 'large'; // Some cards are bigger (Bento style)
};

export default function ProjectCard({ title, category, color, size = 'small' }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 1. MOUSE PHYSICS
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. SMOOTH ANIMATION (Spring physics)
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // 3. TILT LOGIC (Rotate based on mouse position)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseXPct = (event.clientX - rect.left) / width - 0.5;
    const mouseYPct = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-${color} transition-colors duration-500
        ${size === 'large' ? 'col-span-1 md:col-span-2 row-span-2 min-h-[400px]' : 'col-span-1 min-h-[250px]'}
      `}
    >
      {/* GLOW EFFECT BEHIND TEXT */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} 
      />

      {/* CARD CONTENT */}
      <div 
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{ transform: "translateZ(20px)" }} // Pushes text forward (Parallax)
      >
        <p className={`text-xs font-mono uppercase tracking-widest mb-2 text-${color}`}>
          {category}
        </p>
        <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
          {title}
        </h3>
      </div>
      
      {/* DECORATIVE CORNERS */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
    </motion.div>
  );
}