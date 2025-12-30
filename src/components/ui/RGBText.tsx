'use client';

import { useMotionValue, useTransform, motion } from 'framer-motion';
import React from 'react';

export default function RGBText({ text }: { text: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 1. PHYSICS SETUP
  // The numbers [-100, 100] represent the mouse distance from center.
  // The numbers [-10, 10] represent how many pixels the text splits.
  // Tweak the second set of numbers to make the effect stronger or subtler.
  const xRed = useTransform(x, [-100, 100], [-10, 10]);
  const yRed = useTransform(y, [-100, 100], [-10, 10]);
  
  const xCyan = useTransform(x, [-100, 100], [10, -10]); // Moves opposite
  const yCyan = useTransform(y, [-100, 100], [10, -10]);

  function onMouseMove(e: React.MouseEvent) {
    // We calculate the mouse position relative to the center of the screen
    // This makes the text react even if you are hovering the background
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  return (
    <motion.div 
      onMouseMove={onMouseMove}
      className="relative z-20 cursor-default flex flex-col items-center"
    >
      {/* 1. THE RED CHANNEL (Background Layer) */}
      <motion.h1 
        style={{ x: xRed, y: yRed }}
        className="absolute top-0 left-0 text-6xl md:text-9xl font-bold tracking-tighter text-red-600 opacity-80 mix-blend-screen pointer-events-none blur-[1px] select-none"
      >
        {text}
      </motion.h1>

      {/* 2. THE CYAN CHANNEL (Background Layer) */}
      <motion.h1 
        style={{ x: xCyan, y: yCyan }}
        className="absolute top-0 left-0 text-6xl md:text-9xl font-bold tracking-tighter text-cyan-600 opacity-80 mix-blend-screen pointer-events-none blur-[1px] select-none"
      >
        {text}
      </motion.h1>

      {/* 3. THE REAL TEXT (Foreground) */}
      <h1 className="relative z-10 text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference select-none">
        {text}
      </h1>
      
    </motion.div>
  );
}