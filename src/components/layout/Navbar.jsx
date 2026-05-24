import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const desktopNavLinks = [
  { name: 'Solutions', to: '/solutions' },
  { name: 'Products', to: '/products' },
  { name: 'Company', to: '/company' },
];

const mobileNavLinks = [{ name: 'Home', to: '/' }, ...desktopNavLinks];

const MOBILE_MENU_RELEASE_MS = 1120;
const MOBILE_MENU_OPEN_FRAME_DELAY = 2;
const MENU_PHASE = {
  CLOSED: 'closed',
  OPENING: 'opening',
  OPEN: 'open',
  CLOSING: 'closing',
};

const Underline = ({ active = false, mobile = false }) => (
  <span
    aria-hidden="true"
    className={`nav-underline pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] ${mobile ? '-bottom-[0.62rem]' : '-bottom-[0.5rem]'} ${active ? 'is-active' : ''}`}
  />
);

const normalizeRoute = (route) => route.replace(/\/$/, '') || '/';

const Navbar = () => {
  const [menuPhase, setMenuPhase] = useState(MENU_PHASE.CLOSED);
  const releaseTimerRef = useRef(null);
  const rafRefs = useRef([]);
  const afterCloseRef = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const menuMounted = menuPhase !== MENU_PHASE.CLOSED;
  const menuOpen = menuPhase === MENU_PHASE.OPEN || menuPhase === MENU_PHASE.OPENING;

  const clearFrameQueue = () => {
    rafRefs.current.forEach((id) => window.cancelAnimationFrame(id));
    rafRefs.current = [];
  };

  const clearTimers = () => {
    window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = null;
    clearFrameQueue();
  };

  const runAfterFrames = (callback, frames = 1) => {
    let remaining = Math.max(frames, 1);
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) {
        callback();
        return;
      }
      const next = window.requestAnimationFrame(tick);
      rafRefs.current.push(next);
    };
    const first = window.requestAnimationFrame(tick);
    rafRefs.current.push(first);
  };

  const releaseMobileMenu = () => {
    setMenuPhase(MENU_PHASE.CLOSED);
    releaseTimerRef.current = null;

    const afterClose = afterCloseRef.current;
    afterCloseRef.current = null;
    afterClose?.();
  };

  const openMobileMenu = () => {
    clearTimers();
    afterCloseRef.current = null;
    setMenuPhase(MENU_PHASE.OPENING);

    runAfterFrames(() => {
      setMenuPhase(MENU_PHASE.OPEN);
      clearFrameQueue();
    }, MOBILE_MENU_OPEN_FRAME_DELAY);
  };

  const closeMobileMenu = ({ afterClose } = {}) => {
    clearTimers();
    afterCloseRef.current = afterClose ?? null;
    setMenuPhase((current) => (current === MENU_PHASE.CLOSED ? MENU_PHASE.CLOSED : MENU_PHASE.CLOSING));
    releaseTimerRef.current = window.setTimeout(releaseMobileMenu, MOBILE_MENU_RELEASE_MS);
  };

  const toggleMobileMenu = () => {
    if (menuMounted || menuOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  const handleMobileRoute = (to) => {
    const currentRoute = normalizeRoute(`${location.pathname}${location.hash}`);
    const nextRoute = normalizeRoute(to);
    const shouldNavigate = currentRoute !== nextRoute;

    closeMobileMenu();

    if (shouldNavigate) {
      window.requestAnimationFrame(() => navigate(to));
    }
  };

  const handleNavTransitionEnd = (event) => {
    if (event.target !== navRef.current || event.propertyName !== 'height') {
      return;
    }

    if (menuPhase === MENU_PHASE.CLOSING) {
      window.clearTimeout(releaseTimerRef.current);
      releaseMobileMenu();
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
      afterCloseRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!menuMounted) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousOverscroll = root.style.overscrollBehavior;

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    root.style.overscrollBehavior = 'none';
    root.classList.add('mobile-nav-open');

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    const closeOnDesktop = (event) => {
      if (event.matches) closeMobileMenu();
    };

    const desktopQuery = window.matchMedia('(min-width: 768px)');

    window.addEventListener('keydown', closeOnEscape);
    desktopQuery.addEventListener?.('change', closeOnDesktop);

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      root.style.overscrollBehavior = previousOverscroll;
      root.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', closeOnEscape);
      desktopQuery.removeEventListener?.('change', closeOnDesktop);
    };
  }, [menuMounted]);

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/50 hover:text-[#111111]'}`;

  const mobileLinkClassName = (active) =>
    `group relative inline-flex items-center justify-center text-2xl font-semibold tracking-wide no-underline transition-colors duration-300 ${active ? 'text-[#111111]' : 'text-[#111111]/52'}`;

  return (
    <nav
      ref={navRef}
      className={`devrecon-nav fixed inset-x-0 top-0 z-[1200] h-[76px] overflow-visible border-b border-gray-100 bg-white py-4 md:h-auto ${menuMounted ? 'is-mobile-shell-active' : ''} ${menuOpen ? 'is-mobile-shell-open' : ''} ${menuPhase === MENU_PHASE.CLOSING ? 'is-mobile-shell-closing' : ''}`}
      onTransitionEnd={handleNavTransitionEnd}
    >
      <div className="relative z-[1210] mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`group relative z-[1210] inline-flex items-center text-2xl font-bold tracking-tight no-underline transition-colors duration-300 ${isHome ? 'text-[#111111]' : 'text-[#111111]/70 hover:text-[#111111]'}`}
          onClick={(event) => {
            if (!menuMounted) return;
            event.preventDefault();
            handleMobileRoute('/');
          }}
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
          className="motion-button motion-pill motion-pill-light relative z-[1210] flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={toggleMobileMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative z-10 block h-5 w-5" aria-hidden="true">
            <Menu className={`mobile-menu-glyph absolute inset-0 h-5 w-5 ${menuOpen ? 'is-hidden' : 'is-visible'}`} />
            <X className={`mobile-menu-glyph absolute inset-0 h-5 w-5 ${menuOpen ? 'is-visible' : 'is-hidden'}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu-shell md:hidden ${menuMounted ? 'is-active' : ''} ${menuPhase === MENU_PHASE.OPEN ? 'is-open' : ''} ${menuPhase === MENU_PHASE.CLOSING ? 'is-closing' : ''}`}
        aria-hidden={!menuMounted}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-24">
          <div className="flex w-full max-w-2xl flex-col items-center gap-8 sm:gap-9">
            {mobileNavLinks.map((link) => {
              const active = normalizeRoute(location.pathname) === normalizeRoute(link.to);

              return (
                <div key={link.name} className="mobile-menu-item">
                  <button
                    type="button"
                    onClick={() => handleMobileRoute(link.to)}
                    className={mobileLinkClassName(active)}
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
              onClick={() => closeMobileMenu()}
              draggable="false"
              className="motion-button motion-pill motion-pill-dark mobile-menu-item mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
            >
              <span>Start a Project</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
