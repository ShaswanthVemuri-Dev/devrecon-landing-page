import React from 'react';
import Hero from '../sections/home/Hero.jsx';
import HowItWorks from '../sections/home/HowItWorks.jsx';
import SolutionsPreview from '../sections/home/SolutionsPreview.jsx';
import TalentUmbrellaTeaser from '../sections/home/TalentUmbrellaTeaser.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SolutionsPreview />
      <TalentUmbrellaTeaser />
    </>
  );
};

export default Home;