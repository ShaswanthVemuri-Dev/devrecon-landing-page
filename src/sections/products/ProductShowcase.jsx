import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const visualCopy = {
  healthcare: {
    title: 'Care flow',
    subtitle: 'Reminder, family visibility, and consent based access.',
    stages: ['Prompt', 'Confirm', 'Share'],
    systemLines: [
      'Medication routine',
      'Family awareness',
      'Care access',
    ],
  },
  academic: {
    title: 'Mentor flow',
    subtitle: 'Opportunity discovery, review, mentorship, and resources.',
    stages: ['Discover', 'Review', 'Progress'],
    systemLines: [
      'Scholarship path',
      'Mentor support',
      'Resource system',
    ],
  },
};

const ProductMark = ({ product }) => (
  <motion.a
    href={product.website}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open ${product.name} website`}
    className="relative z-20 flex h-[72px] w-[72px] items-center justify-center rounded-[1.35rem] bg-[#F5F5F7] shadow-[0_18px_42px_rgba(0,0,0,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] sm:h-[84px] sm:w-[84px]"
    whileHover={{ scale: 1.018 }}
    whileTap={{ scale: 0.992 }}
    transition={{ duration: 0.34, ease }}
  >
    <img
      src={product.mark}
      alt={`${product.name} mark`}
      className="h-[43%] w-[43%] object-contain opacity-100"
      style={{
        filter: 'brightness(0) saturate(100%) contrast(220%)',
      }}
      loading="lazy"
      draggable={false}
    />
  </motion.a>
);

const ProductNode = ({ item, product, index, compact = false }) => (
  <motion.a
    href={product.website}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open ${product.name} website for ${item.label}`}
    className={[
      'group block rounded-[1.35rem] border border-[#2B2B2B] bg-[#181818] text-left',
      'transition-colors duration-300 hover:border-[#F5F5F7] hover:bg-[#F5F5F7]',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]',
      compact ? 'px-4 py-3' : 'px-5 py-5',
    ].join(' ')}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
    whileHover={{ scale: 1.012 }}
    whileTap={{ scale: 0.992 }}
    transition={{ duration: 0.42, delay: index * 0.05, ease }}
  >
    <div className="mb-3 flex items-center justify-between gap-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A9A9A] transition-colors duration-300 group-hover:text-[#4B4B4B]">
        {item.label}
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-[#F5F5F7] transition-colors duration-300 group-hover:bg-[#111111]" />
    </div>
    <p className="text-sm font-medium leading-relaxed tracking-wide text-[#F5F5F7] transition-colors duration-300 group-hover:text-[#111111]">
      {item.detail}
    </p>
  </motion.a>
);

const StageRail = ({ stages }) => (
  <div className="grid grid-cols-3 overflow-hidden rounded-full border border-[#2B2B2B] bg-[#181818]">
    {stages.map((stage, index) => (
      <div
        key={stage}
        className={[
          'px-3 py-3 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]',
          index === 1 ? 'border-x border-[#2B2B2B]' : '',
        ].join(' ')}
      >
        {stage}
      </div>
    ))}
  </div>
);

const HealthcareDiagram = ({ product }) => {
  const copy = visualCopy.healthcare;

  return (
    <div className="relative z-10 min-h-[440px] p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr_1fr] lg:items-center">
        <div className="grid gap-4">
          <ProductNode item={product.infographic[0]} product={product} index={0} />
          <ProductNode item={product.infographic[1]} product={product} index={1} />
        </div>

        <div className="relative mx-auto w-full max-w-[240px]">
          <div className="hidden lg:block absolute left-1/2 top-1/2 h-[1px] w-[390px] -translate-x-1/2 -translate-y-1/2 bg-[#2B2B2B]" />
          <div className="hidden lg:block absolute left-1/2 top-1/2 h-[260px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#2B2B2B]" />

          <div className="relative z-10 rounded-[1.9rem] border border-[#2B2B2B] bg-[#151515] p-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
            <div className="flex justify-center">
              <ProductMark product={product} />
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A]">
              {copy.title}
            </p>
            <p className="mx-auto mt-3 max-w-[12rem] text-sm font-medium leading-relaxed tracking-wide text-[#F5F5F7]">
              {copy.subtitle}
            </p>
          </div>

          <div className="mt-4">
            <StageRail stages={copy.stages} />
          </div>
        </div>

        <div className="grid gap-4">
          <ProductNode item={product.infographic[2]} product={product} index={2} />
          <ProductNode item={product.infographic[3]} product={product} index={3} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {copy.systemLines.map((line) => (
          <div key={line} className="rounded-full border border-[#2B2B2B] bg-[#181818] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const AcademicDiagram = ({ product }) => {
  const copy = visualCopy.academic;

  return (
    <div className="relative z-10 min-h-[440px] p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[1.9rem] border border-[#2B2B2B] bg-[#151515] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <ProductMark product={product} />
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A]">
                {copy.title}
              </p>
              <p className="mt-3 max-w-[12rem] text-sm font-medium leading-relaxed tracking-wide text-[#F5F5F7]">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {copy.stages.map((stage, index) => (
              <motion.a
                key={stage}
                href={product.website}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full border border-[#2B2B2B] bg-[#181818] px-4 py-3 transition-colors duration-300 hover:border-[#F5F5F7] hover:bg-[#F5F5F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.992 }}
                transition={{ duration: 0.42, delay: index * 0.055, ease }}
              >
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#9A9A9A] transition-colors duration-300 group-hover:text-[#4B4B4B]">
                  0{index + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5F5F7] transition-colors duration-300 group-hover:text-[#111111]">
                  {stage}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5F5F7] transition-colors duration-300 group-hover:bg-[#111111]" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <ProductNode item={product.infographic[0]} product={product} index={0} />
          <ProductNode item={product.infographic[1]} product={product} index={1} />
          <div className="grid gap-4 sm:grid-cols-2">
            <ProductNode item={product.infographic[2]} product={product} index={2} compact />
            <ProductNode item={product.infographic[3]} product={product} index={3} compact />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {copy.systemLines.map((line) => (
          <div key={line} className="rounded-full border border-[#2B2B2B] bg-[#181818] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductVisual = ({ product }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[2.25rem] border border-[#242424] bg-[linear-gradient(145deg,#111111,#171717)] shadow-[0_28px_90px_rgba(0,0,0,0.24)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.72, ease }}
    >
      <div className="absolute inset-x-8 top-8 h-px bg-[#2C2C2C]" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-[#2C2C2C]" />

      <div className="relative z-20 flex items-center justify-between gap-5 px-6 pt-8 sm:px-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9A9A9A]">
          {product.category}
        </span>
        <span className="rounded-full border border-[#2B2B2B] bg-[#181818] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C8C8C8]">
          {product.status}
        </span>
      </div>

      {product.visual === 'academic' ? (
        <AcademicDiagram product={product} />
      ) : (
        <HealthcareDiagram product={product} />
      )}
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

        <div className="mt-8 flex max-w-2xl flex-wrap gap-3">
          {product.signals.map((signal) => (
            <span key={signal} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              {signal}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={product.website}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-transform duration-300 ease-out hover:scale-[1.012] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            {product.visitLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={product.contactHref}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-7 py-4 text-sm font-semibold tracking-wide text-black transition-transform duration-300 ease-out hover:scale-[1.012] hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Discuss a similar system
          </a>
        </div>

        <p className="mt-7 max-w-xl text-sm leading-loose tracking-wide text-gray-400">
          {product.role}
        </p>
      </div>

      <div className={reverse ? 'md:order-1' : ''}>
        <ProductVisual product={product} />
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
