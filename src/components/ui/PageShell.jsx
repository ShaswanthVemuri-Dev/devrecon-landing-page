import React from 'react';
import { motion } from 'framer-motion';

const PageShell = ({ eyebrow, title, description, children }) => {
  return (
    <main className="pt-24 md:pt-32">
      <section className="px-6 max-w-7xl mx-auto py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-relaxed text-[#111111] text-balance">
            {title}
          </h1>

          {description && (
            <p className="mt-8 text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide max-w-3xl">
              {description}
            </p>
          )}
        </motion.div>

        {children && <div className="mt-16 md:mt-24">{children}</div>}
      </section>
    </main>
  );
};

export default PageShell;