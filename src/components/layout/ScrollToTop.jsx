import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollToY } from './RouteScrollManager.jsx';

const getVisibilityOffset = () => {
  if (typeof window === 'undefined') return 520;
  const firstSection = document.querySelector('main > section:first-of-type, section:first-of-type');
  const sectionHeight = firstSection?.getBoundingClientRect?.().height || window.innerHeight * 0.72;
  return Math.max(360, Math.round(sectionHeight * 0.82));
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const thresholdRef = useRef(520);
  const frameRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      frameRef.current = null;
      const nextVisible = window.scrollY > thresholdRef.current;

      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    const refreshThreshold = () => {
      thresholdRef.current = getVisibilityOffset();
      scheduleUpdate();
    };

    refreshThreshold();
    const thresholdTimer = window.setTimeout(refreshThreshold, 500);

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', refreshThreshold);
    window.addEventListener('orientationchange', refreshThreshold);

    return () => {
      window.clearTimeout(thresholdTimer);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', refreshThreshold);
      window.removeEventListener('orientationchange', refreshThreshold);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    smoothScrollToY(0, 960);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button fixed z-50 rounded-full bg-[#111111] text-white hover:bg-[#111111] ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <span className="scroll-to-top-icon-shell">
        <ArrowUp className="scroll-to-top-icon h-5 w-5" />
      </span>
    </button>
  );
};

export default ScrollToTop;
