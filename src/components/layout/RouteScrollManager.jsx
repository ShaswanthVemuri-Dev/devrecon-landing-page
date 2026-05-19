import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HASH_RETRY_TIMEOUT = 1400;

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

const scrollToTarget = (target, behavior = 'smooth') => {
  const targetTop = target.getBoundingClientRect().top + window.scrollY - getNavbarOffset();

  window.scrollTo({
    top: Math.max(Math.round(targetTop), 0),
    left: 0,
    behavior,
  });
};

export const scrollToHashTarget = (hash, behavior = 'smooth') => {
  const target = getHashTarget(hash);
  if (!target) return false;

  scrollToTarget(target, behavior);
  return true;
};

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();
  const previousPathnameRef = useRef(null);

  useLayoutEffect(() => {
    let animationFrame = 0;
    let cancelled = false;
    const previousPathname = previousPathnameRef.current;
    const isSamePageHashNavigation = previousPathname === pathname;
    previousPathnameRef.current = pathname;

    const cancel = () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };

    if (!hash) {
      animationFrame = window.requestAnimationFrame(() => {
        if (!cancelled) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      });

      return cancel;
    }

    const behavior = isSamePageHashNavigation ? 'smooth' : 'auto';
    const startedAt = performance.now();

    const tryHashScroll = () => {
      if (cancelled) return;

      if (scrollToHashTarget(hash, behavior)) return;

      if (performance.now() - startedAt >= HASH_RETRY_TIMEOUT) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      animationFrame = window.requestAnimationFrame(tryHashScroll);
    };

    if (!isSamePageHashNavigation && scrollToHashTarget(hash, 'auto')) {
      return cancel;
    }

    animationFrame = window.requestAnimationFrame(() => {
      animationFrame = window.requestAnimationFrame(tryHashScroll);
    });

    return cancel;
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;
