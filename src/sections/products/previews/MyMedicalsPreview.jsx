import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Menu,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from 'lucide-react';
import ProductPreviewFrame from './ProductPreviewFrame.jsx';

const premiumEase = [0.22, 1, 0.36, 1];

const PREVIEW_ASSETS = {
  logo: '/product-previews/mymedicals/logo.png',
  phoneHero: '/product-previews/mymedicals/phone-hero.png',
};

const MiniMenuButton = ({ open, onClick }) => (
  <button
    type="button"
    aria-label={open ? 'Close MyMedicals sections' : 'Open MyMedicals sections'}
    aria-expanded={open}
    onClick={onClick}
    className="relative z-50 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent text-white transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50 hover:bg-white/[0.06]"
  >
    <AnimatePresence>
      {open ? (
        <motion.span
          key="mini-menu-ripple"
          className="absolute inset-0 rounded-full bg-[#4A90E2]"
          initial={{ scale: 0.35, opacity: 0.34 }}
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

const MyMedicalsBrand = ({ website }) => (
  <a
    href={website}
    target="_blank"
    rel="noreferrer"
    className="flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1E] shadow-lg">
      <img src={PREVIEW_ASSETS.logo} alt="MyMedicals logo" className="colour-logo h-full w-full object-contain" draggable={false} />
    </div>
    <span className="truncate text-[0.8rem] font-semibold leading-none tracking-[0.18em] text-white sm:text-sm">
      MyMedicals
    </span>
  </a>
);

const MyMedicalsMiniNav = ({ open, setOpen, product }) => {
  const closeWhenClickingBackdrop = (event) => {
    if (!open) return;
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    setOpen(false);
  };

  return (
    <div
      data-preview-menu="true"
      onClick={closeWhenClickingBackdrop}
      className={[
        'absolute inset-x-0 top-0 z-40 overflow-hidden border-b border-white/5 backdrop-blur-xl transition-[height,background-color] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]',
        open ? 'h-full bg-black/94' : 'h-20 bg-black/70',
      ].join(' ')}
    >
      <div className="relative z-20 flex h-20 items-center justify-between px-5 sm:px-6">
        <MyMedicalsBrand website={product.website} />
        <MiniMenuButton open={open} onClick={() => setOpen((value) => !value)} />
      </div>

      <div
        data-open={open ? 'true' : 'false'}
        className={[
          'mini-mobile-menu absolute inset-0 z-10 pt-20 transition-opacity duration-500',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <div className="flex h-full flex-col justify-center px-6 pb-8">
          <div className="mx-auto w-full max-w-2xl space-y-6">
            {['Consultation', 'Shared access', 'Lab request', 'Reminders', 'Adherence', 'Medical prescriptions'].map((item, index) => (
              <a
                key={item}
                href={product.website}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(false);
                }}
                className="mini-mobile-menu-item block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50"
                style={{ '--d': `${260 + index * 115}ms` }}
              >
                <div className="flex min-w-0 items-center justify-between rounded-full border border-white/0 bg-white/0 px-4 py-3.5 text-[#A1A1AA] transition duration-500 hover:border-white/10 hover:bg-white/5 hover:text-white">
                  <span className="truncate pr-4 text-[clamp(0.78rem,2.4vw,1rem)] font-semibold uppercase leading-none tracking-[0.14em]">
                    {item}
                  </span>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#4A90E2] shadow-[0_0_14px_rgba(74,144,226,0.55)]" />
                </div>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyMedicalsPhone = () => (
  <motion.div
    className="relative mx-auto h-[324px] w-[156px] rounded-[1.72rem] border-[5px] border-[#2C2C2C] bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.48)] ring-1 ring-white/10 sm:h-[350px] sm:w-[168px] sm:rounded-[1.9rem]"
    aria-hidden="true"
  >
    <div className="relative h-full overflow-hidden rounded-[1.36rem] bg-[#050505] sm:rounded-[1.5rem]">
      <img src={PREVIEW_ASSETS.phoneHero} alt="" className="native-colour-stage absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-40px_60px_rgba(0,0,0,0.48)]" />
      <div className="absolute left-1/2 top-[7px] z-30 flex w-full -translate-x-1/2 justify-center px-2">
        <div className="flex h-[29.6px] w-[160px] items-center overflow-hidden rounded-full bg-black shadow-[0_5px_16px_rgba(0,0,0,0.42)] sm:h-[31px] sm:w-[170px]">
          <div className="flex w-full items-center gap-[6px] px-[8px]">
            <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-white/10">
              <CheckCircle2 className="native-colour-stage h-[11px] w-[11px] text-[#66C72A]" />
            </span>
            <span className="min-w-0 flex-1 whitespace-nowrap text-left text-[7.2px] font-normal leading-none tracking-normal text-white/92 [word-spacing:1px] sm:text-[7.5px]">
              Anura took medication, B12
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const MyMedicalsPreview = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <ProductPreviewFrame product={product} open={open} variant="mymedicals">
      <MyMedicalsMiniNav open={open} setOpen={setOpen} product={product} />

      <div className="relative z-10 grid min-h-[560px] items-center gap-5 px-5 pb-7 pt-24 text-white sm:px-7 md:grid-cols-[1fr_0.74fr] md:px-8">
        <div className="relative max-w-[365px]">
          <motion.div
            className="native-colour-stage absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#4A90E2]/18 blur-3xl"
            animate={{ opacity: [0.4, 0.78, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                ['Privacy first', ShieldCheck, '#4A90E2'],
                ['Family sync', Users, '#66C72A'],
              ].map(([label, Icon, color]) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A1A1AA] transition duration-500 group-hover:text-white/86">
                  <Icon className="native-colour-stage h-3.5 w-3.5" style={{ color }} />
                  {label}
                </span>
              ))}
            </div>

            <h3 className="max-w-[360px] text-[2.08rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[2.55rem]">
              Medication adherence, built for families.
            </h3>
            <p className="preview-hover-text-light mt-5 max-w-[335px] text-sm font-normal leading-[1.62] tracking-wide text-[#A1A1AA] transition-colors duration-500">
              Stay on track. Stay in control. A privacy-first ecosystem for you and your loved ones.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={product.website}
                target="_blank"
                rel="noreferrer"
                className="product-hover-lift native-colour-stage inline-flex items-center gap-2 rounded-full bg-[#4A90E2] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white visited:text-white active:text-white focus:text-white hover:text-white shadow-[0_12px_32px_rgba(74,144,226,0.20)] transition-[transform,background-color] duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50"
              >
                View site
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-7 grid max-w-[340px] grid-cols-3 gap-2.5">
              {[
                ['Doctor', Stethoscope, '#4A90E2'],
                ['Alerts', BellRing, '#FFBA43'],
                ['Adherence', Activity, '#66C72A'],
              ].map(([label, Icon, color]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <Icon className="native-colour-stage h-4 w-4" style={{ color }} />
                  <p className="mt-2.5 text-[8.5px] font-bold uppercase tracking-[0.15em] text-white/58">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden justify-center md:flex">
          <div className="native-colour-stage absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A90E2]/16 blur-3xl" />
          <MyMedicalsPhone />
        </div>
      </div>
    </ProductPreviewFrame>
  );
};

export default MyMedicalsPreview;
