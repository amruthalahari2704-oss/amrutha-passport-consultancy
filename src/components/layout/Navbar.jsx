import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  FileCheck, 
  Menu, 
  X, 
  Calendar, 
  Home, 
  Briefcase, 
  CheckSquare, 
  Compass, 
  Info, 
  PhoneCall, 
  Search,
  Lock
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Document Checklist', path: '/checklist', icon: CheckSquare },
    { name: 'Guidance', path: '/guidance', icon: Compass },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" aria-label="Amrutha Passport Consultancy Home">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <FileCheck size={22} strokeWidth={2.2} />
          </div>
          <div className="brand-info">
            <span className="brand-name">Amrutha Passport</span>
            <span className="brand-subtext">Consultancy Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
          
<a
  href="https://www.passportindia.gov.in/psp/trackApplicationService"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-link"
  aria-label="Track Official Passport Status"
  title="Track Official Passport Status"
>
  Track Status
</a>

        </nav>

        {/* Right Action Buttons */}
        <div className="navbar-actions">
          <Link to="/book" className="btn btn-primary btn-sm nav-cta-btn">
            <Calendar size={16} />
            <span>Book Consultation</span>
          </Link>

          <Link
            to="/admin"
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 10px' }}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Lock size={15} />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <div className="brand-info">
            <span className="brand-name" style={{ fontSize: '1.05rem' }}>Amrutha Passport</span>
            <span className="brand-subtext">Document Facilitation</span>
          </div>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          
<a
  href="https://www.passportindia.gov.in/psp/trackApplicationService"
  target="_blank"
  rel="noopener noreferrer"
  className="mobile-nav-link"
  aria-label="Track Official Passport Status"
  title="Track Official Passport Status"
>
  <Search size={18} />
  <span>Track Official Passport Status</span>
</a>


          <NavLink
            to="/admin"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            <Lock size={18} />
            <span>Admin Staff Portal</span>
          </NavLink>
        </nav>

        <div className="mobile-drawer-footer">
          <Link to="/book" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <Calendar size={18} />
            <span>Book Consultation</span>
          </Link>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Private Consultancy • Mon - Sat 9:30 AM - 6:30 PM
          </p>
        </div>
      </aside>
    </header>
  );
}
