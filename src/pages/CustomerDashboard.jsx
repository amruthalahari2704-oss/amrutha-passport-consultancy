import { useState, useEffect } from 'react';
import { 
  Search, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Calendar, 
  User, 
  Printer, 
  FileText,
  ShieldCheck,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { INITIAL_CONSULTATION_REQUESTS } from '../data/mockData.js';
import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleMessage, setRescheduleMessage] = useState('');

  // Initial load: check if query param or recent booking exists
  useEffect(() => {
    try {
      const allBookings = JSON.parse(localStorage.getItem('apc_consultations')) || INITIAL_CONSULTATION_REQUESTS;
      if (allBookings.length > 0 && !result && !searched) {
        // Automatically display the first/latest booking as an initial preview
        setResult(allBookings[0]);
        setSearched(true);
        setSearchQuery(allBookings[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const allBookings = JSON.parse(localStorage.getItem('apc_consultations')) || INITIAL_CONSULTATION_REQUESTS;
    const query = searchQuery.trim().toLowerCase();

    const found = allBookings.find(b => 
      b.id.toLowerCase() === query || 
      b.phone.includes(query) ||
      b.email.toLowerCase() === query
    );

    setResult(found || null);
    setSearched(true);
  };

  const executeSampleSearch = (code) => {
    setSearchQuery(code);
    const allBookings = JSON.parse(localStorage.getItem('apc_consultations')) || INITIAL_CONSULTATION_REQUESTS;
    const found = allBookings.find(b => b.id.toLowerCase() === code.toLowerCase() || b.phone.includes(code));
    setResult(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge badge-success">{status}</span>;
      case 'In Progress':
        return <span className="badge badge-saffron">{status}</span>;
      case 'Completed':
        return <span className="badge badge-success">Completed & Ready</span>;
      default:
        return <span className="badge badge-navy">{status}</span>;
    }
  };

  // Determine timeline step progression
  const getTimelineStepClass = (stepIndex, status) => {
    // 0: Logged, 1: Pre-Audit, 2: Slot Confirmed, 3: PSK Ready
    if (status === 'Completed') return 'completed';
    if (status === 'Confirmed') {
      if (stepIndex <= 2) return 'completed';
      if (stepIndex === 3) return 'active';
    }
    if (status === 'In Progress') {
      if (stepIndex === 0) return 'completed';
      if (stepIndex === 1) return 'active';
    }
    if (status === 'Pending Review') {
      if (stepIndex === 0) return 'completed';
      if (stepIndex === 1) return 'active';
    }
    return '';
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setRescheduleMessage('Reschedule request sent! Our support desk will contact you within 2 hours to confirm a new time.');
    setTimeout(() => {
      setShowRescheduleModal(false);
      setRescheduleMessage('');
    }, 2500);
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Printable Header */}
        <div className="print-only-header">
          <h1>Amrutha Passport Consultancy — Consultation Status Verification</h1>
          <p>Official Verification Document for Client Tracking & Records</p>
          <p style={{ marginTop: '4px' }}>Printed on: {new Date().toLocaleDateString('en-IN')}</p>
        </div>

        {/* Web Header */}
        <div className="section-title-wrap no-print">
          <span className="section-tag saffron">Self-Service Portal</span>
          <h1 className="section-title">Track Consultation Status</h1>
          <p className="section-subtitle">
            Enter your Consultation Reference ID (e.g. APC-2026-1042) or registered 10-digit mobile number to view real-time progress.
          </p>
        </div>

        {/* Search Bar */}
        <div className="card no-print" style={{ marginBottom: '32px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Reference ID (e.g. APC-2026-1042) or 10-digit Phone..."
                className="form-control"
                style={{ paddingLeft: '40px' }}
                required
              />
              <Search
                size={18}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <span>Track Request</span>
            </button>
          </form>

          {/* Quick Demo Tag Pill Selector */}
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <span>Quick Sample Searches:</span>
            {['APC-2026-1042', 'APC-2026-1043', 'APC-2026-1044'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => executeSampleSearch(code)}
                style={{
                  background: 'var(--navy-soft)',
                  color: 'var(--navy-blue)',
                  border: '1px solid rgba(19, 62, 135, 0.2)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {searched && (
          <div>
            {result ? (
              <div className="card">
                {/* Result Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                      Consultation Reference Code
                    </span>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)' }}>{result.id}</h2>
                  </div>
                  <div>
                    {getStatusBadge(result.status)}
                  </div>
                </div>

                {/* Visual Status Timeline */}
                <div className="status-timeline">
                  <div className={`status-timeline-step ${getTimelineStepClass(0, result.status)}`}>
                    <div className="status-step-circle">1</div>
                    <span className="status-step-label">Request Logged</span>
                  </div>
                  <div className={`status-timeline-step ${getTimelineStepClass(1, result.status)}`}>
                    <div className="status-step-circle">2</div>
                    <span className="status-step-label">Pre-Audit Docs</span>
                  </div>
                  <div className={`status-timeline-step ${getTimelineStepClass(2, result.status)}`}>
                    <div className="status-step-circle">3</div>
                    <span className="status-step-label">Slot Confirmed</span>
                  </div>
                  <div className={`status-timeline-step ${getTimelineStepClass(3, result.status)}`}>
                    <div className="status-step-circle">4</div>
                    <span className="status-step-label">PSK Ready</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  background: 'var(--bg-main)',
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Applicant</span>
                    <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--primary-navy)' }}>{result.fullName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Requested Service</span>
                    <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--navy-blue)' }}>{result.serviceName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Consultation Slot</span>
                    <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-main)' }}>{result.preferredDate} ({result.preferredTime})</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact Mobile</span>
                    <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-main)' }}>+91 {result.phone}</strong>
                  </div>
                </div>

                {/* Consultation Notes */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                    Advisory Remarks & Next Steps:
                  </span>
                  <div style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    background: '#FFFFFF',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    lineHeight: 1.55
                  }}>
                    {result.notes}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="no-print" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn-secondary btn-sm"
                  >
                    <Printer size={15} />
                    <span>Print Status Sheet</span>
                  </button>
                  <Link to="/checklist" className="btn btn-secondary btn-sm">
                    <FileText size={15} />
                    <span>Review Required Docs</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowRescheduleModal(true)}
                    className="btn btn-secondary btn-sm"
                  >
                    <RotateCcw size={15} />
                    <span>Request Reschedule</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
                <AlertCircle size={44} color="var(--accent-saffron)" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
                  No Consultation Record Found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
                  We could not find an active booking matching "{searchQuery}". Please verify your 10-digit mobile number or Reference ID.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <Link to="/book" className="btn btn-primary btn-sm">
                    Book a Consultation
                  </Link>
                  <button
                    type="button"
                    onClick={() => executeSampleSearch('APC-2026-1042')}
                    className="btn btn-secondary btn-sm"
                  >
                    Load Demo Request
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="admin-modal-backdrop" onClick={() => setShowRescheduleModal(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
                Request Slot Reschedule
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Reschedule request for Reference: <strong>{result?.id}</strong>
              </p>

              {rescheduleMessage ? (
                <div className="alert-box alert-success">{rescheduleMessage}</div>
              ) : (
                <form onSubmit={handleRescheduleSubmit}>
                  <div className="form-group">
                    <label className="form-label">New Preferred Date *</label>
                    <input type="date" required className="form-control" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot *</label>
                    <select className="form-control">
                      <option value="10:00 AM">10:00 AM – 11:30 AM</option>
                      <option value="11:30 AM">11:30 AM – 01:00 PM</option>
                      <option value="02:30 PM">02:30 PM – 04:00 PM</option>
                      <option value="04:30 PM">04:30 PM – 06:00 PM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reason / Notes</label>
                    <textarea rows={2} className="form-control" placeholder="Mention why you need to reschedule..." />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <button type="button" onClick={() => setShowRescheduleModal(false)} className="btn btn-secondary btn-sm">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
