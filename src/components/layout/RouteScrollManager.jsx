import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HASH_RETRY_TIMEOUT = 1000;

const getNavbarOffset = () => {
  const nav = document.querySelector('nav');
  const navHeight = nav?.getBoundingClientRect?.().height || 76;
  return Math.ceil(navHeight + 18);
};

const getHashTarget = (hash) => {
  if (!hash) return null;

  const rawId = hash.replace('#', '');

  try {
    return document.getElementById(decodeURIComponent(rawId));
  } catch {
    return document.getElementById(rawId);
  }
};

const easeInOutCubic = (value) => (value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2);

let activeScrollAnimation = null;

export const cancelSmoothScroll = () => {
  if (!activeScrollAnimation) return;
  activeScrollAnimation.cancelled = true;
  window.cancelAnimationFrame(activeScrollAnimation.frame);
  activeScrollAnimation.cleanup?.();
  activeScrollAnimation = null;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const smoothScrollToY = (targetY, duration = 820) => {
  if (typeof window === 'undefined') return;

  cancelSmoothScroll();

  const resolvedTarget = Math.max(Math.round(targetY), 0);
  const startY = window.scrollY || document.documentElement.scrollTop || 0;
  const distance = resolvedTarget - startY;

  if (prefersReducedMotion() || Math.abs(distance) < 2) {
    window.scrollTo(0, resolvedTarget);
    return;
  }

  const startedAt = window.performance.now();
  const controller = { cancelled: false, frame: 0, cleanup: null };
  activeScrollAnimation = controller;

  const cancelOnUserInput = () => cancelSmoothScroll();
  const userInputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

  userInputEvents.forEach((eventName) => {
    window.addEventListener(eventName, cancelOnUserInput, { passive: true, once: true });
  });

  controller.cleanup = () => {
    userInputEvents.forEach((eventName) => {
      window.removeEventListener(eventName, cancelOnUserInput);
    });
  };

  const step = (now) => {
    if (controller.cancelled) return;

    const elapsed = now - startedAt;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, Math.round(startY + distance * eased));

    if (progress < 1) {
      controller.frame = window.requestAnimationFrame(step);
      return;
    }

    controller.cleanup?.();
    if (activeScrollAnimation === controller) activeScrollAnimation = null;
  };

  controller.frame = window.requestAnimationFrame(step);
};

const scrollToTarget = (target, behavior = 'smooth') => {
  const targetTop = target.getBoundingClientRect().top + window.scrollY - getNavbarOffset();
  const resolvedTop = Math.max(Math.round(targetTop), 0);

  if (behavior === 'smooth') {
    smoothScrollToY(resolvedTop, 860);
    return;
  }

  window.scrollTo({
    top: resolvedTop,
    left: 0,
    behavior: 'auto',
  });
};

export const scrollToHashTarget = (hash, behavior = 'smooth') => {
  const target = getHashTarget(hash);
  if (!target) return false;

  scrollToTarget(target, behavior);
  return true;
};

const RouteScrollManager = ({ locationOverride = null }) => {
  const routerLocation = useLocation();
  const activeLocation = locationOverride ?? routerLocation;
  const { pathname, hash } = activeLocation;
  const previousPathnameRef = useRef(null);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    let animationFrame = 0;
    let cancelled = false;
    const previousPathname = previousPathnameRef.current;
    const isSamePageHashNavigation = previousPathname === pathname;
    const isNewPathname = previousPathname !== null && previousPathname !== pathname;
    previousPathnameRef.current = pathname;

    const hardScrollTop = () => {
      cancelSmoothScroll();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const cancel = () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };

    if (!hash) {
      hardScrollTop();
      return cancel;
    }

    if (isNewPathname) {
      hardScrollTop();
    }

    const behavior = isSamePageHashNavigation ? 'smooth' : 'auto';
    const startedAt = performance.now();

    const tryHashScroll = () => {
      if (cancelled) return;

      if (scrollToHashTarget(hash, behavior)) return;

      if (performance.now() - startedAt >= HASH_RETRY_TIMEOUT) {
        hardScrollTop();
        return;
      }

      animationFrame = window.requestAnimationFrame(tryHashScroll);
    };

    if (!isSamePageHashNavigation && scrollToHashTarget(hash, 'auto')) {
      return cancel;
    }

    animationFrame = window.requestAnimationFrame(tryHashScroll);

    return cancel;
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;
