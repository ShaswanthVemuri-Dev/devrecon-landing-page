import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Reveal from '../../components/motion/Reveal.jsx';
import { mixedInquiry, solutions } from '../../data/solutions.js';

const buildMailto = (subject, body) =>
  `mailto:management@devrecon.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const DetailColumn = ({ title, items }) => (
  <div className="h-full rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 sm:rounded-[1.55rem] sm:p-6 md:p-7">
    <h3 className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gray-500 sm:mb-6 sm:text-xs sm:tracking-[0.22em]">
      {title}
    </h3>

    <div className="grid gap-4 sm:gap-5">
      {items.map((item) => (
        <p
          key={item}
          className="flex items-start border-l border-white/20 pl-4 text-sm font-light leading-loose tracking-wide text-gray-300 sm:min-h-[4.6rem] sm:pl-5 sm:text-base md:text-lg"
        >
          {item}
        </p>
      ))}
    </div>
  </div>
);

const DetailContent = ({ solution, mailto }) => (
  <div className="px-5 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-11">
    <div className="border-t border-white/10 pt-3 sm:pt-5 md:pt-7">
      <p className="max-w-5xl text-base font-light leading-loose tracking-wide text-gray-200 sm:text-lg md:text-2xl">
        {solution.continuation}
      </p>

      <p className="mt-5 max-w-4xl text-sm font-light leading-loose tracking-wide text-gray-400 sm:mt-7 sm:text-base md:text-lg">
        {solution.serviceLine}
      </p>

      <div className="mt-8 grid items-stretch gap-5 sm:mt-10 sm:gap-6 md:gap-8 lg:grid-cols-2">
        <DetailColumn title="Useful when" items={solution.usefulWhen} />
        <DetailColumn title="What DevReCon can build" items={solution.canBuild} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-5">
        <a
          href={mailto}
          className="motion-button motion-pill motion-pill-light inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-wide text-[#111111] transition-colors duration-300 hover:bg-white hover:text-[#111111] active:text-[#111111] visited:text-[#111111] focus:text-[#111111]"
        >
          <span>Discuss this solution</span>
          <ArrowUpRight className="motion-action-arrow h-4 w-4" />
        </a>
        <p className="max-w-xl text-sm font-light leading-loose tracking-wide text-gray-500">
          The email opens with a short structure so the first discussion starts with the requirement, not a generic sales form.
        </p>
      </div>
    </div>
  </div>
);

const SolutionPanel = ({ solution, isOpen, onToggle, index }) => {
  const mailto = useMemo(() => buildMailto(solution.subject, solution.mailBody), [solution.subject, solution.mailBody]);

  return (
    <Reveal
      as="article"
      id={solution.id}
      delay={index * 0.05}
      className="motion-surface scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-black bg-[#111111] text-white shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:rounded-[2.15rem] md:scroll-mt-32"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${isOpen ? 'px-5 pt-5 pb-2 sm:px-8 sm:pt-8 sm:pb-3 md:px-10 md:pt-10 md:pb-4' : 'px-5 pt-5 pb-5 sm:px-8 sm:pt-8 sm:pb-8 md:px-10 md:pt-10 md:pb-10'}`}
      >
        <div className="flex flex-col gap-5 sm:gap-7 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex shrink-0 items-center justify-between lg:block lg:w-28">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 sm:text-sm md:text-base">
              {solution.index}
            </span>
            <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111111] transition-transform duration-[var(--duration-button)] ease-[var(--ease-bubble)] sm:h-11 sm:w-11 lg:hidden ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-xs sm:tracking-[0.25em]">
                {solution.shortTitle}
              </span>
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl md:text-5xl">
                {solution.title}
              </h2>
            </div>

            <div className={`solution-preview-text relative max-w-5xl overflow-hidden ${isOpen ? 'is-hidden' : ''}`} aria-hidden={isOpen}>
              <p className="pr-3 text-sm font-light leading-relaxed tracking-wide text-gray-300 sm:pr-8 sm:text-base md:pr-12 md:text-xl md:leading-loose">
                {solution.preview} {solution.continuation}
              </p>
            </div>
          </div>

          <span className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#111111] transition-transform duration-[var(--duration-button)] ease-[var(--ease-bubble)] lg:flex ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="h-5 w-5" />
          </span>
        </div>
      </button>

      <div className={`solution-detail-shell ${isOpen ? 'is-open' : ''}`}>
        <div className="solution-detail-inner">
          <DetailContent solution={solution} mailto={mailto} />
        </div>
      </div>
    </Reveal>
  );
};

const SolutionDeepDive = () => {
  const location = useLocation();
  const [openId, setOpenId] = useState('');
  const mixedMailto = useMemo(() => buildMailto(mixedInquiry.subject, mixedInquiry.mailBody), []);

  useEffect(() => {
    const hashId = decodeURIComponent(location.hash.replace('#', ''));
    if (solutions.some((solution) => solution.id === hashId)) {
      setOpenId(hashId);
    }
  }, [location.hash]);

  return (
    <section className="px-6 pb-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-5 md:space-y-6">
          {solutions.map((solution, index) => (
            <SolutionPanel
              key={solution.id}
              solution={solution}
              index={index}
              isOpen={openId === solution.id}
              onToggle={() => setOpenId((current) => (current === solution.id ? '' : solution.id))}
            />
          ))}
        </div>

        <Reveal className="mt-9 flex flex-col gap-8 rounded-[2rem] border border-gray-100 bg-white p-7 shadow-[0_18px_56px_rgba(0,0,0,0.03)] sm:p-8 md:mt-12 md:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
              When the work crosses categories, send the problem as it is.
            </h2>
            <p className="mt-4 font-light leading-loose tracking-wide text-gray-600">
              Some requirements combine software, AI, hardware, research, and operations. The technical path should fit the work, not the label.
            </p>
          </div>

          <a
            href={mixedMailto}
            className="motion-button motion-pill motion-pill-dark inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:text-white active:text-white visited:text-white focus:text-white"
          >
            <span>Discuss your specific requirement</span>
            <ArrowUpRight className="motion-action-arrow h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default SolutionDeepDive;
