import React from 'react';
import Reveal from '../../components/motion/Reveal.jsx';

const ProductsHero = () => {
  return (
    <section className="relative px-6 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal duration={1.08} distance={22}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
            Products
          </p>

          <h1 className="max-w-6xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance [word-spacing:normal] lg:[word-spacing:0.12em] xl:[word-spacing:0.14em]">
            Products designed as operating systems, not isolated apps.
          </h1>

          <p className="mt-8 max-w-4xl text-lg md:text-xl text-gray-500 font-light leading-loose tracking-wide">
            DevReCon builds software products for real operational workflows, not single screen utilities. Each product is shaped around the full operating path around a problem: the interface people use, the management layer that handles operations, the data logic that preserves context, and the automation that keeps the system moving. This product direction can expand across domains while keeping one principle intact: connected systems over isolated apps.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsHero;
