import React from 'react';
import { motion } from 'framer-motion';
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
          className="max-w-6xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance [word-spacing:0.12em] sm:[word-spacing:0.14em] md:[word-spacing:0.14em]"
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
              variants={chipMotion}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap="tap"
              className="rounded-full border border-gray-200 bg-white/75 px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-semibold tracking-wide text-gray-700 backdrop-blur-sm hover:border-black hover:bg-black hover:text-white transition-colors duration-300"
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
