import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Navigation,
  Compass,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(null);

  // Map view toggle state for the interactive placeholder
  const [mapMode, setMapMode] = useState('map'); // 'map' or 'satellite'

  const validate = () => {
    const errors = {};

    const trimmedName = contactForm.name.trim();
    if (!trimmedName) {
      errors.name = 'Your name is required.';
    } else if (trimmedName.length < 3) {
      errors.name = 'Name must be at least 3 characters.';
    }

    const cleanPhone = contactForm.phone.replace(/\D/g, '');
    if (!contactForm.phone.trim()) {
      errors.phone = '10-digit mobile number is required.';
    } else if (cleanPhone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Number must start with 6, 7, 8, or 9.';
    }

    if (contactForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactForm.email.trim())) {
      errors.email = 'Please provide a valid email format.';
    }

    const trimmedMsg = contactForm.message.trim();
    if (!trimmedMsg) {
      errors.message = 'Please write a brief message or question.';
    } else if (trimmedMsg.length < 10) {
      errors.message = 'Please provide at least 10 characters detailing your query.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    setTimeout(() => {
      const ticketId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSending(false);
      setTicketSuccess({
        id: ticketId,
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        subject: contactForm.subject
      });
      setContactForm({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="section" style={{ background: '#f1f3f6' }}>
      <div className="container">
        {/* Page Title */}
        <div className="section-title-wrap">
          <span className="section-tag saffron">Reach Out</span>
          <h1 className="section-title">Contact Amrutha Passport Consultancy</h1>
          <p className="section-subtitle">
            Have questions regarding document eligibility, Tatkaal rules, or appointment slots? Our senior advisory desk is ready to help.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', marginBottom: '48px' }}>
          {/* Col 1: Branch Details & Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card">
              <h2 style={{ fontSize: '1.35rem', marginBottom: '20px', color: 'var(--primary-navy)' }}>
                Consultation Office
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'var(--navy-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--navy-blue)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Office Location</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Shop No.52, KSR Complex,Main Road, opposite.Sesha mahal, One Town,Tarapet,Vijayawada,Andhra Pradesh 520001
                    </span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-saffron)', marginTop: '3px', fontWeight: 600 }}>
                      Landmark: 3-minute walk from Town Police Station
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'var(--navy-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--navy-blue)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Phone & WhatsApp Helpline</strong>
                    <a href="tel:+919876543210" style={{ fontSize: '0.95rem', color: 'var(--navy-blue)', fontWeight: 700 }}>
                      +91 9494473176
                    </a>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Available Mon - Sat, 9:30 AM to 6:30 PM (IST)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'var(--navy-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--navy-blue)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Direct Email Desk</strong>
                    <a href="mailto:amruthapassportconsultancy@gmail.com" style={{ fontSize: '0.92rem', color: 'var(--navy-blue)', fontWeight: 600 }}>
                      amruthapassportconsultancy@gmail.com
                    </a>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Guaranteed reply within 2 to 4 business hours
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'var(--navy-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--navy-blue)' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Working Hours</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Monday – Saturday: 9:30 AM – 9:30 PM
                    </span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Sundays & Gazetted Holidays: Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Person Slot Quick Link */}
            <div className="alert-box alert-info">
              <MessageSquare size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Need an assured consultation slot?</strong> Book directly via our{' '}
                <Link to="/book" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--navy-blue)' }}>
                  Online Booking Form
                </Link>{' '}
                to get guaranteed same-day document pre-screening.
              </div>
            </div>
          </div>

          {/* Col 2: Validated Inquiry Form */}
          <div className="card">
            <h2 style={{ fontSize: '1.35rem', marginBottom: '6px', color: 'var(--primary-navy)' }}>
              Send an Advisory Query
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Have a question about Non-ECR, passport renewal, or Tatkaal qualifications? Drop us a note.
            </p>

            {ticketSuccess ? (
              <div style={{ padding: '36px 16px', textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--success-light)',
                  color: 'var(--success-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <span className="badge badge-saffron" style={{ marginBottom: '8px' }}>
                  Ticket Reference: {ticketSuccess.id}
                </span>

                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
                  Inquiry Submitted Successfully!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  Thank you, <strong>{ticketSuccess.name}</strong>. Your query regarding <em>"{ticketSuccess.subject}"</em> has been logged. Our documentation specialist will call or WhatsApp you on <strong>+91 {ticketSuccess.phone}</strong> shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setTicketSuccess(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    <span>Your Full Name <span className="required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Rao"
                    className={`form-control ${formErrors.name ? 'error' : ''}`}
                    required
                  />
                  {formErrors.name && <span className="form-error-msg">{formErrors.name}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">
                    <span>10-Digit Mobile Number <span className="required">*</span></span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`form-control ${formErrors.phone ? 'error' : ''}`}
                    required
                  />
                  {formErrors.phone && <span className="form-error-msg">{formErrors.phone}</span>}
                </div>

                {/* Email (Optional) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleChange}
                    placeholder="ananya.rao@example.com"
                    className={`form-control ${formErrors.email ? 'error' : ''}`}
                  />
                  {formErrors.email && <span className="form-error-msg">{formErrors.email}</span>}
                </div>

                {/* Subject Topic */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    <span>Inquiry Topic</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="General Inquiry">General Indian Passport Inquiry</option>
                    <option value="Tatkaal Urgency">Urgent / Tatkaal 3-Document Eligibility</option>
                    <option value="Minor Child Passport">Minor Child / Annexure D Parental Consent</option>
                    <option value="Name/Address Change">Name, Address, or Marital Status Correction</option>
                    <option value="Non-ECR Verification">Non-ECR Qualification (10th/Degree proofs)</option>
                    <option value="PCC Overseas">Police Clearance Certificate (PCC) for Visa</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    <span>Your Message / Query <span className="required">*</span></span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleChange}
                    placeholder="Please mention your question, travel timeline, or current passport status..."
                    className={`form-control ${formErrors.message ? 'error' : ''}`}
                    required
                  />
                  {formErrors.message && <span className="form-error-msg">{formErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Send size={16} />
                  <span>{isSending ? 'Transmitting Query...' : 'Send Inquiry Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Interactive Placeholder */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <div style={{
            padding: '16px 24px',
            background: 'var(--primary-navy)',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Navigation size={20} color="var(--accent-saffron)" />
              <div>
                <strong style={{ fontSize: '1rem', display: 'block' }}>Office Map & Directions</strong>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>One Town Tarapet ,Vijayawada</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-sm)', padding: '2px' }}>
                <button
                  type="button"
                  onClick={() => setMapMode('map')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    background: mapMode === 'map' ? 'var(--accent-saffron)' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  Map View
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    background: mapMode === 'satellite' ? 'var(--accent-saffron)' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  Satellite View
                </button>
              </div>

              <a
                href="https://www.google.com/maps/place/Amrutha+Passport+Consultancy/@16.5130156,80.6127621,16z/data=!4m6!3m5!1s0x3a35f131c3d3258f:0x8b96fd39a69d27af!8m2!3d16.5136585!4d80.6144573!16s%2Fg%2F11k7n4x06v?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Simulated Interactive Map Canvas */}
          <div style={{
            height: '320px',
            position: 'relative',
            background: mapMode === 'satellite'
              ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #e2e8f0 25%, #f1f5f9 25%, #f1f5f9 50%, #e2e8f0 50%, #e2e8f0 75%, #f1f5f9 75%, #f1f5f9 100%)',
            backgroundSize: '40px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Grid street aesthetic */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: mapMode === 'satellite' ? 0.15 : 0.4,
              backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />

            {/* Stylized Metro Line on Map */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '8px',
              background: '#9333EA',
              transform: 'rotate(-15deg)',
              opacity: 0.6,
              boxShadow: '0 0 8px rgba(147, 51, 234, 0.4)'
            }} />

            {/* Pin Marker Card */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              background: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 12px 28px rgba(11, 37, 69, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '360px',
              border: '2px solid var(--accent-saffron)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent-saffron-light)',
                color: 'var(--accent-saffron)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--primary-navy)', display: 'block' }}>
                  Amrutha Passport Consultancy
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  near Bus Stand , Vijayawada • One Town Police Station
                </span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--success-green)', fontWeight: 700, marginTop: '2px' }}>
                  ● Open Mon-Sat 9:30 AM to 6:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
