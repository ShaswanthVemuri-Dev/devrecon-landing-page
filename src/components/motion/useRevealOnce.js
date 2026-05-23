import { useEffect, useRef, useState } from 'react';
import { motionViewport } from './motionTokens.js';
import useMotionProfile from './useMotionProfile.js';

const scheduleVisible = (callback, delay = 0) => {
  let frame = 0;
  let timer = 0;

  frame = window.requestAnimationFrame(() => {
    timer = window.setTimeout(callback, delay);
  });

  return () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timer);
  };
};

const useRevealOnce = ({
  root = null,
  rootMargin,
  threshold,
  disabled = false,
} = {}) => {
  const elementRef = useRef(null);
  const profile = useMotionProfile();
  const [isVisible, setIsVisible] = useState(() => disabled || !profile.enableMotion);

  useEffect(() => {
    if (disabled || !profile.enableMotion) {
      setIsVisible(true);
      return undefined;
    }

    const element = elementRef.current;
    if (!element || typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const rect = element.getBoundingClientRect();

    if (rect.bottom < 0) {
      setIsVisible(true);
      return undefined;
    }

    let cancelScheduledReveal = null;
    const revealDelay = profile.useSimpleMobileMotion ? 80 : 50;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);
        cancelScheduledReveal = scheduleVisible(() => setIsVisible(true), revealDelay);
      },
      {
        root,
        rootMargin: rootMargin ?? (profile.useSimpleMobileMotion ? motionViewport.revealMarginMobile : motionViewport.revealMargin),
        threshold: threshold ?? (profile.useSimpleMobileMotion ? motionViewport.revealAmountMobile : motionViewport.revealAmount),
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelScheduledReveal?.();
    };
  }, [disabled, profile.enableMotion, profile.useSimpleMobileMotion, root, rootMargin, threshold]);

  return {
    ref: elementRef,
    isVisible,
    profile,
  };
};

export default useRevealOnce;
