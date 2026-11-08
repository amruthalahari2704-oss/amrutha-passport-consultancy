// Central mock data repository for Amrutha Passport Consultancy

export const SERVICES_DATA = [
  {
    id: 'fresh-passport',
    category: 'fresh-renewal',
    title: 'Fresh Indian Passport Application',
    tagline: 'First-time passport applicants of all age groups (Adult 10-Year Validity)',
    description: 'Complete guidance on document collation, online Passport Seva profile registration, ARN generation, Annexure filing, and appointment slot booking.',
    badge: 'Most Popular',
    tat: '3-4 Weeks Normal / 3-5 Days Tatkaal',
    eligibility: 'Any Indian citizen who has never held an Indian passport before.',
   
    documentsRequired: [
      'Proof of Date of Birth (Birth Certificate, 10th Class Marksheet, or Aadhaar Card)',
      'Proof of Present Address (Aadhaar Card, Active Bank Passbook, Voter ID, or Utility Bill)',
      'Non-ECR Proof (Matriculation/10th certificate or higher degree to qualify for Emigration Check Not Required)'
    ],
    features: [
      'Complete pre-audit of names, DOB, and address proofs',
      'Non-ECR eligibility evaluation (avoids ECR stamp)',
      'Selection between 36-page standard and 60-page frequent flyer booklet',
      'Preferred PSK/POPSK appointment slot booking assistance'
    ]
  },
  {
    id: 'passport-renewal',
    category: 'fresh-renewal',
    title: 'Passport Renewal & Re-issue',
    tagline: 'Expiring passports, exhausted visa pages, or damaged/lost booklets',
    description: 'Expert assistance for re-issue due to passport validity expiry (up to 1 year before or after), exhausted pages, physical damage, or change in personal particulars.',
    badge: 'Essential',
    tat: '2-3 Weeks Normal / 2-4 Days Tatkaal',
    eligibility: 'Existing Indian passport holders needing renewal or re-issue.',
    
    documentsRequired: [
      'Original Old Passport Booklet (plus self-attested copies of first 2 and last 2 pages)',
      'Proof of Current Address (mandatory if your address has changed since previous passport)',
      'Police Non-Cognizable Report (NCR/FIR) and Affidavit Annexure F (if passport is lost)'
    ],
    features: [
      'Previous passport details verification and endorsement checks',
      'Address change documentation review',
      'Lost / mutilated passport affidavit guidance',
      'Tatkaal scheme re-issue eligibility screening'
    ]
  },
  {
    id: 'tatkaal-guidance',
    category: 'urgent',
    title: 'Tatkaal Scheme Advisory',
    tagline: 'Expedited processing for genuine urgent international travel',
    description: 'Priority guidance navigating the Ministry of External Affairs Tatkaal scheme. We verify strict document compliance to avoid rejection at the PSK counter.',
    badge: 'Urgent Processing',
    tat: '1-3 Business Days (Subject to PSK granting)',
    eligibility: 'Applicants with urgent emergency travel, business assignments, or medical needs holding 3 qualifying MEA documents.',
    
    documentsRequired: [
      'Any 3 mandatory documents from the official Table of 13 specified by MEA (e.g., Aadhaar, PAN, Voter ID, Driving License, Service ID)',
      'Strict exact name, father\'s name, and date of birth match across all 3 documents',
      'Urgency justification / flight reservation (strongly recommended)'
    ],
    features: [
      'Strict 3-document compatibility audit across government IDs',
      'Next-day appointment slot guidance at PSK',
      'Post-police verification compliance briefing',
      'Annexure F / statutory declaration assistance'
    ]
  },
  {
    id: 'minor-passport',
    category: 'minor',
    title: 'Minor Passport Assistance',
    tagline: 'Children from newborn infants up to 18 years of age',
    description: 'Specialized assistance handling minor applications, Annexure C / D parental consent affidavits, single parent guidelines, and 5-year vs 10-year validity rules.',
    badge: 'Family Special',
    tat: '2-3 Weeks Normal',
    eligibility: 'Children below 18 years of age residing in India with at least one parent holding a valid Indian passport.',
   
    documentsRequired: [
      'Child\'s original Birth Certificate showing both parents\' full names',
      'Both parents\' valid Indian passports (original & self-attested copies)',
      'Annexure D signed by both parents (or Annexure C in single-parent custody cases)',
      'Proof of parents\' current residential address'
    ],
    features: [
      'Parental consent affidavit (Annexure D/C) preparation',
      'Infant white-background photograph specification guidance',
      'Counseling on 5-year vs 10-year validity options for teens (15-18 yrs)',
      'Both parents PSK attendance protocol briefing'
    ]
  },
  {
    id: 'document-assistance',
    category: 'prep',
    title: 'Document Assistance & Verification',
    tagline: 'Pre-audit, Non-ECR qualification & legal name/address corrections',
    description: 'Comprehensive scrutiny of your documents before PSK submission. We eliminate spelling errors, resolve initials expansion issues, and guide Gazette / newspaper publications.',
    badge: 'Essential Prep',
    tat: '1-2 Days Pre-Audit',
    eligibility: 'Applicants with spelling variations between certificates, post-marriage surname changes, or address updates.',
   
    documentsRequired: [
      'Existing identity proofs (Aadhaar, PAN, Voter ID, Driving License)',
      '10th Standard / Matriculation marksheet or higher degree certificates',
      'Marriage Certificate or Gazette Notification copy (if name is modified)'
    ],
    features: [
      'Spelling reconciliation between 10th marksheet and Aadhaar',
      'Non-ECR status eligibility evaluation to prevent overseas travel restrictions',
      'Annexure drafting and Gazette notification format guidance',
      'Pre-submission compliance check to avoid "ON HOLD" tokens'
    ]
  },
  {
    id: 'appointment-prep',
    category: 'prep',
    title: 'Appointment Preparation & PSK Briefing',
    tagline: 'Mock walkthrough of Counter A, B & C for a smooth PSK visit',
    description: 'Thorough preparation for your appointment day at the Passport Seva Kendra (PSK) or Post Office PSK (POPSK). Learn the counter flow, dress code, and original doc arrangement.',
    badge: 'Confidence Booster',
    tat: 'Instant / 1 Day Prior to Slot',
    eligibility: 'Applicants with confirmed PSK/POPSK appointment slots seeking zero stress on their reporting day.',
   
    documentsRequired: [
      'Printed Application Receipt (ARN Sheet) with appointment batch confirmation',
      'Originals of all uploaded identity and address documents',
      'Two (2) sets of clean self-attested photocopies arranged in official sequence'
    ],
    features: [
      'Counter A, B, and C sequential process walkthrough',
      'Biometric & camera capture dress code advice',
      'Exit slip interpretation and Police Verification (PVR) roadmap',
      'Rescheduling support if unforeseen emergencies arise'
    ]
  }
];

export const FAQS_DATA = [
  {
    question: 'Is Amrutha Passport Consultancy an official government agency?',
    answer: 'No. We are an independent, private consultancy providing professional documentation assistance, application filing guidance, and appointment booking support. Passports in India are issued exclusively by the Government of India through the Ministry of External Affairs (MEA) at official Passport Seva Kendras (PSK/POPSK).'
  },
  {
    question: 'Can you guarantee that my passport will be approved?',
    answer: 'No consultancy can or should guarantee passport approval. The decision to issue a passport lies solely with the Passport Granting Officers and the Government of India, following biometric verification and local police verification. Our role is to ensure your documents, forms, and procedures are 100% compliant so you avoid avoidable rejections, counter delays, or penalties.'
  },
  {
    question: 'What is the main difference between Normal and Tatkaal scheme?',
    answer: 'Under the Normal scheme, police verification is usually completed before the passport is printed and dispatched (taking 2 to 4 weeks on average). Under the Tatkaal scheme, passports are dispatched on a priority basis (often within 1 to 3 working days) with post-police verification, subject to strict document submission (3 specific documents matching exactly) and higher government fees.'
  },
  {
    question: 'Do I still need to visit the Passport Seva Kendra (PSK) in person?',
    answer: 'Yes, mandatory government rules require the applicant (including minors and senior citizens) to physically appear at the allotted PSK/POPSK counter for live biometric capture (fingerprints, facial photograph, and iris scan) and original document verification.'
  },
  {
    question: 'What documents are accepted as proof of Date of Birth for adults?',
    answer: 'As per revised MEA guidelines, accepted DOB proofs include: Birth Certificate issued by Municipal Authority, School Leaving Certificate / Matriculation (10th) mark sheet, PAN Card, Aadhaar Card / e-Aadhaar, Voter ID, or Driving License, provided the date is clearly stated.'
  },
  {
    question: 'How do I qualify for Non-ECR (Emigration Check Not Required) status?',
    answer: 'You qualify for Non-ECR status if you have passed 10th standard (Matriculation) or have higher educational qualifications. Other eligible categories include taxpayers, senior citizens (above 50 years), children below 18 years, and individuals who have stayed abroad for 3 or more years.'
  }
];

export const APPLICATION_STEPS = [
  {
    step: '01',
    title: 'Consultation & Document Audit',
    desc: 'We review your identity, age, and address proofs to eliminate spelling discrepancies and verify Non-ECR eligibility.',
    timeframe: 'Day 1'
  },
  {
    step: '02',
    title: 'Online Application & ARN Filing',
    desc: 'Accurate preparation of your application form on the official portal, selecting correct booklet type (36 vs 60 pages).',
    timeframe: 'Day 1 - 2'
  },
  {
    step: '03',
    title: 'Govt Fee & PSK Appointment',
    desc: 'Guidance with official government fee payment and securing the earliest convenient appointment slot at your nearest PSK/POPSK.',
    timeframe: 'Day 2'
  },
  {
    step: '04',
    title: 'PSK Visit, Biometrics & Dispatch',
    desc: 'We provide an appointment-day checklist. You attend PSK for biometric capture; passport is printed and dispatched to your home post verification.',
    timeframe: 'Days 3 - 21'
  }
];

export const INITIAL_CONSULTATION_REQUESTS = [
  {
    id: 'APC-2026-1042',
    fullName: 'Rahul Sharma',
    phone: '9845012345',
    email: 'rahul.sharma@example.com',
    service: 'fresh-passport',
    serviceName: 'Fresh Indian Passport Application',
    preferredDate: '2026-10-24',
    preferredTime: '10:30 AM',
    status: 'Confirmed',
    notes: 'Needs 36-page standard passport. Has 10th certificate and Aadhaar ready.',
    createdAt: '2026-10-18T10:15:00.000Z'
  },
  {
    id: 'APC-2026-1043',
    fullName: 'Priya Sundaram',
    phone: '9900198765',
    email: 'priya.sundaram@example.com',
    service: 'tatkaal-guidance',
    serviceName: 'Tatkaal Scheme Advisory',
    preferredDate: '2026-10-22',
    preferredTime: '02:00 PM',
    status: 'In Progress',
    notes: 'Urgent travel scheduled next month for corporate project in Singapore.',
    createdAt: '2026-10-18T14:40:00.000Z'
  },
  {
    id: 'APC-2026-1044',
    fullName: 'Anand Kumar V',
    phone: '9741238901',
    email: 'anand.k@example.com',
    service: 'minor-passport',
    serviceName: 'Minor Passport Assistance',
    preferredDate: '2026-10-25',
    preferredTime: '11:00 AM',
    status: 'Pending Review',
    notes: 'Application for 4-year-old daughter. Parents hold valid passports.',
    createdAt: '2026-10-19T09:20:00.000Z'
  }
];
