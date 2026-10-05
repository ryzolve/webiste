import type { BlogCapabilityEntry } from './blog-content';
import { agencyInServiceSignupHref, trainingCoursePurchaseHref } from './training-courses';

/**
 * What a blog reader is asked to do next.
 *
 * Every post used to link its CTAs to another page of information (/training,
 * /compliance-regulation) and only at the very top and bottom of the page.
 * Each post now maps to one offer — the action that turns that reader into a
 * customer — and the article repeats it at the hero, mid-article, end of
 * article and in a sticky bar.
 */
export type BlogOfferKind = 'in-service' | 'admin-course' | 'compliance' | 'demo';

export type BlogCtaPlacement = 'hero' | 'inline' | 'end' | 'sticky';

export type BlogOfferLink = {
  label: string;
  href: string;
  /** Opens in a new tab: the learner/agency apps and downloadable files. */
  external: boolean;
};

export type BlogOffer = {
  kind: BlogOfferKind;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  stickyText: string;
  primary: BlogOfferLink;
  secondary: BlogOfferLink;
};

const DEMO: BlogOfferLink = { label: 'Book a demo', href: '/calendly', external: false };

export function blogOfferKind(entry: BlogCapabilityEntry): BlogOfferKind {
  if (entry.offer) return entry.offer;
  if (entry.ctaHref.startsWith('/training/')) return 'admin-course';
  if (entry.ctaHref === '/training') return 'in-service';
  if (entry.eyebrow === 'Compliance checks') return 'compliance';
  return 'demo';
}

/** The post's own CTA (a checklist PDF, a product page) kept as the second option. */
function postLink(entry: BlogCapabilityEntry): BlogOfferLink {
  return {
    label: entry.ctaLabel,
    href: entry.ctaHref,
    external: /^https?:\/\//.test(entry.ctaHref) || entry.ctaHref.endsWith('.pdf'),
  };
}

export function blogOffer(entry: BlogCapabilityEntry): BlogOffer {
  const kind = blogOfferKind(entry);

  if (kind === 'admin-course') {
    const courseSlug = entry.ctaHref.replace(/^\/training\//, '');
    const hours = courseSlug.match(/^(\d+)-hour/)?.[1];
    const course = hours ? `${hours}-hour course` : 'course';
    return {
      kind,
      eyebrow: 'Texas administrator training',
      title: `Take the ${course} online, at your own pace.`,
      body: 'Self-paced modules that work in any browser, and a state-recognized certificate the moment you finish, ready to file with your agency records.',
      points: ['Self-paced, on any device', 'Certificate issued on completion', 'Built for Texas HCSSA requirements'],
      stickyText: `Complete the ${course} online. Certificate on completion.`,
      primary: { label: 'Enroll now', href: trainingCoursePurchaseHref(courseSlug), external: true },
      secondary: { label: 'Course details', href: entry.ctaHref, external: false },
    };
  }

  if (kind === 'in-service') {
    return {
      kind,
      eyebrow: 'Ryzolve In-Service Training',
      title: 'Run this training for your whole care team.',
      body: 'One subscription covers your caregivers, attendants and aides: monthly in-service topics, a dashboard showing who has finished, and a certificate on file for every completion.',
      points: ['Monthly in-service topics', 'Completion tracking per caregiver', 'Certificates ready for survey'],
      stickyText: 'Train your whole care team and keep every certificate on file.',
      primary: { label: 'Start in-service training', href: agencyInServiceSignupHref(), external: true },
      secondary: { label: 'Compare plans', href: '/training#in-service', external: false },
    };
  }

  if (kind === 'compliance') {
    return {
      kind,
      eyebrow: 'Ryzolve compliance',
      title: 'Keep compliance records survey-ready all year.',
      body: 'Ryzolve runs scheduled and on-demand registry checks for every employee, flags exceptions for review, and keeps the results organized for your next survey or monitoring visit.',
      points: ['Scheduled and on-demand checks', 'Exception reporting', 'Records ready for survey'],
      stickyText: 'See how Ryzolve keeps employability checks and survey records current.',
      primary: DEMO,
      secondary: postLink(entry),
    };
  }

  return {
    kind,
    eyebrow: 'Ryzolve for Texas PAS agencies',
    title: 'Catch hour mismatches before you submit a claim.',
    body: 'Ryzolve compares billed hours with approved EVV and TMHP hours before claim submission, so mismatches surface while they are still easy to fix.',
    points: ['Billed vs. approved hours', 'Flags before submission', 'Supports reconciliation'],
    stickyText: 'See where Ryzolve fits in your billing and payroll workflow.',
    primary: DEMO,
    secondary: { label: 'See claims & reconciliation', href: '/claims-and-bills', external: false },
  };
}

/**
 * UTM-tag a CTA so a signup or booking can be traced back to the post and the
 * spot on the page. learn/agency run PostHog and record the landing UTMs; the
 * demo page forwards them into Calendly, which stores them on the booking.
 * Same-page anchors and files are left alone.
 */
export function withBlogUtm(href: string, slug: string, placement: BlogCtaPlacement): string {
  if (href.startsWith('#') || href.endsWith('.pdf')) return href;
  const url = new URL(href, 'https://ryzolve.com');
  if (url.hostname === 'ryzolve.com' && url.pathname !== '/calendly') return href;
  url.searchParams.set('utm_source', 'ryzolve.com');
  url.searchParams.set('utm_medium', 'blog');
  url.searchParams.set('utm_campaign', slug);
  url.searchParams.set('utm_content', placement);
  return url.hostname === 'ryzolve.com' ? `${url.pathname}${url.search}${url.hash}` : url.toString();
}
