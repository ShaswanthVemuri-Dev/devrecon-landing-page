import React from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from '../../hooks/useScrollMotion.js';

const logos = [
  { src: '/working-with/logo-01.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-02.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: '/working-with/logo-03.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-04.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: '/working-with/logo-05.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-06.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-07.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-08.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: '/working-with/logo-09.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: '/working-with/logo-10.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
];

const firstRow = logos.slice(0, 5);
const secondRow = logos.slice(5);

const logoItemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.985,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      delay: Math.min((index % 5) * 0.055, 0.22),
      ease: [0.18, 0.9, 0.2, 1],
    },
  }),
};

const LogoItem = ({ logo, index }) => (
  <motion.div
    custom={index}
    variants={logoItemVariants}
    className="working-with-logo-item flex h-20 w-44 shrink-0 items-center justify-center px-4 sm:h-24 sm:w-56 sm:px-6 md:h-28 md:w-64 lg:h-32 lg:w-72 lg:px-8"
  >
    <img
      src={logo.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`pointer-events-none w-full select-none object-contain ${logo.className}`}
    />
  </motion.div>
);

const LogoMarquee = ({ items, reverse = false }) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className={`working-with-track flex w-max gap-10 sm:gap-14 md:gap-16 ${reverse ? 'working-with-marquee-reverse' : 'working-with-marquee'}`}>
        {repeatedItems.map((logo, index) => (
          <LogoItem key={`${logo.src}-${index}`} logo={logo} index={index} />
        ))}
      </div>
    </div>
  );
};

const WorkingWith = () => {
  const headingReveal = useRevealMotion({ desktopInitial: { y: 24 }, duration: 0.78 });

  return (
    <section id="working-with" className="relative overflow-hidden bg-white px-6 pt-10 pb-16 md:pt-12 md:pb-24 xl:pt-14 xl:pb-28">
      <style>{`
        @keyframes workingWithMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-33.333333%, 0, 0); }
        }

        @keyframes workingWithMarqueeReverse {
          from { transform: translate3d(-33.333333%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .working-with-track {
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .working-with-marquee {
          animation: workingWithMarquee 42s linear infinite;
        }

        .working-with-marquee-reverse {
          animation: workingWithMarqueeReverse 42s linear infinite;
        }

        @media (max-width: 640px) {
          .working-with-marquee,
          .working-with-marquee-reverse {
            animation-duration: 34s;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={headingReveal.initial}
          whileInView={headingReveal.whileInView}
          viewport={headingReveal.viewport}
          transition={headingReveal.transition}
          className="mb-14 max-w-3xl md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance sm:text-5xl xl:text-6xl">
            Working across products, teams, and systems.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed tracking-wide text-gray-500 md:text-xl">
            We bring products, research, and execution into one clearer path so technical work moves with structure instead of noise.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
          transition={{ staggerChildren: 0.035 }}
          className="grid gap-4 md:gap-5"
        >
          <LogoMarquee items={firstRow} />
          <LogoMarquee items={secondRow} reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default WorkingWith;
