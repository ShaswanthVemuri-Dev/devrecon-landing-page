import publicAsset from './assetPaths.js';

const ROUTE_CRITICAL_ASSETS = [
  '/founder/shaswanth-vemuri.jpg',
  '/product-previews/mymedicals/logo.png',
  '/product-previews/mymedicals/phone-hero.png',
  '/product-previews/mastermentor/logo.png',
  '/product-logos/mastermentor-mark-bw.png',
  '/product-logos/mymedicals-mark-bw.png',
];

const DECORATIVE_LOGO_ASSETS = [
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

const getConnection = () => (
  typeof navigator === 'undefined'
    ? null
    : navigator.connection || navigator.mozConnection || navigator.webkitConnection || null
);

const getNetworkProfile = () => {
  const connection = getConnection();
  if (!connection) return { saveData: false, slow: false, constrained: false };

  const effectiveType = connection.effectiveType || '';
  const verySlowTypes = new Set(['slow-2g', '2g']);

  return {
    saveData: Boolean(connection.saveData),
    slow: verySlowTypes.has(effectiveType),
    constrained: effectiveType === '3g' || verySlowTypes.has(effectiveType) || Boolean(connection.saveData),
  };
};

const preloadImage = (src) => {
  const image = new Image();
  image.decoding = 'async';
  image.loading = 'eager';
  image.src = publicAsset(src);
  retainedImages.push(image);
};

const runIdle = (callback, timeout = 1600) => {
  if ('requestIdleCallback' in window) {
    const idleId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback?.(idleId);
  }

  const timeoutId = window.setTimeout(callback, Math.min(timeout, 900));
  return () => window.clearTimeout(timeoutId);
};

export const preloadRouteAssets = () => {
  if (hasPreloaded || typeof window === 'undefined') {
    return undefined;
  }

  hasPreloaded = true;
  const cleanups = [];
  const network = getNetworkProfile();

  if (!network.saveData && !network.slow && !network.constrained) {
    cleanups.push(runIdle(() => {
      ROUTE_CRITICAL_ASSETS.forEach(preloadImage);
    }, 1400));
  }

  if (!network.constrained) {
    cleanups.push(runIdle(() => {
      DECORATIVE_LOGO_ASSETS.forEach(preloadImage);
    }, 4200));
  }

  return () => cleanups.forEach((cleanup) => cleanup?.());
};

export default preloadRouteAssets;
