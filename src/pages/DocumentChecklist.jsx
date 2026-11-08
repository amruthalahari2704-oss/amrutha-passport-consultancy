import { useState, useEffect } from 'react';
import { 
  Printer, 
  CheckSquare, 
  RotateCcw, 
  AlertTriangle, 
  FileCheck, 
  CheckCircle2, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CHECKLIST_DATABASE = [
  // 1. Fresh Adult
  {
    id: 'fresh-dob',
    category: 'fresh',
    group: 'Date of Birth Proof (Any 1)',
    title: 'Date of Birth (DOB) Proof',
    desc: 'Accepted: Municipal Birth Certificate, 10th Standard / Matriculation Marksheet/Certificate, Aadhaar Card with full DOB, PAN Card, or Driving License.',
    mandatory: true
  },
  {
    id: 'fresh-address',
    category: 'fresh',
    group: 'Present Address Proof (Any 1)',
    title: 'Present Residential Address Proof',
    desc: 'Accepted: Aadhaar Card, Active Scheduled Bank Passbook (with photo stamp & 1-year transactions), Recent Electricity/Water bill (within 2 months), or Voter ID. Must show continuous 1-year stay.',
    mandatory: true
  },
  {
    id: 'fresh-non-ecr',
    category: 'fresh',
    group: 'Educational / Non-ECR Proof',
    title: 'Non-ECR Proof (Emigration Check Not Required)',
    desc: 'Original 10th / Secondary School Passing Certificate or higher university degree. Exempts you from emigration clearance when traveling abroad for work.',
    mandatory: false
  },
  {
    id: 'fresh-arn',
    category: 'fresh',
    group: 'Application Proof',
    title: 'Printed Application Reference Number (ARN) Receipt',
    desc: 'Generated after online submission and fee payment on the official Passport Seva portal. Contains appointment batch time and token details.',
    mandatory: true
  },

  // 2. Minor
  {
    id: 'minor-birth-cert',
    category: 'minor',
    group: 'Child Identity Proof',
    title: 'Child’s Original Birth Certificate',
    desc: 'Must be issued by the Municipal Corporation / Registrar of Births and explicitly list both parents’ full legal names.',
    mandatory: true
  },
  {
    id: 'minor-annexure-d',
    category: 'minor',
    group: 'Parental Consent & Declaration',
    title: 'Annexure D (Declaration by Parents for Minor Passport)',
    desc: 'Mandatory statutory declaration signed by BOTH parents affirming consent. In single-parent/separated cases, Annexure C is required.',
    mandatory: true
  },
  {
    id: 'minor-parents-passports',
    category: 'minor',
    group: 'Parental Identity',
    title: 'Both Parents’ Original Valid Passports',
    desc: 'Original passports of father and mother, plus self-attested copies of the first 2 and last 2 pages. If parents do not hold passports, current address proofs of parents are required.',
    mandatory: true
  },
  {
    id: 'minor-photo',
    category: 'minor',
    group: 'Photographs (Infants below 4 years)',
    title: 'Recent Passport Photograph for Babies (Under 4 Years)',
    desc: 'For children below 4 years, carry two 4.5 cm x 3.5 cm color photographs on clean white background with neutral expression and eyes open.',
    mandatory: false
  },

  // 3. Renewal / Re-issue
  {
    id: 'renewal-old-passport',
    category: 'renewal',
    group: 'Existing Passport',
    title: 'Original Old Passport Booklet',
    desc: 'Mandatory: Original physical passport booklet, regardless of whether it is expired or valid. Cancelled stamp will be affixed at PSK Counter B.',
    mandatory: true
  },
  {
    id: 'renewal-passport-copies',
    category: 'renewal',
    group: 'Existing Passport',
    title: 'Self-Attested Photocopies of Old Passport',
    desc: 'Clean photocopies of the first two pages (bio-data page), last two pages (address and parents/spouse page), and ECR/Non-ECR page.',
    mandatory: true
  },
  {
    id: 'renewal-address-change',
    category: 'renewal',
    group: 'Address Update Proof',
    title: 'Updated Address Proof (If Current Address Changed)',
    desc: 'Required ONLY if you have moved to a new address compared to what is printed on your old passport. Accepted: Aadhaar, Bank Passbook, or Voter ID.',
    mandatory: false
  },
  {
    id: 'renewal-fir-lost',
    category: 'renewal',
    group: 'Special Cases (Lost or Damaged)',
    title: 'Police FIR / Lost Certificate & Annexure F (If Lost)',
    desc: 'Mandatory in case of lost, stolen, or severely damaged passports. Requires police station Lost Certificate / Non-Cognizable Report (NCR).',
    mandatory: false
  },

  // 4. Tatkaal
  {
    id: 'tatkaal-doc1',
    category: 'tatkaal',
    group: 'Mandatory MEA Table of 13 (Document 1 of 3)',
    title: 'Aadhaar Card / e-Aadhaar with 12-Digit UID',
    desc: 'Aadhaar is primary. Ensure that your name, father\'s name, and complete date of birth match with 100% accuracy.',
    mandatory: true
  },
  {
    id: 'tatkaal-doc2',
    category: 'tatkaal',
    group: 'Mandatory MEA Table of 13 (Document 2 of 3)',
    title: 'PAN Card / Voter ID Card / Driving License',
    desc: 'Second government photo identity card from MEA Table of 13. Letters and spelling must match Document 1 exactly.',
    mandatory: true
  },
  {
    id: 'tatkaal-doc3',
    category: 'tatkaal',
    group: 'Mandatory MEA Table of 13 (Document 3 of 3)',
    title: '10th Standard Marksheet / Bank Passbook / Service ID',
    desc: 'Third qualifying document. Any discrepancy in initials or surname between the 3 IDs will lead to rejection at PSK Counter B.',
    mandatory: true
  },
  {
    id: 'tatkaal-annexure-f',
    category: 'tatkaal',
    group: 'Statutory Verification',
    title: 'Annexure F (Verification Certificate / Urgency Affidavit)',
    desc: 'Statutory affidavit outlining urgency. Having confirmed international flight tickets or official company deputation letters accelerates granting.',
    mandatory: true
  }
];

export default function DocumentChecklist() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkedIds, setCheckedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('apc_checklist_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apc_checklist_checks', JSON.stringify(checkedIds));
    } catch (err) {
      console.error(err);
    }
  }, [checkedIds]);

  const toggleItem = (id) => {
    setCheckedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAll = () => {
    if (window.confirm('Reset all checked items in your document checklist?')) {
      setCheckedIds({});
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Documents' },
    { id: 'fresh', label: 'Fresh Passport (Adult)' },
    { id: 'minor', label: 'Minor (Under 18)' },
    { id: 'renewal', label: 'Renewal / Re-issue' },
    { id: 'tatkaal', label: 'Tatkaal (3-Doc Set)' },
  ];

  const displayedItems = CHECKLIST_DATABASE.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const totalCount = displayedItems.length;
  const checkedCount = displayedItems.filter(item => !!checkedIds[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Printable-Only Header */}
        <div className="print-only-header">
          <h1>Amrutha Passport Consultancy — Official Applicant Document Checklist</h1>
          <p>
            Private Document Facilitation & Advisory • Reference for Passport Seva Kendra (PSK) Verification
          </p>
          <p style={{ marginTop: '4px' }}>
            Printed on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} | Category: {filterTabs.find(t => t.id === selectedCategory)?.label}
          </p>
        </div>

        {/* Web Header */}
        <div className="section-title-wrap no-print">
          <span className="section-tag saffron">Pre-Appointment Verification</span>
          <h1 className="section-title">Interactive Document Checklist</h1>
          <p className="section-subtitle">
            Select your passport category, check off the physical documents you have gathered, and print your personalized verification sheet before visiting the PSK.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="checklist-filter-pills no-print">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`btn btn-sm ${selectedCategory === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Progress Tracker Card */}
        <div className="checklist-progress-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <strong style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', display: 'block' }}>
                Your Document Readiness: {checkedCount} of {totalCount} verified ({progressPercent}%)
              </strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {progressPercent === 100
                  ? '🎉 Excellent! All documents for this category are marked ready.'
                  : 'Check off each original document you have collected.'}
              </span>
            </div>

            <div className="no-print" style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-navy btn-sm"
                title="Print clean checklist for physical verification"
              >
                <Printer size={15} />
                <span>Print Checklist</span>
              </button>
              {checkedCount > 0 && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="btn btn-secondary btn-sm"
                  title="Clear checked boxes"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div className="checklist-progress-bar-bg no-print">
            <div className="checklist-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Mandatory PSK Rule Alert */}
        <div className="alert-box alert-warning" style={{ marginBottom: '28px' }}>
          <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Mandatory PSK Rules on Appointment Day:</strong>
            <ul style={{ marginTop: '6px', paddingLeft: '20px', fontSize: '0.88rem' }}>
              <li>You must carry <strong>ORIGINALS</strong> of all checked documents for inspection at Counter B.</li>
              <li>Carry <strong>two (2) clean, self-attested photocopies</strong> of each document.</li>
              <li>Names, parent names, and date of birth must match character-for-character across all IDs.</li>
            </ul>
          </div>
        </div>

        {/* Checklist Items */}
        <div style={{ marginBottom: '36px' }}>
          {displayedItems.map((item) => {
            const isChecked = !!checkedIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`checklist-item-card ${isChecked ? 'checked' : ''}`}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="checklist-checkbox"
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--navy-blue)', background: 'var(--navy-soft)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {item.group}
                    </span>
                    {item.mandatory ? (
                      <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>Mandatory</span>
                    ) : (
                      <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>If Applicable</span>
                    )}
                  </div>

                  <div className="checklist-item-title">{item.title}</div>
                  <div className="checklist-item-desc">{item.desc}</div>
                </div>

                {isChecked && (
                  <CheckCircle2 size={20} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Prompt & Official Link */}
        <div className="card no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--navy-soft)', border: '1.5px solid rgba(19, 62, 135, 0.2)' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '4px' }}>
              Want our experts to pre-audit your documents?
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Avoid counter rejections. Our consultants verify spelling and Non-ECR status before your slot.
            </p>
          </div>
          <Link to="/book" className="btn btn-primary btn-sm">
            <Calendar size={15} />
            <span>Book Document Pre-Audit</span>
          </Link>
        </div>

        {/* Printed Footer Notice */}
        <div className="print-footer-notice" style={{ display: 'none' }}>
          <p>
            <strong>Statutory Notice:</strong> Amrutha Passport Consultancy is an independent private consultancy and not affiliated with the Government of India or the Ministry of External Affairs (MEA). Passports are issued exclusively by the Government of India through Passport Seva Kendras (PSK). Official portal: www.passportindia.gov.in.
          </p>
        </div>
      </div>
    </div>
  );
}
