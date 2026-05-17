import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ChevronDown, Code2, Cpu, Globe2 } from 'lucide-react';
import { solutions, hybridSolutionEmail } from '../../data/solutions.js';

const iconMap = {
  ai: Cpu,
  software: Code2,
  'frontier-tech': Globe2,
  strategy: CheckCircle2,
};

const createMailto = ({ subject, body }) => {
  return `mailto:management@devrecon.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const SignalStack = ({ words = [], active }) => {
  return (
    <div className="relative hidden lg:block h-full min-h-[220px] overflow-hidden rounded-[2rem] border border-black/5 bg-[#F7F7F8] p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F7F8] z-10" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-black/10" />
      <motion.div
        animate={active ? { y: [0, -26, 0] } : { y: 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="space-y-4"
      >
        {[...words, ...words, ...words].map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="flex items-center justify-between gap-6 text-xs uppercase tracking-[0.24em] text-black/35"
            style={{ opacity: Math.max(0.08, 0.75 - index * 0.07) }}
          >
            <span>{word}</span>
            <span className="h-px flex-1 bg-black/10" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SolutionPanel = ({ solution, isOpen, onToggle }) => {
  const Icon = iconMap[solution.id] || Cpu;
  const mailto = createMailto(solution);

  return (
    <motion.article
      id={solution.id}
      layout="position"
      className={`scroll-mt-28 border rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-colors duration-300 ${
        isOpen ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#111111] border-gray-100 hover:border-gray-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 lg:p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
        aria-expanded={isOpen}
        aria-controls={`${solution.id}-content`}
      >
        <div className="grid lg:grid-cols-[0.82fr_1fr_auto] gap-6 lg:gap-10 items-start">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-white text-black' : 'bg-gray-50 text-black'}`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.26em] mb-2 ${isOpen ? 'text-white/45' : 'text-gray-400'}`}>{solution.number}</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-snug">{solution.title}</h2>
            </div>
          </div>

          <div className="relative">
            <p className={`text-base md:text-lg leading-loose tracking-wide font-light ${isOpen ? 'text-white/70' : 'text-gray-500'}`}>
              {solution.summary}
            </p>
            {!isOpen && <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-white to-white/0 pointer-events-none" />}
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 justify-self-start lg:justify-self-end ${isOpen ? 'bg-white text-black' : 'bg-gray-50 text-black'}`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${solution.id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10 lg:pb-12 grid lg:grid-cols-[1fr_0.82fr] gap-8 lg:gap-12">
              <div>
                <p className="text-white/70 text-lg leading-loose tracking-wide font-light max-w-3xl">
                  {solution.depth}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/45 mb-5">What we can build</h3>
                    <ul className="space-y-4">
                      {solution.outcomes.map((item) => (
                        <li key={item} className="flex gap-3 text-white/75 leading-relaxed tracking-wide font-light">
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/45 mb-5">Strong fit when</h3>
                    <ul className="space-y-4">
                      {solution.fit.map((item) => (
                        <li key={item} className="flex gap-3 text-white/75 leading-relaxed tracking-wide font-light">
                          <span className="mt-2 w-2 h-2 rounded-full bg-white shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={mailto}
                  className="mt-10 inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold tracking-wide hover:bg-gray-200 transition-colors"
                >
                  Open a project brief
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>

              <SignalStack words={solution.signal} active={isOpen} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const SolutionAccordion = () => {
  const location = useLocation();
  const initialOpen = useMemo(() => {
    const hashId = location.hash.replace('#', '');
    return solutions.some((item) => item.id === hashId) ? hashId : 'ai';
  }, [location.hash]);

  const [openId, setOpenId] = useState(initialOpen);

  useEffect(() => {
    const hashId = location.hash.replace('#', '');
    if (solutions.some((item) => item.id === hashId)) {
      setOpenId(hashId);
    }
  }, [location.hash]);

  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto space-y-5 md:space-y-6">
        {solutions.map((solution) => (
          <SolutionPanel
            key={solution.id}
            solution={solution}
            isOpen={openId === solution.id}
            onToggle={() => setOpenId((current) => (current === solution.id ? '' : solution.id))}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-8 md:mt-10">
        <div className="rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-6 md:p-8 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400 mb-4">Hybrid cases</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111111] mb-4">Some problems sit between categories.</h2>
            <p className="text-gray-600 leading-loose tracking-wide font-light max-w-3xl">
              If your requirement combines AI, software, IoT, research, or deployment planning, send the context. We will map the work into the right technical structure before discussing execution.
            </p>
          </div>

          <a
            href={createMailto(hybridSolutionEmail)}
            className="inline-flex items-center justify-center gap-3 bg-[#111111] text-white px-7 py-4 rounded-full font-semibold tracking-wide hover:bg-gray-800 transition-colors w-full lg:w-auto"
          >
            Map a hybrid build
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionAccordion;
