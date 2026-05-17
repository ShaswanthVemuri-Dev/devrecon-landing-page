// DevReCon Products mini-site infographic refinement, 2026-05-17
// Source version: miniature MyMedicals and Master Mentor homepage previews with cleaned navigation and menus.
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Database,
  FlaskConical,
  Menu,
  Search,
  ShieldCheck,
  Stethoscope,
  Target,
  Upload,
  Users,
  X,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const premiumEase = [0.22, 1, 0.36, 1];

const PREVIEW_ASSETS = {
  mymedicals: {
    logo: '/product-previews/mymedicals/logo.png',
    phoneHero: '/product-previews/mymedicals/phone-hero.png',
    phoneReminders: '/product-previews/mymedicals/phone-reminders.png',
  },
  mastermentor: {
    logo: '/product-previews/mastermentor/logo.png',
    darkLogo: '/product-logos/mastermentor-mark-bw.png',
  },
};

const PRODUCT_THEME = {
  mymedicals: {
    primary: '#4A90E2',
    secondary: '#66C72A',
    tertiary: '#FFBA43',
  },
  mastermentor: {
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    soft: '#EFF6FF',
    success: '#059669',
    canvas: '#F8FAFC',
    heading: '#0F172A',
    body: '#475569',
    muted: '#64748B',
    border: '#E2E8F0',
  },
};

const PreviewStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @keyframes devreconPreviewTide {
      0% { transform: translateX(-3%) translateY(0) scale(1); }
      50% { transform: translateX(3%) translateY(-2%) scale(1.035); }
      100% { transform: translateX(-3%) translateY(0) scale(1); }
    }

    @keyframes devreconPreviewTideDelayed {
      0% { transform: translateX(3%) translateY(1%) scale(1.035); }
      50% { transform: translateX(-3%) translateY(-1%) scale(1); }
      100% { transform: translateX(3%) translateY(1%) scale(1.035); }
    }

    @keyframes devreconMiniNavItemIn {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes devreconFloatSoft {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes devreconProgressPulse {
      0% { width: 34%; }
      52% { width: 84%; }
      100% { width: 52%; }
    }

    .product-preview-card {
      isolation: isolate;
    }

    .product-preview-card::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 70;
      pointer-events: none;
      border-radius: inherit;
      background: rgba(14, 14, 16, 0.025);
      -webkit-backdrop-filter: grayscale(0.9) saturate(0.18) sepia(0.045) hue-rotate(178deg) contrast(1.02);
      backdrop-filter: grayscale(0.9) saturate(0.18) sepia(0.045) hue-rotate(178deg) contrast(1.02);
      opacity: 1;
      transition: opacity 1850ms cubic-bezier(.22,1,.36,1);
      will-change: opacity;
    }

    .product-preview-card:hover::after,
    .product-preview-card[data-menu-open="true"]::after {
      opacity: 0;
    }

    .product-preview-card .native-colour-stage {
      filter: grayscale(0) saturate(1) sepia(0) hue-rotate(0deg) contrast(1);
      transition-property: opacity, color, background-color, border-color, box-shadow, transform !important;
      transition-duration: 1450ms !important;
      transition-timing-function: cubic-bezier(.22,1,.36,1) !important;
    }

    .product-preview-card .colour-logo {
      filter: grayscale(0) saturate(1) sepia(0) hue-rotate(0deg) contrast(1);
      transition-property: opacity, transform !important;
      transition-duration: 1450ms !important;
      transition-timing-function: cubic-bezier(.22,1,.36,1) !important;
    }

    .product-preview-card .native-colour-stage *,
    .product-preview-card .colour-logo * {
      transition-duration: 1450ms !important;
      transition-timing-function: cubic-bezier(.22,1,.36,1) !important;
    }

    .mini-mymed-nav-pill::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 220ms ease;
      background: radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(74,144,226,0.24), rgba(74,144,226,0.10) 35%, transparent 70%);
    }

    .mini-mymed-nav-pill:hover::before,
    .mini-mymed-nav-pill:focus-visible::before {
      opacity: 1;
    }

    .mini-mobile-menu[data-open="true"] .mini-mobile-menu-item {
      animation: devreconMiniNavItemIn 850ms cubic-bezier(.22,1,.36,1) both;
      animation-delay: var(--d, 0ms);
    }

    .devrecon-float-soft { animation: devreconFloatSoft 6.4s ease-in-out infinite; }
    .devrecon-progress-pulse { animation: devreconProgressPulse 4.8s ease-in-out infinite; }
    .devrecon-tide { animation: devreconPreviewTide 26s ease-in-out infinite; }
    .devrecon-tide-delayed { animation: devreconPreviewTideDelayed 30s ease-in-out infinite; }

    @media (prefers-reduced-motion: reduce) {
      .product-preview-card *,
      .product-preview-card *::before,
      .product-preview-card *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
);

const ShellGlow = ({ productId }) => {
  const theme = PRODUCT_THEME[productId];

  if (productId === 'mymedicals') {
    return (
      <>
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="native-colour-stage absolute top-[8%] -left-[34%] h-[62%] w-[120%] rounded-full opacity-[0.16] blur-[98px] devrecon-tide" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(74,144,226,0.56), rgba(102,199,42,0.16) 42%, transparent 72%)' }} />
        <div className="native-colour-stage absolute bottom-[-7%] -right-[30%] h-[62%] w-[90%] rounded-full opacity-[0.15] blur-[92px] devrecon-tide-delayed" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(74,144,226,0.46), rgba(255,186,67,0.14) 45%, transparent 74%)' }} />
        <div className="native-colour-stage absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(74,144,226,0.52),transparent_56%)] opacity-60" />
        <div className="absolute inset-[1px] rounded-[2.45rem] border border-white/[0.06]" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div className="native-colour-stage absolute inset-0 opacity-100" style={{ background: `radial-gradient(circle at 82% 18%, ${theme.soft}, transparent 32%), radial-gradient(circle at 18% 82%, rgba(37,99,235,0.08), transparent 36%), linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)` }} />
      <div className="absolute inset-[1px] rounded-[2.45rem] border border-slate-200/80" />
    </>
  );
};

const MiniMenuButton = ({ open, onClick, variant = 'dark', accent = '#4A90E2', label }) => {
  const dark = variant === 'dark';

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      className={[
        'relative z-50 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition duration-500 focus:outline-none focus-visible:ring-2',
        dark
          ? 'border border-white/10 bg-transparent text-white hover:bg-white/[0.06] focus-visible:ring-[#4A90E2]/50'
          : 'border border-slate-300 bg-white text-slate-900 shadow-sm hover:border-slate-900 focus-visible:ring-[#2563EB]/40',
      ].join(' ')}
    >
      <AnimatePresence>
        {open ? (
          <motion.span
            key="mini-menu-ripple"
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: accent }}
            initial={{ scale: 0.35, opacity: dark ? 0.34 : 0.18 }}
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
};

const ProductPreviewFrame = ({ product, open, children, variant = 'mymedicals' }) => {
  return (
    <motion.div
      data-menu-open={open ? 'true' : 'false'}
      className="product-preview-card group relative overflow-hidden rounded-[2.5rem] border border-[#242424] bg-[#0E0E10] shadow-[0_30px_92px_rgba(0,0,0,0.24)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.74, ease }}
      aria-label={`${product.name} miniature homepage preview`}
    >
      <ShellGlow productId={variant} />
      <div className="relative z-10 min-h-[560px] overflow-hidden rounded-[2.5rem]">
        {children}
      </div>
    </motion.div>
  );
};

const MyMedicalsBrand = ({ website }) => (
  <a href={website} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1E] shadow-lg">
      <img
        src={PREVIEW_ASSETS.mymedicals.logo}
        alt="MyMedicals logo"
        className="colour-logo h-full w-full object-contain"
        draggable={false}
      />
    </div>
    <span className="truncate text-[0.8rem] font-semibold leading-none tracking-[0.18em] text-white sm:text-sm">
      MyMedicals
    </span>
  </a>
);

const MyMedicalsMiniNav = ({ open, setOpen, product }) => (
  <div
    className={[
      'absolute inset-x-0 top-0 z-40 overflow-hidden border-b border-white/5 backdrop-blur-xl transition-[height,background-color] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]',
      open ? 'h-full bg-black/94' : 'h-20 bg-black/70',
    ].join(' ')}
  >
    <div className="relative z-20 flex h-20 items-center justify-between px-5 sm:px-6">
      <MyMedicalsBrand website={product.website} />
      <div className="flex items-center gap-3">
        <MiniMenuButton
          open={open}
          onClick={() => setOpen((value) => !value)}
          accent={PRODUCT_THEME.mymedicals.primary}
          label={open ? 'Close MyMedicals sections' : 'Open MyMedicals sections'}
        />
      </div>
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
            <button
              key={item}
              type="button"
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
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MyMedicalsPhone = () => (
  <motion.div
    className="relative mx-auto h-[324px] w-[156px] rounded-[1.72rem] border-[5px] border-[#2C2C2C] bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.48)] ring-1 ring-white/10 sm:h-[350px] sm:w-[168px] sm:rounded-[1.9rem]"
    aria-hidden="true"
  >
    <div className="relative h-full overflow-hidden rounded-[1.36rem] bg-[#050505] sm:rounded-[1.5rem]">
      <img
        src={PREVIEW_ASSETS.mymedicals.phoneHero}
        alt=""
        className="native-colour-stage absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
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

const MyMedicalsHomepagePreview = ({ product }) => {
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
                  <Icon className="h-3.5 w-3.5 native-colour-stage" style={{ color }} />
                  {label}
                </span>
              ))}
            </div>

            <h3 className="max-w-[360px] text-[2.08rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[2.55rem]">
              Medication adherence, built for families.
            </h3>
            <p className="mt-5 max-w-[335px] text-sm font-normal leading-[1.62] tracking-wide text-[#A1A1AA] transition duration-500 group-hover:text-[#D4D4D8]">
              Stay on track. Stay in control. A privacy-first ecosystem for you and your loved ones.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={product.website}
                target="_blank"
                rel="noreferrer"
                className="native-colour-stage inline-flex items-center gap-2 rounded-full bg-[#4A90E2] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(74,144,226,0.20)] transition duration-500 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]/50"
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

const MasterMentorBrand = ({ website }) => (
  <a href={website} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
      <img
        src={PREVIEW_ASSETS.mastermentor.darkLogo}
        alt="Master Mentor logo"
        className="absolute h-[82%] w-[82%] object-contain opacity-100 transition duration-700 group-hover:opacity-0"
        draggable={false}
      />
      <img
        src={PREVIEW_ASSETS.mastermentor.logo}
        alt=""
        className="absolute h-[78%] w-[78%] object-contain opacity-0 transition duration-700 group-hover:opacity-100"
        draggable={false}
      />
    </div>
    <span className="truncate text-[0.84rem] font-semibold tracking-tight text-slate-900 sm:text-[0.92rem]">
      Master Mentor
    </span>
  </a>
);

const MasterMentorHeader = ({ open, setOpen, product }) => (
  <div className="absolute inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl">
    <div className="flex h-20 items-center justify-between px-5 sm:px-6">
      <MasterMentorBrand website={product.website} />

      <div className="flex items-center gap-2.5">
        <MiniMenuButton
          open={open}
          onClick={() => setOpen((value) => !value)}
          accent={PRODUCT_THEME.mastermentor.primary}
          variant="light"
          label={open ? 'Close Master Mentor sections' : 'Open Master Mentor sections'}
        />
      </div>
    </div>
  </div>
);

const MasterMentorMenu = ({ open, product }) => (
  <div
    data-open={open ? 'true' : 'false'}
    className={[
      'absolute inset-0 z-30 bg-white/96 pt-20 backdrop-blur-xl transition-opacity duration-[720ms] ease-[cubic-bezier(.22,1,.36,1)] [backface-visibility:hidden] [transform:translateZ(0)] will-change-[opacity]',
      open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
    ].join(' ')}
  >
    <div className="flex h-full flex-col justify-center px-6 pb-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      <div className="mx-auto w-full max-w-[340px] space-y-3.5">
        {['Scholarships', 'Mentorship', 'Guided excellence', 'Review Dropbox', 'Resources'].map((item, index) => (
          <button
            type="button"
            key={item}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left text-[12px] font-semibold text-slate-900 opacity-100 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-[border-color,background-color] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-[#2563EB]/35 hover:bg-[#EFF6FF]"
            style={{ transitionDelay: '0ms' }}
          >
            <span>{item}</span>
            <ChevronRight className="h-4 w-4 text-[#2563EB]" />
          </button>
        ))}

        <a
          href={product.website}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex w-full items-center justify-center rounded-full bg-[#2563EB] px-5 py-3 text-[12px] font-semibold text-white opacity-100 shadow-[0_6px_20px_rgba(37,99,235,0.25)] transition-colors duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[#1D4ED8]"
          style={{ transitionDelay: '0ms' }}
        >
          View Full Website
        </a>
      </div>
    </div>
  </div>
);

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
          <Upload className="h-4 w-4 native-colour-stage text-[#2563EB]" />
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Dropbox</p>
        </div>
        <div className="rounded-[14px] border border-slate-200 bg-white p-3">
          <BookOpen className="h-4 w-4 native-colour-stage text-[#059669]" />
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Resources</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const MasterMentorHomepagePreview = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <ProductPreviewFrame product={product} open={open} variant="mastermentor">
      <div className="native-colour-stage absolute inset-0" />
      <MasterMentorHeader open={open} setOpen={setOpen} product={product} />
      <MasterMentorMenu open={open} product={product} />

      <div className="relative z-10 grid min-h-[560px] items-center gap-6 px-5 pb-7 pt-24 sm:px-7 md:grid-cols-[1fr_0.83fr] md:px-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        <div className="relative max-w-[390px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#2563EB] native-colour-stage">
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
              className="native-colour-stage inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-[10px] font-medium text-white shadow-[0_4px_14px_rgba(37,99,235,0.15)] transition duration-500 hover:bg-[#1D4ED8] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
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

const ProductDiagram = ({ product }) => {
  if (product.id === 'mymedicals') return <MyMedicalsHomepagePreview product={product} />;
  return <MasterMentorHomepagePreview product={product} />;
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
        <ProductDiagram product={product} />
      </div>
    </motion.article>
  );
};

const ProductShowcase = ({ products }) => {
  return (
    <section className="relative px-6 pb-24 md:pb-36">
      <PreviewStyles />
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
