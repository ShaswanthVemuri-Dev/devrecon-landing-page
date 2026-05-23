import { useMemo } from 'react';
import { motionDuration, motionEase, motionDistance, motionViewport } from '../motion/motionTokens.js';
import useMotionProfile from '../motion/useMotionProfile.js';

export const useRevealMotion = ({
  desktopInitial = { y: motionDistance.revealDesktop },
  desktopVisible = {},
  amount,
  margin,
  duration,
  delay = 0,
  ease = motionEase.soft,
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
    const initial = isSimple ? { opacity: 0, y: motionDistance.revealMobile } : { opacity: 0, ...desktopInitial };
    const visible = isSimple ? { opacity: 1, y: 0 } : { opacity: 1, ...desktopVisible };

    return {
      enabled: true,
      useSimpleMobileMotion: isSimple,
      initial,
      whileInView: visible,
      animate: visible,
      viewport: {
        once: true,
        amount: amount ?? (isSimple ? motionViewport.revealAmountMobile : motionViewport.revealAmount),
        margin: margin ?? (isSimple ? motionViewport.revealMarginMobile : motionViewport.revealMargin),
      },
      transition: {
        duration: duration ?? (isSimple ? motionDuration.revealMobile : motionDuration.reveal),
        delay: isSimple ? Math.min(delay, 0.06) : delay,
        ease,
      },
    };
  }, [amount, delay, desktopInitial, desktopVisible, duration, ease, margin, profile.enableMotion, profile.useSimpleMobileMotion]);
};

export { default as useMotionProfile } from '../motion/useMotionProfile.js';

const useScrollMotion = () => useMotionProfile().enableMotion;

export default useScrollMotion;
