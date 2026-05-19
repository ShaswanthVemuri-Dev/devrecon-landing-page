import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useScrollMotion from '../../hooks/useScrollMotion.js';
import useDesktopInteraction from '../../hooks/useDesktopInteraction.js';

const MotionLink = motion(Link);
const ease = [0.22, 1, 0.36, 1];

const TalentUmbrellaTeaser = () => {
  const enableScrollMotion = useScrollMotion();
  const enableHoverMotion = useDesktopInteraction();

  return (
    <section id="talent-umbrella-preview" className="relative overflow-hidden bg-[#F5F5F7] px-6 py-16 md:py-24 xl:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.045]">
        <motion.div
          className="absolute right-8 top-10 h-40 w-40 rounded-full border border-black sm:h-52 sm:w-52 md:right-10 md:h-64 md:w-64"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-50px] left-[-50px] h-64 w-64 rounded-full border border-black sm:h-80 sm:w-80 md:h-96 md:w-96"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={enableScrollMotion ? { opacity: 0, y: 24 } : false}
          whileInView={enableScrollMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.72, ease }}
        >
          <h2 className="mb-8 text-3xl font-bold leading-relaxed tracking-tight text-[#111111] text-balance sm:text-4xl xl:text-5xl">
            An umbrella for ethical technical talent.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-base font-light leading-loose tracking-wide text-gray-600 sm:text-lg lg:text-xl">
            Talent Umbrella is DevReCon&apos;s support model for builders, freelancers, founders, and technical people through direction, documentation, development planning, and operational clarity around their work.
          </p>

          <div className="flex flex-col items-center gap-6">
            <MotionLink
              to="/company#talent-umbrella"
              whileHover={enableHoverMotion ? { y: -3, scale: 1.012 } : undefined}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.28, ease }}
              style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-5 text-base font-semibold tracking-wide text-white no-underline shadow-sm outline-none transition-[background-color,box-shadow] duration-300 hover:bg-[#1B1B1B] hover:text-white hover:shadow-xl active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none sm:w-auto sm:px-10 sm:text-lg"
            >
              Explore Talent Umbrella
              <ChevronRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
            </MotionLink>
            <p className="max-w-lg text-sm font-medium tracking-wide text-gray-500">
              Ownership, support scope, and collaboration terms are handled transparently based on the nature of each project.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TalentUmbrellaTeaser;
