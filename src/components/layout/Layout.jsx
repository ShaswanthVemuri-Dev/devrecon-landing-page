import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <RouteScrollManager />
      <Navbar />
      <div key={location.pathname} className="page-transition min-h-screen">
        {outlet}
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
