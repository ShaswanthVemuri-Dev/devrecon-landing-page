import React from 'react';
import { motion } from 'framer-motion';

const CircuitBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 text-[#111111]">
      <svg className="absolute h-full w-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="homeGrid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#homeGrid)" />
      </svg>

      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1440 820" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M 110 190 H 420 Q 475 190 512 232 L 610 344 Q 646 386 704 386 H 1320"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="12 14"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.path
          d="M 120 630 H 354 Q 412 630 456 590 L 570 486 Q 626 436 700 436 H 1288"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="10 16"
          initial={{ pathLength: 0, opacity: 0.16 }}
          animate={{ pathLength: 1, opacity: [0.16, 0.68, 0.16] }}
          transition={{ duration: 7.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.circle
          cx="77%"
          cy="23%"
          r="3"
          fill="currentColor"
          animate={{ y: [0, 26, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="16%"
          cy="70%"
          r="3"
          fill="currentColor"
          animate={{ y: [0, -22, 0], opacity: [0.28, 0.75, 0.28] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
      </svg>
    </div>
  );
};

export default CircuitBackground;
