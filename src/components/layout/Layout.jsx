import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DisclaimerBanner from './DisclaimerBanner.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change for best UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-wrapper">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <DisclaimerBanner />
      <Navbar />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
