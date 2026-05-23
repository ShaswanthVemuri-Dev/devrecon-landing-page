import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  'pointer-events-none absolute left-0 w-full origin-left border-b-2 border-[#111111] opacity-0 transition-[transform,opacity] duration-[var(--duration-underline)] ease-[var(--ease-soft)] group-hover:scale-x-100 group-hover:opacity-100';

const mobileOverlayVariants = {
  closed: {
    opacity: 0,
    y: -16,
    scale: 0.985,
    filter: 'blur(5px)',
    transition: {
      duration: 0.34,
      ease,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.38,
      ease,
      when: 'beforeChildren',
      staggerChildren: 0.04,
      delayChildren: 0.055,
    },
  },
};

const mobileItemVariants = {
  closed: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.14,
      ease,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease,
    },
  },
};

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
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setPendingNavigation(null);
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

  const closeMobileMenu = () => {
    setPendingNavigation(null);
    setMobileMenuOpen(false);
  };

  const handleMobileNavigation = (event, to) => {
    event.preventDefault();

    const currentDestination = `${location.pathname}${location.hash}`;
    const targetDestination = to;

    if (currentDestination === targetDestination) {
      setPendingNavigation(null);
      setMobileMenuOpen(false);
      return;
    }

    setPendingNavigation(targetDestination);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuExitComplete = () => {
    if (!pendingNavigation) return;

    const destination = pendingNavigation;
    setPendingNavigation(null);
    navigate(destination);
  };

  const desktopNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-sm font-medium tracking-wide text-[#111111] no-underline transition-colors duration-300`;

  const mobileNavClassName = ({ isActive }) =>
    `group relative inline-flex items-center text-2xl font-semibold tracking-wide text-[#111111] no-underline transition-colors duration-300`;

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
            className="motion-button motion-pill rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
          >
            Start a Project
          </motion.a>
        </div>

        <button
          type="button"
          className="motion-button relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-[#111111] md:hidden"
          onClick={() => {
            setPendingNavigation(null);
            setMobileMenuOpen((open) => !open);
          }}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={mobileMenuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: mobileMenuOpen ? -28 : 28, scale: 0.92 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: mobileMenuOpen ? 28 : -28, scale: 0.92 }}
              transition={{ duration: 0.17, ease }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </button>

        <AnimatePresence initial={false} onExitComplete={handleMobileMenuExitComplete}>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              variants={mobileOverlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-white px-6 md:hidden"
            >
              {mobileNavLinks.map((link) => (
                <motion.div key={link.name} variants={mobileItemVariants}>
                  <NavLink
                    to={link.to}
                    onClick={(event) => handleMobileNavigation(event, link.to)}
                    className={mobileNavClassName}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.name}</span>
                        <Underline active={isActive} mobile />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              <motion.a
                href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
                variants={mobileItemVariants}
                onClick={closeMobileMenu}
                whileTap={{ scale: 0.992 }}
                style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
                className="motion-button motion-pill mt-4 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium tracking-wide text-white no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
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
