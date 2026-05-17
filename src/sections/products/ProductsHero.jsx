import React from 'react';
import { motion } from 'framer-motion';

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

const ProductsHero = () => {
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
          Products
        </motion.p>

        <motion.h1
          variants={rise}
          className="max-w-6xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance [word-spacing:0.12em] sm:[word-spacing:0.14em] md:[word-spacing:0.14em]"
        >
          Products designed as operating systems, not isolated apps.
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-8 max-w-4xl text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide"
        >
          DevReCon builds software products for real operational workflows, not single screen utilities. Each product is shaped around the full operating path around a problem: the interface people use, the management layer that handles operations, the data logic that preserves context, and the automation that keeps the system moving. This product direction can expand across domains while keeping one principle intact: connected systems over isolated apps.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ProductsHero;
