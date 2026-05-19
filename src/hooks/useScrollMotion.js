import { useEffect, useState } from 'react';

const MOBILE_SCROLL_MOTION_QUERY = '(max-width: 767px), (hover: none), (pointer: coarse)';

const shouldDisableScrollMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_SCROLL_MOTION_QUERY).matches;
};

const useScrollMotion = () => {
  const [enabled, setEnabled] = useState(() => !shouldDisableScrollMotion());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_SCROLL_MOTION_QUERY);
    const update = () => setEnabled(!mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return enabled;
};

export default useScrollMotion;
