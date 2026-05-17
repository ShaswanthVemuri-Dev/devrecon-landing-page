import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import CircuitBackground from '../../components/ui/CircuitBackground.jsx';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-32">
      <CircuitBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(85vh-11rem)] max-w-7xl flex-col justify-center md:min-h-[calc(90vh-16rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-widest leading-[1.1] mb-6 md:mb-8 text-[#111111] uppercase break-words text-balance">
            Engineering Clarity.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-2xl leading-loose tracking-wide font-light">
            We demystify AI, IoT, and complex software for ambitious leaders, without the inflated agency price tags.
          </p>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href="#how-it-works" className="group flex items-center gap-3 text-lg font-semibold text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all tracking-wide">
              See how it works
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
