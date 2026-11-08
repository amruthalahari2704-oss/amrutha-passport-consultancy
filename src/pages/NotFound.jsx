import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section" style={{ textAlign: 'center', padding: '90px 20px' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--navy-soft)',
          color: 'var(--navy-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <FileQuestion size={38} />
        </div>

        <h1 style={{ fontSize: '2.4rem', color: 'var(--primary-navy)', marginBottom: '12px' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
          The page or document facilitation link you are searching for does not exist or has been relocated.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <button type="button" onClick={() => window.history.back()} className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
