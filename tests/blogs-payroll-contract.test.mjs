import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('defines the nested blogs listing and payroll reference route', async () => {
  const indexRoute = await read('pages/blogs/index.tsx');
  const slugRoute = await read('pages/blogs/[slug].tsx');
  const page = await read('src/redesign/BlogCapabilityPage.tsx');
  const content = await read('src/redesign/blog-content.ts');

  assert.match(indexRoute, /publishedBlogCapabilities/);
  assert.match(indexRoute, /page=/);
  assert.match(slugRoute, /getStaticPaths/);
  assert.match(slugRoute, /publishedBlogCapabilities/);
  assert.match(page, /export function BlogCapabilityPage/);
  assert.match(content, /payroll-ready-evv-data/);
});

test('renders payroll as an educational article with article, breadcrumb, and FAQ schema', async () => {
  const page = await read('src/redesign/BlogCapabilityPage.tsx');
  const content = await read('src/redesign/blog-content.ts');

  assert.match(page, /<SEO/);
  assert.match(page, /<BreadcrumbJsonLd/);
  assert.match(page, /<ArticleJsonLd/);
  assert.doesNotMatch(page, /<ServiceJsonLd/);
  assert.match(page, /<FaqJsonLd/);
  assert.match(page, /<FaqAccordion/);
  assert.match(content, /\/calendly/);
  assert.match(content, /clock-in\/clock-out/i);
  assert.match(content, /regardless of (?:your )?payroll schedule/i);
  assert.match(content, /How Texas PAS Agencies Can Keep EVV Data Ready for Payroll Processing/);
  assert.match(content, /pre-payroll review/i);
  assert.match(content, /caregiver records/i);
  assert.match(content, /\/claims-and-bills/);
  assert.match(content, /\/document-management/);
  assert.match(content, /\/compliance-regulation/);
  assert.match(content, /\/training/);
});

test('models the hub as a collection and hides pagination for one article', async () => {
  const indexRoute = await read('pages/blogs/index.tsx');

  assert.match(indexRoute, /<CollectionPageJsonLd/);
  assert.match(indexRoute, /totalPages > 1/);
  assert.doesNotMatch(indexRoute, /aria-disabled="true">Previous/);
});

test('places Blogs in the shared navigation before Contact', async () => {
  const content = await read('src/redesign/content.ts');

  assert.match(
    content,
    /\{ label: 'About', href: '\/about-us', slug: 'about-us' \},\s*\{ label: 'Blogs', href: '\/blogs', slug: 'blogs' \},\s*\{ label: 'Contact', href: '\/contact', slug: 'contact' \}/
  );
});

test('preserves existing product routes and keeps unsupported claims out of new blog files', async () => {
  const claimsRoute = await read('pages/claims-and-bills/index.tsx');
  const docsRoute = await read('pages/document-management/index.tsx');
  const trainingRoute = await read('pages/training/index.tsx');
  const page = await read('src/redesign/BlogCapabilityPage.tsx');
  const content = await read('src/redesign/blog-content.ts');
  const sitemap = await read('pages/sitemap.xml.tsx');

  assert.match(claimsRoute, /ProductPage\s+slug="claims-and-bills"/);
  assert.match(docsRoute, /ProductPage\s+slug="document-management"/);
  assert.match(trainingRoute, /TrainingPage/);
  assert.match(sitemap, /\/blogs/);
  assert.match(sitemap, /\/blogs\/payroll-ready-evv-data/);

  for (const source of [page, content]) {
    assert.doesNotMatch(source, /99\.2%|86%|zero penalties|no penalties|recovered revenue/i);
    assert.doesNotMatch(source, /\$\d|integration|certification|customer result/i);
  }
});

test('styles the blog hub with the shared gradient hero and compact section rhythm', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(css, /\.rz-blog-index-hero\s*\{[\s\S]*?background:[\s\S]*?radial-gradient/);
  assert.match(css, /\.rz-blog-index-hero-inner\s*\{[\s\S]*?text-align:\s*center;/);
  assert.match(css, /\.rz-blog-index-section\s*\{[\s\S]*?padding-top:\s*56px;/);
  assert.match(css, /\.rz-blog-index-grid\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.rz-blog-index-card:focus-visible/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.rz-blog-index-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
});

test('aligns blog hero CTAs with the left edge of the hero copy', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(
    css,
    /\.rz-blog-hero \.rz-page-hero-actions\s*\{\s*justify-content:\s*flex-start;/
  );
});

test('defines publication metadata and exposes it through article schema', async () => {
  const content = await read('src/redesign/blog-content.ts');
  const page = await read('src/redesign/BlogCapabilityPage.tsx');
  const schema = await read('src/redesign/structured-data.tsx');

  assert.match(content, /publishedAt: string;/);
  assert.match(content, /readingMinutes: number;/);
  assert.match(content, /publishedAt: '2026-07-22'/);
  assert.match(content, /readingMinutes: 7/);
  assert.match(page, /datePublished=\{entry\.publishedAt\}/);
  assert.match(schema, /datePublished: string;/);
  assert.match(schema, /datePublished,/);
});

test('renders a branded blog hub with semantic editorial cards', async () => {
  const indexRoute = await read('pages/blogs/index.tsx');

  assert.match(indexRoute, /className="rz-blog-index-hero"/);
  assert.match(indexRoute, /className="rz-tr-accent"/);
  assert.match(indexRoute, /className="rz-tr-accent-underline"/);
  assert.match(indexRoute, /className="rz-blog-index-grid"/);
  assert.match(indexRoute, /className="rz-blog-index-card"/);
  assert.match(indexRoute, /<time dateTime=\{entry\.publishedAt\}>/);
  assert.match(indexRoute, /\{entry\.readingMinutes\} min read/);
  assert.match(indexRoute, /Read guide/);
  assert.doesNotMatch(indexRoute, /className="rz-blog-related-grid"/);
  assert.doesNotMatch(indexRoute, /className="rz-blog-related-card"/);
});

test('gives the CTA row breathing room and aligns the FAQ list with its section copy', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(
    css,
    /\.rz-blog-hero \.rz-page-hero-actions\s*\{[\s\S]*?margin-top:\s*28px;/
  );
  assert.match(
    css,
    /\.rz-blog-faq-list\s*\{\s*max-width:\s*1120px;\s*margin:\s*42px 0 0;/
  );
});
