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
    scale: 0.998,
  },
  soft: {
    scale: 0.996,
  },
  fade: {
    scale: 1,
    distance: '0px',
  },
  lift: {
    scale: 0.996,
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
  const { ref, isVisible } = useRevealOnce({ disabled, rootMargin, threshold });
  const selectedVariant = revealVariants[variant] ?? revealVariants.rise;
  const resolvedDuration = duration ?? motionDuration.reveal;
  const resolvedDistance = distance ?? selectedVariant.distance ?? motionDistance.reveal;

  return (
    <Component
      ref={ref}
      className={`motion-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{
        '--motion-reveal-duration': toSeconds(resolvedDuration),
        '--motion-reveal-delay': toSeconds(delay),
        '--motion-reveal-distance': toPixels(resolvedDistance),
        '--motion-reveal-scale': selectedVariant.scale,
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
