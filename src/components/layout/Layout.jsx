import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import RouteScrollManager from './RouteScrollManager.jsx';

const Layout = () => {
  return (
    <div className="bg-white text-slate-900">
      <RouteScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;