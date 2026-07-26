export type BlogFaq = { q: string; a: string };

export type BlogRelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type BlogWorkflowStep = {
  number: string;
  title: string;
  description: string;
};

export type BlogArticleSection = {
  title: string;
  paragraphs: string[];
};

export type BlogCapabilityEntry = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  keywords: string[];
  solutionTitle: string;
  solutionDescription: string;
  workflowSteps: BlogWorkflowStep[];
  articleSections: BlogArticleSection[];
  capabilities: string[];
  faqs: BlogFaq[];
  relatedLinks: BlogRelatedLink[];
  ctaLabel: string;
  ctaHref: string;
};

export const BLOG_PAGE_SIZE = 6;

export const publishedBlogCapabilities: BlogCapabilityEntry[] = [
  {
    slug: 'payroll-ready-evv-data',
    label: 'Payroll-ready EVV data',
    eyebrow: 'Texas PAS payroll reporting',
    title: 'How Texas PAS Agencies Can Keep EVV Data Ready for Payroll Processing',
    description:
      'A practical guide to reviewing current clock-in/clock-out data before payroll processing at a Texas PAS agency.',
    publishedAt: '2026-07-22',
    readingMinutes: 7,
    keywords: [
      'Texas PAS payroll reporting',
      'payroll-ready EVV data',
      'EVV payroll data',
      'clock-in clock-out reporting',
      'PAS payroll workflow',
    ],
    solutionTitle: 'What payroll-ready EVV data means in daily agency operations.',
    solutionDescription:
      'Payroll-ready EVV data means your team can review current clock-in/clock-out information before a payroll run, rather than gathering it across separate places at the last minute.',
    workflowSteps: [
      {
        number: '01',
        title: 'Keep clock-in and clock-out data current',
        description: 'Review the visit-time information your team will need before payroll processing begins.',
      },
      {
        number: '02',
        title: 'Review data before the payroll run',
        description: 'Use a pre-payroll review to look for information that needs attention before processing.',
      },
      {
        number: '03',
        title: 'Keep the workflow consistent',
        description: 'Keep clock-in/clock-out data ready for payroll processing regardless of your payroll schedule.',
      },
    ],
    articleSections: [
      {
        title: 'Why clock-in and clock-out data can slow payroll down',
        paragraphs: [
          'A payroll run depends on the agency having current time information available for review. When clock-in or clock-out data needs follow-up close to payroll processing, teams can lose time switching among records, communications, and reports to understand what needs attention.',
          'A regular review gives payroll staff a predictable place to look at current EVV-related time data before processing. It does not replace agency judgment; it gives the team a clearer starting point for the review work that already has to happen.',
        ],
      },
      {
        title: 'A plain-language pre-payroll review workflow',
        paragraphs: [
          'Start by reviewing current clock-in and clock-out data for the payroll period. Next, identify records that need the team’s attention and follow the agency’s established process for resolving them. Then use the reviewed information as part of payroll reporting and processing.',
          'The goal is not to promise that every record is complete automatically. It is to keep the information your agency reviews current and in context, whether your payroll schedule is weekly, biweekly, or another cadence.',
        ],
      },
      {
        title: 'What teams should review before processing payroll',
        paragraphs: [
          'Payroll staff can review whether clock-in/clock-out data is current for the period and whether related records need follow-up. The right review details depend on the agency’s own policies and payroll process.',
          'It also helps to keep the payroll conversation connected to the work around it. Billing, claims, caregiver records, documents, communications, faxing, compliance checks, and notifications can all affect how an agency team understands a record and decides what to review next.',
        ],
      },
      {
        title: 'How payroll data relates to claims, caregiver records, and compliance',
        paragraphs: [
          'Payroll data is one part of a broader operating workflow. For claims, Texas PAS agencies can compare billed hours with approved EVV/TMHP hours before claim submission, identify mismatches, and support reconciliation. Keeping related payroll data in context can make that review easier to coordinate.',
          'Caregiver records, onboarding documents, HR paperwork, and compliance checks also sit alongside the day-to-day agency work. Ryzolve supports those workflows together so teams can follow their processes without treating payroll information as an isolated task.',
        ],
      },
    ],
    capabilities: [
      'Current clock-in/clock-out data ready for payroll processing',
      'A practical pre-payroll review workflow for current time data',
      'EVV and payroll data kept in context with billing, claims, and notifications',
    ],
    faqs: [
      {
        q: 'How does Ryzolve support payroll processing for Texas PAS agencies?',
        a: 'Ryzolve keeps clock-in/clock-out data current and ready for payroll processing regardless of your payroll schedule.',
      },
      {
        q: 'Does the payroll workflow depend on a specific payroll schedule?',
        a: 'No. Ryzolve keeps clock-in/clock-out data current and ready for payroll processing regardless of your payroll schedule.',
      },
      {
        q: 'What does payroll-ready EVV data include?',
        a: 'It includes current clock-in/clock-out data that your team can review as part of payroll reporting and processing.',
      },
      {
        q: 'What other agency workflows can sit alongside payroll data?',
        a: 'Ryzolve supports documents, communications, faxing, billing, invoicing, claims, compliance checks, and notifications alongside payroll data.',
      },
    ],
    relatedLinks: [
      {
        href: '/claims-and-bills',
        title: 'Claims and reconciliation',
        description: 'See how payroll data can stay in context with claims review.',
      },
      {
        href: '/document-management',
        title: 'Documents and onboarding',
        description: 'Explore forms and records that support agency operations.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review the compliance workflow for caregiver requirements.',
      },
      {
        href: '/training',
        title: 'Training workflows',
        description: 'Explore administrator and in-service training options.',
      },
    ],
    ctaLabel: 'Book a demo',
    ctaHref: '/calendly',
  },
];

export function getBlogCapability(slug: string) {
  return publishedBlogCapabilities.find((entry) => entry.slug === slug) || null;
}
