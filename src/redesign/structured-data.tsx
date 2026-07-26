import { company } from './content';
import { trainingCoursePurchaseHref, type TrainingCourseCard } from './training-courses';

/* ════════════════════════════════════════════════════════════════
   schema.org JSON-LD helpers.
   Rendered inside each page (after <SEO>) so Google can surface
   rich results: Organization, WebSite, BreadcrumbList, Course, FAQPage,
   Service, and course ItemList.
   ════════════════════════════════════════════════════════════════ */

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://ryzolve.com').replace(/\/$/, '');
}

function abs(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = siteUrl();
  return `${base}${path === '/' ? '/' : path}`;
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
  return `${siteUrl()}/#organization`;
}

function websiteId() {
  return `${siteUrl()}/#website`;
}

function schemaId(path: string, type: string) {
  return `${abs(path)}#${type}`;
}

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '9309 Highway 75 S Ste 102',
  addressLocality: 'New Waverly',
  addressRegion: 'TX',
  postalCode: '77358',
  addressCountry: 'US',
};

/* ─── Organization (use once on each public page) ───────────────── */
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
        url: abs('/'),
        logo: {
          '@type': 'ImageObject',
          '@id': `${orgId()}#logo`,
          url: `${url}/img/ryzolve-logo-512.svg`,
          contentUrl: `${url}/img/ryzolve-logo-512.svg`,
          width: 512,
          height: 512,
        },
        description:
          'Provider management software for PAS, Home Health, and Hospice agencies. Bring claims, records, and compliance workflows into one organized context.',
        foundingLocation: 'New Waverly, Texas',
        address: POSTAL_ADDRESS,
        telephone: '+1-936-355-0920',
        email: company.email,
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
      }}
    />
  );
}

/* ─── WebSite (home only) ──────────────────────────────────────── */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': websiteId(),
        name: 'Ryzolve',
        url: abs('/'),
        publisher: { '@id': orgId() },
        inLanguage: 'en-US',
      }}
    />
  );
}

/* ─── BreadcrumbList (inner pages) ─────────────────────────────── */
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  const current = items[items.length - 1];
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': schemaId(current.path, 'breadcrumb'),
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
        '@id': schemaId(path, 'service'),
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
  const purchaseUrl = course.href || trainingCoursePurchaseHref(course.slug);

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        '@id': schemaId(path, 'course'),
        name: course.title,
        description: course.short || course.description,
        url: abs(path),
        provider: { '@id': orgId() },
        educationalCredentialAwarded: 'Certificate of completion',
        ...(priceNum
          ? {
              offers: {
                '@type': 'Offer',
                category: 'Paid',
                price: priceNum,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: purchaseUrl,
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

/* ─── Course ItemList (training summary) ───────────────────────── */
export function CourseListJsonLd({ courses }: { courses: TrainingCourseCard[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': schemaId('/training', 'course-list'),
        name: 'Ryzolve Administrator Training Courses',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: courses.map((course, index) => {
          const path = `/training/${encodeURIComponent(course.slug)}`;
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: course.title,
            url: abs(path),
            item: { '@id': schemaId(path, 'course') },
          };
        }),
      }}
    />
  );
}

/* ─── Article and collection pages ─────────────────────────────── */
export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': schemaId(path, 'article'),
        headline: title,
        description,
        datePublished,
        url: abs(path),
        mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
        author: { '@id': orgId() },
        publisher: { '@id': orgId() },
        inLanguage: 'en-US',
      }}
    />
  );
}

export function CollectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': schemaId(path, 'collection'),
            name,
            description,
            url: abs(path),
            mainEntity: { '@id': schemaId(path, 'item-list') },
          },
          {
            '@type': 'ItemList',
            '@id': schemaId(path, 'item-list'),
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              url: abs(item.path),
            })),
          },
        ],
      }}
    />
  );
}

/* ─── FAQPage ──────────────────────────────────────────────────── */
export function FaqJsonLd({
  items,
  path,
}: {
  items: Array<{ q: string; a: string }>;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': schemaId(path, 'faq'),
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }}
    />
  );
}
