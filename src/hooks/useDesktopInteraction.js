import { useEffect, useState } from 'react';

const DESKTOP_INTERACTION_QUERY = '(any-hover: hover)';

const canUseDesktopInteraction = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(DESKTOP_INTERACTION_QUERY).matches;
};

const useDesktopInteraction = () => {
  const [enabled, setEnabled] = useState(canUseDesktopInteraction);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_INTERACTION_QUERY);
    const update = () => setEnabled(mediaQuery.matches);

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

export default useDesktopInteraction;
