import React from 'react';
import Reveal from '../../components/motion/Reveal.jsx';
import publicAsset from '../../utils/assetPaths.js';

const logos = [
  { src: 'working-with/logo-01.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-02.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-03.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-04.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-05.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-06.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-07.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-08.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
  { src: 'working-with/logo-09.png', className: 'max-h-16 sm:max-h-20 md:max-h-24' },
  { src: 'working-with/logo-10.png', className: 'max-h-10 sm:max-h-12 md:max-h-14' },
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
      draggable="false"
      className={`pointer-events-none w-full select-none object-contain ${logo.className}`}
    />
  </div>
);

const LogoMarquee = ({ items, reverse = false }) => {
  const repeatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className={`working-with-track flex w-max gap-10 sm:gap-14 md:gap-16 ${reverse ? 'working-with-marquee-reverse' : 'working-with-marquee'}`}>
        {repeatedItems.map((logo, index) => (
          <LogoItem key={`${logo.src}-${index}`} logo={logo} index={index % items.length} />
        ))}
      </div>
    </div>
  );
};

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

        @keyframes logoSoftIn {
          from { opacity: 0; transform: translate3d(0, 10px, 0) scale(0.985); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        .working-with-track {
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .working-with-logo-item {
          opacity: 0;
          animation: logoSoftIn 720ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--logo-delay, 0ms);
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
        <Reveal className="mb-14 max-w-3xl md:mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance sm:text-5xl xl:text-6xl">
            Working across products, teams, and systems.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed tracking-wide text-gray-500 md:text-xl">
            We bring products, research, and execution into one clearer path so technical work moves with structure instead of noise.
          </p>
        </Reveal>

        <Reveal className="grid gap-4 md:gap-5" variant="fade" duration={0.66}>
          <LogoMarquee items={firstRow} />
          <LogoMarquee items={secondRow} reverse />
        </Reveal>
      </div>
    </section>
  );
};

export default WorkingWith;
