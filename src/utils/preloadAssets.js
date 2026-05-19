const PRELOAD_ASSETS = [
  '/founder/shaswanth-vemuri.webp',
  '/product-previews/mymedicals/logo.png',
  '/product-previews/mymedicals/phone-hero.png',
  '/product-previews/mastermentor/logo.png',
  '/product-logos/mastermentor-mark-bw.png',
  '/product-logos/mymedicals-mark-bw.png',
  '/working-with/logo-01.png',
  '/working-with/logo-02.png',
  '/working-with/logo-03.png',
  '/working-with/logo-04.png',
  '/working-with/logo-05.png',
  '/working-with/logo-06.png',
  '/working-with/logo-07.png',
  '/working-with/logo-08.png',
  '/working-with/logo-09.png',
  '/working-with/logo-10.png',
];

let hasPreloaded = false;
const retainedImages = [];

const preloadImage = (src) => {
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  retainedImages.push(image);
};

export const preloadRouteAssets = () => {
  if (hasPreloaded || typeof window === 'undefined') {
    return undefined;
  }

  hasPreloaded = true;

  const run = () => {
    PRELOAD_ASSETS.forEach(preloadImage);
  };

  if ('requestIdleCallback' in window) {
    const idleId = window.requestIdleCallback(run, { timeout: 1800 });
    return () => window.cancelIdleCallback?.(idleId);
  }

  const timeoutId = window.setTimeout(run, 900);
  return () => window.clearTimeout(timeoutId);
};

export default preloadRouteAssets;
