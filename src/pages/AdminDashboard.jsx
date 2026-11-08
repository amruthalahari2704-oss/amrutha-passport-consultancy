import { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Users, 
  Clock, 
  CheckCircle, 
  Search, 
  RefreshCw, 
  Filter, 
  Phone, 
  Calendar, 
  Download, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  AlertCircle, 
  ShieldCheck, 
  LogOut,
  X
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData.js';

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  return Boolean(sessionStorage.getItem('apc_admin_token'));
});

const [username, setUsername] = useState('');
const [passcode, setPasscode] = useState('');
const [authError, setAuthError] = useState('');
  // Requests Data
  const [requests, setRequests] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [editingNotesItem, setEditingNotesItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'fresh-passport',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    notes: 'Phone booking taken by staff.'
  });

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('apc_consultations');
      if (stored) {
        setRequests(JSON.parse(stored));
      } else {
        setRequests(INITIAL_CONSULTATION_REQUESTS);
        localStorage.setItem('apc_consultations', JSON.stringify(INITIAL_CONSULTATION_REQUESTS));
      }
    } catch (err) {
      setRequests(INITIAL_CONSULTATION_REQUESTS);
    }
  }, []);

  // Handle staff login
  const handleLogin = async (e) => {
  e.preventDefault();
  setAuthError('');

  try {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: passcode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    sessionStorage.setItem('apc_admin_token', data.token);
    setIsAuthenticated(true);
    setPasscode('');
  } catch (error) {
    setAuthError(error.message || 'Unable to connect to the server.');
  }
};

  const handleLogout = () => {
  sessionStorage.removeItem('apc_admin_token');
  setIsAuthenticated(false);
  setRequests([]);
};

  // Update status
  const updateStatus = (id, newStatus) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(updated);
    try {
      localStorage.setItem('apc_consultations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Save notes
  const saveNotes = (id, updatedNotes) => {
    const updated = requests.map(r => r.id === id ? { ...r, notes: updatedNotes } : r);
    setRequests(updated);
    try {
      localStorage.setItem('apc_consultations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setEditingNotesItem(null);
  };

  // Delete request
  const deleteRequest = (id) => {
    if (window.confirm(`Are you sure you want to delete request ${id}?`)) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);
      try {
        localStorage.setItem('apc_consultations', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Add manual booking
  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!newBookingData.fullName.trim() || !newBookingData.phone.trim()) return;

    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `APC-${currentYear}-${randomNum}`;
    const selectedServiceObj = SERVICES_DATA.find(s => s.id === newBookingData.service) || SERVICES_DATA[0];

    const record = {
      id: generatedId,
      fullName: newBookingData.fullName.trim(),
      phone: newBookingData.phone.replace(/\D/g, ''),
      email: newBookingData.email.trim() || 'walkin@customer.com',
      service: newBookingData.service,
      serviceName: selectedServiceObj.title,
      preferredDate: newBookingData.preferredDate,
      preferredTime: newBookingData.preferredTime,
      status: 'Confirmed',
      notes: newBookingData.notes.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [record, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem('apc_consultations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowAddModal(false);
    setNewBookingData({
      fullName: '',
      phone: '',
      email: '',
      service: 'fresh-passport',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM',
      notes: 'Phone booking taken by staff.'
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Reference ID,Full Name,Phone,Email,Service,Preferred Date,Time Slot,Status,Notes'];
    const rows = requests.map(r => 
      `"${r.id}","${r.fullName}","${r.phone}","${r.email}","${r.serviceName}","${r.preferredDate}","${r.preferredTime}","${r.status}","${(r.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `amrutha-consultations-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to default sample mock data
  const resetToDefault = () => {
    if (window.confirm('Reset all consultations to sample default data?')) {
      localStorage.setItem('apc_consultations', JSON.stringify(INITIAL_CONSULTATION_REQUESTS));
      setRequests(INITIAL_CONSULTATION_REQUESTS);
    }
  };

  // Filter and search
  const filteredRequests = requests.filter(r => {
    const matchesFilter = selectedFilter === 'All' || r.status === selectedFilter;
    const matchesSearch = 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      (r.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Analytics Metrics
  const total = requests.length;
  const pending = requests.filter(r => r.status === 'Pending Review').length;
  const confirmed = requests.filter(r => r.status === 'Confirmed').length;
  const inProgress = requests.filter(r => r.status === 'In Progress').length;
  const completed = requests.filter(r => r.status === 'Completed').length;

  // Render Authentication Gate if not logged in
  if (!isAuthenticated) {
    return (
      <div className="section" style={{ padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px 28px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--navy-soft)',
              color: 'var(--navy-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Lock size={28} />
            </div>

            <h1 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Staff Management Portal
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Secure gateway for Amrutha Passport Consultancy staff to view and update customer consultation bookings.
            </p>

            {authError && (
              <div className="alert-box alert-warning" style={{ marginBottom: '16px', padding: '8px 12px', fontSize: '0.85rem' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>
  {/* Admin Username */}
  <div className="form-group">
    <label className="form-label" htmlFor="admin-username">
      Admin Username
    </label>

    <input
      type="text"
      id="admin-username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter admin username"
      className="form-control"
      required
    />
  </div>

  {/* Existing Staff Access Passcode field comes here */}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                <Unlock size={16} />
                <span>Authorize & Enter</span>
              </button>
            </form>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <span>Demo Quick Login: </span>
              <button
                type="button"
                onClick={() => {
                  setPasscode('admin2026');
                  sessionStorage.setItem('apc_admin_session', 'authenticated');
                  setIsAuthenticated(true);
                }}
                style={{ color: 'var(--navy-blue)', fontWeight: 700, textDecoration: 'underline' }}
              >
                Click here to auto-fill passcode (admin2026)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="section">
      <div className="container">
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-saffron)', fontWeight: 700, fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>CONSULTANCY STAFF DESK (AUTHENTICATED)</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', marginTop: '4px' }}>
              Consultation Requests Management
            </h1>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm"
            >
              <PlusCircle size={15} />
              <span>Manual Phone Booking</span>
            </button>
            <button
              type="button"
              onClick={exportToCSV}
              className="btn btn-secondary btn-sm"
              title="Download CSV report of all requests"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={resetToDefault}
              className="btn btn-secondary btn-sm"
              title="Reset to default sample data"
            >
              <RefreshCw size={14} />
              <span>Reset Data</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              title="Sign out of staff portal"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Analytics Snapshot Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div className="card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Total Requests</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{total}</div>
          </div>
          <div className="card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--warning-amber)' }}>Pending Review</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning-amber)' }}>{pending}</div>
          </div>
          <div className="card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--navy-blue)' }}>In Progress</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-blue)' }}>{inProgress}</div>
          </div>
          <div className="card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--success-green)' }}>Confirmed Slots</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success-green)' }}>{confirmed}</div>
          </div>
          <div className="card" style={{ padding: '18px' }}>
            <span style={{ fontSize: '0.825rem', color: '#059669' }}>Completed & Ready</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>{completed}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['All', 'Pending Review', 'Confirmed', 'In Progress', 'Completed'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`btn btn-sm ${selectedFilter === filter ? 'btn-navy' : 'btn-secondary'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, phone, or ID..."
              className="form-control"
              style={{ paddingLeft: '36px', height: '38px', fontSize: '0.88rem' }}
            />
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Table View */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Applicant</th>
                <th>Service Requested</th>
                <th>Consultation Slot</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No consultation records match the active filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong style={{ color: 'var(--navy-blue)' }}>{req.id}</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {new Date(req.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                    <td>
                      <strong style={{ display: 'block' }}>{req.fullName}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{req.email}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{req.serviceName}</span>
                    </td>
                    <td>
                      <span style={{ display: 'block', fontWeight: 600 }}>{req.preferredDate}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.preferredTime}</span>
                    </td>
                    <td>
                      <a href={`tel:+91${req.phone}`} style={{ color: 'var(--navy-blue)', fontWeight: 600 }}>
                        +91 {req.phone}
                      </a>
                    </td>
                    <td>
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="form-control"
                        style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setEditingNotesItem(req)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                          title="View or Edit Internal Remarks"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRequest(req.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', color: 'var(--danger-red)' }}
                          title="Delete Request"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: Edit Internal Remarks */}
        {editingNotesItem && (
          <div className="admin-modal-backdrop" onClick={() => setEditingNotesItem(null)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>
                  Internal Staff Remarks
                </h3>
                <button type="button" onClick={() => setEditingNotesItem(null)} style={{ color: 'var(--text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ fontSize: '0.88rem', marginBottom: '14px', background: 'var(--bg-main)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                <div><strong>Applicant:</strong> {editingNotesItem.fullName}</div>
                <div><strong>Ref ID:</strong> {editingNotesItem.id}</div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const updatedNotes = e.target.notes.value;
                saveNotes(editingNotesItem.id, updatedNotes);
              }}>
                <div className="form-group">
                  <label className="form-label">Notes & Next Actions</label>
                  <textarea
                    name="notes"
                    defaultValue={editingNotesItem.notes}
                    rows={4}
                    className="form-control"
                    placeholder="Enter document verification notes or appointment instructions..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button type="button" onClick={() => setEditingNotesItem(null)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save Remarks
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Manual Phone Booking */}
        {showAddModal && (
          <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>
                  Record Manual Phone Consultation
                </h3>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ color: 'var(--text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddBooking}>
                <div className="form-group">
                  <label className="form-label">Applicant Name *</label>
                  <input
                    type="text"
                    required
                    value={newBookingData.fullName}
                    onChange={(e) => setNewBookingData({ ...newBookingData, fullName: e.target.value })}
                    className="form-control"
                    placeholder="Enter applicant name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={newBookingData.phone}
                    onChange={(e) => setNewBookingData({ ...newBookingData, phone: e.target.value })}
                    className="form-control"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Required Service</label>
                  <select
                    value={newBookingData.service}
                    onChange={(e) => setNewBookingData({ ...newBookingData, service: e.target.value })}
                    className="form-control"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      value={newBookingData.preferredDate}
                      onChange={(e) => setNewBookingData({ ...newBookingData, preferredDate: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <select
                      value={newBookingData.preferredTime}
                      onChange={(e) => setNewBookingData({ ...newBookingData, preferredTime: e.target.value })}
                      className="form-control"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Remarks</label>
                  <textarea
                    rows={2}
                    value={newBookingData.notes}
                    onChange={(e) => setNewBookingData({ ...newBookingData, notes: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Create Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
