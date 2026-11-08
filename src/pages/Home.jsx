import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Clock, 
  Award, 
  HelpCircle,
  AlertTriangle,
  Lock,
  PhoneCall,
  Search,
  Check
} from 'lucide-react';
import { SERVICES_DATA, APPLICATION_STEPS } from '../data/mockData.js';
import PassportGraphic from '../components/home/PassportGraphic.jsx';
import ServiceFinder from '../components/home/ServiceFinder.jsx';
import FaqAccordion from '../components/home/FaqAccordion.jsx';

export default function Home() {
  return (
    <div>
      {/* 1. Hero Section with Document & Passport Theme */}
      <section className="hero-wrapper">
        <div className="container">
          <div className="hero-grid">
            {/* Left Col: Text & CTAs */}
            <div>
              <div className="hero-pill">
                <ShieldCheck size={16} />
                <span>Private Advisory • 100% Pre-Audit Verification</span>
              </div>

              <h1 className="hero-heading">
                Hassle-Free <span className="highlight">Indian Passport</span> Consultancy & Guidance
              </h1>

              <p className="hero-desc">
                We eliminate appointment delays and counter rejections at Passport Seva Kendras (PSK). Expert document pre-screening, Tatkaal fast-track guidance, and seamless slot scheduling.
              </p>

              <div className="hero-actions">
                <Link to="/book" className="btn btn-primary btn-lg">
                  <Calendar size={18} />
                  <span>Book Free Pre-Screening</span>
                </Link>
                <Link to="/checklist" className="btn btn-outline-white btn-lg">
                  <FileText size={18} />
                  <span>Print Document Checklist</span>
                </Link>
              </div>

              <div className="hero-trust-list">
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Zero Plaintext Passwords</span>
                </div>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Pan-India PSK / POPSK Advisory</span>
                </div>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} />
                  <span>Non-ECR Eligibility Check</span>
                </div>
              </div>
            </div>

            {/* Right Col: Stylized Indian Passport Mockup */}
            <div>
              <PassportGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Service Finder Overlap Container */}
      <section className="container">
        <ServiceFinder />
      </section>

      {/* 3. Comprehensive Services Overview */}
      
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag saffron">Consultancy Solutions</span>
            <h2 className="section-title">Full Range of Indian Passport Advisory</h2>
            <p className="section-subtitle">
              From fresh applications to expedited Tatkaal procedures and minor parent affidavits, we handle every detail with precision.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {SERVICES_DATA.map((service) => (
  <div
    key={service.id}
    className={`card service-card ${
      service.title.toLowerCase().includes('fresh')
        ? 'fresh-passport-card'
        : service.title.toLowerCase().includes('tatkaal') ||
          service.title.toLowerCase().includes('tatkal')
        ? 'tatkaal-passport-card'
        : ''
    }`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span className="badge badge-saffron">{service.badge}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{service.tat}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--primary-navy)' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--navy-blue)', fontSize: '0.825rem', fontWeight: 600, marginBottom: '10px' }}>
                  {service.tagline}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '18px', flex: 1, lineHeight: 1.55 }}>
                  {service.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <Link to={`/book?service=${service.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    <Calendar size={14} />
                    <span>Book Service</span>
                  </Link>
                  <Link to="/services" className="btn btn-secondary btn-sm">
                    <span>Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The 4-Step PSK Journey */}
     <section className="section" style={{ background: '#E8F0F7' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Smooth & Clear</span>
            <h2 className="section-title">Your 4-Step Journey to a Valid Passport</h2>
            <p className="section-subtitle">
              We streamline the process so you arrive at the Passport Seva Kendra fully prepared and confident.
            </p>
          </div>

          <div className="journey-timeline">
            {APPLICATION_STEPS.map((step) => (
   <div
  key={step.step}
  className="journey-step-card"
  style={{
    background: '#FFFFFF',
    border: '1px solid #D5E2EF',
    borderTop: '4px solid #174A7C',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  }}>
                <span className="journey-step-number">{step.step}</span>
                <div className="journey-step-icon">
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--primary-navy)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>
                  {step.desc}
                </p>
                <span className="badge badge-navy">Timeline: {step.timeframe}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/guidance" className="btn btn-secondary btn-lg">
              <span>Read Full In-Depth PSK Counter Guide</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Trust & Comparison: Applying Alone vs Consulting with Us */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag saffron">Why Choose Guidance</span>
            <h2 className="section-title">Avoid Costly Mistakes & Rejected Appointments</h2>
            <p className="section-subtitle">
              A single typo or wrong annexure can cause the PSK Granting Officer to mark your application "ON HOLD".
            </p>
          </div>

          <div className="comparison-grid">
            {/* Without Expert Consultation */}
            <div className="comparison-card alone">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger-red)', fontWeight: 800 }}>
                <XCircle size={24} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--danger-red)' }}>Applying Without Document Review</h3>
              </div>
              <ul className="comparison-list">
                <li className="comparison-item">
                  <XCircle size={18} color="var(--danger-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Spelling Mismatch:</strong> Discrepancies between 10th marksheet and Aadhaar resulting in token cancellation at Counter B.</span>
                </li>
                <li className="comparison-item">
                  <XCircle size={18} color="var(--danger-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Tatkaal Rejection:</strong> Submitting documents not listed on the official 13-document MEA Table.</span>
                </li>
                <li className="comparison-item">
                  <XCircle size={18} color="var(--danger-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>ECR Stamp Burden:</strong> Forgetting educational proof leads to an unnecessary ECR passport, restricting overseas travel.</span>
                </li>
                <li className="comparison-item">
                  <XCircle size={18} color="var(--danger-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Wasted Govt Fees:</strong> Re-booking fees required if the 3 allotted appointment visits expire without resolution.</span>
                </li>
              </ul>
            </div>

            {/* With Amrutha Passport Consultancy */}
            <div className="comparison-card with-us">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success-green)', fontWeight: 800 }}>
                <CheckCircle2 size={24} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--success-green)' }}>With Amrutha Passport Consultancy</h3>
              </div>
              <ul className="comparison-list">
                <li className="comparison-item">
                  <CheckCircle2 size={18} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>100% Pre-Audit:</strong> We inspect every letter, date of birth, and parent name across all submitted IDs.</span>
                </li>
                <li className="comparison-item">
                  <CheckCircle2 size={18} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Strict Tatkaal Verification:</strong> We pre-verify 3 qualifying government IDs to ensure zero rejection at PSK.</span>
                </li>
                <li className="comparison-item">
                  <CheckCircle2 size={18} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Non-ECR Qualification:</strong> Automatic screening of matriculation or tax documents to guarantee Non-ECR status.</span>
                </li>
                <li className="comparison-item">
                  <CheckCircle2 size={18} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Transparent Advisory:</strong> Clear guidance with direct links to official MEA government portals and zero false promises.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Legal & Statutory Transparency Box */}
      <section className="container" style={{ marginBottom: '64px' }}>
        <div className="alert-box alert-warning" style={{ padding: '24px' }}>
          <AlertTriangle size={28} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--warning-amber)', marginBottom: '6px' }}>
              Statutory Transparency & Disclaimer
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#78350F', lineHeight: 1.6 }}>
              <strong>Amrutha Passport Consultancy</strong> operates strictly as an independent private document preparation and facilitation agency. We are <strong>not</strong> affiliated with the Ministry of External Affairs (MEA), the Central Passport Organization, or any Government of India department. We do not approve, print, or issue passports. Passports in India are granted exclusively by the Government of India through Passport Seva Kendras (PSK).
            </p>
            <div style={{ marginTop: '12px' }}>
              <a
                href="https://www.passportindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-navy)', fontWeight: 700, textDecoration: 'underline' }}
              >
                Click here to visit the Official Government Portal (passportindia.gov.in) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions with Search Filter */}
      <section className="section" style={{ background: '#FFF8EB' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag saffron">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear, transparent answers to help you navigate Indian passport procedures with ease.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="container section">
        <div className="cta-banner">
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Ready to Get Your Passport Process Started?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Book your consultation slot today. Our senior document specialists will pre-audit your paperwork and guide you through the appointment booking.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary btn-lg">
              <Calendar size={18} />
              <span>Book Consultation Slot</span>
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">
              <PhoneCall size={18} />
              <span>Contact Advisory Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
