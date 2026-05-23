import { useEffect, useRef, useState } from 'react';
import { motionViewport } from './motionTokens.js';
import useMotionProfile from './useMotionProfile.js';

let revealQueue = [];
let revealFrame = 0;

const flushRevealQueue = () => {
  revealFrame = 0;
  const batch = revealQueue.splice(0, 10);

  batch.forEach((item, index) => {
    if (item.cancelled) return;

    const timeout = window.setTimeout(() => {
      if (!item.cancelled) item.callback();
    }, item.delay + index * item.stagger);

    item.timeout = timeout;
  });

  if (revealQueue.length > 0) {
    revealFrame = window.requestAnimationFrame(flushRevealQueue);
  }
};

const enqueueReveal = (callback, { delay = 0, stagger = 34 } = {}) => {
  const item = {
    callback,
    delay,
    stagger,
    timeout: 0,
    cancelled: false,
  };

  revealQueue.push(item);

  if (!revealFrame) {
    revealFrame = window.requestAnimationFrame(() => {
      revealFrame = window.requestAnimationFrame(flushRevealQueue);
    });
  }

  return () => {
    item.cancelled = true;
    if (item.timeout) window.clearTimeout(item.timeout);
  };
};

const resolveRevealSettings = (profile, rootMargin, threshold) => {
  if (profile.useSimpleMobileMotion) {
    return {
      rootMargin: rootMargin ?? motionViewport.revealMarginMobile,
      threshold: threshold ?? motionViewport.revealAmountMobile,
      delay: 46,
      stagger: 26,
    };
  }

  if (profile.useTabletRevealMotion) {
    return {
      rootMargin: rootMargin ?? motionViewport.revealMarginTablet,
      threshold: threshold ?? motionViewport.revealAmountTablet,
      delay: 34,
      stagger: 32,
    };
  }

  return {
    rootMargin: rootMargin ?? motionViewport.revealMargin,
    threshold: threshold ?? motionViewport.revealAmount,
    delay: 28,
    stagger: 36,
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

    let cancelQueuedReveal = null;
    const settings = resolveRevealSettings(profile, rootMargin, threshold);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);
        cancelQueuedReveal = enqueueReveal(() => setIsVisible(true), {
          delay: settings.delay,
          stagger: settings.stagger,
        });
      },
      {
        root,
        rootMargin: settings.rootMargin,
        threshold: settings.threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelQueuedReveal?.();
    };
  }, [disabled, profile.enableMotion, profile.useSimpleMobileMotion, profile.useTabletRevealMotion, root, rootMargin, threshold]);

  return {
    ref: elementRef,
    isVisible,
    profile,
  };
};

export default useRevealOnce;
