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
import publicAsset from '../../../utils/assetPaths.js';

const premiumEase = [0.22, 1, 0.36, 1];

const PREVIEW_ASSETS = {
  logo: '/product-previews/mastermentor/logo.png',
  darkLogo: '/product-logos/mastermentor-mark-bw.png',
};

const MASTER_MENTOR_MENU_ITEMS = [
  'Scholarships',
  'Mentorship',
  'Guided excellence',
  'Review Dropbox',
  'Resources',
];

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
  <a href={website} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
      <img
        src={publicAsset(PREVIEW_ASSETS.darkLogo)}
        alt="Master Mentor logo"
        className="mastermentor-logo-bw absolute h-[82%] w-[82%] object-contain opacity-100 transition duration-700"
        draggable={false}
      />
      <img
        src={publicAsset(PREVIEW_ASSETS.logo)}
        alt=""
        className="mastermentor-logo-colour absolute h-[78%] w-[78%] object-contain opacity-0 transition duration-700"
        draggable={false}
      />
    </div>
    <span className="truncate text-[0.84rem] font-semibold tracking-tight text-slate-900 sm:text-[0.92rem]">
      Master Mentor
    </span>
  </a>
);

const MasterMentorHeader = ({ open, setOpen, product }) => {
  const closeFromEmptyHeaderArea = (event) => {
    if (!open) return;
    if (event.target.closest('a, button')) return;
    setOpen(false);
  };

  return (
    <div className="absolute inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl" onClick={closeFromEmptyHeaderArea} data-preview-menu="true">
      <div className="flex h-20 items-center justify-between px-5 sm:px-6">
        <MasterMentorBrand website={product.website} />

        <div className="flex items-center gap-2.5">
          <MiniMenuButton
            open={open}
            onClick={() => setOpen((value) => !value)}
          />
        </div>
      </div>
    </div>
  );
};

const MasterMentorMenu = ({ open, setOpen, product }) => (
  <div
    data-open={open ? 'true' : 'false'}
    className={[
      'mini-mobile-menu absolute inset-0 z-30 bg-white/96 pt-20 backdrop-blur-xl transition-opacity duration-[720ms] ease-[cubic-bezier(.22,1,.36,1)] [backface-visibility:hidden] [transform:translateZ(0)] will-change-[opacity]',
      open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
    ].join(' ')}
    onClick={(event) => {
      if (event.target.closest('a, button')) return;
      setOpen(false);
    }}
    data-preview-menu="true"
  >
    <div className="flex h-full flex-col justify-center px-6 pb-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      <div className="mx-auto w-full max-w-[340px] space-y-3.5">
        {MASTER_MENTOR_MENU_ITEMS.map((item, index) => (
          <button
            type="button"
            key={item}
            onClick={() => setOpen(false)}
            className="mini-mobile-menu-item flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left text-[12px] font-semibold text-slate-900 opacity-100 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-[border-color,background-color] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-[#2563EB]/35 hover:bg-[#EFF6FF]"
            style={{ '--d': `${260 + index * 115}ms` }}
          >
            <span>{item}</span>
            <ChevronRight className="h-4 w-4 text-[#2563EB]" />
          </button>
        ))}

        <a
          href={product.website}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="mt-2 flex w-full items-center justify-center rounded-full bg-[#2563EB] px-5 py-3 text-[12px] font-semibold text-white visited:text-white active:text-white focus:text-white hover:text-white opacity-100 shadow-[0_6px_20px_rgba(37,99,235,0.25)] transition-colors duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[#1D4ED8]"
          style={{ '--d': `${260 + MASTER_MENTOR_MENU_ITEMS.length * 115}ms` }}
        >
          View Full Website
        </a>
      </div>
    </div>
  </div>
);

const ScholarshipMiniCard = ({ accent, soft, widthOne = '80%', widthTwo = '58%', footer = '40%' }) => (
  <div className="mastermentor-mini-card">
    <div className="mb-2 h-2 w-7 rounded-full min-[1200px]:mb-3 min-[1200px]:h-2.5 min-[1200px]:w-9" style={{ backgroundColor: accent }} />
    <div className="space-y-1.5 min-[1200px]:space-y-2">
      <div className="h-1.5 rounded-full bg-slate-700 min-[1200px]:h-2" style={{ width: widthOne }} />
      <div className="h-1.5 rounded-full bg-slate-200 min-[1200px]:h-2" style={{ width: widthTwo }} />
    </div>
    <div className="mt-3 flex items-center justify-between min-[1200px]:mt-4">
      <div className="h-1.5 rounded-full bg-slate-200" style={{ width: footer }} />
      <div className="h-4 w-8 rounded-full min-[1200px]:h-5 min-[1200px]:w-11" style={{ backgroundColor: soft }} />
    </div>
  </div>
);

const MasterMentorWireframe = () => (
  <motion.div
    className="native-colour-stage mastermentor-wireframe"
    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
    aria-hidden="true"
  >
    <div className="relative z-10">
      <div className="mb-3 h-2 w-20 rounded-full bg-slate-200 min-[1200px]:mb-4 min-[1200px]:h-2.5 min-[1200px]:w-28" />
      <div className="grid gap-2 min-[1200px]:gap-3">
        <ScholarshipMiniCard accent="#2563EB" soft="#EFF6FF" widthOne="82%" widthTwo="62%" footer="38%" />
        <ScholarshipMiniCard accent="#059669" soft="rgba(5,150,105,0.10)" widthOne="72%" widthTwo="50%" footer="30%" />
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2 min-[1200px]:mt-3 min-[1200px]:gap-3">
        <div className="mastermentor-small-tile border border-dashed border-slate-300 bg-slate-50">
          <Upload className="h-3.5 w-3.5 native-colour-stage text-[#2563EB] min-[1200px]:h-4 min-[1200px]:w-4" />
          <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.06em] text-slate-600 min-[1200px]:mt-3 min-[1200px]:text-[9px] min-[1200px]:tracking-[0.08em]">Dropbox</p>
        </div>
        <div className="mastermentor-small-tile border border-slate-200 bg-white">
          <BookOpen className="h-3.5 w-3.5 native-colour-stage text-[#059669] min-[1200px]:h-4 min-[1200px]:w-4" />
          <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.06em] text-slate-600 min-[1200px]:mt-3 min-[1200px]:text-[9px] min-[1200px]:tracking-[0.08em]">Resources</p>
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

      <div className="product-preview-layout mastermentor-preview-layout" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        <div className="product-preview-copy mastermentor-preview-copy">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#2563EB] native-colour-stage">
            <Target className="h-3.5 w-3.5" />
            Structured academic progression
          </div>

          <h3 className="product-preview-title mastermentor-preview-title text-[#0F172A]">
            The academic system is chaotic. <span className="native-colour-stage text-[#2563EB]">Your workflow should not be.</span>
          </h3>
          <p className="product-preview-description max-w-[370px] text-[#475569]">
            From understanding the flow of your applications to utilizing core tools to claim the opportunities being offered, Master Mentor gives you a single, highly structured workspace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={product.website}
              target="_blank"
              rel="noreferrer"
              className="native-colour-stage inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-[10px] font-medium text-white visited:text-white active:text-white focus:text-white hover:text-white shadow-[0_4px_14px_rgba(37,99,235,0.15)] transition duration-500 hover:bg-[#1D4ED8] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
            >
              View Full Website
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="product-preview-feature-grid">
            {[
              ['Scholarships', Search, '#2563EB'],
              ['Review', CheckCircle2, '#059669'],
              ['Resources', Database, '#2563EB'],
            ].map(([label, Icon, color]) => (
              <div key={label} className="native-colour-stage mastermentor-feature-card">
                <Icon className="h-3.5 w-3.5 min-[1200px]:h-4 min-[1200px]:w-4" style={{ color }} />
                <p className="mt-2 text-center text-[6.8px] font-semibold uppercase leading-tight tracking-[0.05em] text-slate-500 min-[1200px]:mt-2.5 min-[1200px]:text-[8px] min-[1200px]:tracking-[0.08em]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="product-preview-side mastermentor-device-slot">
          <MasterMentorWireframe />
        </div>
      </div>
    </ProductPreviewFrame>
  );
};

export default MasterMentorPreview;
