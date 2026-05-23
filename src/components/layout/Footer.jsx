import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 md:py-20 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
        <div>
          <div className="text-3xl font-bold tracking-tight mb-6">DevReCon</div>
          <p className="text-gray-500 max-w-xs font-light leading-loose tracking-wide">
            Digitizing lives and bringing holistic good from tech to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24 w-full md:w-auto">
          <div className="flex flex-col gap-4 text-sm">
            <span className="font-bold text-black uppercase tracking-wider mb-2">Contact</span>
            <a href="mailto:management@devrecon.in" className="motion-underline-action w-fit border-b border-transparent text-gray-600 tracking-wide hover:border-black hover:text-black break-all">management@devrecon.in</a>
            <Link to="/company#founder-profile" className="motion-underline-action w-fit border-b border-transparent text-gray-600 tracking-wide hover:border-black hover:text-black">
              Founder&apos;s Profile
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="font-bold text-black uppercase tracking-wider mb-2">Legal</span>
            <span className="text-gray-600 tracking-wide">Operating Internationally</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-gray-100 text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-4 font-light tracking-wide">
        <p>© 2025 DEVRECON Softwares Pvt. Ltd.</p>
        <p>Engineering Clarity.</p>
      </div>
    </footer>
  );
};

export default Footer;

