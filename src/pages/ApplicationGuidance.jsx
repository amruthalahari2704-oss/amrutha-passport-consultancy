import { 
  Compass, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Camera, 
  ShieldCheck, 
  UserCheck, 
  Truck, 
  ExternalLink,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { APPLICATION_STEPS } from '../data/mockData.js';

export default function ApplicationGuidance() {
  const pskWalkthrough = [
    {
      step: 'Step 1',
      title: 'Arrival & Security Token Gate',
      time: 'T - 15 Minutes',
      desc: 'Arrive at the Passport Seva Kendra (PSK) or Post Office PSK (POPSK) 15 minutes before your allotted batch time. Show your printed ARN appointment slip at the entry security gate. Electronic baggage screening is conducted, and an electronic queue token number (e.g., N-42 or T-18) is issued.',
      icon: MapPin,
      badge: 'Entry Gate'
    },
    {
      step: 'Step 2',
      title: 'Waiting Lounge & Overhead Screen',
      time: '5 - 15 Mins Wait',
      desc: 'Take a seat in the air-conditioned citizen waiting hall. Watch the overhead LED displays and listen for audio chimes announcing your token number and directing you to your assigned Counter A cabin.',
      icon: Clock,
      badge: 'Lounge'
    },
    {
      step: 'Step 3',
      title: 'Counter A: Biometrics & Photo Capture',
      time: 'Citizen Service (TCS)',
      desc: 'The executive captures your live digital photograph, scans all 10 fingerprints on the biometric scanner, and uploads your scanned documents. You will be asked to review your name, DOB, and address on a dual-facing monitor before signing digitally.',
      icon: Camera,
      badge: 'Biometrics'
    },
    {
      step: 'Step 4',
      title: 'Counter B: Verification Officer',
      time: 'Govt Verification Officer',
      desc: 'A gazetted government officer physically inspects your original documents (Birth proof, Address proof, 10th marksheet for Non-ECR, old passport). The officer marks "Verified" on the physical photocopies and cancels your previous passport if renewing.',
      icon: FileText,
      badge: 'Originals Check'
    },
    {
      step: 'Step 5',
      title: 'Counter C: Granting Officer & Exit Slip',
      time: 'Final Decision',
      desc: 'The Passport Granting Officer reviews Counter A and B clearances. The officer makes the final granting decision (Granted, On-Hold, or Additional Docs). You are handed an Exit Paper Slip indicating your application status and whether police verification is pre- or post-issuance.',
      icon: ShieldCheck,
      badge: 'Granting & Exit'
    }
  ];

  const dosList = [
    'Arrive at the PSK 15 minutes prior to the reporting batch time printed on your ARN.',
    'Carry ALL original documents along with two clean, self-attested photocopies of each.',
    'Carefully review all personal details on the Counter A dual-monitor screen before signing.',
    'Dress in dark or collared clothing for optimal contrast against the white photo background.',
    'Ensure both parents attend the PSK in person when applying for a minor child under 18.',
    'Retain your Exit Paper Slip safely — it contains your File Number for online speed post tracking.'
  ];

  const dontsList = [
    'Do not wear white shirts or light tops — they blend into the mandatory white camera backdrop.',
    'Do not wear coloured cosmetic contact lenses or heavy spectacle frames that obscure the eyes.',
    'Do not carry smartwatches, laptops, or large electronic luggage into the high-security PSK hall.',
    'Do not leave Counter A without carefully verifying spelling of names and date of birth.',
    'Do not submit laminated documents where the seals or stamps are obscured or damaged.',
    'Do not pay any cash or tips to any unauthorized agents outside the PSK gates.'
  ];

  return (
    <div className="section" style={{ background: '#e9eef3' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <span className="section-tag saffron">Official Process Blueprint</span>
          <h1 className="section-title">Step-by-Step Indian Passport Guidance</h1>
          <p className="section-subtitle">
            A comprehensive, transparent walkthrough from application preparation and PSK counter navigation to police verification and doorstep Speed Post delivery.
          </p>
        </div>

        {/* 4 Application Stages Overview */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '24px', textAlign: 'center' }}>
            The 4 Stages of Your Passport Journey
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {APPLICATION_STEPS.map((s) => (
              <div key={s.step} className="card" style={{ position: 'relative' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--navy-soft)',
                  color: 'var(--navy-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  marginBottom: '16px'
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-navy)' }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '16px' }}>
                  {s.desc}
                </p>
                <span className="badge badge-navy">Timeline: {s.timeframe}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inside the PSK: Visual Counter-by-Counter Walkthrough */}
        <div className="card" style={{ padding: '36px 28px', marginBottom: '64px', background: '#FFFFFF', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
            <span className="section-tag">Inside the Centre</span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Passport Seva Kendra (PSK) Walkthrough
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Knowing exactly what happens at each counter relieves anxiety and ensures you navigate the center quickly.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pskWalkthrough.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--navy-soft)',
                      color: 'var(--navy-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-saffron)', textTransform: 'uppercase' }}>
                          {item.step}
                        </span>
                        <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)' }}>{item.title}</h3>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, paddingLeft: '4px' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment-Day Do's and Don'ts */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-tag saffron">Essential Rules</span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)' }}>
              Appointment-Day Do’s and Don’ts
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Follow these ground rules to ensure zero delays at PSK inspection counters.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* DO's Card */}
            <div className="card" style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success-green)', marginBottom: '16px' }}>
                <CheckCircle2 size={24} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--success-green)', fontWeight: 800 }}>
                  What You MUST Do
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dosList.map((doItem, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#166534', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{doItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts Card */}
            <div className="card" style={{ background: '#FFF1F2', border: '1.5px solid #FECDD3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger-red)', marginBottom: '16px' }}>
                <XCircle size={24} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--danger-red)', fontWeight: 800 }}>
                  What You MUST NOT Do
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dontsList.map((dontItem, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#991B1B', lineHeight: 1.5 }}>
                    <XCircle size={16} color="var(--danger-red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{dontItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Police Verification & Post-Dispatch Roadmap */}
        <div className="card" style={{ padding: '32px', marginBottom: '48px', borderLeft: '4px solid var(--navy-blue)' }}>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={24} color="var(--navy-blue)" />
            <span>Understanding Police Verification (PVR) & Speed Post Delivery</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '16px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--navy-blue)', marginBottom: '6px' }}>
                1. Local Police Station Verification:
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Under the Normal scheme, an assigned local beat officer contacts you within 7 to 14 days following your PSK visit. Have original Aadhaar, 2 passport photos, and your neighbor's reference signature ready.
              </p>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--navy-blue)', marginBottom: '6px' }}>
                2. India Post Secure Handover:
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Passports are dispatched exclusively via India Post Speed Post. As per MEA rules, the passport will <strong>only</strong> be handed over in person to the applicant upon presenting original government photo ID.
              </p>
            </div>
          </div>
        </div>

        {/* Callout to Book Consultation */}
        <div className="card" style={{ textAlign: 'center', padding: '36px 20px', background: 'var(--navy-soft)', border: '1.5px solid rgba(19, 62, 135, 0.2)' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>
            Need Personal Guidance for Your Application?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto 24px' }}>
            Schedule a consultation with our experienced documentation team. We check every detail and walk you through the entire process.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary">
              <Calendar size={16} />
              <span>Book Appointment Consultation</span>
            </Link>
            <Link to="/checklist" className="btn btn-secondary">
              <FileText size={16} />
              <span>Print Your Document Checklist</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
