import useMotionProfile from '../motion/useMotionProfile.js';

const useScrollMotion = () => useMotionProfile().enableMotion;

export { default as useMotionProfile } from '../motion/useMotionProfile.js';

export const useRevealMotion = () => ({
  enabled: true,
  useSimpleMobileMotion: false,
});

export default useScrollMotion;
