import { ShieldCheck, HeartHandshake, Award, Target, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const values = [
    {
      icon: ShieldCheck,
      title: '100% Ethical & Transparent',
      desc: 'We never claim false government ties or make impossible approval guarantees. Our pride lies in thorough, error-free documentation.'
    },
    {
      icon: Target,
      title: 'Precision Document Pre-Auditing',
      desc: 'Over 65% of PSK delays occur because of simple spelling or format mismatches. We detect and fix these before you pay any non-refundable government fees.'
    },
    {
      icon: HeartHandshake,
      title: 'Applicant-Centric Care',
      desc: 'From newborn minor applications to senior citizens requiring doorstep document collation, we treat every application with dedication.'
    },
    {
      icon: Award,
      title: 'Zero Plaintext or Scan Retention',
      desc: 'We respect privacy. We never store government portal passwords in plain text, nor do we retain original identity booklets.'
    }
  ];

  return (
    <div className="section" style={{ background: '#f1f3f6' }}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag saffron">Our Story & Mission</span>
          <h1 className="section-title">About Amrutha Passport Consultancy</h1>
          <p className="section-subtitle">
            Founded with a vision to provide trustworthy, transparent, and prompt documentation assistance for Indian citizens seeking passports.
          </p>
        </div>

        {/* Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center', marginBottom: '64px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
              Guiding Indian Citizens with Clarity & Confidence
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              Applying for an Indian passport can often feel overwhelming—navigating Non-ECR rules, complex annexure formats, differing spelling across Aadhaar and 10th certificates, and strict appointment slot timings at Passport Seva Kendras (PSK).
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              <strong>Amrutha Passport Consultancy</strong> was established to bridge this knowledge gap. As an independent consultancy, we assist applicants in verifying eligibility, collating the precise documents, filing error-free applications, and preparing them thoroughly for their appointment day.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/book" className="btn btn-primary">
                Book a Consultation
              </Link>
              <Link to="/services" className="btn btn-secondary">
                View Our Services
              </Link>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--navy-soft)', border: '1.5px solid rgba(19, 62, 135, 0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-blue)', marginBottom: '14px' }}>
              Important Statutory Notice
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Please be aware that <strong>Amrutha Passport Consultancy is a private enterprise</strong>. We do not have the legal authority to print, approve, or issue passports.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              All passports in India are issued exclusively by the <strong>Government of India (Ministry of External Affairs)</strong>. You may also apply directly on the official portal at zero consultancy charge by visiting:
            </p>
            <div style={{ marginTop: '16px' }}>
              <a
                href="https://www.passportindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy btn-sm"
              >
                <span>Visit Official Passport Seva Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div>
          <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '36px' }}>
            Our Core Principles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="card">
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--navy-soft)',
                    color: 'var(--navy-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
