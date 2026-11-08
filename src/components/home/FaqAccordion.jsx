import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { FAQS_DATA } from '../../data/mockData.js';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const [filterQuery, setFilterQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const filteredFaqs = FAQS_DATA.filter(f => 
    f.question.toLowerCase().includes(filterQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Search Filter for FAQs */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter FAQs (e.g. Tatkaal, Non-ECR, Biometrics, Police verification)..."
          className="form-control"
          style={{ paddingLeft: '40px', height: '46px' }}
        />
        <Search
          size={18}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No FAQ matched "{filterQuery}". Feel free to reach out directly via our Contact page.</p>
        </div>
      ) : (
        filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-header-btn"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <HelpCircle size={19} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{faq.question}</span>
                </div>
                {isOpen ? <ChevronUp size={20} color="var(--navy-blue)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
              </button>

              {isOpen && (
                <div className="faq-content-body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
