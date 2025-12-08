import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Partnerships = () => {
  return (
    <section id="partners" className="py-20 md:py-32 px-6 bg-[#F5F5F7] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
        <motion.div 
          className="absolute top-10 right-10 w-64 h-64 border border-black rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute bottom-[-50px] left-[-50px] w-96 h-96 border border-black rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-relaxed text-[#111111] text-balance">An Umbrella for Elite, Ethical Talent.</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-loose tracking-wide font-light">
            Are you a freelancer who wants to focus on deep work? We provide the legal structure. We take <span className="font-semibold text-black">zero commission</span> on your labor—only operational costs.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a 
              href="https://forms.gle/ALHrnw3QJioSzjvu6"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#111111] text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all hover:shadow-lg flex items-center gap-2 tracking-wide"
            >
              Apply for Partnership <ChevronRight className="w-5 h-5"/>
            </a>
            <p className="text-sm text-gray-500 font-medium tracking-wide max-w-lg">
              *We curate our partners with care. Admission is selective to ensure every collaboration meets our shared standard of excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
