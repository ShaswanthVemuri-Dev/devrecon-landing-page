import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const desktopNavLinks = [
  { name: 'Solutions', to: '/solutions' },
  { name: 'Products', to: '/products' },
  { name: 'Company', to: '/company' },
];

const mobileNavLinks = [{ name: 'Home', to: '/' }, ...desktopNavLinks];

const Underline = ({ active = false, mobile = false }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] transition-[transform,opacity] duration-[var(--duration-underline)] ease-[var(--ease-soft)] ${mobile ? '-bottom-[0.62rem]' : '-bottom-[0.5rem]'} ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}
  />
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!mobileMenuMounted) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuMounted]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMobileMenuMounted(false), 480);
  }, [location.pathname, location.hash]);

  const openMobileMenu = () => {
    window.clearTimeout(closeTimerRef.current);
    setPendingNavigation(null);
    setMobileMenuMounted(true);
    window.requestAnimationFrame(() => setMobileMenuOpen(true));
  };

  const closeMobileMenu = () => {
    setPendingNavigation(null);
    setMobileMenuOpen(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMobileMenuMounted(false), 480);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuMounted && mobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
  };

  const handleMobileNavigation = (event, to) => {
    event.preventDefault();
    const currentDestination = `${location.pathname}${location.hash}`;

    if (currentDestination === to) {
      closeMobileMenu();
      return;
    }

    setPendingNavigation(to);
    setMobileMenuOpen(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMobileMenuMounted(false);
      navigate(to);
      setPendingNavigation(null);
    }, 360);
  };

  const desktopNavClassName = () =>
    'group relative inline-flex items-center text-sm font-medium tracking-wide text-[#111111] no-underline transition-colors duration-300';

  const mobileNavClassName = () =>
    'group relative inline-flex items-center text-2xl font-semibold tracking-wide text-[#111111] no-underline transition-colors duration-300';

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 py-4 transition-all duration-300 glass-nav">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="group relative z-[60] inline-flex items-center text-2xl font-bold tracking-tight text-[#111111] no-underline transition-colors duration-300"
          onClick={closeMobileMenu}
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
            className="motion-button motion-pill motion-pill-dark rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
          >
            <span>Start a Project</span>
          </a>
        </div>

        <button
          type="button"
          className="motion-button motion-pill motion-pill-light relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative z-10 transition-transform duration-[var(--duration-button)] ease-[var(--ease-bubble)]">
            {mobileMenuOpen ? <X /> : <Menu />}
          </span>
        </button>

        {mobileMenuMounted && (
          <div
            id="mobile-navigation"
            className={`mobile-menu-shell fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-white px-6 md:hidden ${mobileMenuOpen ? 'is-open' : ''}`}
            aria-hidden={!mobileMenuOpen}
          >
            {mobileNavLinks.map((link, index) => (
              <div key={link.name} className="mobile-menu-item" style={{ '--mobile-menu-delay': `${90 + index * 55}ms` }}>
                <NavLink to={link.to} onClick={(event) => handleMobileNavigation(event, link.to)} className={mobileNavClassName}>
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      <Underline active={isActive} mobile />
                    </>
                  )}
                </NavLink>
              </div>
            ))}

            <a
              href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
              onClick={closeMobileMenu}
              className="motion-button motion-pill motion-pill-dark mobile-menu-item mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
              style={{ '--mobile-menu-delay': `${90 + mobileNavLinks.length * 55}ms` }}
            >
              <span>Start a Project</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
