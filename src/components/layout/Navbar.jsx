import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
    `text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`;

  const mobileNavClassName = ({ isActive }) =>
    `text-2xl font-semibold tracking-wide ${
      isActive ? 'text-black' : 'text-gray-500'
    }`;

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 glass-nav py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight z-50 relative"
          onClick={() => setMobileMenuOpen(false)}
        >
          DevReCon
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.name} to={link.to} className={navClassName}>
              {link.name}
            </NavLink>
          ))}

          <a
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Start a Project
          </a>
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavClassName}
                >
                  {link.name}
                </NavLink>
              ))}

              <a
                href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-black text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide"
              >
                Start a Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;