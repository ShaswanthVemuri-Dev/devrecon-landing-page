import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollToY } from './RouteScrollManager.jsx';

const VISIBILITY_OFFSET = 500;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      frameRef.current = null;
      const nextVisible = window.scrollY > VISIBILITY_OFFSET;

      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
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
      className={`scroll-to-top-button motion-button motion-pill fixed z-50 rounded-full bg-[#111111] text-white hover:bg-[#111111] ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <span>
        <ArrowUp className="motion-action-arrow h-5 w-5" />
      </span>
    </button>
  );
};

export default ScrollToTop;
