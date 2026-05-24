import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const desktopNavLinks = [
  { name: 'Solutions', to: '/solutions' },
  { name: 'Products', to: '/products' },
  { name: 'Company', to: '/company' },
];

const mobileNavLinks = [{ name: 'Home', to: '/' }, ...desktopNavLinks];

const MOBILE_MENU_FALLBACK_RELEASE_MS = 760;
const MOBILE_ROUTE_PUSH_MS = 80;

const Underline = ({ active = false, mobile = false }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] transition-[transform,opacity] duration-[var(--duration-underline)] ease-[var(--ease-soft)] ${mobile ? '-bottom-[0.62rem]' : '-bottom-[0.5rem]'} ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}
  />
);

const normalizeRoute = (route) => route.replace(/\/$/, '') || '/';

const afterTwoFrames = (callback) => {
  let secondFrame = 0;
  const firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(callback);
  });

  return () => {
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
  };
};

const Navbar = () => {
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const releaseTimerRef = useRef(null);
  const navigateTimerRef = useRef(null);
  const frameCleanupRef = useRef(null);
  const lockScrollYRef = useRef(0);
  const routeChangingRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const clearTimers = () => {
    window.clearTimeout(releaseTimerRef.current);
    window.clearTimeout(navigateTimerRef.current);
    frameCleanupRef.current?.();
    releaseTimerRef.current = null;
    navigateTimerRef.current = null;
    frameCleanupRef.current = null;
  };

  const scheduleUnmountFallback = () => {
    window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = window.setTimeout(() => {
      setMenuMounted(false);
      releaseTimerRef.current = null;
    }, MOBILE_MENU_FALLBACK_RELEASE_MS);
  };

  const openMobileMenu = () => {
    clearTimers();
    routeChangingRef.current = false;
    setMenuMounted(true);
    frameCleanupRef.current = afterTwoFrames(() => {
      setMenuOpen(true);
      frameCleanupRef.current = null;
    });
  };

  const closeMobileMenu = ({ routeChange = false } = {}) => {
    window.clearTimeout(releaseTimerRef.current);
    frameCleanupRef.current?.();
    frameCleanupRef.current = null;
    routeChangingRef.current = routeChange;
    setMenuOpen(false);
    setMenuMounted(true);
    scheduleUnmountFallback();
  };

  const toggleMobileMenu = () => {
    if (menuMounted || menuOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  const handleMobileRoute = (to) => {
    window.clearTimeout(navigateTimerRef.current);

    const currentRoute = normalizeRoute(`${location.pathname}${location.hash}`);
    const nextRoute = normalizeRoute(to);

    closeMobileMenu({ routeChange: currentRoute !== nextRoute });

    if (currentRoute === nextRoute) return;

    navigateTimerRef.current = window.setTimeout(() => {
      navigate(to);
      navigateTimerRef.current = null;
    }, MOBILE_ROUTE_PUSH_MS);
  };

  const handleMenuTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || menuOpen) return;

    window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = null;
    setMenuMounted(false);
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (!menuMounted) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousOverscroll = root.style.overscrollBehavior;

    lockScrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${lockScrollYRef.current}px`;
    body.style.width = '100%';
    root.style.overscrollBehavior = 'none';
    root.classList.add('mobile-nav-open');

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      const shouldRestoreScroll = !routeChangingRef.current;
      const previousScrollY = lockScrollYRef.current;

      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      root.style.overscrollBehavior = previousOverscroll;
      root.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', closeOnEscape);

      if (shouldRestoreScroll) {
        window.scrollTo(0, previousScrollY);
      } else {
        window.requestAnimationFrame(() => window.scrollTo(0, 0));
      }

      routeChangingRef.current = false;
    };
  }, [menuMounted]);

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/50 hover:text-[#111111]'}`;

  const mobileLinkClassName = (active) =>
    `group relative inline-flex items-center justify-center text-2xl font-semibold tracking-wide no-underline transition-colors duration-300 ${active ? 'text-[#111111]' : 'text-[#111111]/52'}`;

  return (
    <nav className={`devrecon-nav fixed inset-x-0 top-0 z-[1200] border-b py-4 transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-menu)] ease-[var(--ease-soft)] ${menuMounted ? 'is-mobile-shell-active border-transparent bg-transparent' : 'overflow-visible border-gray-100 glass-nav'}`}>
      <div className="relative z-[1210] mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`group relative inline-flex items-center text-2xl font-bold tracking-tight no-underline transition-colors duration-300 ${isHome ? 'text-[#111111]' : 'text-[#111111]/70 hover:text-[#111111]'}`}
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
          className="motion-button motion-pill motion-pill-light relative flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
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
        className={`mobile-menu-shell md:hidden ${menuMounted ? 'is-active' : ''} ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuMounted}
        onTransitionEnd={handleMenuTransitionEnd}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-24">
          <div className="flex w-full max-w-2xl flex-col items-center gap-8 sm:gap-9">
            {mobileNavLinks.map((link, index) => {
              const active = normalizeRoute(location.pathname) === normalizeRoute(link.to);

              return (
                <div key={link.name} className="mobile-menu-item" style={{ '--mobile-menu-delay': `${110 + index * 72}ms` }}>
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
              className="motion-button motion-pill motion-pill-dark mobile-menu-item mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
              style={{ '--mobile-menu-delay': `${110 + mobileNavLinks.length * 72}ms` }}
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
