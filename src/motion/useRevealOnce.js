import { useEffect, useRef, useState } from 'react';
import { motionViewport } from './motionTokens.js';
import useMotionProfile from './useMotionProfile.js';

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
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

    if (rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.04) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        root,
        rootMargin: rootMargin ?? (profile.useSimpleMobileMotion ? motionViewport.revealMarginMobile : motionViewport.revealMargin),
        threshold: threshold ?? (profile.useSimpleMobileMotion ? motionViewport.revealAmountMobile : motionViewport.revealAmount),
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disabled, profile.enableMotion, profile.useSimpleMobileMotion, root, rootMargin, threshold]);

  return {
    ref: elementRef,
    isVisible,
    profile,
  };
};

export default useRevealOnce;
