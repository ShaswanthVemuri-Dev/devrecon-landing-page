import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/motion/Reveal.jsx';
import publicAsset from '../../utils/assetPaths.js';

const FounderProfile = () => {
  return (
    <section id="founder-profile" className="relative scroll-mt-28 px-6 py-14 md:scroll-mt-32 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="motion-surface rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-4 shadow-[0_22px_72px_rgba(17,17,17,0.045)] transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(17,17,17,0.075)] md:p-5">
          <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
            <div className="motion-surface relative h-[300px] overflow-hidden rounded-[1.6rem] bg-[#111111] sm:h-[340px] md:h-[380px] lg:h-auto lg:min-h-full">
              <img
                src={publicAsset('founder/shaswanth-vemuri.webp')}
                alt="Shaswanth Vemuri, Founder and CEO of DevReCon"
                className="absolute inset-0 h-full w-full object-cover object-[50%_24%]"
                loading="lazy"
                decoding="async"
                width="1112"
                height="1600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/0 to-white/5" />
            </div>

            <div className="motion-surface flex h-full flex-col justify-center rounded-[1.6rem] border border-gray-100 bg-white p-6 md:p-8 lg:p-10">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                Founder Profile
              </p>

              <h2 className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance md:text-5xl">
                Shaped by a builder&apos;s way of thinking.
              </h2>

              <div className="mt-6 border-l border-gray-200 pl-5">
                <h3 className="text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                  Shaswanth Vemuri
                </h3>
                <p className="mt-2 text-sm font-medium tracking-wide text-gray-500 md:text-base">
                  Founder and CEO, DevReCon
                </p>
              </div>

              <p className="mt-6 max-w-3xl text-base font-light leading-loose tracking-wide text-gray-600 md:text-lg">
                Shaswanth Vemuri is the Founder and CEO of DevReCon. Currently pursuing Engineering Physics at McMaster University in Canada with a minor in Economics, Shaswanth also has academic work in AI, ML, and Data Science through IIT Mandi. His work spans software development, AI systems, UI and UX design, 3D design, creative media, automation workflows, applied research, quantum physics exploration, and practical problem solving.
              </p>

              <a
                href="https://www.linkedin.com/in/shaswanthvemuri"
                target="_blank"
                rel="noreferrer"
                className="motion-underline-action mt-7 inline-flex w-fit items-center gap-2 border-b border-[#111111]/25 pb-1 text-sm font-semibold tracking-wide text-[#111111] hover:gap-3 hover:border-[#111111]"
              >
                View LinkedIn
                <ArrowUpRight className="motion-action-arrow h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FounderProfile;
