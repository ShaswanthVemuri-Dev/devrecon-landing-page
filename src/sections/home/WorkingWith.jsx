import React from 'react';
import Reveal from '../../components/motion/Reveal.jsx';
import publicAsset from '../../utils/assetPaths.js';

const logos = [
  { src: 'working-with/logo-01.png', width: 1096, height: 1135, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-02.png', width: 2048, height: 682, className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-03.png', width: 1090, height: 1037, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-04.png', width: 2048, height: 672, className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-05.png', width: 1254, height: 1254, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-06.png', width: 1181, height: 929, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-07.png', width: 478, height: 496, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-08.png', width: 2048, height: 528, className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-09.png', width: 994, height: 941, className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-10.png', width: 2048, height: 734, className: 'max-h-10 sm:max-h-12 md:max-h-14' },
];

const firstRow = logos.slice(0, 5);
const secondRow = logos.slice(5);

const LogoItem = ({ logo, index }) => (
  <div className="working-with-logo-item flex h-20 w-44 shrink-0 items-center justify-center px-4 sm:h-24 sm:w-56 sm:px-6 md:h-28 md:w-64 lg:h-32 lg:w-72 lg:px-8" style={{ '--logo-delay': `${index * 55}ms` }}>
    <img
      src={publicAsset(logo.src)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      draggable="false"
      width={logo.width}
      height={logo.height}
      className={`pointer-events-none w-full select-none object-contain ${logo.className}`}
    />
  </div>
);

const LogoGroup = ({ items }) => (
  <div className="working-with-logo-group flex shrink-0 items-center">
    {items.map((logo, index) => (
      <LogoItem key={logo.src} logo={logo} index={index} />
    ))}
  </div>
);

const LogoMarquee = ({ items, reverse = false }) => (
  <div className="relative overflow-hidden py-2">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />
    <div className={`working-with-track flex w-max ${reverse ? 'working-with-marquee-reverse' : 'working-with-marquee'}`} aria-hidden="true">
      <LogoGroup items={items} />
      <LogoGroup items={items} />
    </div>
  </div>
);

const WorkingWith = () => {
  return (
    <section id="working-with" className="relative overflow-hidden bg-white px-6 pt-10 pb-16 md:pt-12 md:pb-24 xl:pt-14 xl:pb-28">
      <style>{`
        @keyframes workingWithMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes workingWithMarqueeReverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .working-with-track {
          --working-with-gap: 2.5rem;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .working-with-logo-group {
          gap: var(--working-with-gap);
          padding-right: var(--working-with-gap);
        }

        .working-with-logo-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .working-with-marquee {
          animation: workingWithMarquee 42s linear infinite;
        }

        .working-with-marquee-reverse {
          animation: workingWithMarqueeReverse 42s linear infinite;
        }

        @media (min-width: 640px) {
          .working-with-track { --working-with-gap: 3.5rem; }
        }

        @media (min-width: 768px) {
          .working-with-track { --working-with-gap: 4rem; }
        }

        @media (max-width: 640px) {
          .working-with-marquee,
          .working-with-marquee-reverse {
            animation-duration: 48s;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .working-with-track {
            will-change: auto;
          }

          .working-with-logo-item {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .working-with-marquee,
          .working-with-marquee-reverse {
            animation: none;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl md:mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance sm:text-5xl xl:text-6xl">
            Working across products, teams, and systems.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed tracking-wide text-gray-500 md:text-xl">
            We bring products, research, and execution into one clearer path so technical work moves with structure instead of noise.
          </p>
        </Reveal>

        <Reveal className="grid gap-4 md:gap-5" variant="fade" duration={0.92}>
          <LogoMarquee items={firstRow} />
          <LogoMarquee items={secondRow} reverse />
        </Reveal>
      </div>
    </section>
  );
};

export default WorkingWith;
