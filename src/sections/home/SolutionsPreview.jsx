import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code2, Globe2, ArrowRight } from 'lucide-react';

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

const ServiceCard = ({ icon: Icon, title, desc, to, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, delay: index * 0.12, ease: slowEase }}
    whileHover={{ y: -8 }}
    className="group p-8 border border-gray-100 rounded-3xl hover:border-gray-200 hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden flex flex-col justify-start h-full"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <Cpu className="w-24 h-24 text-gray-50 rotate-12" />
    </div>

    <motion.div
      whileHover={{ rotate: -4, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 95, damping: 16, mass: 0.9 }}
      className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500 relative z-10 shrink-0"
    >
      <Icon className="w-7 h-7" />
    </motion.div>

    <h4 className="text-2xl font-bold mb-4 tracking-tight relative z-10">{title}</h4>

    <p className="text-gray-600 leading-loose tracking-wide font-light relative z-10 mb-8">{desc}</p>

    <Link
      to={to}
      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-black border-b border-black pb-1 w-fit hover:text-gray-600 hover:border-gray-600 transition-colors duration-500 relative z-10"
    >
      Explore solution
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
    </Link>
  </motion.div>
);

const SolutionsPreview = () => {
  return (
    <section id="solutions-preview" className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: slowEase }}
        className="mb-16 md:mb-24 md:max-w-2xl"
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Solutions</h2>
        <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-relaxed text-[#111111] text-balance">The Solution Landscape.</h3>
        <p className="mt-6 text-lg md:text-xl text-gray-500 font-light leading-relaxed tracking-wide">
          We do not sell preset packages. We choose the technical path based on the problem.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <ServiceCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SolutionsPreview;
