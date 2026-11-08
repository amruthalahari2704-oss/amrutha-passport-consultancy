import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck,
  Printer,
  Search,
  ArrowRight,
  Info
} from 'lucide-react';
import { SERVICES_DATA, INITIAL_CONSULTATION_REQUESTS } from '../data/mockData.js';


export default function BookConsultation() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  // Today's date in YYYY-MM-DD for min date constraint
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'fresh-passport',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Pre-select service if passed in URL query param
  useEffect(() => {
    if (serviceParam) {
      const exists = SERVICES_DATA.some(s => s.id === serviceParam);
      if (exists) {
        setFormData(prev => ({ ...prev, service: serviceParam }));
      }
    }
  }, [serviceParam]);

  const validate = () => {
    const newErrors = {};

    // Name validation
    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = 'Full name is required as per official ID proofs.';
    } else if (trimmedName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      newErrors.fullName = 'Please enter a valid name using letters and spaces only.';
    }

    // Phone validation (Indian 10-digit mobile starting with 6, 7, 8, or 9)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = '10-digit mobile number is mandatory for SMS and slot updates.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = `Phone number must be exactly 10 digits (currently entered ${cleanPhone.length} digits).`;
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number starting with 6, 7, 8, or 9.';
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required to receive appointment confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    // Preferred Date validation
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred consultation date.';
    } else if (formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'Consultation date cannot be in the past.';
    }

    // Agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please confirm that you acknowledge this is a private consultancy service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);

  try {
    const selectedServiceObj =
      SERVICES_DATA.find((s) => s.id === formData.service) ||
      SERVICES_DATA[0];

    const response = await fetch(
      "http://localhost:5000/api/consultations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.replace(/\D/g, ""),
          email: formData.email.trim(),
          service: formData.service,
          serviceName: selectedServiceObj.title,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: formData.notes.trim(),
          agreeTerms: formData.agreeTerms,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to save your booking."
      );
    }

    // Use the booking saved by the backend.
    setBookingSuccess(result.consultation);
  } catch (error) {
    console.error("Booking submission error:", error);

    window.alert(
      error.message ||
        "Unable to connect to the server. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  const selectedServiceDetails = SERVICES_DATA.find(s => s.id === formData.service);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Printable Receipt Only Header */}
        <div className="print-only-header">
          <h1>Amrutha Passport Consultancy — Official Booking Receipt</h1>
          <p>
            Private Document Facilitation & Advisory • Reference for Consultation Slot
          </p>
          <p style={{ marginTop: '4px' }}>
            Generated on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Section Header */}
        <div className="section-title-wrap no-print">
          <span className="section-tag saffron">Priority Scheduling</span>
          <h1 className="section-title">Schedule a Consultation</h1>
          <p className="section-subtitle">
            Get your documents pre-screened by senior consultants before your visit to the Passport Seva Kendra (PSK/POPSK).
          </p>
        </div>

        {bookingSuccess ? (
          <div className="card" style={{ textAlign: 'center', padding: '44px 28px' }}>
            <div className="no-print" style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--success-light)',
              color: 'var(--success-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px'
            }}>
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '1.7rem', color: 'var(--primary-navy)', marginBottom: '6px' }}>
              Consultation Slot Confirmed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Your consultation booking has been recorded. Quote this reference code when speaking to our advisory desk:
            </p>

            <div style={{
              display: 'inline-block',
              background: 'var(--navy-soft)',
              color: 'var(--navy-blue)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '1.5rem',
              letterSpacing: '0.05em',
              marginBottom: '28px',
              border: '2px dashed var(--navy-blue)'
            }}>
              {bookingSuccess.id}
            </div>

            {/* Receipt Summary Grid */}
            <div style={{
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              maxWidth: '580px',
              margin: '0 auto 32px',
              textAlign: 'left',
              fontSize: '0.92rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reference ID:</span>
                <strong style={{ color: 'var(--primary-navy)' }}>{bookingSuccess.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Applicant Name:</span>
                <strong>{bookingSuccess.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Requested Service:</span>
                <strong style={{ color: 'var(--navy-blue)' }}>{bookingSuccess.serviceName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Consultation Slot:</span>
                <strong>{bookingSuccess.preferredDate} at {bookingSuccess.preferredTime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contact Details:</span>
                <span>+91 {bookingSuccess.phone} | {bookingSuccess.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Application Status:</span>
                <span className="badge badge-saffron">{bookingSuccess.status}</span>
              </div>
            </div>

            {/* Next Steps Note */}
            <div className="alert-box alert-info" style={{ maxWidth: '580px', margin: '0 auto 28px', textAlign: 'left' }}>
              <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Next Step:</strong> An advisor will call you at <strong>+91 {bookingSuccess.phone}</strong> around your chosen slot time ({bookingSuccess.preferredTime}) to review your document readiness.
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-navy"
              >
                <Printer size={16} />
                <span>Print Booking Receipt</span>
              </button>
              <Link to="/track" className="btn btn-secondary">
                <Search size={16} />
                <span>Track Status in Portal</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(null);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    service: 'fresh-passport',
                    preferredDate: '',
                    preferredTime: '10:00 AM',
                    notes: '',
                    agreeTerms: false
                  });
                }}
                className="btn btn-primary"
              >
                <span>Book Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="card">
            {/* Selected Service Context Pill */}
            {selectedServiceDetails && (
              <div style={{
                background: 'var(--navy-soft)',
                border: '1px solid rgba(19, 62, 135, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-blue)', textTransform: 'uppercase' }}>
                    Selected Category:
                  </span>
                  <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>
                    {selectedServiceDetails.title}
                  </div>
                </div>
                <span className="badge badge-saffron">
                  Expected TAT: {selectedServiceDetails.tat}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">
                    <User size={15} color="var(--navy-blue)" />
                    <span>Applicant Full Name <span className="required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className={`form-control ${errors.fullName ? 'error' : ''}`}
                    required
                  />
                  {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                </div>

                {/* Mobile Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    <Phone size={15} color="var(--navy-blue)" />
                    <span>10-Digit Indian Mobile Number <span className="required">*</span></span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9845012345"
                    maxLength={10}
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    required
                  />
                  {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    <Mail size={15} color="var(--navy-blue)" />
                    <span>Email Address <span className="required">*</span></span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh.kumar@example.com"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    required
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                {/* Service Selection */}
                <div className="form-group">
                  <label className="form-label" htmlFor="service">
                    <FileText size={15} color="var(--navy-blue)" />
                    <span>Consultancy Service <span className="required">*</span></span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.tat})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label className="form-label" htmlFor="preferredDate">
                    <Calendar size={15} color="var(--navy-blue)" />
                    <span>Preferred Consultation Date <span className="required">*</span></span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={todayStr}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`form-control ${errors.preferredDate ? 'error' : ''}`}
                    required
                  />
                  {errors.preferredDate && <span className="form-error-msg">{errors.preferredDate}</span>}
                </div>

                {/* Preferred Time Slot */}
                <div className="form-group">
                  <label className="form-label" htmlFor="preferredTime">
                    <Clock size={15} color="var(--navy-blue)" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="10:00 AM">10:00 AM – 11:30 AM (Morning Batch)</option>
                    <option value="11:30 AM">11:30 AM – 01:00 PM (Mid-day Batch)</option>
                    <option value="02:30 PM">02:30 PM – 04:00 PM (Afternoon Batch)</option>
                    <option value="04:30 PM">04:30 PM – 06:00 PM (Evening Batch)</option>
                  </select>
                </div>
              </div>

              {/* Remarks / Message */}
              <div className="form-group" style={{ marginTop: '10px' }}>
                <label className="form-label" htmlFor="notes">
                  <span>Additional Details / Current Passport Status (Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Mention if you have travel urgency, old passport booklet details, or specific spelling questions..."
                  className="form-control"
                />
              </div>

              {/* Private Consultancy Checkbox */}
              <div style={{ marginTop: '20px', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: 'var(--accent-saffron)' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    I understand that <strong>Amrutha Passport Consultancy</strong> is an independent advisory firm and <em>not</em> an official Government of India department. Final passport granting is subject to Government of India verification at the PSK.
                  </span>
                </label>
                {errors.agreeTerms && <span className="form-error-msg" style={{ display: 'block', marginTop: '4px' }}>{errors.agreeTerms}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Confirming Your Slot...' : 'Submit Consultation Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
