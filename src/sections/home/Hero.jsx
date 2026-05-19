import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import CircuitBackground from '../../components/ui/CircuitBackground.jsx';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[82svh] overflow-hidden px-6 pt-24 pb-20 sm:min-h-[84svh] md:min-h-[88vh] md:pt-32 md:pb-32 lg:min-h-[90vh]">
      <CircuitBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(82svh-11rem)] max-w-7xl flex-col justify-center sm:min-h-[calc(84svh-11rem)] md:min-h-[calc(88vh-16rem)] lg:min-h-[calc(90vh-16rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl"
        >
          <h1 className="mb-6 text-[clamp(3rem,14vw,5.4rem)] font-bold uppercase leading-[1.06] tracking-[0.16em] text-[#111111] text-balance sm:tracking-[0.18em] md:mb-8 md:text-7xl md:leading-[1.08] lg:text-8xl xl:text-9xl xl:leading-[1.1] xl:tracking-widest">
            Engineering Clarity.
          </h1>
          <p className="max-w-2xl text-base font-light leading-loose tracking-wide text-gray-500 sm:text-lg md:text-xl lg:text-2xl">
            We demystify AI, IoT, and complex software for ambitious leaders, without the inflated agency price tags.
          </p>

          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:mt-16">
            <a href="#how-it-works" className="group flex items-center gap-3 border-b-2 border-black pb-1 text-lg font-semibold tracking-wide text-black transition-colors duration-[600ms] hover:border-gray-600 hover:text-gray-600">
              See how it works
              <ArrowDown className="h-5 w-5 transition-transform duration-[600ms] group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
