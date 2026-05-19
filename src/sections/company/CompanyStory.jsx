import React from 'react';
import { motion } from 'framer-motion';
import useScrollMotion from '../../hooks/useScrollMotion.js';

const ease = [0.22, 1, 0.36, 1];

const CompanyStory = () => {
  const enableScrollMotion = useScrollMotion();

  return (
    <section id="story" className="relative px-6 py-14 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={enableScrollMotion ? { opacity: 0, y: 24 } : false}
            whileInView={enableScrollMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.74, ease }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
              Our Story
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance">
              Technology works better when the thinking behind it is clear.
            </h2>
          </motion.div>

          <motion.div
            initial={enableScrollMotion ? { opacity: 0, y: 26 } : false}
            whileInView={enableScrollMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.74, ease, delay: 0.06 }}
            className="grid gap-7 text-lg md:text-xl text-gray-600 font-light leading-loose tracking-wide"
          >
            <p>
              DevReCon began in 2024, shaped by freelance work, client conversations, and a close view of how quickly the software landscape was changing. Across 2025, the company continued exploring real workflows across small businesses, local operations, early stage ideas, and technical products. One pattern became clear: the people who could benefit most from technology were often the people least prepared to evaluate it.
            </p>
            <p>
              AI changed the speed of building, but it did not remove the need for judgment. A website, workflow tool, internal dashboard, automation layer, or AI system can now be created faster than before, but speed alone does not create value. Some problems need stable algorithms, clean databases, and predictable architecture. Others benefit from AI workflows, language models, automation agents, or adaptive tools. DevReCon was built for that balance: to study the workflow first, then build the right system with the right mix of traditional engineering and modern AI assisted execution.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
