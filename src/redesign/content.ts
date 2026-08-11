export type ProductSlug = 'document-management' | 'compliance-regulation' | 'claims-and-bills';

export const routes = [
  '/',
  '/document-management',
  '/compliance-regulation',
  '/claims-and-bills',
  '/about-us',
  '/contact',
  '/calendly',
  '/training',
  '/blank',
  '/404',
];

export const company = {
  name: 'Ryzolve LLC',
  address: '9309 Highway 75 S, New Waverly, TX 77358',
  email: 'pas@ryzolve.com',
  phone: '9363550920',
  phoneDisplay: '(936) 355-0920',
  mobilePhone: '9363559490',
  calendlyUrl: 'https://calendly.com/ryzolve-pas-software/ryzolve-demo',
  providerLoginUrl: 'https://app.ryzolve.com',
};

export const nav = {
  products: [
    { label: 'Document Management', href: '/document-management', slug: 'document-management', short: 'Document management that fits your healthcare organization.' },
    { label: 'Compliance Regulation', href: '/compliance-regulation', slug: 'compliance-regulation', short: 'Compliance that meets all government requirements, providing automation and peace of mind.' },
    { label: 'Claims & Bills', href: '/claims-and-bills', slug: 'claims-and-bills', short: 'Compare billed and approved hours before claim submission.' },
  ],
  links: [
    { label: 'Home', href: '/', slug: 'home' },
    { label: 'Training', href: '/training', slug: 'training' },
    { label: 'About', href: '/about-us', slug: 'about-us' },
    { label: 'Blogs', href: '/blogs', slug: 'blogs' },
    { label: 'Contact', href: '/contact', slug: 'contact' },
  ],
};

export const sharedServices = [
  {
    title: 'Improve Efficiency',
    description: 'Document management that fits your healthcare organization.',
    href: '/document-management',
    icon: 'document',
  },
  {
    title: 'Stay Compliant',
    description: 'Compliance that meets all government requirements, providing automation and peace of mind.',
    href: '/compliance-regulation',
    icon: 'shield',
  },
  {
    title: 'Claims & Reconciliation',
    description:
      'Compare billed hours with approved EVV/TMHP hours before claim submission and support reconciliation.',
    href: '/claims-and-bills',
    icon: 'card',
  },
  {
    title: 'Training',
    description: 'We facilitate the licensing and training processes for home care, provide certificates.',
    href: '/training',
    icon: 'training',
  },
];

export const home = {
  hero: {
    eyebrow: 'Built for Texas PAS agencies',
    title: 'Stop chasing paperwork. Run your agency with confidence.',
    animatedWords: [],
    subtitle:
      'Ryzolve gives PAS agencies one place to manage EVV-connected schedules, claims, compliance records, payroll, hiring, and staff training.',
    trust: ['Less paperwork', 'Fewer missed tasks', 'Cleaner agency operations'],
  },
  benefits: {
    eyebrow: 'What Ryzolve does',
    title: 'Run your Texas PAS agency on one platform.',
    description:
      'Ryzolve helps agencies manage EVV, claims, compliance, payroll, hiring, and training—without juggling multiple systems.',
    lead:
      'Built for Texas PAS agencies first, with support for Home Health and Hospice operations, Ryzolve brings together the daily workflows that determine whether your agency stays compliant, gets paid, and grows with confidence.',
    cards: [
      {
        title: 'EVV-Connected Scheduling',
        description:
          'Create schedules, manage hours, and keep visits aligned with EVV workflows without duplicate data entry.',
        icon: 'calendar',
      },
      {
        title: 'TMHP Claims & Payments',
        description:
          'Compare billed hours with approved EVV/TMHP hours before submission and review claim status with more context.',
        icon: 'claim',
      },
      {
        title: 'Authorizations + Eligibility',
        description:
          'Track authorized hours, monitor utilization, and review eligibility details to keep services aligned and billable.',
        icon: 'shield',
      },
      {
        title: 'Payroll + Reconciliation',
        description:
          'Bring together timesheets, visit data, and payroll-ready totals so your team can review and process with confidence.',
        icon: 'dollar',
      },
      {
        title: 'Compliance + Audit Readiness',
        description:
          'Organize forms, reminders, background checks, monthly checks, and required documentation for survey readiness.',
        icon: 'clipboard',
      },
      {
        title: 'Hiring, Onboarding & Training',
        description:
          'Manage caregiver onboarding, employability review, hire forms, administrator training, and in-service training records.',
        icon: 'user',
      },
    ],
  },
  beforeAfter: {
    eyebrow: 'Before & after',
    title: 'Replace scattered processes with one connected workflow.',
    withoutTitle: 'Without Ryzolve',
    withTitle: 'With Ryzolve',
    without: [
      'Schedules, EVV, claims, forms, and payroll live in different places.',
      'Staff spend hours chasing missing documents, signatures, and training records.',
      'Claims are submitted without enough visibility into line-level status or denials.',
      'Audit preparation becomes a scramble instead of a routine.',
    ],
    with: [
      'Agency workflows are centralized across scheduling, EVV, claims, compliance, and training.',
      'Admins can track caregiver records, training, forms, and compliance requirements.',
      'Billing teams see claim and payment status with fewer blind spots.',
      'Survey readiness becomes a daily operating standard.',
    ],
  },
  solutions: {
    eyebrow: 'Our Solutions',
    title: 'Transform your PAS agency: No more time wasted on outdated processes',
    description:
      'Connect the agency workflows around billing, payroll data, documents, compliance checks, communications, faxing, and notifications so your team can review work with more context.',
    subheading: 'Personal Agency',
    bullets: [
      'Compare billed hours with approved EVV/TMHP hours before claim submission',
      'Identify mismatches before they become submission rework',
      'Support claim reconciliation across billing and payroll workflows',
    ],
    bulletStats: [
      { value: 'EVV', unit: 'CHECK' },
      { value: 'CLAIMS', unit: 'READY' },
      { value: 'PAYROLL', unit: 'DATA' },
    ],
  },
  strategy: {
    eyebrow: 'Product modules',
    title: 'Each module earns its keep. Together, they remove a category of work from your week.',
    description: 'Three connected modules help your team organize documents, stay survey-ready, and keep claims moving from submission to payment.',
    steps: [
      {
        title: 'Document Management',
        href: '/document-management',
        bullets: ['Caregiver and client forms', 'Audit-ready document tracking', 'Hiring and onboarding records'],
      },
      {
        title: 'Compliance Regulation',
        href: '/compliance-regulation',
        bullets: ['Monthly OIG and LEIE checks', 'Training and certificate records', 'Survey-focused reminders'],
      },
      {
        title: 'Claims & Billing',
        href: '/claims-and-bills',
        bullets: ['TMHP and MCO claim workflows', '277 / 835 visibility', 'Payment and denial tracking'],
      },
    ],
  },
  howItWorks: {
    eyebrow: 'How it Works',
    title: 'Managing claims and paperwork should be easier',
    steps: [
      {
        title: 'Book a demo',
        description:
          'See how Ryzolve fits your current workflows and where your agency can reduce manual work.',
      },
      {
        title: 'Implement the software',
        description:
          'Start with core agency setup, workflow training, data import, and operational readiness.',
      },
      {
        title: 'Improve efficiency and stay compliant',
        description:
          'Use connected workflows to reduce paperwork, monitor claims, track training, and stay survey-ready.',
      },
    ],
  },
};

export const proofPoints = [
  { stat: 'EVV', label: 'Hours check', sub: 'Compare billed and approved hours' },
  { stat: 'TMHP', label: 'Claim context', sub: 'Review before submission' },
  { stat: 'PAYROLL', label: 'Data in context', sub: 'Support reconciliation workflows' },
  { stat: 'READY', label: 'Next step', sub: 'Identify mismatches before sending' },
];

export const statsBand = {
  titlePrefix: 'Eight years of building from inside an agency.',
  titleAccent: 'Distilled',
  titleSuffix: 'into one platform.',
  description:
    'Built around the workflows Texas care agencies review every day — from hours and claims to documents, payroll data, compliance, and training.',
  stats: [
    { value: 'EVV', unit: 'CHECK', label: 'Compare billed and approved hours' },
    { value: 'TMHP', unit: 'CLAIMS', label: 'Review claim readiness' },
    { value: 'PAYROLL', unit: 'DATA', label: 'Support reconciliation' },
    { value: 'HHSC', unit: 'READY', label: 'Keep records in context' },
  ],
};

export const homeTrainingCta = {
  eyebrow: 'Ryzolve Training',
  title: 'Administrator Training and In-Service Training, clearly separated.',
  description:
    'Give users the right path without confusing one-time administrator courses with agency in-service plans.',
  supporting: 'Administrator courses are one-time learner purchases. In-Service plans are monthly agency subscriptions.',
  primaryCta: 'Explore Training Options',
  secondaryCta: 'Compare paths',
  highlights: [
    '8h, 12h, and 16h self-paced courses for Administrators and Alternate Administrators.',
    'Agency plans for monthly caregiver and staff training, completion records, and audit-ready documentation.',
  ],
};

interface ProductPageContent {
  active: ProductSlug;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionLead?: string;
  solutionBullets?: string[];
  aboutTitle: string;
  aboutDescription: string;
  aboutBullets?: string[];
  extraSections?: Array<{ eyebrow: string; title: string; description: string }>;
}

export const products: Record<ProductSlug, ProductPageContent> = {
  'document-management': {
    active: 'document-management',
    label: 'Document Management',
    eyebrow: 'Document Management',
    title: 'Document management without the paper chase.',
    subtitle:
      'Keep client, caregiver, and compliance documents organized in one place with templates, reminders, and audit-ready visibility for your agency.',
    solutionTitle: 'Keep every client file complete, current, and audit-ready.',
    solutionDescription:
      'Ryzolve helps agencies organize client intake, plans of care, medication lists, background checks, authorizations, and annual evaluations in one digital filing system.',
    solutionBullets: [
      'Document suites built for home care workflows',
      'Intake, authorization, and medication templates that reduce rework',
      'Centralized filing, reminders, and audit-ready status tracking',
    ],
    aboutTitle: 'Built to keep your agency inspection-ready.',
    aboutDescription:
      'From intake packets and plans of care to medication records, background checks, and authorizations, Ryzolve helps your team stay organized, reduce paperwork, and prepare for audits with confidence.',
  },
  'compliance-regulation': {
    active: 'compliance-regulation',
    label: 'Compliance Regulation',
    eyebrow: 'Compliance Regulation',
    title: 'Stay compliant',
    subtitle:
      "We've got you covered during state audits. Our solution manages compliance, meeting all government requirements with automation for peace of mind",
    solutionTitle: "You shouldn't need to perform background checks by hand",
    solutionDescription:
      "Performing background checks for pre-hire and on a monthly basis for potential employees shouldn't have to be done manually. Let's streamline and modernize this process for efficiency",
    solutionLead: 'Automate your scheduled and on-demand background checks for all of the following reports:',
    solutionBullets: ['OIG U.S.DHHS', 'TXL OIG HHSC', 'TX: DADS - EMR'],
    aboutTitle: 'Maintain governmental compliance with regular process evaluation',
    aboutDescription:
      'Take advantage of annual evaluations and semi-annual supervisory visits with a compliance expert to ensure your agency maintains an optimal setup.',
    extraSections: [
      {
        eyebrow: 'Our Solutions',
        title: 'Save time with data verification services',
        description:
          'Perform automated verification checks for credentials and age. Reduce human error and agency effort while quickly highlighting issues through exception reporting.',
      },
    ],
  },
  'claims-and-bills': {
    active: 'claims-and-bills',
    label: 'Claims & Bills',
    eyebrow: 'Texas PAS claims management',
    title: 'Claims reconciliation for Texas PAS agencies.',
    subtitle:
      'Compare billed hours with approved EVV/TMHP hours before claim submission, identify mismatches, and support claim reconciliation.',
    solutionTitle: 'Catch mismatches before claim submission.',
    solutionDescription:
      'Ryzolve gives Texas PAS agencies a clear review step before claim submission so teams can compare billed hours with approved EVV/TMHP hours.',
    solutionLead:
      'For teams dealing with denied claims, EVV/billed-hour mismatches, manual reconciliation, and submission errors, use the workflow to review differences before sending and support reconciliation across the claim and payroll process.',
    solutionBullets: [
      'Compare billed hours with approved EVV/TMHP hours',
      'Identify mismatches before claim submission',
      'Support reconciliation across billing and payroll data',
    ],
    aboutTitle: 'Keep claims, payroll, and agency records in context.',
    aboutDescription:
      'Ryzolve covers broader agency workflows including billing, invoicing, claims, payroll data, documents, communications, faxing, compliance checks, and notifications.',
  },
};

export const claimsFaqs = [
  {
    q: 'How does Ryzolve help Texas PAS agencies prepare claims when denials are a concern?',
    a: 'Ryzolve adds a review step before claim submission so your team can compare billed hours with approved EVV/TMHP hours, identify mismatches, and support claim reconciliation.',
  },
  {
    q: 'What happens when billed hours do not match approved hours?',
    a: 'The mismatch becomes visible for review before submission. Your team can investigate the source of the difference and follow the reconciliation workflow before sending the claim.',
  },
  {
    q: 'Can Ryzolve help with manual reconciliation and submission errors?',
    a: 'Ryzolve helps organize the comparison and review work around billing, claims, and payroll data so teams have a clearer submission-readiness step instead of reconciling in separate places.',
  },
  {
    q: 'What other agency workflows connect to claims work?',
    a: 'Ryzolve covers billing, invoicing, claims, payroll data, documents, communications, faxing, compliance checks, and notifications. Book a demo to discuss your agency workflow.',
  },
];

export const whatWeDo = {
  eyebrow: 'What We Do?',
  title: "The service we offer is designed to meet your agency's needs.",
  description:
    'Our solutions are carefully crafted to cater to your unique needs, bringing billing, claims, documents, compliance, and training workflows into one organized operating context.',
};

export const claimsIntro = {
  title: 'Review claims data before submission.',
  description:
    'For Texas PAS agencies, Ryzolve brings billed hours and approved EVV/TMHP hours into a practical review step so billing teams can identify mismatches and support reconciliation before a claim is sent.',
};

export const about = {
  title: 'About Us',
  introTitle: 'Empowering Growth Through Smart Solutions',
  introDescription:
    'Ryzolve is dedicated to transforming the way organizations manage learning, development, and digital adoption. With a deep understanding of modern business needs, we design scalable solutions that simplify processes, improve productivity, and foster continuous improvement.',
  philosophyEyebrow: 'Our Philosophy ?',
  philosophy: [
    'At Ryzolve, we believe that progress starts with people. Our philosophy centers around user empowerment, innovation, and impact. We strive to:',
    'Build intuitive solutions that adapt to real-world challenges.',
    'Encourage lifelong learning and continuous development.',
    'Collaborate closely with our partners to create measurable change.',
  ],
  contactTitle: "Got any questions? Don't hesitate to get in touch.",
};

export const contact = {
  title: 'Get in Touch',
  breadcrumb: ['Home', 'Contact'],
  formTitle: 'Send us a message',
  required: '* These fields are required.',
};

export const blank = {
  title: 'This is blank page',
};

// PAS platform plans, ported from the old website's home pricing table (CMS
// data snapshot). This is the SOFTWARE SKU (per-client pricing), distinct from
// the Training page's In-Service plans (per-learner). Prices exist in the data
// but stay hidden, mirroring the old site's `enable_pricing` flag being off.
export interface PlatformPlan {
  name: string;
  suggestedFor: string;
  monthly: number;
  support: string;
  customPricing: boolean;
  features: string[];
  /**
   * Per-feature text for rows that aren't a plain yes/no (e.g. "Add-On",
   * "N/A"). When the plan ALSO lists the feature in `features`, the check mark
   * is drawn next to the label (e.g. "✓ Included").
   */
  featureValues?: Record<string, string>;
  /** Small pill under the plan name (e.g. "Standalone Plan"). */
  badge?: string;
  /** Draws the accent rule down the column. */
  highlight?: boolean;
  /** Overrides the default "Choose Plan" button label. */
  cta?: string;
}

export const platformPricing = {
  eyebrow: 'Plans that grow with you',
  title: 'Ryzolve — Built for Care. Designed for Agencies.',
  subtitle: 'All-In-One Software for PAS & Private Care Providers',
  lead: 'Flexible pricing that grows with you. No overage fees. No surprises. Just simple pricing based on your average monthly client count.',
  // Pill under the lead — clarifies that Private Care is both a standalone
  // plan (its own column) and an add-on to Growth and above.
  noteLine:
    'All plans cover core PAS operations. Private Care is also available as its own standalone plan, or as an add-on to any Growth plan or above.',
  // Prices are shown on this table (the client's pricing sheet lists them).
  enablePricing: true,
  featureRows: [
    'Time Tracking',
    'Digital Approvals',
    'Payroll Reports & Claims Prep',
    'Claims & Billing Tools',
    'Client Invoicing & Payments',
    'Electronic Messaging',
  ],
  plans: [
    {
      name: 'Starter',
      suggestedFor: 'Up to 10 clients',
      monthly: 199,
      support: 'Email',
      customPricing: false,
      features: [
        'Time Tracking',
        'Digital Approvals',
        'Payroll Reports & Claims Prep',
        'Claims & Billing Tools',
        'Electronic Messaging',
      ],
      featureValues: { 'Client Invoicing & Payments': 'N/A' },
    },
    {
      name: 'Growth',
      suggestedFor: 'Up to 50 clients',
      monthly: 349,
      support: 'Priority Email',
      customPricing: false,
      features: [
        'Time Tracking',
        'Digital Approvals',
        'Payroll Reports & Claims Prep',
        'Claims & Billing Tools',
        'Electronic Messaging',
      ],
      featureValues: { 'Client Invoicing & Payments': 'Add-On' },
    },
    {
      name: 'Professional',
      suggestedFor: 'Up to 100 clients',
      monthly: 499,
      support: 'Email + Phone',
      customPricing: false,
      features: [
        'Time Tracking',
        'Digital Approvals',
        'Payroll Reports & Claims Prep',
        'Claims & Billing Tools',
        'Electronic Messaging',
      ],
      featureValues: { 'Client Invoicing & Payments': 'Add-On' },
    },
    {
      name: 'Enterprise',
      suggestedFor: '100+ clients',
      monthly: 0,
      support: 'Dedicated CSM',
      customPricing: true,
      cta: 'Contact Us',
      features: [
        'Time Tracking',
        'Digital Approvals',
        'Payroll Reports & Claims Prep',
        'Claims & Billing Tools',
        'Electronic Messaging',
      ],
      featureValues: { 'Client Invoicing & Payments': 'Add-On' },
    },
    {
      // Standalone private-pay plan — highlighted column with an accent rule,
      // and deliberately WITHOUT claims/billing + electronic messaging.
      name: 'Private Care Only',
      badge: 'Standalone Plan',
      highlight: true,
      suggestedFor: 'Private-pay clients only',
      monthly: 79,
      support: 'Email',
      customPricing: false,
      features: [
        'Time Tracking',
        'Digital Approvals',
        'Payroll Reports & Claims Prep',
        'Client Invoicing & Payments',
        'Electronic Messaging',
      ],
      featureValues: { 'Client Invoicing & Payments': 'Included' },
    },
  ] as PlatformPlan[],
  addOns: {
    title: 'Add-Ons — Extend Your Plan',
    lead: 'Already on Starter, Growth, Professional, or Enterprise? Layer Private Care onto your existing plan instead of switching.',
    items: [
      {
        name: 'Private Care Module',
        description:
          'Manage private-pay clients: caregiver clock-in/out, client-approved timesheets, and payroll/margin reporting — added directly onto your current plan.',
        meta: [
          'Starting at $79/mo',
          'Scales with private-pay client count',
          'Available on Growth plans and above',
        ],
      },
    ],
  },
  note: "We monitor your monthly average to help you stay on the right plan. Temporary spikes won't affect your billing, and we'll only recommend upgrades when consistent growth is seen.",
};

export const leadMagnet = {
  title: '7 Common Reasons Agencies Fail State Audits.',
  description:
    'Get a practical checklist for what HHSC looks for, common audit triggers, and a weekly 60-minute prep routine.',
  button: 'Send guide',
};

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  media?: string;
  cardTitle?: string;
  cardSub?: string;
}

export const testimonials: { eyebrow: string; title: string; items: TestimonialItem[] } = {
  eyebrow: 'HAPPY CUSTOMERS',
  title: 'Our clients speak',
  items: [
    {
      name: 'Ryzolve PAS',
      role: 'Media, Ryzolve.com',
      quote: 'Watch a quick summary video of how our software can help streamline your PAS business processes.',
      media: 'https://youtu.be/KeVOcQhl2S4',
      cardTitle: 'How Ryzolve streamlines a Texas PAS agency.',
      cardSub: 'A short walkthrough of where Ryzolve fits — from intake to claim paid.',
    },
    {
      name: 'Lola',
      role: 'CFO, TRM Hospice Care',
      quote:
        'Four years with Ryzolve and we have not received a single penalty. The compliance side runs itself — that alone paid for it.',
    },
    {
      name: 'Marcus',
      role: 'Administrator, Lone Star Home Health',
      quote:
        'Onboarding a new aide used to take half a day. Now it is twenty minutes, and nothing slips. The team actually likes the software.',
    },
  ],
};

type IconKindTopic =
  | 'shield'
  | 'person'
  | 'people'
  | 'heart'
  | 'alarm'
  | 'hand'
  | 'wind'
  | 'activity'
  | 'scales'
  | 'clipboard'
  | 'badge'
  | 'stethoscope';

export const training = {
  title: 'Optimal compliance training experience',
  description:
    'We facilitate the licensing and training processes for home care businesses. Embark on our Administrator/Manager Training programs in Texas, offering flexible durations of 8, 12, or 16 hours. Experience the convenience of our training programs - upon completion, print your certificates instantly!',
  // New hero (per design handoff)
  hero: {
    line1: 'Administrator Training &',
    line2Accent: 'In-Service Training',
    line3: 'for Texas Care Agencies',
    subtitle:
      'Complete required Administrator training as an individual learner, or subscribe your agency to monthly In-Service Training for caregivers and staff.',
  },
  trustPills: ['HHSC-aligned', 'Instant certificate', 'Self-paced', 'Audit-ready records'],
  marquee: [
    '8h · 12h · 16h Administrator courses',
    '12 monthly in-service topics',
    'Instant state-recognized certificates',
    'HHSC-aligned',
    'Self-paced',
    'Audit-ready records',
    'New topics every month',
    'Up to unlimited learners',
  ],
  pathSplit: {
    adminPillLabel: 'For Administrators & Alternates',
    adminTitle: 'Certify yourself',
    adminDescription:
      'Buy a single Administrator Training course, study at your own pace, and download your certificate after completion.',
    agencyPillLabel: 'For Agencies',
    agencyTitle: 'Train your whole care team',
    agencyDescription:
      'One monthly subscription for caregiver and staff in-service training, with progress tracking, completion records, and certificates for audit readiness.',
  },
  // Admin training section
  adminEyebrow: 'Administrator Training',
  adminTitle: 'Required training for Administrators and Alternates.',
  adminSubtitle:
    'Choose the one-time course that matches your role and training requirement.',
  // Full course catalogue (preserve original copy)
  coursesTitle: 'Featured courses',
  courses: [
    {
      slug: '8-hour-initial',
      hours: '8 Hrs',
      hoursNum: 8,
      tier: 'Basic',
      price: '$79',
      priceNum: 79,
      title: 'Texas Administration Program',
      description: '8 Hours Initial Administrator Training Program',
      short:
        'First course for Administrators & Alternate Administrators of Home Health, Hospice, and PAS agencies in Texas.',
      audienceShort: 'First-time',
      eyebrow: 'Administrator training',
      tagline: 'First-Time Administrator Training',
      approvedFor: ['Home Health', 'Hospice', 'PAS'],
    },
    {
      slug: '12-hour-existing',
      hours: '12 Hrs',
      hoursNum: 12,
      tier: 'Advanced',
      price: '$109',
      priceNum: 109,
      title: 'Texas Administration Program',
      description: '12 Hours for existing administrators and alternates',
      short:
        'Required continuing education — 12 clock hours within each 12-month period from the date of designation.',
      audienceShort: 'Renewal',
      eyebrow: 'Administrator training',
      tagline: 'Renewal Training',
      featured: true,
      approvedFor: ['Home Health', 'Hospice', 'PAS'],
    },
    {
      slug: '16-hour-new',
      hours: '16 Hrs',
      hoursNum: 16,
      tier: 'Basic & Beyond',
      price: '$129',
      priceNum: 129,
      title: 'Texas Administration Program',
      description: '16 Hours for new administrators and alternates',
      short:
        'Additional 16 clock hours for first-time Administrators within the first 12 months of designation (may be completed up to 12 months prior).',
      audienceShort: 'New admins',
      eyebrow: 'Administrator training',
      tagline: 'New-Admin Onboarding',
      approvedFor: ['Home Health', 'Hospice', 'PAS'],
    },
  ],
  adminCoursePills: ['Self-paced', 'Instant cert', '1-year access'],
  // In-Service intro
  inServiceEyebrow: 'In-Service Training for Agencies',
  inServiceLeadTitle: 'One subscription. Your care team trained every month.',
  inServiceLeadDescription:
    'Ryzolve In-Service Training helps agencies keep caregivers, attendants, aides, and staff trained, documented, and audit-ready with monthly training topics and completion tracking.',
  inServiceDisclaimer:
    'These agency plans are for In-Service Training only. They do not include Administrator Training courses.',
  inServiceIncluded: ['Monthly topics', 'Admin dashboard', 'Completion records', 'Certificates'],
  inServiceTitle: 'In-Service Training',
  inServiceDescription:
    'Monthly agency training for caregivers and staff with progress tracking, completion records, and certificates for audit readiness.',
  inServicePlans: [
    {
      name: 'Starter',
      seats: 'Up to 50 learners',
      price: '$299',
      description: 'For small agencies that need monthly caregiver and staff in-service training.',
      features: [
        'Up to 50 learners',
        'Monthly in-service training library',
        'Completion tracking',
        'Certificates / completion records',
        'Admin dashboard',
      ],
    },
    {
      name: 'Growth',
      seats: 'Up to 100 learners',
      price: '$499',
      featured: true,
      note: 'Most chosen',
      description:
        'For growing agencies that need better visibility into care team training completion.',
      features: [
        'Up to 100 learners',
        'Monthly in-service training library',
        'Completion tracking',
        'Certificates / completion records',
        'Priority support',
      ],
    },
    {
      name: 'Unlimited',
      seats: 'Unlimited learners',
      price: '$899',
      description:
        'For larger or multi-location agencies that need unlimited staff training access.',
      features: [
        'Unlimited learners',
        'Monthly in-service training library',
        'Completion tracking',
        'Certificates / completion records',
        'Dedicated success support',
      ],
    },
  ],
  libraryTitle: 'The monthly library, in detail.',
  libraryDescription:
    'Every plan above unlocks all 12 topics below — a consistent monthly program for caregivers and staff, all year long.',
  libraryFooter:
    'New topics and updates are added throughout the year. Every In-Service plan includes the full library.',
  topicsTitle: 'Monthly In-Service Library',
  topicCategories: ['All', 'Safety', 'Compliance'] as const,
  topics: [
    { month: 'Jan', title: 'Infection Control', category: 'Safety', icon: 'shield' as IconKindTopic },
    { month: 'Feb', title: 'Client Rights, HIPAA & Elder Abuse', category: 'Compliance', icon: 'person' as IconKindTopic },
    { month: 'Mar', title: 'Communication Skills & Cultural Competency', category: 'Care', icon: 'people' as IconKindTopic },
    { month: 'Apr', title: "Dementia & Alzheimer's Care", category: 'Care', icon: 'heart' as IconKindTopic },
    { month: 'May', title: 'Emergency & Disaster Preparedness', category: 'Safety', icon: 'alarm' as IconKindTopic },
    { month: 'Jun', title: 'Assisting with ADLs & Safe Transfer', category: 'Safety', icon: 'hand' as IconKindTopic },
    { month: 'Jul', title: 'TB / Airborne Pathogen + Safety Precautions', category: 'Safety', icon: 'wind' as IconKindTopic },
    { month: 'Aug', title: 'Caregiver Self-Care', category: 'Care', icon: 'activity' as IconKindTopic },
    { month: 'Sep', title: 'Ethics & Professional Conduct', category: 'Compliance', icon: 'scales' as IconKindTopic },
    { month: 'Oct', title: 'Documentation & Charting', category: 'Compliance', icon: 'clipboard' as IconKindTopic },
    { month: 'Nov', title: 'Abuse, Neglect & Exploitation Reporting', category: 'Compliance', icon: 'badge' as IconKindTopic },
    { month: 'Dec', title: 'Vital Signs & Health Monitoring', category: 'Care', icon: 'stethoscope' as IconKindTopic },
  ],
  benefits: [
    'Our programs not only meet but surpass the licensing standards mandated by the state of Texas.',
    'Enjoy 24/7 support through chat, text, email, and phone.',
    'Centralized account for all courses and for all certificates.',
    'Flexible courses allow for personalized learning experiences.',
  ],
  // Closing dark CTA
  cta: {
    title: 'Get your whole team certified.',
    description:
      'Take a one-time Administrator course, or choose an In-Service plan for your agency.',
  },
  // "How it works" (from the design's shared D2 section)
  howItWorks: {
    eyebrow: 'How it works',
    title: 'From purchase to certificate, in your browser.',
    steps: [
      {
        n: '01',
        t: 'Pick the right course',
        d: 'New, renewing, or onboarding — choose the program that matches your role and the hours your license requires.',
      },
      {
        n: '02',
        t: 'Learn at your pace',
        d: 'Self-paced modules in your browser. Pause anytime, resume on any device. One year of access included.',
      },
      {
        n: '03',
        t: 'Print your certificate',
        d: 'Pass the final assessment and your state-recognized certificate is generated instantly. Download, print, file with HHSC.',
      },
    ],
  },
  // FAQs (preserve original copy verbatim)
  faqs: {
    eyebrow: 'FAQs',
    title: 'Questions, answered straight.',
    items: [
      {
        q: 'How do I sign up for Ryzolve training?',
        a: "Pick a course and click Buy Now. You'll be redirected to the new Ryzolve learning portal at learn.ryzolve.app to create your account and complete checkout in a single flow.",
      },
      {
        q: "I'm an existing learner — where do I sign in?",
        a: 'Use the Training Login button in the header, or go straight to learn.ryzolve.app. Your courses, progress, and certificates all live in the new portal.',
      },
      {
        q: 'Are these courses approved for Texas administrators?',
        a: 'Yes. All three programs meet or exceed the licensing standards mandated by the State of Texas (HHSC) for Home Health, Hospice, and PAS administrators.',
      },
      {
        q: 'How fast do I get my certificate?',
        a: 'Instantly. Once you complete the final assessment, your certificate is generated and available to download from the portal. No waiting, no mailing.',
      },
      {
        q: 'Can I take a course at my own pace?',
        a: 'Yes. Start, stop, and resume on any device. You have one year of access from the date of purchase to complete and revisit the material.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No. Everything runs in your browser — desktop, tablet, or mobile. We never ask you to install software.',
      },
      {
        q: "What if I have a question while I'm taking the course?",
        a: 'Reach our team 24/7 by chat, text, email, or phone. We answer most questions within minutes during business hours.',
      },
    ],
  },
};

export const footer = {
  heading: 'Join the Community',
  intro: 'Provider management software for PAS, Home Health, and Hospice agencies. Bring claims, records, and compliance workflows into one organized context.',
  needHelp:
    'Reach out to us by clicking here to book a session with one of our specialists',
  learnMore: [
    { label: 'Document management', href: '/document-management' },
    { label: 'Compliance & Regulations', href: '/compliance-regulation' },
    { label: 'Claims & Billing', href: '/claims-and-bills' },
  ],
  social: [
    { label: 'FB', fullLabel: 'Facebook', href: 'https://facebook.com/ryzolve' },
    { label: 'IG', fullLabel: 'Instagram', href: 'https://instagram.com/' },
    { label: 'YT', fullLabel: 'YouTube', href: 'https://www.youtube.com/@Ryzolve' },
    { label: 'X', fullLabel: 'Twitter / X', href: 'https://twitter.com/' },
  ],
};
