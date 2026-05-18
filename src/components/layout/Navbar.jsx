import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopNavLinks = [
    { name: 'Solutions', to: '/solutions' },
    { name: 'Products', to: '/products' },
    { name: 'Company', to: '/company' },
  ];

  const mobileNavLinks = [
    { name: 'Home', to: '/' },
    ...desktopNavLinks,
  ];

  const navClassName = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`;

  const mobileNavClassName = ({ isActive }) =>
    `text-2xl font-semibold tracking-wide ${
      isActive ? 'text-black' : 'text-gray-500'
    }`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 glass-nav py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight z-50 relative"
          onClick={closeMobileMenu}
        >
          DevReCon
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.name} to={link.to} className={navClassName}>
              {link.name}
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
            className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide no-underline outline-none hover:bg-gray-800 hover:text-white hover:shadow-lg active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none transition-[background-color,box-shadow] duration-300"
          >
            Start a Project
          </motion.a>
        </div>

        <button
          type="button"
          className="md:hidden z-50 text-black"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.34, ease }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={mobileNavClassName}
                >
                  {link.name}
                </NavLink>
              ))}

              <motion.a
                href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
                onClick={closeMobileMenu}
                whileTap={{ scale: 0.992 }}
                style={{ color: '#ffffff', WebkitTapHighlightColor: 'transparent' }}
                className="mt-4 bg-[#111111] text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide no-underline outline-none hover:bg-gray-800 hover:text-white active:text-white visited:text-white focus:text-white focus:outline-none focus-visible:outline-none"
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
