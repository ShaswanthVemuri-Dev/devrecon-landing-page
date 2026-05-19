import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Database,
  Menu,
  Search,
  Target,
  Upload,
  X,
} from 'lucide-react';
import ProductPreviewFrame from './ProductPreviewFrame.jsx';

const premiumEase = [0.22, 1, 0.36, 1];

const PREVIEW_ASSETS = {
  logo: '/product-previews/mastermentor/logo.png',
  darkLogo: '/product-logos/mastermentor-mark-bw.png',
};

const MiniMenuButton = ({ open, onClick }) => (
  <button
    type="button"
    aria-label={open ? 'Close Master Mentor sections' : 'Open Master Mentor sections'}
    aria-expanded={open}
    onClick={onClick}
    className="relative z-50 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 hover:border-slate-900"
  >
    <AnimatePresence>
      {open ? (
        <motion.span
          key="mini-menu-ripple"
          className="absolute inset-0 rounded-full bg-[#2563EB]"
          initial={{ scale: 0.35, opacity: 0.18 }}
          animate={{ scale: 2.2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.68, ease: premiumEase }}
        />
      ) : null}
    </AnimatePresence>
    <motion.span
      className="relative z-10"
      animate={{ rotate: open ? 90 : 0, scale: open ? 0.96 : 1 }}
      transition={{ duration: 0.3, ease: premiumEase }}
    >
      {open ? <X className="h-[17px] w-[17px]" /> : <Menu className="h-[17px] w-[17px]" />}
    </motion.span>
  </button>
);

const MasterMentorBrand = ({ website }) => (
  <a
    href={website}
    target="_blank"
    rel="noreferrer"
    className="flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
  >
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
      <img src={PREVIEW_ASSETS.darkLogo} alt="Master Mentor logo" className="mastermentor-logo-bw absolute h-[82%] w-[82%] object-contain opacity-100 transition-opacity duration-700" draggable={false} />
      <img src={PREVIEW_ASSETS.logo} alt="" className="mastermentor-logo-colour absolute h-[78%] w-[78%] object-contain transition-opacity duration-700" draggable={false} />
    </div>
    <span className="truncate text-[0.84rem] font-semibold tracking-tight text-slate-900 sm:text-[0.92rem]">
      Master Mentor
    </span>
  </a>
);

const MasterMentorHeader = ({ open, setOpen, product }) => {
  const closeWhenClickingHeaderSpace = (event) => {
    if (!open) return;
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    setOpen(false);
  };

  return (
    <div
      data-preview-menu="true"
      onClick={closeWhenClickingHeaderSpace}
      className="absolute inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl"
    >
      <div className="flex h-20 items-center justify-between px-5 sm:px-6">
        <MasterMentorBrand website={product.website} />
        <MiniMenuButton open={open} onClick={() => setOpen((value) => !value)} />
      </div>
    </div>
  );
};

const MasterMentorMenu = ({ open, setOpen, product }) => {
  const closeWhenClickingBackdrop = (event) => {
    if (!open) return;
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    setOpen(false);
  };

  return (
    <div
      data-preview-menu="true"
      data-open={open ? 'true' : 'false'}
      onClick={closeWhenClickingBackdrop}
      className={[
        'mini-mobile-menu absolute inset-0 z-30 bg-white/96 pt-20 backdrop-blur-xl transition-opacity duration-[720ms] ease-[cubic-bezier(.22,1,.36,1)] [backface-visibility:hidden] [transform:translateZ(0)] will-change-[opacity]',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
    >
      <div className="flex h-full flex-col justify-center px-6 pb-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        <div className="mx-auto w-full max-w-[340px] space-y-3.5">
          {['Scholarships', 'Mentorship', 'Guided excellence', 'Review Dropbox', 'Resources'].map((item, index) => (
            <a
              key={item}
              href={product.website}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
              }}
              className="mini-mobile-menu-item flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left text-[12px] font-semibold text-slate-900 opacity-100 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-[border-color,background-color] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-[#2563EB]/35 hover:bg-[#EFF6FF]"
              style={{ '--d': `${150 + index * 70}ms` }}
            >
              <span>{item}</span>
              <ChevronRight className="h-4 w-4 text-[#2563EB]" />
            </a>
          ))}

          <a
            href={product.website}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
            }}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-[#2563EB] px-5 py-3 text-[12px] font-semibold text-white visited:text-white active:text-white focus:text-white hover:text-white opacity-100 shadow-[0_6px_20px_rgba(37,99,235,0.25)] transition-colors duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[#1D4ED8]"
          >
            View Full Website
          </a>
        </div>
      </div>
    </div>
  );
};

const ScholarshipMiniCard = ({ accent, soft, widthOne = '80%', widthTwo = '58%', footer = '40%' }) => (
  <div className="rounded-[14px] border border-slate-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
    <div className="mb-3 h-2.5 w-9 rounded-full" style={{ backgroundColor: accent }} />
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-slate-700" style={{ width: widthOne }} />
      <div className="h-2 rounded-full bg-slate-200" style={{ width: widthTwo }} />
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div className="h-1.5 rounded-full bg-slate-200" style={{ width: footer }} />
      <div className="h-5 w-11 rounded-full" style={{ backgroundColor: soft }} />
    </div>
  </div>
);

const MasterMentorWireframe = () => (
  <motion.div
    className="native-colour-stage relative w-full max-w-[300px] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
    aria-hidden="true"
  >
    <div className="relative z-10">
      <div className="mb-4 h-2.5 w-28 rounded-full bg-slate-200" />
      <div className="grid gap-3">
        <ScholarshipMiniCard accent="#2563EB" soft="#EFF6FF" widthOne="82%" widthTwo="62%" footer="38%" />
        <ScholarshipMiniCard accent="#059669" soft="rgba(5,150,105,0.10)" widthOne="72%" widthTwo="50%" footer="30%" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-[14px] border border-dashed border-slate-300 bg-slate-50 p-3">
          <Upload className="native-colour-stage h-4 w-4 text-[#2563EB]" />
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Dropbox</p>
        </div>
        <div className="rounded-[14px] border border-slate-200 bg-white p-3">
          <BookOpen className="native-colour-stage h-4 w-4 text-[#059669]" />
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Resources</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const MasterMentorPreview = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <ProductPreviewFrame product={product} open={open} variant="mastermentor">
      <div className="native-colour-stage absolute inset-0" />
      <MasterMentorHeader open={open} setOpen={setOpen} product={product} />
      <MasterMentorMenu open={open} setOpen={setOpen} product={product} />

      <div className="relative z-10 grid min-h-[560px] items-center gap-6 px-5 pb-7 pt-24 sm:px-7 md:grid-cols-[1fr_0.83fr] md:px-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        <div className="relative max-w-[390px]">
          <div className="native-colour-stage mb-4 inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#2563EB]">
            <Target className="h-3.5 w-3.5" />
            Structured academic progression
          </div>

          <h3 className="text-[2.05rem] font-bold leading-[1.06] tracking-[-0.04em] text-[#0F172A] sm:text-[2.48rem]">
            The academic system is chaotic. <span className="native-colour-stage text-[#2563EB]">Your workflow should not be.</span>
          </h3>
          <p className="mt-5 max-w-[370px] text-sm leading-[1.62] text-[#475569]">
            From understanding the flow of your applications to utilizing core tools to claim the opportunities being offered, Master Mentor gives you a single, highly structured workspace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={product.website}
              target="_blank"
              rel="noreferrer"
              className="product-hover-lift native-colour-stage inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-[10px] font-medium text-white visited:text-white active:text-white focus:text-white hover:text-white shadow-[0_4px_14px_rgba(37,99,235,0.15)] transition duration-500 hover:bg-[#1D4ED8] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
            >
              View Full Website
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-7 grid max-w-[340px] grid-cols-3 gap-2.5">
            {[
              ['Scholarships', Search, '#2563EB'],
              ['Review', CheckCircle2, '#059669'],
              ['Resources', Database, '#2563EB'],
            ].map(([label, Icon, color]) => (
              <div key={label} className="native-colour-stage flex min-h-[76px] flex-col items-center justify-center rounded-[14px] border border-slate-200 bg-white p-3 text-center shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                <Icon className="h-4 w-4" style={{ color }} />
                <p className="mt-2.5 text-center text-[8px] font-semibold uppercase leading-tight tracking-[0.08em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden justify-center md:flex">
          <MasterMentorWireframe />
        </div>
      </div>
    </ProductPreviewFrame>
  );
};

export default MasterMentorPreview;
