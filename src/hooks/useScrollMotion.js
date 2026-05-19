import { useEffect, useMemo, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SIMPLE_MOBILE_MOTION_QUERY = '(max-width: 767px), (hover: none), (pointer: coarse)';
const revealEase = [0.22, 1, 0.36, 1];

const getMediaState = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return {
      prefersReducedMotion: false,
      useSimpleMobileMotion: false,
    };
  }

  return {
    prefersReducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    useSimpleMobileMotion: window.matchMedia(SIMPLE_MOBILE_MOTION_QUERY).matches,
  };
};

const useMotionProfile = () => {
  const [state, setState] = useState(getMediaState);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const reducedQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileQuery = window.matchMedia(SIMPLE_MOBILE_MOTION_QUERY);
    const update = () => setState(getMediaState());

    update();

    const addListener = (query) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
      }

      query.addListener(update);
      return () => query.removeListener(update);
    };

    const removeReduced = addListener(reducedQuery);
    const removeMobile = addListener(mobileQuery);

    return () => {
      removeReduced();
      removeMobile();
    };
  }, []);

  return useMemo(
    () => ({
      prefersReducedMotion: state.prefersReducedMotion,
      useSimpleMobileMotion: state.useSimpleMobileMotion,
      enableMotion: !state.prefersReducedMotion,
    }),
    [state.prefersReducedMotion, state.useSimpleMobileMotion]
  );
};

export const useRevealMotion = ({
  desktopInitial = { y: 24 },
  desktopVisible = {},
  amount = 0.08,
  margin,
  duration = 0.74,
  delay = 0,
  ease = revealEase,
} = {}) => {
  const profile = useMotionProfile();

  return useMemo(() => {
    if (!profile.enableMotion) {
      return {
        enabled: false,
        useSimpleMobileMotion: profile.useSimpleMobileMotion,
        initial: false,
        whileInView: undefined,
        animate: undefined,
        viewport: { once: true },
        transition: undefined,
      };
    }

    const isSimple = profile.useSimpleMobileMotion;
    const initial = isSimple ? { opacity: 0 } : { opacity: 0, ...desktopInitial };
    const visible = isSimple ? { opacity: 1 } : { opacity: 1, ...desktopVisible };

    return {
      enabled: true,
      useSimpleMobileMotion: isSimple,
      initial,
      whileInView: visible,
      animate: visible,
      viewport: {
        once: true,
        amount: isSimple ? 0.01 : amount,
        margin: isSimple ? '0px 0px -6% 0px' : margin,
      },
      transition: {
        duration: isSimple ? 0.32 : duration,
        delay: isSimple ? 0 : delay,
        ease,
      },
    };
  }, [amount, delay, desktopInitial, desktopVisible, duration, ease, margin, profile.enableMotion, profile.useSimpleMobileMotion]);
};

const useScrollMotion = () => useMotionProfile().enableMotion;

export { useMotionProfile };
export default useScrollMotion;
