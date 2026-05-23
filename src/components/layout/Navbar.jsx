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
  const navigationTimerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    return () => window.clearTimeout(navigationTimerRef.current);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previousOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.clearTimeout(navigationTimerRef.current);
  }, [location.pathname, location.hash]);

  const closeMobileMenu = () => {
    window.clearTimeout(navigationTimerRef.current);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  const handleMobileNavigation = (event, to) => {
    event.preventDefault();
    const currentDestination = `${location.pathname}${location.hash}`;

    closeMobileMenu();

    if (currentDestination === to) return;

    navigationTimerRef.current = window.setTimeout(() => {
      navigate(to);
    }, 220);
  };

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/50 hover:text-[#111111]'}`;

  const mobileNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-2xl font-semibold tracking-wide no-underline transition-colors duration-300 ${isActive ? 'text-[#111111]' : 'text-[#111111]/52 hover:text-[#111111]'}`;

  return (
    <nav className="fixed inset-x-0 top-0 z-[70] border-b border-gray-100 py-4 transition-all duration-300 glass-nav">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`group relative z-[90] inline-flex items-center text-2xl font-bold tracking-tight no-underline transition-colors duration-300 ${isHome ? 'text-[#111111]' : 'text-[#111111]/70 hover:text-[#111111]'}`}
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
            className="motion-button motion-pill motion-pill-dark rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
          >
            <span>Start a Project</span>
          </a>
        </div>

        <button
          type="button"
          className="motion-button motion-pill motion-pill-light relative z-[90] flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative z-10 transition-transform duration-[var(--duration-button)] ease-[var(--ease-bubble)]">
            {mobileMenuOpen ? <X /> : <Menu />}
          </span>
        </button>

        <div
          id="mobile-navigation"
          className={`mobile-menu-shell fixed left-0 top-0 z-[80] flex h-[100dvh] min-h-[100dvh] w-screen flex-col items-center justify-center gap-8 bg-white px-6 md:hidden ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
          inert={mobileMenuOpen ? undefined : ''}
        >
          {mobileNavLinks.map((link, index) => (
            <div key={link.name} className="mobile-menu-item" style={{ '--mobile-menu-delay': `${120 + index * 70}ms` }}>
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
            className="motion-button motion-pill motion-pill-dark mobile-menu-item mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
            style={{ '--mobile-menu-delay': `${120 + mobileNavLinks.length * 70}ms` }}
          >
            <span>Start a Project</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
