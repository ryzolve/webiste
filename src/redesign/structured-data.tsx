import { company } from './content';
import type { TrainingCourseCard } from './training-courses';

/* ════════════════════════════════════════════════════════════════
   schema.org JSON-LD helpers.
   Rendered inside each page (after <SEO>) so Google can surface
   rich results: Organization / LocalBusiness, WebSite, BreadcrumbList,
   Course, FAQPage, Service.
   ════════════════════════════════════════════════════════════════ */

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://home.ryzolve.com').replace(/\/$/, '');
}

function abs(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = siteUrl();
  return `${base}${path === '/' ? '' : path}`;
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function orgId() {
  return `${siteUrl()}#organization`;
}

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '9309 Highway 75 S Ste 102',
  addressLocality: 'New Waverly',
  addressRegion: 'TX',
  postalCode: '77358',
  addressCountry: 'US',
};

/* ─── Organization (use on every page once, e.g. home) ─────────── */
export function OrganizationJsonLd() {
  const url = siteUrl();
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': orgId(),
        name: company.name,
        legalName: company.name,
        url,
        logo: `${url}/img/favicon.png`,
        description:
          'Provider management software for PAS, Home Health, and Hospice agencies. Less paperwork. Fewer denials. Audit-ready by default.',
        foundingLocation: 'New Waverly, Texas',
        address: POSTAL_ADDRESS,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: '+1-936-355-0920',
            email: company.email,
            availableLanguage: ['en'],
            areaServed: 'US',
          },
        ],
        sameAs: ['https://facebook.com/ryzolve', 'https://www.youtube.com/@Ryzolve'],
      }}
    />
  );
}

/* ─── WebSite (home only) ──────────────────────────────────────── */
export function WebSiteJsonLd() {
  const url = siteUrl();
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${url}#website`,
        name: 'Ryzolve',
        url,
        publisher: { '@id': orgId() },
        inLanguage: 'en-US',
      }}
    />
  );
}

/* ─── LocalBusiness (home / about / contact) ───────────────────── */
export function LocalBusinessJsonLd() {
  const url = siteUrl();
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${url}#localbusiness`,
        name: company.name,
        image: `${url}/img/favicon.png`,
        url,
        telephone: '+1-936-355-0920',
        email: company.email,
        priceRange: '$$',
        address: POSTAL_ADDRESS,
        areaServed: [
          { '@type': 'State', name: 'Texas' },
          { '@type': 'Country', name: 'United States' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        parentOrganization: { '@id': orgId() },
      }}
    />
  );
}

/* ─── BreadcrumbList (inner pages) ─────────────────────────────── */
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: abs(item.path),
        })),
      }}
    />
  );
}

/* ─── Service (product pages) ──────────────────────────────────── */
export function ServiceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        serviceType,
        url: abs(path),
        provider: { '@id': orgId() },
        areaServed: [
          { '@type': 'State', name: 'Texas' },
          { '@type': 'Country', name: 'United States' },
        ],
        audience: {
          '@type': 'Audience',
          audienceType: 'PAS, Home Health, and Hospice agencies',
        },
      }}
    />
  );
}

/* ─── Course (training/[slug]) ─────────────────────────────────── */
export function CourseJsonLd({ course, path }: { course: TrainingCourseCard; path: string }) {
  const priceNum =
    typeof course.priceNum === 'number' && course.priceNum > 0
      ? course.priceNum
      : Number(String(course.price).replace(/[^0-9.]/g, '')) || undefined;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.short || course.description,
        url: abs(path),
        provider: {
          '@type': 'Organization',
          name: 'Ryzolve',
          sameAs: siteUrl(),
        },
        educationalCredentialAwarded: 'Certificate of completion',
        ...(priceNum
          ? {
              offers: {
                '@type': 'Offer',
                category: 'Paid',
                price: priceNum,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: abs(path),
              },
            }
          : {}),
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: `PT${course.hoursNum}H`,
          location: { '@type': 'VirtualLocation', url: abs(path) },
        },
      }}
    />
  );
}

/* ─── FAQPage (training) ───────────────────────────────────────── */
export function FaqJsonLd({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }}
    />
  );
}
