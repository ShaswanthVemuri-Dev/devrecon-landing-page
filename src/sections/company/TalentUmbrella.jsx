import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const supportPoints = [
  {
    title: 'Structure',
    text: 'Turning raw ideas into clear plans, workflows, documents, and technical direction before serious execution begins.',
  },
  {
    title: 'Execution',
    text: 'Helping builders move from concept to prototype, system, product, or deployable solution with practical development support.',
  },
  {
    title: 'Protection',
    text: 'Keeping ownership and collaboration terms clear. The builder\'s idea remains theirs unless a separate written agreement says otherwise.',
  },
];

const TalentUmbrella = () => {
  return (
    <section id="talent-umbrella" className="relative px-6 py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.74, ease }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
              Talent Umbrella
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance">
              A structure for builders who should not have to figure everything out alone.
            </h2>
            <div className="mt-8 grid gap-6 text-base md:text-lg text-gray-600 font-light leading-loose tracking-wide">
              <p>
                The Talent Umbrella comes from the same place DevReCon started: the reality of building without a clear support system. Many students, freelancers, early founders, and technical people have strong ideas, but they often lack access to structure, mentorship, funding direction, documentation support, legal clarity, product thinking, or trusted technical guidance. Even asking for help can feel risky when people are unsure how to protect their idea.
              </p>
              <p>
                DevReCon&apos;s Talent Umbrella is designed as a support model for that gap. The goal is to help builders shape their ideas into clearer systems without taking away the identity of the work. We can help with documentation, technical direction, product structure, development planning, prototype thinking, execution support, and operational clarity. The builder&apos;s idea remains theirs unless a separate written agreement says otherwise.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.76, ease, delay: 0.04 }}
            className="relative rounded-[2rem] bg-[#111111] text-white p-6 md:p-8 lg:p-9 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="talentGrid" width="38" height="38" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#talentGrid)" />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/45 mb-7">
                The support model
              </p>

              <div className="grid gap-4">
                {supportPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.42, ease }}
                    className="group rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 md:p-6 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#111111] text-xs font-bold tracking-[0.18em] transition-transform duration-500 group-hover:scale-105">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight transition-colors duration-500 group-hover:text-white">
                          {point.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base text-white/64 font-light leading-loose tracking-wide transition-colors duration-500 group-hover:text-white/76">
                          {point.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TalentUmbrella;
