'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function MouseLight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation so the light feels like it has weight
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the light on the cursor
      x.set(e.clientX - 150); // 150 is half the width (300px)
      y.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-50"
      style={{
        x: smoothX,
        y: smoothY,
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.8) 0%, rgba(0, 240, 255, 0) 60%)',
        // COLOR DODGE: This is the magic. It adds light to whatever is underneath.
        mixBlendMode: 'color-dodge', 
      }}
    />
  );
}