import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';

const EXIT_DURATION_MS = 420;
const ENTER_DURATION_MS = 860;

const getRouteSignature = (location) => `${location.pathname}${location.search}`;

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const incomingRef = useRef({ outlet, location });
  const displayStateRef = useRef(null);
  const exitTimerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const [displayState, setDisplayState] = useState(() => ({
    outlet,
    location,
    phase: 'entered',
  }));
  displayStateRef.current = displayState;

  const incomingSignature = useMemo(() => getRouteSignature(location), [location]);
  const displayedSignature = useMemo(() => getRouteSignature(displayState.location), [displayState.location]);

  useEffect(() => {
    incomingRef.current = { outlet, location };
    const nextSignature = getRouteSignature(location);
    const currentSignature = getRouteSignature(displayStateRef.current.location);

    window.clearTimeout(exitTimerRef.current);
    window.clearTimeout(enterTimerRef.current);

    if (nextSignature === currentSignature) {
      setDisplayState((current) => ({
        ...current,
        outlet,
        location,
        phase: 'entered',
      }));
      return undefined;
    }

    setDisplayState((current) => ({ ...current, phase: 'exiting' }));

    exitTimerRef.current = window.setTimeout(() => {
      const latest = incomingRef.current;
      setDisplayState({
        outlet: latest.outlet,
        location: latest.location,
        phase: 'entering',
      });

      enterTimerRef.current = window.setTimeout(() => {
        setDisplayState((current) => ({ ...current, phase: 'entered' }));
      }, ENTER_DURATION_MS);
    }, EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimerRef.current);
      window.clearTimeout(enterTimerRef.current);
    };
  }, [incomingSignature, outlet, location]);

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <RouteScrollManager locationOverride={displayState.location} />
      <Navbar />
      <div
        key={displayedSignature}
        className={`route-transition-shell min-h-screen is-${displayState.phase}`}
        aria-busy={displayState.phase !== 'entered'}
      >
        {displayState.outlet}
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
