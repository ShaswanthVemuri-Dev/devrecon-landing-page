import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollToY } from './RouteScrollManager.jsx';

const FALLBACK_VISIBILITY_RATIO = 0.72;
const HERO_OFFSET_BUFFER = 88;
const MIN_VISIBILITY_OFFSET = 280;

const getScrollTopVisibilityOffset = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 500;
  }

  const routeShell = document.querySelector('.route-transition-shell:not(.is-exiting)');
  const firstSection = routeShell?.querySelector('section');

  if (firstSection) {
    const rect = firstSection.getBoundingClientRect();
    const sectionBottom = rect.top + window.scrollY + rect.height;
    return Math.max(MIN_VISIBILITY_OFFSET, sectionBottom - HERO_OFFSET_BUFFER);
  }

  return Math.max(MIN_VISIBILITY_OFFSET, window.innerHeight * FALLBACK_VISIBILITY_RATIO);
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const frameRef = useRef(null);
  const thresholdRef = useRef(MIN_VISIBILITY_OFFSET);

  useEffect(() => {
    const refreshThreshold = () => {
      thresholdRef.current = getScrollTopVisibilityOffset();
    };

    const updateVisibility = () => {
      frameRef.current = null;
      refreshThreshold();
      const nextVisible = window.scrollY >= thresholdRef.current;

      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    refreshThreshold();
    updateVisibility();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate, { once: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
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
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top-button fixed z-50 rounded-full bg-[#111111] text-white hover:bg-[#111111] ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp className="scroll-to-top-icon h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
