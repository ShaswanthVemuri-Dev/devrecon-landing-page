import React from 'react';
import { motion } from 'framer-motion';
import useScrollMotion from '../../hooks/useScrollMotion.js';

const ease = [0.22, 1, 0.36, 1];

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

const LogoItem = ({ logo }) => (
  <div className="flex h-20 w-44 shrink-0 items-center justify-center px-4 sm:h-24 sm:w-56 sm:px-6 md:h-28 md:w-64 lg:h-32 lg:w-72 lg:px-8">
    <img
      src={logo.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`pointer-events-none w-full select-none object-contain ${logo.className}`}
    />
  </div>
);

const LogoMarquee = ({ items, reverse = false }) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className={`flex w-max gap-10 sm:gap-14 md:gap-16 ${reverse ? 'working-with-marquee-reverse' : 'working-with-marquee'}`}>
        {repeatedItems.map((logo, index) => (
          <LogoItem key={`${logo.src}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
};

const WorkingWith = () => {
  const enableScrollMotion = useScrollMotion();

  return (
    <section id="working-with" className="relative overflow-hidden bg-white px-6 pt-10 pb-16 md:pt-12 md:pb-24 xl:pt-14 xl:pb-28">
      <style>{`
        @keyframes workingWithMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        @keyframes workingWithMarqueeReverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }

        .working-with-marquee {
          animation: workingWithMarquee 38s linear infinite;
        }

        .working-with-marquee-reverse {
          animation: workingWithMarqueeReverse 38s linear infinite;
        }

        @media (max-width: 640px) {
          .working-with-marquee,
          .working-with-marquee-reverse {
            animation-duration: 30s;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={enableScrollMotion ? { opacity: 0, y: 24 } : false}
          whileInView={enableScrollMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.78, ease }}
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
          initial={enableScrollMotion ? { opacity: 0, y: 22 } : false}
          whileInView={enableScrollMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.76, ease, delay: 0.04 }}
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
