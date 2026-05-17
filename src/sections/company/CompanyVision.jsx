import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const CompanyVision = () => {
  return (
    <section className="relative px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.26 }}
          transition={{ duration: 0.78, ease }}
          className="max-w-5xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
            Vision
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance">
            A clearer way to build technology.
          </h2>
          <div className="mt-8 grid gap-6 text-lg md:text-xl text-gray-600 font-light leading-loose tracking-wide">
            <p>
              DevReCon&apos;s long term vision is to become a company where software, AI, product development, and technical talent can operate under one clear system. We want to help clients build useful digital products, help founders move ideas forward, and help capable builders find structure around their work.
            </p>
            <p>
              The goal is not to make technology look complicated. The goal is to make complex work clear enough to build, maintain, and trust.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyVision;
