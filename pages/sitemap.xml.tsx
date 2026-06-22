import type { GetServerSideProps } from 'next';

import { siteUrl } from 'redesign/structured-data';
import { fetchAdministratorCourses } from 'redesign/training-courses';

type SitemapEntry = { path: string; changefreq: string; priority: string };

// Static, indexable public routes (exclude /blank and /404).
const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/document-management', changefreq: 'weekly', priority: '0.9' },
  { path: '/compliance-regulation', changefreq: 'weekly', priority: '0.9' },
  { path: '/claims-and-bills', changefreq: 'weekly', priority: '0.9' },
  { path: '/training', changefreq: 'weekly', priority: '0.8' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/calendly', changefreq: 'monthly', priority: '0.6' },
];

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(base: string, entries: SitemapEntry[]) {
  const urls = entries
    .map(({ path, changefreq, priority }) => {
      const loc = xmlEscape(`${base}${path === '/' ? '/' : path}`);
      return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = siteUrl();

  // Append live administrator course detail pages. Falls back to the local
  // catalogue inside fetchAdministratorCourses if the API is unavailable.
  let courseEntries: SitemapEntry[] = [];
  try {
    const courses = await fetchAdministratorCourses();
    courseEntries = courses
      .filter((course) => course.slug)
      .map((course) => ({
        path: `/training/${encodeURIComponent(course.slug)}`,
        changefreq: 'weekly',
        priority: '0.7',
      }));
  } catch {
    courseEntries = [];
  }

  const xml = buildSitemap(base, [...STATIC_ENTRIES, ...courseEntries]);

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
