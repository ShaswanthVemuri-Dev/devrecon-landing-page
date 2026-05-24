import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';

const ENTER_DURATION_MS = 260;

const getRouteSignature = (location) => `${location.pathname}${location.search}`;

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const enterTimerRef = useRef(null);
  const [phase, setPhase] = useState('entered');
  const signature = useMemo(() => getRouteSignature(location), [location]);

  useEffect(() => {
    window.clearTimeout(enterTimerRef.current);
    setPhase('entering');

    enterTimerRef.current = window.setTimeout(() => {
      setPhase('entered');
    }, ENTER_DURATION_MS);

    return () => window.clearTimeout(enterTimerRef.current);
  }, [signature]);

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <RouteScrollManager />
      <Navbar />
      <div className={`route-transition-shell min-h-screen is-${phase}`} aria-busy={phase !== 'entered'}>
        {outlet}
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
