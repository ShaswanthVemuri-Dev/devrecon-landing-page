import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/motion/Reveal.jsx';

const CompanyCTA = () => {
  return (
    <section className="relative px-6 pt-8 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-center gap-8 rounded-[2rem] border border-gray-100 bg-[#F5F5F7] p-8 md:rounded-[2.5rem] md:p-12 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-14">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Start with clarity
            </p>
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter text-[#111111] text-balance md:text-5xl">
              Have an idea, workflow, or system ready to move forward?
            </h2>
            <p className="mt-6 max-w-3xl text-base font-light leading-loose tracking-wide text-gray-600 md:text-lg">
              Start with the problem. We will help define the technical path, scope, and next practical step.
            </p>
          </div>

          <a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20DevReCon%20Company%20Page"
            className="motion-button motion-pill motion-pill-dark inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none md:text-base lg:w-auto"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="motion-action-arrow h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanyCTA;
