import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];


const useDesktopInteraction = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return enabled;
};

const FounderProfile = () => {
  const enableHoverMotion = useDesktopInteraction();
  return (
    <section id="founder-profile" className="relative scroll-mt-28 px-6 py-12 md:scroll-mt-32 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, ease }}
          className="group rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-4 shadow-[0_22px_72px_rgba(17,17,17,0.045)] transition-shadow duration-500 md:p-5 motion-safe:hover:shadow-[0_30px_90px_rgba(17,17,17,0.075)] lg:hover:-translate-y-1"
        >
          <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
            <motion.div
              whileHover={enableHoverMotion ? { scale: 1.01 } : undefined}
              transition={{ duration: 0.5, ease }}
              className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-auto lg:min-h-full overflow-hidden rounded-[1.6rem] bg-[#111111]"
            >
              <img
                src="/founder/shaswanth-vemuri.webp"
                alt="Shaswanth Vemuri, Founder and CEO of DevReCon"
                className="absolute inset-0 h-full w-full object-cover object-[50%_24%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:lg:group-hover:scale-[1.025]"
                loading="lazy"
                decoding="async"
                width="900"
                height="1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/0 to-white/5" />
            </motion.div>

            <motion.div
              whileHover={enableHoverMotion ? { y: -2 } : undefined}
              transition={{ duration: 0.45, ease }}
              className="flex h-full flex-col justify-center rounded-[1.6rem] border border-gray-100 bg-white p-6 md:p-8 lg:p-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5">
                Founder Profile
              </p>

              <h2 className="max-w-3xl text-3xl md:text-5xl font-bold tracking-tighter leading-[1.08] text-[#111111] text-balance">
                Shaped by a builder&apos;s way of thinking.
              </h2>

              <div className="mt-6 border-l border-gray-200 pl-5">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
                  Shaswanth Vemuri
                </h3>
                <p className="mt-2 text-sm md:text-base font-medium tracking-wide text-gray-500">
                  Founder and CEO, DevReCon
                </p>
              </div>

              <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-600 font-light leading-loose tracking-wide">
                Shaswanth Vemuri is the Founder and CEO of DevReCon. Currently pursuing Engineering Physics at McMaster University in Canada with a minor in Economics, Shaswanth also has academic work in AI, ML, and Data Science through IIT Mandi. His work spans software development, AI systems, UI and UX design, 3D design, creative media, automation workflows, applied research, quantum physics exploration, and practical problem solving.
              </p>

              <a
                href="https://www.linkedin.com/in/shaswanthvemuri"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-[#111111] border-b border-[#111111]/25 pb-1 transition-all duration-300 hover:gap-3 hover:border-[#111111]"
              >
                View LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderProfile;
