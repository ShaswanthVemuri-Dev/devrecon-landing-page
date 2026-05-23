const normalizeBase = (base) => {
  if (!base || base === './') return '/';
  return base.endsWith('/') ? base : `${base}/`;
};

const normalizePath = (path) => String(path || '').replace(/^\/+/, '');

export const publicAsset = (path) => `${normalizeBase(import.meta.env.BASE_URL)}${normalizePath(path)}`;

export default publicAsset;
