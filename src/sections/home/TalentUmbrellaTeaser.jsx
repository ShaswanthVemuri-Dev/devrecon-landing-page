import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MotionLink = motion(Link);
const ease = [0.22, 1, 0.36, 1];

const TalentUmbrellaTeaser = () => {
  return (
    <section id="talent-umbrella-preview" className="py-16 md:py-28 px-6 bg-[#F5F5F7] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.045]">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 border border-black rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-50px] left-[-50px] w-96 h-96 border border-black rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-relaxed text-[#111111] text-balance">
            An umbrella for ethical technical talent.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-loose tracking-wide font-light">
            Talent Umbrella is DevReCon&apos;s support model for builders, freelancers, founders, and technical people through direction, documentation, development planning, and operational clarity around their work.
          </p>

          <div className="flex flex-col items-center gap-6">
            <MotionLink
              to="/company#talent-umbrella"
              whileHover={{ y: -3, scale: 1.012 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.28, ease }}
              style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
              className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-10 py-5 text-lg font-semibold tracking-wide text-white no-underline shadow-sm outline-none transition-[background-color,box-shadow] duration-300 hover:bg-[#1B1B1B] hover:text-white hover:shadow-xl active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
            >
              Explore Talent Umbrella
              <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </MotionLink>
            <p className="text-sm text-gray-500 font-medium tracking-wide max-w-lg">
              Ownership, support scope, and collaboration terms are handled transparently based on the nature of each project.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TalentUmbrellaTeaser;
