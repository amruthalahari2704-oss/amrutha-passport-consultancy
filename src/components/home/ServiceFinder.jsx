import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FilePlus, 
  RefreshCcw, 
  Zap, 
  Baby, 
  UserCheck, 
  FileCheck2, 
  ArrowRight,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/mockData.js';

export default function ServiceFinder() {
  const [selectedId, setSelectedId] = useState('fresh-passport');

  const finderCategories = [
    { id: 'fresh-passport', label: 'First-time Applicant', icon: FilePlus },
    { id: 'passport-renewal', label: 'Expiring Passport', icon: RefreshCcw },
    { id: 'tatkaal-guidance', label: 'Urgent Travel', icon: Zap },
    { id: 'minor-passport', label: 'Child (Under 18)', icon: Baby },
    { id: 'name-address-change', label: 'Name / Address Change', icon: UserCheck },
    { id: 'pcc-assistance', label: 'Work / Visa PCC', icon: FileCheck2 },
  ];

  const currentService = SERVICES_DATA.find(s => s.id === selectedId) || SERVICES_DATA[0];

  return (
    <div className="service-finder-box">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="section-tag saffron">Quick Eligibility Finder</span>
        <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-navy)' }}>
          Which Indian Passport Service Do You Need?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Select your current situation to see the exact documents and advisory process.
        </p>
      </div>

      {/* Tabs */}
      <div className="finder-tabs">
        {finderCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedId(cat.id)}
              className={`finder-tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Result Box */}
      <div className="finder-result-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-saffron">{currentService.badge}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--navy-blue)', fontWeight: 600 }}>
              Timeline: {currentService.tat}
            </span>
          </div>

          <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
            {currentService.title}
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            {currentService.description}
          </p>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
            <strong>Essential Initial Documents:</strong>
            <ul style={{ listStyle: 'none', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {currentService.documentsRequired.slice(0, 2).map((doc, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to={`/book?service=${currentService.id}`} className="btn btn-primary">
            <Calendar size={16} />
            <span>Book Consultation</span>
          </Link>
          <Link to="/checklist" className="btn btn-secondary">
            <span>View Full Checklist</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
