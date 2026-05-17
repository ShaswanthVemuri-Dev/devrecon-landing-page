import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const FounderProfile = () => {
  return (
    <section className="relative px-6 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, ease }}
          className="group rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-4 md:p-5 shadow-[0_22px_72px_rgba(17,17,17,0.045)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(17,17,17,0.075)]"
        >
          <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5, ease }}
              className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-auto lg:min-h-full overflow-hidden rounded-[1.6rem] bg-[#111111]"
            >
              <img
                src="/founder/shaswanth-vemuri.webp"
                alt="Shaswanth Vemuri, Founder and CEO of DevReCon"
                className="absolute inset-0 h-full w-full object-cover object-[50%_24%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/0 to-white/5" />
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
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
