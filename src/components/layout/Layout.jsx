import React from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';
import { motionDuration, motionEase } from '../../motion/motionTokens.js';
import useMotionProfile from '../../motion/useMotionProfile.js';

const createPageMotion = ({ enableMotion, useSimpleMobileMotion }) => {
  if (!enableMotion) {
    return {
      initial: false,
      animate: false,
      exit: false,
    };
  }

  const enterDuration = useSimpleMobileMotion ? motionDuration.pageEnterMobile : motionDuration.pageEnter;

  return {
    initial: {
      opacity: 0,
      y: useSimpleMobileMotion ? 6 : 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: enterDuration,
        ease: motionEase.soft,
      },
    },
    exit: {
      opacity: 0,
      y: useSimpleMobileMotion ? -4 : -6,
      transition: {
        duration: motionDuration.pageExit,
        ease: motionEase.quick,
      },
    },
  };
};

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const motionProfile = useMotionProfile();
  const pageMotion = createPageMotion(motionProfile);

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-hidden bg-white text-slate-900">
        <RouteScrollManager />
        <Navbar />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>

        <Footer />
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
};

export default Layout;
