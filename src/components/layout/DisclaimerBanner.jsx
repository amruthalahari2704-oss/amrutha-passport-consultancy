import { ShieldAlert, ExternalLink, Phone, Mail } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <aside className="disclaimer-banner" aria-label="Official Disclaimer and Support">
      <div className="disclaimer-container">
        <div className="disclaimer-text">
          <span className="disclaimer-pill">Private Consultancy</span>
          <span>
            Independent document facilitation agency. Not an official Government of India portal.
          </span>
          <a
            href="https://www.passportindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="disclaimer-link"
            title="Go to Official Passport Seva Portal"
          >
            Visit Official Passport Seva <ExternalLink size={12} />
          </a>
        </div>

        <div className="disclaimer-contact">
          <a href="tel:+919494472176">
            <Phone size={13} />
            <span>+91 9494472176</span>
          </a>
          <a href="mailto:amruthapassportconsultancy@gmail.com">
            <Mail size={13} />
            <span>amruthapassportconsultancy@gmail.com</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
