'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  "INITIALIZING VYBAND KERNEL...",
  "LOADING NEURAL MESH...",
  "OPTIMIZING VIRTUAL DOM...",
  "ESTABLISHING SECURE UPLINK...",
  "ACCESS GRANTED."
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Type out the lines one by one
    if (index < bootLines.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 400); // Speed of typing
      return () => clearTimeout(timeout);
    } 
    
    // 2. When done, wait a moment then lift the curtain
    else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black font-mono"
        >
          <div className="w-80">
            {/* BOOT LOG */}
            <div className="flex flex-col items-start gap-1 text-xs md:text-sm">
              {bootLines.slice(0, index + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${i === bootLines.length - 1 ? "text-cyan-400 font-bold" : "text-gray-500"}`}
                >
                  <span className="mr-2">{">"}</span>
                  {line}
                </motion.div>
              ))}
            </div>

            {/* LOADING BAR */}
            <div className="mt-8 w-full h-[1px] bg-gray-900 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400 box-shadow-[0_0_10px_#00F0FF]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}