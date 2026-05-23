import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const desktopNavLinks = [
  { name: 'Solutions', to: '/solutions' },
  { name: 'Products', to: '/products' },
  { name: 'Company', to: '/company' },
];

const mobileNavLinks = [{ name: 'Home', to: '/' }, ...desktopNavLinks];
const MOBILE_MENU_SWEEP_MS = 920;
const MOBILE_MENU_ROUTE_DELAY_MS = 760;
const MOBILE_MENU_RELEASE_DELAY_MS = MOBILE_MENU_SWEEP_MS + 80;

const normalizePath = (path) => {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '');
};

const Underline = ({ active = false, mobile = false }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] transition-[transform,opacity] duration-[var(--duration-underline)] ease-[var(--ease-soft)] ${mobile ? '-bottom-[0.62rem]' : '-bottom-[0.5rem]'} ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}
  />
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [keepMobileShell, setKeepMobileShell] = useState(false);
  const navigationTimerRef = useRef(null);
  const releaseTimerRef = useRef(null);
  const openFrameRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const mobileShellActive = mobileMenuOpen || keepMobileShell;

  const clearNavigationTimers = () => {
    window.clearTimeout(navigationTimerRef.current);
    navigationTimerRef.current = null;
  };

  const clearReleaseTimer = () => {
    window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = null;
  };

  const clearOpenFrame = () => {
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
  };

  const releaseMobileShellLater = () => {
    clearReleaseTimer();
    releaseTimerRef.current = window.setTimeout(() => {
      setKeepMobileShell(false);
      releaseTimerRef.current = null;
    }, MOBILE_MENU_RELEASE_DELAY_MS);
  };

  const openMobileMenu = () => {
    clearNavigationTimers();
    clearReleaseTimer();
    clearOpenFrame();
    setKeepMobileShell(true);
    openFrameRef.current = window.requestAnimationFrame(() => {
      openFrameRef.current = null;
      setMobileMenuOpen(true);
    });
  };

  const closeMobileMenu = () => {
    clearOpenFrame();
    setKeepMobileShell(true);
    setMobileMenuOpen(false);
    releaseMobileShellLater();
  };

  const toggleMobileMenu = () => {
    if (mobileShellActive) {
      clearNavigationTimers();
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  useEffect(() => {
    return () => {
      clearNavigationTimers();
      clearReleaseTimer();
      clearOpenFrame();
    };
  }, []);

  useEffect(() => {
    if (!mobileShellActive) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previousOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    document.documentElement.classList.add('mobile-nav-open');

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior;
      document.documentElement.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileShellActive]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = () => {
      if (!mediaQuery.matches) return;
      clearNavigationTimers();
      clearReleaseTimer();
      clearOpenFrame();
      setMobileMenuOpen(false);
      setKeepMobileShell(false);
    };

    handleViewportChange();
    mediaQuery.addEventListener?.('change', handleViewportChange);
    return () => mediaQuery.removeEventListener?.('change', handleViewportChange);
  }, []);

  useEffect(() => {
    // Route changes should not instantly tear down the closing shell.
    // If a mobile route was selected, the shell is already closing and will release itself.
    clearNavigationTimers();
    setMobileMenuOpen(false);
    if (keepMobileShell) releaseMobileShellLater();
  }, [location.pathname, location.hash]);

  const closeAll = () => {
    clearNavigationTimers();
    if (mobileShellActive) {
      closeMobileMenu();
      return;
    }
    setMobileMenuOpen(false);
    setKeepMobileShell(false);
  };

  const handleMobileRouteSelection = (to) => {
    clearNavigationTimers();
    const currentDestination = `${location.pathname}${location.hash}`;

    closeMobileMenu();

    if (currentDestination === to || normalizePath(currentDestination) === normalizePath(to)) return;

    navigationTimerRef.current = window.setTimeout(() => {
      navigate(to);
      navigationTimerRef.current = null;
    }, MOBILE_MENU_ROUTE_DELAY_MS);
  };

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/50 hover:text-[#111111]'}`;

  const mobileNavButtonClassName = (isActive) =>
    `mobile-menu-route-button group relative inline-flex items-center text-2xl font-semibold tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/52 hover:text-[#111111]'}`;

  return (
    <nav className={`fixed inset-x-0 top-0 z-[120] border-b border-gray-100 py-4 transition-all duration-300 glass-nav ${mobileShellActive ? 'is-menu-mounted' : ''} ${mobileMenuOpen ? 'is-menu-open' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`group relative z-[150] inline-flex items-center text-2xl font-bold tracking-tight no-underline transition-colors duration-300 ${isHome ? 'text-[#111111]' : 'text-[#111111]/70 hover:text-[#111111]'}`}
          onClick={closeAll}
          aria-current={isHome ? 'page' : undefined}
        >
          <span>DevReCon</span>
          <Underline active={isHome} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.name} to={link.to} className={desktopNavClassName}>
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  <Underline active={isActive} />
                </>
              )}
            </NavLink>
          ))}

          <a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
            className="motion-button motion-pill motion-pill-dark rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
          >
            <span>Start a Project</span>
          </a>
        </div>

        <button
          type="button"
          className="motion-button motion-pill motion-pill-light relative z-[150] flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileShellActive ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileShellActive}
          aria-controls="mobile-navigation"
        >
          <span className={`mobile-menu-icon relative z-10 ${mobileShellActive ? 'is-open' : ''}`}>
            {mobileShellActive ? <X /> : <Menu />}
          </span>
        </button>

        <div
          id="mobile-navigation"
          data-open={mobileMenuOpen ? 'true' : 'false'}
          className={`mobile-menu-shell fixed inset-0 z-[130] flex h-[100dvh] min-h-[100dvh] w-screen flex-col items-center justify-center gap-8 bg-white px-6 md:hidden ${mobileShellActive ? 'is-mounted' : ''} ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileShellActive}
          role="dialog"
          aria-modal="true"
        >
          {mobileNavLinks.map((link, index) => {
            const active = normalizePath(link.to) === normalizePath(location.pathname);

            return (
              <div key={link.name} className="mobile-menu-item" style={{ '--mobile-menu-delay': `${160 + index * 90}ms` }}>
                <button
                  type="button"
                  onClick={() => handleMobileRouteSelection(link.to)}
                  className={mobileNavButtonClassName(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.name}</span>
                  <Underline active={active} mobile />
                </button>
              </div>
            );
          })}

          <a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
            onClick={closeMobileMenu}
            className="motion-button motion-pill motion-pill-dark mobile-menu-item mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
            style={{ '--mobile-menu-delay': `${160 + mobileNavLinks.length * 90}ms` }}
          >
            <span>Start a Project</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
