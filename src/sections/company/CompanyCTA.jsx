import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import useDesktopInteraction from '../../hooks/useDesktopInteraction.js';
import { useRevealMotion } from '../../hooks/useScrollMotion.js';

const ease = [0.22, 1, 0.36, 1];

const CompanyCTA = () => {
  const enableHoverMotion = useDesktopInteraction();
  const reveal = useRevealMotion({ desktopInitial: { y: 24 }, duration: 0.76 });

  return (
    <section className="relative px-6 pt-8 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reveal.initial}
          whileInView={reveal.whileInView}
          viewport={reveal.viewport}
          transition={reveal.transition}
          className="grid items-center gap-8 rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-8 md:rounded-[2.5rem] md:p-12 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-14"
        >
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Start with clarity
            </p>
            <h2 className="text-3xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance md:text-5xl">
              Have an idea, workflow, or system ready to move forward?
            </h2>
            <p className="mt-6 max-w-3xl text-base font-light leading-loose tracking-wide text-gray-600 md:text-lg">
              Start with the problem. We will help define the technical path, scope, and next practical step.
            </p>
          </div>

          <motion.a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20DevReCon%20Company%20Page"
            whileHover={enableHoverMotion ? { y: -2 } : undefined}
            whileTap={{ y: 0, scale: 0.992 }}
            transition={{ duration: 0.28, ease }}
            style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
            className="motion-button motion-pill inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none md:text-base lg:w-auto"
          >
            Start a conversation
            <ArrowUpRight className="motion-action-arrow h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyCTA;
