import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Approach from './components/Approach.jsx';
import Capabilities from './components/Capabilities.jsx';
import Partnerships from './components/Partnerships.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Approach />
      <Capabilities />
      <Partnerships />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
