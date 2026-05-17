import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const premiumEase = [0.22, 1, 0.36, 1];

const ProductMark = ({ product }) => (
  <motion.a
    href={product.website}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open ${product.name} website`}
    className="relative z-20 flex h-[104px] w-[104px] items-center justify-center rounded-[2rem] bg-[#F5F5F7] shadow-[0_26px_70px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.82)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] sm:h-[120px] sm:w-[120px]"
    whileHover={{ scale: 1.025, rotate: -0.4 }}
    whileTap={{ scale: 0.992 }}
    transition={{ duration: 0.36, ease: premiumEase }}
  >
    <img
      src={product.mark}
      alt={`${product.name} mark`}
      className="h-[52%] w-[52%] object-contain"
      loading="lazy"
      draggable={false}
    />
  </motion.a>
);

const AmbientGradient = () => (
  <>
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#0E0E10_0%,#171719_48%,#101012_100%)]" />
    <div className="absolute inset-[1px] rounded-[2.3rem] bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.07),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))]" />
    <motion.div
      className="absolute left-[-18%] top-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.025)_48%,transparent_72%)] blur-3xl"
      animate={{ x: [0, 22, -8, 0], y: [0, -16, 10, 0], opacity: [0.45, 0.72, 0.52, 0.45] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[-18%] right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_48%,transparent_74%)] blur-3xl"
      animate={{ x: [0, -20, 10, 0], y: [0, 18, -10, 0], opacity: [0.38, 0.68, 0.44, 0.38] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
    />
  </>
);

const FlowLabel = ({ label, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    transition={{ duration: 0.52, delay, ease }}
    className={`absolute z-20 flex flex-col items-center gap-2 ${className}`}
  >
    <span className="h-2.5 w-2.5 rounded-full border border-white/30 bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.28)]" />
    <span className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8E8] backdrop-blur-sm">
      {label}
    </span>
  </motion.div>
);

const MinimalProductDiagram = ({ product }) => {
  const [first, second, third] = product.infographic.flow;

  return (
    <motion.div
      className="relative overflow-hidden rounded-[2.35rem] border border-[#242424] bg-[#111111] text-white shadow-[0_30px_92px_rgba(0,0,0,0.24)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.74, ease }}
    >
      <AmbientGradient />

      <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 sm:p-8 md:p-9">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A8A8A8]">
              Core idea
            </p>
            <p className="mt-3 max-w-[25rem] text-sm font-light leading-relaxed tracking-wide text-[#D8D8D8] sm:text-[15px]">
              {product.infographic.headline}
            </p>
          </div>
          <span className="hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D9D9D9] sm:inline-flex">
            {product.infographic.eyebrow}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-[720px] flex-1 items-center justify-center py-10">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 720 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M118 184 C 218 86, 328 100, 360 178 C 394 262, 502 278, 606 176"
              fill="none"
              stroke="rgba(255,255,255,0.17)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="8 12"
              initial={{ pathLength: 0.18, opacity: 0.18 }}
              animate={{ pathLength: [0.18, 1, 0.62], opacity: [0.22, 0.62, 0.28] }}
              transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M184 254 C 264 316, 450 318, 536 250"
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="3 12"
              initial={{ pathLength: 0.2, opacity: 0.12 }}
              animate={{ pathLength: [0.2, 0.88, 0.48], opacity: [0.12, 0.38, 0.16] }}
              transition={{ duration: 9.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            />
          </svg>

          <FlowLabel label={first} className="left-[3%] top-[47%]" delay={0.02} />
          <FlowLabel label={second} className="left-1/2 top-[17%] -translate-x-1/2" delay={0.12} />
          <FlowLabel label={third} className="right-[3%] top-[47%]" delay={0.22} />

          <motion.div
            className="absolute h-[214px] w-[214px] rounded-full border border-white/10"
            animate={{ scale: [1, 1.045, 1], opacity: [0.26, 0.58, 0.26] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-[150px] w-[150px] rounded-full border border-white/8 bg-white/[0.025]"
            animate={{ scale: [1.04, 1, 1.04], opacity: [0.28, 0.5, 0.28] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ProductMark product={product} />
        </div>

        <p className="mx-auto max-w-2xl text-center text-sm font-light leading-loose tracking-wide text-[#B0B0B0]">
          {product.infographic.caption}
        </p>
      </div>
    </motion.div>
  );
};

const ProductPanel = ({ product, reverse, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.78, delay: index * 0.08, ease }}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
    >
      <div className={reverse ? 'md:order-2' : ''}>
        <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          <span>{product.index}</span>
          <span className="h-px w-10 bg-gray-300" />
          <span>{product.category}</span>
        </div>

        <h2 className="text-4xl font-bold tracking-tighter leading-[1.05] text-balance md:text-6xl">
          {product.name}
        </h2>

        <p className="mt-6 text-xl font-light leading-relaxed tracking-wide text-[#111111] text-balance md:text-2xl">
          {product.tagline}
        </p>

        <p className="mt-6 max-w-xl text-base font-light leading-loose tracking-wide text-gray-500 md:text-lg">
          {product.description}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={product.website}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-transform duration-300 ease-out hover:scale-[1.012] hover:bg-[#1B1B1B] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            {product.visitLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={product.contactHref}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-7 py-4 text-sm font-semibold tracking-wide text-[#111111] transition-transform duration-300 ease-out hover:scale-[1.012] hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Discuss a similar system
          </a>
        </div>
      </div>

      <div className={reverse ? 'md:order-1' : ''}>
        <MinimalProductDiagram product={product} />
      </div>
    </motion.article>
  );
};

const ProductShowcase = ({ products }) => {
  return (
    <section className="relative px-6 pb-24 md:pb-36">
      <div className="relative z-10 mx-auto max-w-7xl space-y-24 md:space-y-36">
        {products.map((product, index) => (
          <ProductPanel
            key={product.id}
            product={product}
            reverse={index % 2 === 1}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
