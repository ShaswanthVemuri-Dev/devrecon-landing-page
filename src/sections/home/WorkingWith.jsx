import React from 'react';
import { motion } from 'framer-motion';

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
  <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-[1.35rem] border border-gray-100 bg-[#F5F5F7]/80 px-7 py-5 sm:h-28 sm:w-60 md:h-32 md:w-72 md:px-9">
    <img
      src={logo.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
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
      <div className={`flex w-max gap-4 sm:gap-6 ${reverse ? 'working-with-marquee-reverse' : 'working-with-marquee'}`}>
        {repeatedItems.map((logo, index) => (
          <LogoItem key={`${logo.src}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
};

const WorkingWith = () => {
  return (
    <section id="working-with" className="relative overflow-hidden bg-white px-6 py-16 md:py-28">
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

      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="workingWithGrid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#workingWithGrid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.34 }}
          transition={{ duration: 0.78, ease }}
          className="mb-10 max-w-3xl md:mb-14"
        >
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance sm:text-5xl md:text-6xl">
            Working across products, teams, and systems.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.76, ease, delay: 0.04 }}
          className="grid gap-3 md:gap-4"
        >
          <LogoMarquee items={firstRow} />
          <LogoMarquee items={secondRow} reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default WorkingWith;
