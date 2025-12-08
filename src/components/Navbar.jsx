import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Approach', href: '#approach' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 glass-nav py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tight z-50 relative">
          DevReCon
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]" 
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Start a Project
          </a>
        </div>

        <button 
          className="md:hidden z-50 text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-black tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="mailto:management@devrecon.in?subject=Project%20Inquiry%20-%20[Your%20Name]"
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
