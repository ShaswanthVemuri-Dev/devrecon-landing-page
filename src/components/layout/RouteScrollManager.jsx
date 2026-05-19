import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAVBAR_OFFSET = 96;
const HASH_RETRY_TIMEOUT = 1200;

const getHashTarget = (hash) => {
  if (!hash) return null;

  try {
    return document.getElementById(decodeURIComponent(hash.replace('#', '')));
  } catch {
    return document.getElementById(hash.replace('#', ''));
  }
};

const scrollToHash = (hash) => {
  const target = getHashTarget(hash);

  if (!target) return false;

  const targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    left: 0,
    behavior: 'smooth',
  });

  return true;
};

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    let animationFrame;
    let cancelled = false;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    const startedAt = performance.now();

    const tryHashScroll = () => {
      if (cancelled) return;

      if (scrollToHash(hash)) return;

      if (performance.now() - startedAt >= HASH_RETRY_TIMEOUT) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      animationFrame = window.requestAnimationFrame(tryHashScroll);
    };

    animationFrame = window.requestAnimationFrame(tryHashScroll);

    return () => {
      cancelled = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;
