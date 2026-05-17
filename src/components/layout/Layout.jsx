import React from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';

const pageEase = [0.22, 1, 0.36, 1];

const pageMotion = {
  initial: {
    opacity: 0,
    y: 22,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: pageEase,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: {
      duration: 0.3,
      ease: pageEase,
    },
  },
};

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-slate-900 overflow-x-hidden">
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
