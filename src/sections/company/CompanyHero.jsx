import React from 'react';
import Reveal from '../../components/motion/Reveal.jsx';

const CompanyHero = () => {
  return (
    <section className="relative px-6 pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal duration={0.62}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
            Company
          </p>

          <h1 className="max-w-6xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance [word-spacing:normal] lg:[word-spacing:0.12em] xl:[word-spacing:0.14em]">
            Engineering Clarity begins where development, research, and consultation work together.
          </h1>

          <p className="mt-8 max-w-4xl text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide">
            DevReCon was built around a simple belief: technical work should be understandable before it becomes expensive. We combine development, research, and consultation to help ideas move from uncertainty into structured systems, practical solutions, AI workflows, and long term technical direction. Our role is not only to build technology, but to make the thinking behind it clear enough for clients, founders, and teams to trust the process before committing to execution.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanyHero;
