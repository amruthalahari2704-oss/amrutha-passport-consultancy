import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/mockData.js';
import './Services.css';
import { 
  CheckCircle2, 
  Calendar, 
  FileCheck, 
  ArrowRight, 
  ExternalLink, 
  AlertCircle, 
  HelpCircle, 
  FileText,
  ShieldCheck,
  Zap,
  Users,
  Compass
} from 'lucide-react';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Services (6)' },
    { id: 'fresh-renewal', label: 'Fresh & Renewal' },
    { id: 'urgent', label: 'Urgent (Tatkaal)' },
    { id: 'minor', label: 'Minors & Children' },
    { id: 'prep', label: 'Document & PSK Prep' }
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="section" style={{ background: '#f1f3f6' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <span className="section-tag saffron">Consultancy Solutions</span>
          <h1 className="section-title">Indian Passport Consultancy Services</h1>
          <p className="section-subtitle">
            Expert documentation review, online ARN filing, Tatkaal eligibility pre-screening, and Passport Seva Kendra (PSK) appointment guidance across India.
          </p>
        </div>

        {/* Filter Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '36px'
        }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`btn btn-sm ${activeCategory === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Government Fee Transparency Notice */}
        <div className="alert-box alert-info" style={{ marginBottom: '40px' }}>
          <AlertCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Transparent Fee Policy:</strong> Official Government Passport Fees are set by the Ministry of External Affairs (MEA), Government of India, and are paid <em>directly</em> by applicants on the official Passport Seva portal. Amrutha Passport Consultancy charges a nominal advisory fee for document pre-auditing and application assistance.
            {' '}
            <a
              href="https://www.passportindia.gov.in/AppOnlineProject/fee/feeInput"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 700, textDecoration: 'underline', color: 'var(--navy-blue)' }}
            >
              Verify Official Fees on Govt Fee Calculator <ExternalLink size={12} style={{ display: 'inline' }} />
            </a>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '32px'
        }}>
          {filteredServices.map((service) => (
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
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge badge-saffron">{service.badge}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-blue)', background: 'var(--navy-soft)', padding: '3px 8px', borderRadius: '4px' }}>
                  {service.tat}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '6px' }}>
                {service.title}
              </h2>
              <p style={{ color: 'var(--accent-saffron)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px' }}>
                {service.tagline}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {service.description}
              </p>

              {/* Eligibility Box */}
              <div style={{
                background: 'var(--bg-main)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                fontSize: '0.88rem',
                borderLeft: '3px solid var(--navy-blue)'
              }}>
                <strong style={{ color: 'var(--primary-navy)', display: 'block', marginBottom: '2px' }}>
                  Who is Eligible:
                </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{service.eligibility}</span>
              </div>

              {/* Required Documents */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Mandatory Required Documents:
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {service.documentsRequired.map((doc, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={15} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features List */}
              <div style={{ marginBottom: '24px', flex: 1 }}>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  What Our Consultancy Covers:
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--navy-blue)', fontWeight: 800 }}>•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clearly Labelled Fee Information Box */}
             

              {/* Card Footer CTAs */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <Link to={`/book?service=${service.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  <Calendar size={15} />
                  <span>Book for this</span>
                </Link>
                <Link to="/checklist" className="btn btn-secondary btn-sm" title="View Document Checklist">
                  <FileText size={15} />
                  <span>Checklist</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Need Help Choosing Callout */}
        <div className="card" style={{ marginTop: '48px', textAlign: 'center', padding: '36px 20px', background: 'var(--navy-soft)', border: '1.5px solid rgba(19, 62, 135, 0.2)' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
            Unsure Which Category Applies to You?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto 20px' }}>
            Our senior documentation counselors can review your existing IDs and advise whether you qualify for Tatkaal, standard Normal, or Non-ECR status.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary">
              <Calendar size={16} />
              <span>Schedule Free Document Review</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Contact Advisory Desk</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
