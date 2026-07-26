import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('keeps claims management on the existing route with approved SEO copy', async () => {
  const route = await read('pages/claims-and-bills/index.tsx');
  const site = await read('src/redesign/site.tsx');
  const content = await read('src/redesign/content.ts');

  assert.match(route, /ProductPage\s+slug="claims-and-bills"/);
  assert.match(site, /title: 'Texas PAS Claims Management & EVV Reconciliation'/);
  assert.match(site, /compare billed hours with approved EVV\/TMHP hours/i);
  assert.match(site, /<ServiceJsonLd[\s\S]*path=\{`\/\$\{slug\}`\}/);
  assert.match(site, /<SEO[\s\S]*path=\{`\/\$\{slug\}`\}/);
  assert.match(content, /denied claims|claim denials/i);
  assert.match(content, /manual reconciliation/i);
  assert.match(site, /claims-and-bills/);
});

test('renders visible FAQ and matching FAQ JSON-LD for claims buyers', async () => {
  const site = await read('src/redesign/site.tsx');
  const content = await read('src/redesign/content.ts');
  const structuredData = await read('src/redesign/structured-data.tsx');

  assert.match(content, /export const claimsFaqs/);
  assert.match(site, /<FaqJsonLd items=\{claimsFaqs\} path="\/claims-and-bills" \/>/);
  assert.match(site, /function ClaimsFaqSection/);
  assert.match(site, /items=\{claimsFaqs\}/);
  assert.match(structuredData, /path: string;/);
  assert.doesNotMatch(structuredData, /path = '\/training'/);
});

test('uses one claims-readiness panel and real FAQ buttons', async () => {
  const site = await read('src/redesign/site.tsx');
  const faq = await read('src/redesign/FaqAccordion.tsx');

  assert.equal((site.match(/ClaimsWorkflowPanel/g) || []).length, 2);
  assert.match(faq, /<button/);
  assert.match(faq, /aria-expanded=/);
  assert.match(faq, /aria-controls=/);
  assert.doesNotMatch(faq, /<summary/);
});

test('replaces generic claims opening copy and corrects inherited document copy', async () => {
  const content = await read('src/redesign/content.ts');
  const site = await read('src/redesign/site.tsx');

  assert.match(content, /Review claims data before submission\./);
  assert.match(site, /title=\{slug === 'claims-and-bills' \? claimsIntro\.title : undefined\}/);
  assert.doesNotMatch(content, /suites to fit/i);
});

test('keeps approved internal links and removes unsupported outcome claims', async () => {
  const site = await read('src/redesign/site.tsx');
  const content = await read('src/redesign/content.ts');
  const structuredData = await read('src/redesign/structured-data.tsx');

  for (const href of ['/#products', '/document-management', '/compliance-regulation', '/training']) {
    assert.ok(site.includes(`href: '${href}'`), `missing internal link ${href}`);
  }
  assert.match(site, /href="\/calendly"/);

  for (const source of [site, content, structuredData]) {
    assert.doesNotMatch(source, /99\.2%|86%|zero penalties|no penalties|recovered revenue|first-pass claim acceptance/i);
  }
});

test('keeps the approved customer testimonials beside the homepage video', async () => {
  const content = await read('src/redesign/content.ts');
  const site = await read('src/redesign/site.tsx');

  assert.match(content, /name: 'Lola'/);
  assert.match(content, /name: 'Marcus'/);
  assert.match(site, /const quotes = testimonials\.items\.filter\(\(t\) => !t\.media\)\.slice\(0, 2\);/);
});
