import React from 'react';

const CircuitBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-[#111111]" aria-hidden="true">
      <svg className="absolute h-full w-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="homeGrid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#homeGrid)" />
      </svg>
    </div>
  );
};

export default CircuitBackground;
