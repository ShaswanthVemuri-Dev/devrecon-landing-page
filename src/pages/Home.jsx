import React, { useEffect } from 'react';
import Hero from '../sections/home/Hero.jsx';
import HowItWorks from '../sections/home/HowItWorks.jsx';
import SolutionsPreview from '../sections/home/SolutionsPreview.jsx';
import WorkingWith from '../sections/home/WorkingWith.jsx';
import TalentUmbrellaTeaser from '../sections/home/TalentUmbrellaTeaser.jsx';
import preloadRouteAssets from '../utils/preloadAssets.js';

const Home = () => {
  useEffect(() => preloadRouteAssets(), []);

  return (
    <main className="bg-white text-[#111111]">
      <Hero />
      <HowItWorks />
      <SolutionsPreview />
      <WorkingWith />
      <TalentUmbrellaTeaser />
    </main>
  );
};

export default Home;
