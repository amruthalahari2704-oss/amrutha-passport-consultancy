import { CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function PassportGraphic() {
  return (
    <div className="passport-visual-container" aria-hidden="true">
      <div className="passport-card-stack">
        {/* Floating Verified Badge */}
        <div className="floating-badge badge-top-left">
          <div style={{
            background: 'var(--success-light)',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success-green)'
          }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Pre-Audit Check
            </span>
            <span style={{ color: 'var(--primary-navy)', fontSize: '0.85rem' }}>
              Zero Rejection Readiness
            </span>
          </div>
        </div>

        {/* Passport Booklet Card */}
        <div className="passport-book">
          <div className="passport-gold-header">भारत गणराज्य</div>
          <div className="passport-gold-sub">REPUBLIC OF INDIA</div>

          {/* Stylized Emblem / Ashok Chakra Motif */}
          <div className="passport-emblem-wrap">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" stroke="#FBBF24" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="#FBBF24" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#FBBF24" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#FBBF24" strokeWidth="1" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#FBBF24" strokeWidth="1" />
              <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" stroke="#FBBF24" strokeWidth="1" />
            </svg>
          </div>

          <div className="passport-gold-title">पासपोर्ट</div>
          <div className="passport-gold-title" style={{ fontSize: '1.25rem' }}>PASSPORT</div>

          <div className="passport-gold-footer">
            <span>REGULAR BOOKLET • 36 / 60 PAGES</span>
          </div>
        </div>

        {/* Floating Tatkaal Priority Badge */}
        <div className="floating-badge badge-bottom-right">
          <div style={{
            background: 'var(--accent-saffron-light)',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-saffron)'
          }}>
            <Zap size={18} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Urgent Category
            </span>
            <span style={{ color: 'var(--primary-navy)', fontSize: '0.85rem' }}>
              Tatkaal Scheme Advisory
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
