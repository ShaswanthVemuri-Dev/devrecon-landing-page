import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Code2, Globe2, ArrowRight } from 'lucide-react';
import Reveal from '../../components/motion/Reveal.jsx';

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
  <Reveal
    delay={index * 0.07}
    className="motion-card group relative flex h-full flex-col justify-start overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 hover:border-gray-200 hover:shadow-xl sm:p-7 lg:p-8"
  >
    <div className="absolute right-0 top-0 p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
      <Cpu className="h-24 w-24 rotate-12 text-gray-50" />
    </div>

    <div className="motion-icon-card relative z-10 mb-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 transition-colors duration-500 group-hover:bg-black group-hover:text-white lg:mb-8 lg:h-14 lg:w-14">
      <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
    </div>

    <h4 className="relative z-10 mb-4 text-xl font-bold tracking-tight lg:text-2xl">{title}</h4>
    <p className="relative z-10 mb-8 font-light leading-loose tracking-wide text-gray-600">{desc}</p>

    <Link to={to} className="motion-underline-action relative z-10 mt-auto inline-flex w-fit items-center gap-2 border-b-2 border-black pb-1 text-sm font-semibold tracking-wide text-black hover:border-gray-600 hover:text-gray-600">
      Explore solution
      <ArrowRight className="motion-action-arrow motion-action-arrow-right h-4 w-4" />
    </Link>
  </Reveal>
);

const SolutionsPreview = () => {
  return (
    <section id="solutions-preview" className="relative px-6 pt-20 pb-8 md:pt-28 md:pb-10 xl:pt-32 xl:pb-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl md:mb-20 xl:mb-24">
          <h3 className="text-3xl font-bold leading-relaxed tracking-tighter text-[#111111] text-balance sm:text-5xl xl:text-6xl">The Solution Landscape.</h3>
          <p className="mt-6 text-lg font-light leading-relaxed tracking-wide text-gray-500 md:text-xl">
            We do not sell preset packages. We choose the technical path based on the problem.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <ServiceCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;
