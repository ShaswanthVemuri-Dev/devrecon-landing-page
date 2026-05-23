import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../../data/solutions.js';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
    },
  },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease,
    },
  },
};


const useDesktopInteraction = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return enabled;
};

const chipMotion = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -3,
    scale: 1.012,
    transition: { duration: 0.26, ease },
  },
  tap: {
    scale: 0.988,
    transition: { duration: 0.16, ease },
  },
};

const SolutionsHero = () => {
  const enableHoverMotion = useDesktopInteraction();
  const navigate = useNavigate();

  const handleChipClick = (event, id) => {
    event.preventDefault();
    navigate(`#${id}`);
  };

  return (
    <section className="relative px-6 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.p
          variants={rise}
          className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6"
        >
          Solutions
        </motion.p>

        <motion.h1
          variants={rise}
          className="max-w-6xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance [word-spacing:normal] lg:[word-spacing:0.12em] xl:[word-spacing:0.14em]"
        >
          Systems for technical work that needs more than a template.
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-8 max-w-4xl text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide"
        >
          DevReCon works across AI, custom software, frontier tech, IoT, and technical strategy. The point is not to sell a preset package. The point is to understand the problem and build the right system.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-11 flex flex-wrap gap-3"
        >
          {solutions.map((solution) => (
            <motion.a
              key={solution.id}
              href={`#${solution.id}`}
              onClick={(event) => handleChipClick(event, solution.id)}
              variants={chipMotion}
              initial="rest"
              animate="rest"
              whileHover={enableHoverMotion ? 'hover' : undefined}
              whileTap="tap"
              className="motion-pill rounded-full border border-gray-200 bg-white/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-700 backdrop-blur-sm motion-safe:hover:border-black motion-safe:hover:bg-black motion-safe:hover:text-white sm:px-5 sm:py-3 sm:text-sm"
            >
              {solution.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SolutionsHero;
