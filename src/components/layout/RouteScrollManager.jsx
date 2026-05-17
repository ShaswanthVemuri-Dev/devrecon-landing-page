import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');

      window.setTimeout(() => {
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 80);

      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;