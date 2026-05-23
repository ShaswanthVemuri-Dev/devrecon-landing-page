import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button motion-button motion-pill fixed bottom-8 right-8 z-50 rounded-full bg-black p-4 text-white shadow-lg hover:bg-gray-800 ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <span>
        <ArrowUp className="motion-action-arrow h-5 w-5" />
      </span>
    </button>
  );
};

export default ScrollToTop;
