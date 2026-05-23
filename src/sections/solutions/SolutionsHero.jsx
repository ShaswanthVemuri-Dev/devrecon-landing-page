import React from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from '../../components/motion/Reveal.jsx';
import { solutions } from '../../data/solutions.js';

const SolutionsHero = () => {
  const navigate = useNavigate();

  const handleChipClick = (event, id) => {
    event.preventDefault();
    navigate(`#${id}`);
  };

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            Solutions
          </p>

          <h1 className="max-w-6xl text-4xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance [word-spacing:normal] sm:text-5xl md:text-7xl lg:text-8xl lg:[word-spacing:0.12em] xl:[word-spacing:0.14em]">
            Systems for technical work that needs more than a template.
          </h1>

          <p className="mt-8 max-w-4xl text-lg font-light leading-loose tracking-wide text-gray-500 md:text-xl">
            DevReCon works across AI, custom software, frontier tech, IoT, and technical strategy. The point is not to sell a preset package. The point is to understand the problem and build the right system.
          </p>

          <div className="mt-11 flex flex-wrap gap-3">
            {solutions.map((solution, index) => (
              <a
                key={solution.id}
                href={`#${solution.id}`}
                onClick={(event) => handleChipClick(event, solution.id)}
                className="motion-pill motion-pill-light rounded-full border border-gray-200 bg-white/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#111111] backdrop-blur-sm hover:border-[#111111] hover:bg-white hover:text-[#111111] sm:px-5 sm:py-3 sm:text-sm"
                style={{ '--motion-reveal-delay': `${index * 45}ms` }}
              >
                <span>{solution.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SolutionsHero;
