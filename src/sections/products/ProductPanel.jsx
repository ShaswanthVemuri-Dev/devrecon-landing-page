import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MyMedicalsPreview from './previews/MyMedicalsPreview.jsx';
import MasterMentorPreview from './previews/MasterMentorPreview.jsx';
import { useRevealMotion } from '../../hooks/useScrollMotion.js';
import useDesktopInteraction from '../../hooks/useDesktopInteraction.js';

const ease = [0.16, 1, 0.3, 1];

const ProductDiagram = ({ product }) => {
  if (product.id === 'mymedicals') return <MyMedicalsPreview product={product} />;
  return <MasterMentorPreview product={product} />;
};

const ProductPanel = ({ product, reverse, index }) => {
  const enableHoverMotion = useDesktopInteraction();
  const reveal = useRevealMotion({
    desktopInitial: { y: 34 },
    duration: 0.78,
    delay: index * 0.08,
    ease,
    margin: '0px 0px 10% 0px',
  });

  return (
    <motion.article
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={reveal.transition}
      className="grid items-center gap-10 min-[800px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[800px]:gap-10 min-[1100px]:gap-14 min-[1280px]:grid-cols-2 min-[1280px]:gap-20 2xl:gap-24"
    >
      <div className={reverse ? 'min-w-0 min-[800px]:order-2' : 'min-w-0'}>
        <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          <span>{product.index}</span>
          <span className="h-px w-10 bg-gray-300" />
          <span>{product.category}</span>
        </div>

        <h2 className="text-4xl font-bold tracking-tighter leading-[1.05] text-balance min-[800px]:text-5xl min-[1280px]:text-6xl">
          {product.name}
        </h2>

        <p className="mt-6 text-xl font-light leading-relaxed tracking-wide text-[#111111] text-balance min-[1280px]:text-2xl">
          {product.tagline}
        </p>

        <p className="mt-6 max-w-xl text-base font-light leading-loose tracking-wide text-gray-500 min-[1280px]:text-lg">
          {product.description}
        </p>

        <div className="mt-8 grid w-full max-w-[440px] gap-3 min-[480px]:grid-cols-2">
          <a
            href={product.website}
            target="_blank"
            rel="noreferrer"
            className={`motion-button motion-pill group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-4 text-center text-sm font-semibold tracking-wide text-white visited:text-white active:text-white focus:text-white hover:bg-[#1B1B1B] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${enableHoverMotion ? 'product-hover-lift' : ''}`}
          >
            {product.visitLabel}
            <ArrowUpRight className="motion-action-arrow h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={product.contactHref}
            className={`motion-button motion-pill inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/70 px-5 py-4 text-center text-sm font-semibold tracking-wide text-[#111111] visited:text-[#111111] active:text-[#111111] focus:text-[#111111] hover:border-black hover:text-[#111111] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${enableHoverMotion ? 'product-hover-lift' : ''}`}
          >
            Discuss a similar system
          </a>
        </div>
      </div>

      <div className={reverse ? 'min-w-0 min-[800px]:order-1' : 'min-w-0'}>
        <ProductDiagram product={product} />
      </div>
    </motion.article>
  );
};

export default ProductPanel;
