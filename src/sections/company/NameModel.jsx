import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useDesktopInteraction from '../../hooks/useDesktopInteraction.js';
import { useMotionProfile, useRevealMotion } from '../../hooks/useScrollMotion.js';

const ease = [0.22, 1, 0.36, 1];

const nameParts = [
  {
    short: 'Dev',
    title: 'Development',
    text: 'Turning ideas into usable software, workflows, dashboards, automations, and technical products that can operate in real conditions.',
  },
  {
    short: 'Re',
    title: 'Research',
    text: 'Studying context, users, technical limits, market reality, and the problem behind the request before major decisions are made.',
  },
  {
    short: 'Con',
    title: 'Consultation',
    text: 'Keeping scope, cost, risk, and direction understandable for the people who need to trust the process before execution begins.',
  },
];

const NameModel = () => {
  const enableHoverMotion = useDesktopInteraction();
  const motionProfile = useMotionProfile();
  const headingReveal = useRevealMotion({ desktopInitial: { y: 24 }, duration: 0.72 });
  const cardContainerMotion = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionProfile.useSimpleMobileMotion ? 0.035 : 0.09,
      },
    },
  }), [motionProfile.useSimpleMobileMotion]);
  const itemMotion = useMemo(() => ({
    hidden: motionProfile.useSimpleMobileMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: motionProfile.useSimpleMobileMotion
      ? { opacity: 1, transition: { duration: 0.32, ease } }
      : { opacity: 1, y: 0, transition: { duration: 0.68, ease } },
  }), [motionProfile.useSimpleMobileMotion]);

  return (
    <section className="relative px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={headingReveal.initial}
          whileInView={headingReveal.whileInView}
          viewport={headingReveal.viewport}
          transition={headingReveal.transition}
          className="max-w-4xl"
        >
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            Dev Re Con
          </p>
          <h2 className="text-3xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance md:text-5xl lg:text-6xl">
            The name is the model.
          </h2>
          <p className="mt-7 text-base font-light leading-loose tracking-wide text-gray-500 md:text-lg">
            DevReCon stands for Development, Research, and Consultation. The name was built to reflect how the company works, not just what the company does. Development turns ideas into usable systems. Research keeps decisions grounded in logic, context, and technical reality. Consultation makes the process understandable for the people who need to trust it. Together, they form the foundation of Engineering Clarity.
          </p>
        </motion.div>

        <motion.div
          variants={cardContainerMotion}
          initial={motionProfile.enableMotion ? 'hidden' : false}
          whileInView={motionProfile.enableMotion ? 'visible' : undefined}
          viewport={{ once: true, amount: motionProfile.useSimpleMobileMotion ? 0.01 : 0.08, margin: motionProfile.useSimpleMobileMotion ? '0px 0px -6% 0px' : undefined }}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {nameParts.map((part, index) => (
            <motion.article
              key={part.short}
              variants={itemMotion}
              whileHover={enableHoverMotion ? { y: -7, scale: 1.012 } : undefined}
              transition={{ duration: 0.42, ease }}
              className={`rounded-[1.75rem] border border-gray-100 bg-white/82 p-6 shadow-[0_18px_60px_rgba(17,17,17,0.04)] backdrop-blur-sm transition-all duration-500 md:p-7 ${enableHoverMotion ? 'hover:border-gray-200 hover:shadow-[0_26px_76px_rgba(17,17,17,0.08)]' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-5xl font-bold tracking-tighter text-[#111111] md:text-6xl">
                  {part.short}
                </span>
                <span className="text-xs font-bold tracking-[0.25em] text-gray-300">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-bold tracking-tight text-[#111111] md:text-2xl">
                {part.title}
              </h3>
              <p className="mt-4 text-sm font-light leading-loose tracking-wide text-gray-500 md:text-base">
                {part.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NameModel;
