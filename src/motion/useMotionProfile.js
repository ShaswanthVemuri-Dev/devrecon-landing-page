import { useContext } from 'react';
import { MotionProfileContext, defaultMotionProfile } from './MotionProfileProvider.jsx';

const useMotionProfile = () => useContext(MotionProfileContext) ?? defaultMotionProfile;

export default useMotionProfile;
