import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const ProductsHero = () => {
  return (
    <section className="relative px-6 pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease }}
          className="max-w-4xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-7">
            Products
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[1.08] text-balance">
            Software we are building with intent.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide max-w-3xl">
            DevReCon builds focused product systems where usability, technical structure, and operating context matter more than surface complexity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHero;
