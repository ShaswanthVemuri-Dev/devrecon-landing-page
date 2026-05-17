import React from 'react';
import SolutionsHero from '../sections/solutions/SolutionsHero.jsx';
import SolutionDeepDive from '../sections/solutions/SolutionDeepDive.jsx';

const Solutions = () => {
  return (
    <main className="relative overflow-hidden bg-white text-[#111111]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solutionsGrid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solutionsGrid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <SolutionsHero />
        <SolutionDeepDive />
      </div>
    </main>
  );
};

export default Solutions;
