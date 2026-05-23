import React, { createContext, useEffect, useMemo, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const canMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const readReducedMotion = () => {
  if (!canMatchMedia()) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

export const buildMotionProfile = (prefersReducedMotion) => {
  const enableMotion = !prefersReducedMotion;

  return {
    prefersReducedMotion,
    enableMotion,
    enableHoverMotion: enableMotion,

    // Backward-compatible fields. These intentionally no longer drive reveal behavior.
    isSmallScreen: false,
    isCoarsePointer: false,
    isMobileMotion: false,
    useSimpleMobileMotion: false,
    hasFineHover: true,
    hasAnyHover: true,
  };
};

export const defaultMotionProfile = buildMotionProfile(false);
export const MotionProfileContext = createContext(defaultMotionProfile);

const MotionProfileProvider = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readReducedMotion);

  useEffect(() => {
    if (!canMatchMedia()) return undefined;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  const value = useMemo(() => buildMotionProfile(prefersReducedMotion), [prefersReducedMotion]);

  return (
    <MotionProfileContext.Provider value={value}>
      {children}
    </MotionProfileContext.Provider>
  );
};

export default MotionProfileProvider;
