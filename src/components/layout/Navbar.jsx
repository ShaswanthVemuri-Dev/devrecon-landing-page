import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const desktopNavLinks = [
  { name: 'Solutions', to: '/solutions' },
  { name: 'Products', to: '/products' },
  { name: 'Company', to: '/company' },
];

const mobileNavLinks = [
  { name: 'Home', to: '/' },
  ...desktopNavLinks,
];

const underlineBaseClassName =
  'pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] opacity-0 transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100';

const Underline = ({ active = false, mobile = false }) => (
  <span
    aria-hidden="true"
    className={`${underlineBaseClassName} ${mobile ? '-bottom-[0.62rem]' : '-bottom-[0.5rem]'} ${
      active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
    }`}
  />
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${
      isActive ? 'text-[#111111]' : 'text-gray-600 hover:text-[#111111]'
    }`;

  const mobileNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-2xl font-semibold tracking-wide no-underline transition-colors duration-300 ${
      isActive ? 'text-[#111111]' : 'text-gray-500 hover:text-[#111111]'
    }`;

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

          <motion.a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
            initial="rest"
            animate="rest"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.992 }}
            transition={{ duration: 0.28, ease }}
            style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
            className="rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide text-white no-underline outline-none transition-[background-color,box-shadow] duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
          >
            Start a Project
          </motion.a>
        </div>

        <button
          type="button"
          className="relative z-[60] text-[#111111] md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.34, ease }}
              className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-white px-6 md:hidden"
            >
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={mobileNavClassName}
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      <Underline active={isActive} mobile />
                    </>
                  )}
                </NavLink>
              ))}

              <motion.a
                href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
                onClick={closeMobileMenu}
                whileTap={{ scale: 0.992 }}
                style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
                className="mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
              >
                Start a Project
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
