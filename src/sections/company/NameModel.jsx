import React from 'react';
import Reveal from '../../components/motion/Reveal.jsx';

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
  return (
    <section className="relative px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-4xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            Dev Re Con
          </p>
          <h2 className="text-3xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance md:text-5xl lg:text-6xl">
            The name is the model.
          </h2>
          <p className="mt-7 text-base font-light leading-loose tracking-wide text-gray-500 md:text-lg">
            DevReCon stands for Development, Research, and Consultation. The name was built to reflect how the company works, not just what the company does. Development turns ideas into usable systems. Research keeps decisions grounded in logic, context, and technical reality. Consultation makes the process understandable for the people who need to trust it. Together, they form the foundation of Engineering Clarity.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {nameParts.map((part, index) => (
            <Reveal
              as="article"
              key={part.short}
              delay={index * 0.07}
              className="motion-card rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_16px_52px_rgba(17,17,17,0.035)] hover:border-gray-200 md:p-7"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NameModel;
