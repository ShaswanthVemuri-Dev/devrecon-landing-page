import React from 'react';
import { motionCssEase, motionDistance, motionDuration } from '../../motion/motionTokens.js';
import useRevealOnce from '../../motion/useRevealOnce.js';

const toSeconds = (value) => {
  if (typeof value !== 'number') return value;
  return `${value}s`;
};

const toPixels = (value) => {
  if (typeof value !== 'number') return value;
  return `${value}px`;
};

const revealVariants = {
  rise: {
    scale: 0.994,
    blur: '0px',
  },
  soft: {
    scale: 0.988,
    blur: '0px',
  },
  fade: {
    scale: 1,
    distance: '0px',
    blur: '0px',
  },
  lift: {
    scale: 0.982,
    blur: '0px',
  },
};

const Reveal = ({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  duration,
  distance,
  disabled = false,
  rootMargin,
  threshold,
  style,
  variant = 'rise',
  ...props
}) => {
  const { ref, isVisible, profile } = useRevealOnce({ disabled, rootMargin, threshold });
  const resolvedDuration = duration ?? (profile.useSimpleMobileMotion ? motionDuration.revealMobile : motionDuration.reveal);
  const selectedVariant = revealVariants[variant] ?? revealVariants.rise;
  const resolvedDistance = distance ?? selectedVariant.distance ?? (profile.useSimpleMobileMotion ? motionDistance.revealMobile : motionDistance.revealDesktop);
  const resolvedDelay = profile.useSimpleMobileMotion ? Math.min(delay, 0.16) : delay;

  return (
    <Component
      ref={ref}
      className={`motion-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{
        '--motion-reveal-duration': toSeconds(resolvedDuration),
        '--motion-reveal-delay': toSeconds(resolvedDelay),
        '--motion-reveal-distance': toPixels(resolvedDistance),
        '--motion-reveal-scale': selectedVariant.scale,
        '--motion-reveal-blur': selectedVariant.blur,
        '--motion-reveal-ease': motionCssEase.soft,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Reveal;
