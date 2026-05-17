import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[#111111] text-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="darkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#darkGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 leading-relaxed tracking-tight text-balance">
            Most tech companies charge for confusion. <br className="hidden md:block" />
            <span className="text-gray-500">We charge for solutions.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="space-y-10 text-lg md:text-xl text-gray-300 font-light"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="leading-loose tracking-wide">
            We believe digitizing lives creates meaningful value. It shouldn&apos;t cost a fortune simply because clients don&apos;t understand the tech. We operate on a model of radical transparency.
          </p>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1"/>
              <div>
                <strong className="block text-white mb-1 tracking-wide">Zero Fluff</strong>
                <span className="text-gray-400 leading-relaxed tracking-wide">You pay for the work performed. No hidden margins.</span>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1"/>
              <div>
                <strong className="block text-white mb-1 tracking-wide">Tailored Teams</strong>
                <span className="text-gray-400 leading-relaxed tracking-wide">We assemble the exact expertise needed once we understand the problem.</span>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1"/>
              <div>
                <strong className="block text-white mb-1 tracking-wide">Complete Transparency</strong>
                <span className="text-gray-400 leading-relaxed tracking-wide">We show you exactly where resources are spent.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;