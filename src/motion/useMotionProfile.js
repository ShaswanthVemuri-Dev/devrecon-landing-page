import { useEffect, useMemo, useState } from 'react';

export const MOTION_MEDIA_QUERIES = {
  reduced: '(prefers-reduced-motion: reduce)',
  smallScreen: '(max-width: 767px)',
  coarsePointer: '(hover: none), (pointer: coarse)',
  hoverCapable: '(any-hover: hover)',
};

const canMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const readMotionState = () => {
  if (!canMatchMedia()) {
    return {
      prefersReducedMotion: false,
      isSmallScreen: false,
      isCoarsePointer: false,
      enableHoverMotion: false,
    };
  }

  return {
    prefersReducedMotion: window.matchMedia(MOTION_MEDIA_QUERIES.reduced).matches,
    isSmallScreen: window.matchMedia(MOTION_MEDIA_QUERIES.smallScreen).matches,
    isCoarsePointer: window.matchMedia(MOTION_MEDIA_QUERIES.coarsePointer).matches,
    enableHoverMotion: window.matchMedia(MOTION_MEDIA_QUERIES.hoverCapable).matches,
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

const useMotionProfile = () => {
  const [state, setState] = useState(readMotionState);

  useEffect(() => {
    if (!canMatchMedia()) return undefined;

    const mediaQueries = Object.values(MOTION_MEDIA_QUERIES).map((query) => window.matchMedia(query));
    const update = () => setState(readMotionState());

    update();
    const unsubscribe = mediaQueries.map((mediaQuery) => subscribeToMediaQuery(mediaQuery, update));

    return () => unsubscribe.forEach((removeListener) => removeListener());
  }, []);

  return useMemo(() => {
    const enableMotion = !state.prefersReducedMotion;
    const useSimpleMobileMotion = state.isSmallScreen || state.isCoarsePointer;

    return {
      prefersReducedMotion: state.prefersReducedMotion,
      isSmallScreen: state.isSmallScreen,
      isCoarsePointer: state.isCoarsePointer,
      isMobileMotion: useSimpleMobileMotion,
      useSimpleMobileMotion,
      enableMotion,
      enableHoverMotion: enableMotion && state.enableHoverMotion,
    };
  }, [state.enableHoverMotion, state.isCoarsePointer, state.isSmallScreen, state.prefersReducedMotion]);
};

export default useMotionProfile;
