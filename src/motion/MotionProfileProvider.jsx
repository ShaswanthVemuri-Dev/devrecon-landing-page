import React, { createContext, useEffect, useMemo, useState } from 'react';

export const MOTION_MEDIA_QUERIES = {
  reduced: '(prefers-reduced-motion: reduce)',
  phonePortrait: '(max-width: 767px) and (orientation: portrait)',
  smallScreen: '(max-width: 767px)',
  tabletRange: '(min-width: 768px) and (max-width: 1180px)',
  coarsePointer: '(hover: none), (pointer: coarse)',
  fineHover: '(hover: hover) and (pointer: fine)',
  anyHover: '(any-hover: hover)',
};

const canMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const readMotionState = () => {
  if (!canMatchMedia()) {
    return {
      prefersReducedMotion: false,
      isPhonePortrait: false,
      isSmallScreen: false,
      isTabletRange: false,
      isCoarsePointer: false,
      hasFineHover: false,
      hasAnyHover: false,
    };
  }

  return {
    prefersReducedMotion: window.matchMedia(MOTION_MEDIA_QUERIES.reduced).matches,
    isPhonePortrait: window.matchMedia(MOTION_MEDIA_QUERIES.phonePortrait).matches,
    isSmallScreen: window.matchMedia(MOTION_MEDIA_QUERIES.smallScreen).matches,
    isTabletRange: window.matchMedia(MOTION_MEDIA_QUERIES.tabletRange).matches,
    isCoarsePointer: window.matchMedia(MOTION_MEDIA_QUERIES.coarsePointer).matches,
    hasFineHover: window.matchMedia(MOTION_MEDIA_QUERIES.fineHover).matches,
    hasAnyHover: window.matchMedia(MOTION_MEDIA_QUERIES.anyHover).matches,
  };
};

const subscribeToMediaQuery = (mediaQuery, callback) => {
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }

  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
};

export const buildMotionProfile = (state) => {
  const enableMotion = !state.prefersReducedMotion;

  // Touch input should disable hover assumptions, not scroll reveal quality.
  // Only true narrow phone portrait receives the lighter reveal profile.
  const useSimpleMobileMotion = state.isPhonePortrait;

  return {
    prefersReducedMotion: state.prefersReducedMotion,
    isPhonePortrait: state.isPhonePortrait,
    isSmallScreen: state.isSmallScreen,
    isTabletRange: state.isTabletRange,
    isCoarsePointer: state.isCoarsePointer,
    isMobileMotion: useSimpleMobileMotion,
    useSimpleMobileMotion,
    useTabletRevealMotion: !useSimpleMobileMotion && state.isTabletRange,
    enableMotion,
    enableHoverMotion: enableMotion && (state.hasFineHover || state.hasAnyHover),
    hasFineHover: state.hasFineHover,
    hasAnyHover: state.hasAnyHover,
  };
};

export const defaultMotionProfile = buildMotionProfile(readMotionState());

export const MotionProfileContext = createContext(defaultMotionProfile);

const MotionProfileProvider = ({ children }) => {
  const [state, setState] = useState(readMotionState);

  useEffect(() => {
    if (!canMatchMedia()) return undefined;

    const mediaQueries = Object.values(MOTION_MEDIA_QUERIES).map((query) => window.matchMedia(query));
    let frame = 0;

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setState(readMotionState());
      });
    };

    update();
    const unsubscribe = mediaQueries.map((mediaQuery) => subscribeToMediaQuery(mediaQuery, update));

    return () => {
      unsubscribe.forEach((removeListener) => removeListener());
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const value = useMemo(() => buildMotionProfile(state), [state]);

  return (
    <MotionProfileContext.Provider value={value}>
      {children}
    </MotionProfileContext.Provider>
  );
};

export default MotionProfileProvider;
