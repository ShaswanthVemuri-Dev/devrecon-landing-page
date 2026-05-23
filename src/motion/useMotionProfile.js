import { useContext } from 'react';
import {
  MotionProfileContext,
  MOTION_MEDIA_QUERIES,
  defaultMotionProfile,
} from './MotionProfileProvider.jsx';

const useMotionProfile = () => useContext(MotionProfileContext) ?? defaultMotionProfile;

export { MOTION_MEDIA_QUERIES };
export default useMotionProfile;
