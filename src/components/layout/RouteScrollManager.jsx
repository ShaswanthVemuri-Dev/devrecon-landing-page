import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (hash) {
        const target = document.getElementById(hash.replace('#', ''));

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, hash ? 220 : 210);

    return () => window.clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;
