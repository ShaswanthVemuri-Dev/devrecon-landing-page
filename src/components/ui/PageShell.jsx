import React from 'react';
import Reveal from '../motion/Reveal.jsx';

const PageShell = ({ eyebrow, title, description, children }) => {
  return (
    <main className="pt-24 md:pt-32">
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Reveal className="max-w-4xl">
          {eyebrow && (
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl font-bold leading-relaxed tracking-tighter text-[#111111] text-balance sm:text-5xl md:text-7xl">
            {title}
          </h1>

          {description && (
            <p className="mt-8 max-w-3xl text-lg font-light leading-loose tracking-wide text-gray-500 md:text-xl">
              {description}
            </p>
          )}
        </Reveal>

        {children && <div className="mt-16 md:mt-24">{children}</div>}
      </section>
    </main>
  );
};

export default PageShell;
