import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { mixedInquiry, solutions } from '../../data/solutions.js';

const ease = [0.22, 1, 0.36, 1];
const softEase = [0.2, 0.95, 0.25, 1];

const panelTransition = {
  duration: 0.82,
  ease: softEase,
};

const reducedPanelTransition = {
  duration: 0.58,
  ease: softEase,
};


const useDesktopInteraction = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return enabled;
};


const hoverTransition = {
  duration: 0.48,
  ease,
};

const tapTransition = {
  duration: 0.13,
  ease,
};

const buttonMotion = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: hoverTransition,
  },
  tap: {
    y: 0,
    scale: 0.992,
    transition: tapTransition,
  },
};

const panelShellMotion = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 24px 70px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0)',
  },
  hover: {
    y: -3,
    scale: 1.004,
    boxShadow: '0 32px 82px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.08)',
    transition: hoverTransition,
  },
};

const panelButtonMotion = {
  rest: { y: 0 },
  hover: {
    y: 0,
    transition: hoverTransition,
  },
  tap: {
    y: 0,
    scale: 0.997,
    transition: tapTransition,
  },
};

const buildMailto = (subject, body) =>
  `mailto:management@devrecon.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const listMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const panelMotion = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: panelShellMotion.rest.boxShadow,
    transition: {
      duration: 0.64,
      ease,
    },
  },
  rest: panelShellMotion.rest,
  hover: panelShellMotion.hover,
};

const detailGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.18,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const detailItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.38, ease },
  },
};

const staticDetailItem = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease } },
  exit: { opacity: 0, y: 0, transition: { duration: 0.24, ease } },
};

const collapsedTextMask = {
  WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 76%, rgba(0,0,0,0.3) 89%, transparent 100%)',
  maskImage: 'linear-gradient(to right, #000 0%, #000 76%, rgba(0,0,0,0.3) 89%, transparent 100%)',
};

const TextRun = ({ preview, continuation, isOpen, enableRichMotion }) => {
  return (
    <motion.div
      className="relative max-w-5xl overflow-hidden"
      initial={false}
      animate={{
        opacity: isOpen ? 0 : 1,
        height: isOpen ? 0 : 'auto',
        marginTop: isOpen ? 0 : 20,
      }}
      transition={{
        duration: enableRichMotion ? (isOpen ? 0.44 : 0.52) : (isOpen ? 0.34 : 0.42),
        ease,
        delay: enableRichMotion && !isOpen ? 0.12 : 0.03,
      }}
    >
      <p
        style={collapsedTextMask}
        className="text-sm sm:text-base md:text-xl leading-relaxed md:leading-loose tracking-wide font-light text-gray-300 pr-3 sm:pr-8 md:pr-12"
      >
        {preview} {continuation}
      </p>
    </motion.div>
  );
};

const DetailColumn = ({ title, items, enableRichMotion }) => {
  const detailVariant = enableRichMotion ? detailItem : staticDetailItem;
  return (
    <motion.div
      variants={detailVariant}
      className="h-full rounded-[1.35rem] sm:rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6 md:p-7"
    >
      <h3 className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-gray-500 mb-5 sm:mb-6">
        {title}
      </h3>

      <div className="grid gap-4 sm:gap-5">
        {items.map((item) => (
          <motion.p
            key={item}
            variants={detailVariant}
            whileHover={enableRichMotion ? { x: 4 } : undefined}
            transition={{ duration: 0.32, ease }}
            className="flex items-start sm:min-h-[4.6rem] text-sm sm:text-base md:text-lg leading-loose tracking-wide text-gray-300 font-light border-l border-white/20 pl-4 sm:pl-5"
          >
            {item}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

const SolutionPanel = ({ solution, isOpen, onToggle, enableRichMotion }) => {
  const mailto = useMemo(
    () => buildMailto(solution.subject, solution.mailBody),
    [solution.subject, solution.mailBody]
  );

  const activeDetailItem = enableRichMotion ? detailItem : staticDetailItem;

  return (
    <motion.article
      id={solution.id}
      variants={panelMotion}
      initial={enableRichMotion ? 'hidden' : false}
      animate={enableRichMotion ? 'visible' : undefined}
      whileHover={enableRichMotion ? 'hover' : undefined}
      className="scroll-mt-28 md:scroll-mt-32 rounded-[1.75rem] sm:rounded-[2.15rem] bg-[#111111] text-white overflow-hidden border border-black shadow-[0_24px_70px_rgba(0,0,0,0.08)] lg:will-change-transform"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 sm:p-8 md:p-10 group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        variants={panelButtonMotion}
        initial="rest"
        animate="rest"
        whileHover={enableRichMotion ? 'hover' : undefined}
        whileTap="tap"
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-5 sm:gap-7 lg:gap-12">
          <div className="flex items-center justify-between lg:block lg:w-28 shrink-0">
            <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] text-gray-500">
              {solution.index}
            </span>
            <motion.span
              className="lg:hidden flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_0_0_0_rgba(255,255,255,0)] motion-safe:lg:group-hover:shadow-[0_0_0_7px_rgba(255,255,255,0.06)] transition-shadow duration-500"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.52, ease }}
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.span>
          </div>

          <div className="min-w-0 flex-1">
            <motion.div
              animate={{ y: enableRichMotion && isOpen ? -2 : 0 }}
              transition={{ duration: 0.46, ease }}
              className="flex flex-col gap-2 sm:gap-3"
            >
              <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-500">
                {solution.shortTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                {solution.title}
              </h2>
            </motion.div>

            <TextRun
              preview={solution.preview}
              continuation={solution.continuation}
              isOpen={isOpen}
              enableRichMotion={enableRichMotion}
            />
          </div>

          <motion.span
            className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shrink-0 shadow-[0_0_0_0_rgba(255,255,255,0)] motion-safe:lg:group-hover:shadow-[0_0_0_8px_rgba(255,255,255,0.06)] transition-shadow duration-500"
            animate={{ rotate: isOpen ? 180 : 0 }}
            whileHover={enableRichMotion ? { y: -1 } : undefined}
            transition={{ duration: 0.52, ease }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={enableRichMotion ? panelTransition : reducedPanelTransition}
        className="overflow-hidden"
      >
        <AnimatePresence initial={false} mode="wait">
          {isOpen && (
            <motion.div
              key={`${solution.id}-details`}
              variants={enableRichMotion ? detailGroup : undefined}
              initial={enableRichMotion ? 'hidden' : false}
              animate={enableRichMotion ? 'visible' : undefined}
              exit={enableRichMotion ? 'exit' : { opacity: 0 }}
              className="px-5 sm:px-8 md:px-10 pb-7 sm:pb-8 md:pb-11"
            >
              <div className="border-t border-white/10 pt-7 sm:pt-8 md:pt-10">
                <motion.p
                  variants={activeDetailItem}
                  className="max-w-5xl text-base sm:text-lg md:text-2xl leading-loose tracking-wide font-light text-gray-200"
                >
                  {solution.continuation}
                </motion.p>

                <motion.p
                  variants={activeDetailItem}
                  className="mt-5 sm:mt-7 max-w-4xl text-sm sm:text-base md:text-lg leading-loose tracking-wide font-light text-gray-400"
                >
                  {solution.serviceLine}
                </motion.p>

                <motion.div
                  variants={activeDetailItem}
                  className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-stretch"
                >
                  <DetailColumn title="Useful when" items={solution.usefulWhen} enableRichMotion={enableRichMotion} />
                  <DetailColumn title="What DevReCon can build" items={solution.canBuild} enableRichMotion={enableRichMotion} />
                </motion.div>

                <motion.div
                  variants={activeDetailItem}
                  className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
                >
                  <motion.a
                    href={mailto}
                    variants={buttonMotion}
                    initial="rest"
                    animate="rest"
                    whileHover={enableRichMotion ? 'hover' : undefined}
                    whileTap="tap"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-wide text-black visited:text-black active:text-black focus:text-black hover:bg-gray-200 hover:text-black transition-colors duration-300"
                  >
                    Discuss this solution
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                  <p className="max-w-xl text-sm leading-loose tracking-wide text-gray-500 font-light">
                    The email opens with a short structure so the first discussion starts with the requirement, not a generic sales form.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
};

const SolutionDeepDive = () => {
  const shouldReduceMotion = useReducedMotion();
  const supportsDesktopInteraction = useDesktopInteraction();
  const enableRichMotion = supportsDesktopInteraction && !shouldReduceMotion;
  const location = useLocation();
  const [openId, setOpenId] = useState('');
  const mixedMailto = useMemo(
    () => buildMailto(mixedInquiry.subject, mixedInquiry.mailBody),
    []
  );

  useEffect(() => {
    const hashId = decodeURIComponent(location.hash.replace('#', ''));

    if (solutions.some((solution) => solution.id === hashId)) {
      setOpenId(hashId);
    }
  }, [location.hash]);

  return (
    <section className="px-6 pb-20 md:pb-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={listMotion}
          initial="hidden"
          animate="visible"
          className="space-y-5 md:space-y-6"
        >
          {solutions.map((solution) => (
            <SolutionPanel
              key={solution.id}
              solution={solution}
              isOpen={openId === solution.id}
              onToggle={() => setOpenId((current) => (current === solution.id ? '' : solution.id))}
              enableRichMotion={enableRichMotion}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.62, ease }}
          className="mt-9 md:mt-12 rounded-[2rem] border border-gray-100 bg-white/85 backdrop-blur-sm p-7 sm:p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-[0_20px_70px_rgba(0,0,0,0.035)]"
        >
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
              When the work crosses categories, send the problem as it is.
            </h2>
            <p className="mt-4 text-gray-600 leading-loose tracking-wide font-light">
              Some requirements combine software, AI, hardware, research, and operations. The technical path should fit the work, not the label.
            </p>
          </div>

          <motion.a
            href={mixedMailto}
            variants={buttonMotion}
            initial="rest"
            animate="rest"
            whileHover={enableRichMotion ? 'hover' : undefined}
            whileTap="tap"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white visited:text-white active:text-white focus:text-white hover:bg-gray-800 hover:text-white transition-colors duration-300 shrink-0"
          >
            Discuss your specific requirement
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionDeepDive;
