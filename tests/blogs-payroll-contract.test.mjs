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

test('renders approved payroll copy with metadata, schema, FAQ, CTA, and internal links', async () => {
  const page = await read('src/redesign/BlogCapabilityPage.tsx');
  const content = await read('src/redesign/blog-content.ts');
  const indexRoute = await read('pages/blogs/index.tsx');

  assert.match(page, /<SEO/);
  assert.match(page, /<BreadcrumbJsonLd/);
  assert.match(page, /<ServiceJsonLd/);
  assert.match(page, /<FaqJsonLd/);
  assert.match(page, /details/);
  assert.match(content, /\/calendly/);
  assert.match(content, /clock-in\/clock-out/i);
  assert.match(content, /regardless of (?:your )?payroll schedule/i);
  assert.match(content, /\/claims-and-bills/);
  assert.match(content, /\/document-management/);
  assert.match(content, /\/compliance-regulation/);
  assert.match(content, /\/training/);
  assert.match(indexRoute, /Pagination|page=/i);
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

test('keeps the blog hero contained and its secondary CTA visible on light backgrounds', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(css, /\.rz-blog-hero\s*\{\s*padding:\s*72px 56px 80px;/);
  assert.match(
    css,
    /@media \(max-width: 1080px\)\s*\{[\s\S]*?\.rz-blog-hero-grid\s*\{\s*grid-template-columns:\s*1fr;/
  );
  assert.match(css, /\.rz-blog-hero \.rz-btn-ghost\s*\{[\s\S]*?color:\s*var\(--rz-blue\);/);
});

test('aligns blog hero CTAs with the left edge of the hero copy', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(
    css,
    /\.rz-blog-hero \.rz-page-hero-actions\s*\{\s*justify-content:\s*flex-start;/
  );
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
