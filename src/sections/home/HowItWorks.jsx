import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useRevealMotion } from '../../hooks/useScrollMotion.js';

const HowItWorks = () => {
  const titleReveal = useRevealMotion({ desktopInitial: { x: -8 }, desktopVisible: { x: 0 }, duration: 0.6 });
  const contentReveal = useRevealMotion({ desktopInitial: { x: 8 }, desktopVisible: { x: 0 }, duration: 0.6, delay: 0.2 });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111111] px-6 py-20 text-white md:py-28 xl:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="darkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#darkGrid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-16 lg:gap-20 xl:gap-24">
        <motion.div
          initial={titleReveal.initial}
          whileInView={titleReveal.whileInView}
          viewport={titleReveal.viewport}
          transition={titleReveal.transition}
        >
          <h2 className="text-3xl font-bold leading-relaxed tracking-tight text-balance sm:text-4xl md:text-5xl min-[900px]:text-[3.15rem] lg:text-[3.4rem] xl:text-6xl">
            Most tech companies charge for confusion. <br className="hidden lg:block" />
            <span className="text-gray-500">We charge for solutions.</span>
          </h2>
        </motion.div>

        <motion.div
          className="space-y-10 text-base font-light text-gray-300 sm:text-lg lg:text-xl"
          initial={contentReveal.initial}
          whileInView={contentReveal.whileInView}
          viewport={contentReveal.viewport}
          transition={contentReveal.transition}
        >
          <p className="leading-loose tracking-wide">
            We believe digitizing lives creates meaningful value. It shouldn&apos;t cost a fortune simply because clients don&apos;t understand the tech. We operate on a model of radical transparency.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-white" />
              <div>
                <strong className="mb-1 block tracking-wide text-white">Zero Fluff</strong>
                <span className="leading-relaxed tracking-wide text-gray-400">You pay for the work performed. No hidden margins.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-white" />
              <div>
                <strong className="mb-1 block tracking-wide text-white">Tailored Teams</strong>
                <span className="leading-relaxed tracking-wide text-gray-400">We assemble the exact expertise needed once we understand the problem.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-white" />
              <div>
                <strong className="mb-1 block tracking-wide text-white">Complete Transparency</strong>
                <span className="leading-relaxed tracking-wide text-gray-400">We show you exactly where resources are spent.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
