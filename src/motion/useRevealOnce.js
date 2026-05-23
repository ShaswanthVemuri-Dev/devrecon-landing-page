import { useEffect, useRef, useState } from 'react';
import { motionViewport } from './motionTokens.js';
import useMotionProfile from './useMotionProfile.js';

const runAfterInitialPaint = (callback) => {
  let firstFrame = 0;
  let secondFrame = 0;

  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(callback);
  });

  return () => {
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
  };
};

const useRevealOnce = ({
  root = null,
  rootMargin = motionViewport.revealMargin,
  threshold = motionViewport.revealAmount,
  disabled = false,
} = {}) => {
  const elementRef = useRef(null);
  const cleanupFrameRef = useRef(null);
  const profile = useMotionProfile();
  const [isVisible, setIsVisible] = useState(() => disabled || !profile.enableMotion);

  useEffect(() => {
    if (cleanupFrameRef.current) {
      cleanupFrameRef.current();
      cleanupFrameRef.current = null;
    }

    if (disabled || !profile.enableMotion) {
      setIsVisible(true);
      return undefined;
    }

    const element = elementRef.current;

    if (!element || typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const reveal = () => {
      if (cleanupFrameRef.current) return;
      cleanupFrameRef.current = runAfterInitialPaint(() => {
        setIsVisible(true);
        cleanupFrameRef.current = null;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.unobserve(entry.target);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (cleanupFrameRef.current) {
        cleanupFrameRef.current();
        cleanupFrameRef.current = null;
      }
    };
  }, [disabled, profile.enableMotion, root, rootMargin, threshold]);

  return {
    ref: elementRef,
    isVisible,
    profile,
  };
};

export default useRevealOnce;
