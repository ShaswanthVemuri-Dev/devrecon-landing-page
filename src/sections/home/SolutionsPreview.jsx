import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code2, Globe2, ArrowRight } from 'lucide-react';
import { useRevealMotion } from '../../hooks/useScrollMotion.js';
import useDesktopInteraction from '../../hooks/useDesktopInteraction.js';

const slowEase = [0.16, 1, 0.3, 1];

const cards = [
  {
    icon: Cpu,
    title: 'AI Consultation and Applications',
    desc: 'AI systems, model direction, LLM workflows, RAG applications, automation, and AI features built around a real use case.',
    to: '/solutions#ai',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    desc: 'Web applications, dashboards, portals, internal tools, and platforms designed around how the work actually happens.',
    to: '/solutions#software',
  },
  {
    icon: Globe2,
    title: 'Frontier Tech and IoT',
    desc: 'Software plus electronics, connected devices, sensor based workflows, prototypes, and physical technology systems.',
    to: '/solutions#frontier-tech',
  },
];

const ServiceCard = ({ icon: Icon, title, desc, to, index, enableHoverMotion }) => {
  const reveal = useRevealMotion({ desktopInitial: { y: 26 }, duration: 0.8, delay: index * 0.12, ease: slowEase });

  return (
  <motion.div
    initial={reveal.initial}
    whileInView={reveal.whileInView}
    viewport={reveal.viewport}
    transition={reveal.transition}
    whileHover={enableHoverMotion ? { y: -8 } : undefined}
    className="group relative flex h-full flex-col justify-start overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 transition-all duration-500 hover:border-gray-200 hover:shadow-xl sm:p-7 lg:p-8"
  >
    <div className="absolute right-0 top-0 p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
      <Cpu className="h-24 w-24 rotate-12 text-gray-50" />
    </div>

    <motion.div
      whileHover={enableHoverMotion ? { rotate: -4, scale: 1.04 } : undefined}
      transition={{ type: 'spring', stiffness: 95, damping: 16, mass: 0.9 }}
      className="relative z-10 mb-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 transition-colors duration-500 group-hover:bg-black group-hover:text-white lg:mb-8 lg:h-14 lg:w-14"
    >
      <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
    </motion.div>

    <h4 className="relative z-10 mb-4 text-xl font-bold tracking-tight lg:text-2xl">{title}</h4>

    <p className="relative z-10 mb-8 font-light leading-loose tracking-wide text-gray-600">{desc}</p>

    <Link
      to={to}
      className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 border-b-2 border-black pb-1 text-sm font-semibold tracking-wide text-black transition-colors duration-[600ms] hover:border-gray-600 hover:text-gray-600"
    >
      Explore solution
      <ArrowRight className="h-4 w-4 transition-transform duration-[600ms] group-hover:translate-x-1" />
    </Link>
  </motion.div>
  );
};

const SolutionsPreview = () => {
  const enableHoverMotion = useDesktopInteraction();
  const headingReveal = useRevealMotion({ desktopInitial: { y: 24 }, duration: 0.85, ease: slowEase });

  return (
    <section id="solutions-preview" className="relative px-6 pt-20 pb-8 md:pt-28 md:pb-10 xl:pt-32 xl:pb-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={headingReveal.initial}
          whileInView={headingReveal.whileInView}
          viewport={headingReveal.viewport}
          transition={headingReveal.transition}
          className="mb-14 max-w-2xl md:mb-20 xl:mb-24"
        >
          <h3 className="text-3xl font-bold leading-relaxed tracking-tighter text-[#111111] text-balance sm:text-5xl xl:text-6xl">The Solution Landscape.</h3>
          <p className="mt-6 text-lg font-light leading-relaxed tracking-wide text-gray-500 md:text-xl">
            We do not sell preset packages. We choose the technical path based on the problem.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <ServiceCard key={card.title} {...card} index={index} enableHoverMotion={enableHoverMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;
