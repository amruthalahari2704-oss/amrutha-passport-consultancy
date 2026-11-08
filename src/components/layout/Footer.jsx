import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ExternalLink, 
  FileCheck, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      {/* Prominent Legal Disclaimer Banner */}
      <section className="footer-disclaimer-section" aria-label="Legal Disclaimers">
        <div className="container">
          <div className="footer-disclaimer-card">
            <ShieldAlert size={24} className="footer-disclaimer-icon" />
            <div>
              <p>
                <strong>Statutory Disclaimer:</strong> Amrutha Passport Consultancy is an <em>independent, private advisory and documentation consultancy</em>. We are <strong>not</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with the Ministry of External Affairs (MEA), the Central Passport Organization (CPO), or the Government of India.
              </p>
              <p style={{ marginTop: '6px' }}>
                Passports in India are granted solely at the discretion of the Government of India through official Passport Seva Kendras (PSK/POPSK). We provide professional guidance, application review, and appointment slot assistance. For official information and direct government filing, please visit the official portal:{' '}
                <a
                  href="https://www.passportindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official Passport Seva Portal (opens in a new tab)"
                >
                  www.passportindia.gov.in <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand & Philosophy */}
            <div>
              <div className="footer-brand-title">
                <FileCheck size={26} color="var(--accent-saffron)" />
                <span>Amrutha Passport Consultancy</span>
              </div>
              <p className="footer-brand-desc">
                Simplifying the Indian passport application journey through meticulous document pre-verification, application form guidance, and Tatkaal slot scheduling assistance.
              </p>
              <div className="footer-trust-chips">
                <span className="trust-chip">
                  <CheckCircle2 size={13} color="#22C55E" /> 100% Pre-Verified Docs
                </span>
                <span className="trust-chip">
                  <Lock size={13} color="#FDBA74" /> Data Privacy Assured
                </span>
                <span className="trust-chip">
                  <CheckCircle2 size={13} color="#22C55E" /> Transparent Guidance
                </span>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="footer-col-title">Consultancy Services</h4>
              <ul className="footer-links-list">
                <li><Link to="/services">Fresh Passport Assistance</Link></li>
                <li><Link to="/services">Passport Renewal & Re-issue</Link></li>
                <li><Link to="/services">Tatkaal Urgent Guidance</Link></li>
                <li><Link to="/services">Minor Passport Application</Link></li>
                <li><Link to="/services">Change in Name / Address</Link></li>
                <li><Link to="/services">Police Clearance Certificate (PCC)</Link></li>
              </ul>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <h4 className="footer-col-title">Helpful Resources</h4>
              <ul className="footer-links-list">
                <li><Link to="/checklist">Document Checklist (Printable)</Link></li>
                <li><Link to="/guidance">Step-by-Step Guidance</Link></li>
                <li><Link to="/book">Book a Consultation</Link></li>
                <li><Link to="/track">Track Consultation Status</Link></li>
                <li><Link to="/about">About Our Firm</Link></li>
                <li><Link to="/contact">Contact & Branch Info</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div>
              <h4 className="footer-col-title">Consultation Desk</h4>
              <div className="footer-contact-items">
                <div className="footer-contact-row">
                  <Phone size={16} />
                  <div>
                    <strong style={{ display: 'block', color: '#FFFFFF' }}>+91 9494472176</strong>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Direct Customer Support</span>
                  </div>
                </div>
                <div className="footer-contact-row">
                  <Mail size={16} />
                  <div>
                    <span style={{ color: '#FFFFFF' }}>amruthapassportconsultancy@gmail.com</span>
                  </div>
                </div>
                <div className="footer-contact-row">
                  <Clock size={16} />
                  <div>
                    <span style={{ color: '#FFFFFF' }}>Mon – Sat: 9:30 AM to 9:30 PM</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8' }}>Closed on Sundays & Public Holidays</span>
                  </div>
                </div>
                <div className="footer-contact-row">
                  <MapPin size={16} />
                  <div>
                    <span style={{ color: '#FFFFFF' }}>Shop No.52, Seshamahal Plaza, K S R Complex, Main Rd, opp. Sesha mahal, 1 Town, Tarapet, Vijayawada, Andhra Pradesh 520001, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© {currentYear} Amrutha Passport Consultancy Services. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Support</Link>
            <Link to="/checklist">Checklist</Link>
            <a href="https://www.passportindia.gov.in/" target="_blank" rel="noopener noreferrer">
              Official Portal <ExternalLink size={11} style={{ display: 'inline' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
