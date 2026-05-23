import React from 'react';
import { ArrowDown } from 'lucide-react';
import CircuitBackground from '../../components/ui/CircuitBackground.jsx';
import Reveal from '../../components/motion/Reveal.jsx';
import { scrollToHashTarget } from '../../components/layout/RouteScrollManager.jsx';

const Hero = () => {
  const handleHowItWorksClick = (event) => {
    event.preventDefault();

    if (window.location.hash !== '#how-it-works') {
      window.history.pushState(null, '', '#how-it-works');
    }

    window.requestAnimationFrame(() => {
      scrollToHashTarget('#how-it-works', 'smooth');
    });
  };

  return (
    <section className="relative min-h-[82svh] w-full overflow-hidden px-6 pt-24 pb-20 sm:min-h-[84svh] md:min-h-[88vh] md:pt-32 md:pb-32 lg:min-h-[90vh]">
      <CircuitBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(82svh-11rem)] max-w-7xl flex-col justify-center sm:min-h-[calc(84svh-11rem)] md:min-h-[calc(88vh-16rem)] lg:min-h-[calc(90vh-16rem)]">
        <Reveal className="max-w-6xl" distance={24} duration={0.78}>
          <h1 className="mb-6 max-w-full text-[clamp(2.35rem,11.4vw,5.4rem)] font-bold uppercase leading-[1.08] tracking-[0.02em] text-[#111111] text-balance sm:text-[clamp(3.25rem,10vw,5.4rem)] sm:tracking-[0.075em] md:mb-8 md:text-7xl md:leading-[1.08] md:tracking-[0.12em] lg:text-8xl lg:tracking-[0.16em] xl:text-9xl xl:leading-[1.1] xl:tracking-widest">
            Engineering Clarity.
          </h1>
          <p className="max-w-2xl text-base font-light leading-loose tracking-wide text-gray-500 sm:text-lg md:text-xl lg:text-2xl">
            We demystify AI, IoT, and complex software for ambitious leaders, without the inflated agency price tags.
          </p>

          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:mt-16">
            <a
              href="#how-it-works"
              onClick={handleHowItWorksClick}
              className="motion-button motion-pill motion-pill-light group inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white/78 px-7 py-4 text-base font-semibold tracking-wide text-[#111111] no-underline shadow-[0_10px_30px_rgba(17,17,17,0.045)] visited:text-[#111111] active:text-[#111111] focus:text-[#111111] hover:border-[#111111] hover:bg-white hover:text-[#111111] focus:outline-none focus-visible:outline-none sm:px-8 sm:text-lg"
            >
              <span>See how it works</span>
              <ArrowDown className="motion-action-arrow motion-action-arrow-down h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
