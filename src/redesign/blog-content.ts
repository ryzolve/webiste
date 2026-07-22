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

export type BlogCapabilityEntry = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  solutionTitle: string;
  solutionDescription: string;
  workflowSteps: BlogWorkflowStep[];
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
    title: 'Keep EVV data ready for payroll processing.',
    description:
      'Ryzolve keeps clock-in/clock-out data current and ready for payroll processing regardless of your payroll schedule.',
    keywords: [
      'Texas PAS payroll reporting',
      'payroll-ready EVV data',
      'EVV payroll data',
      'clock-in clock-out reporting',
      'PAS payroll workflow',
    ],
    solutionTitle: 'A clearer path from EVV data to payroll review.',
    solutionDescription:
      'Keep clock-in/clock-out data current, review payroll-ready information, and keep related agency workflows in context.',
    workflowSteps: [
      {
        number: '01',
        title: 'Keep visit data current',
        description: 'Maintain current clock-in and clock-out data for payroll review.',
      },
      {
        number: '02',
        title: 'Review payroll-ready data',
        description: 'Bring EVV-related time data into the payroll reporting workflow.',
      },
      {
        number: '03',
        title: 'Work on your schedule',
        description: 'Keep the data ready regardless of your payroll schedule.',
      },
    ],
    capabilities: [
      'Current clock-in/clock-out data ready for payroll processing',
      'Payroll reporting that supports the agency review workflow',
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
