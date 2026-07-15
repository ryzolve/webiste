import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legalPagePath = new URL('../src/redesign/LegalPage.tsx', import.meta.url);

async function legalPageSource() {
  return readFile(legalPagePath, 'utf8');
}

test('renders policy content through the established layout and SEO components', async () => {
  const source = await legalPageSource();

  assert.match(source, /<SiteLayout active="legal">/);
  assert.match(source, /<SEO title=\{policy\.title\} description=\{policy\.description\} path=\{policy\.path\}/);
  assert.match(source, /<BreadcrumbJsonLd/);
  assert.match(source, /<h1>\{policy\.h1\}<\/h1>/);
});

test('provides section anchors and a responsive legal reading layout', async () => {
  const source = await legalPageSource();

  assert.match(source, /aria-label=\{`\$\{policy\.h1\} table of contents`\}/);
  assert.match(source, /href=\{`#\$\{section\.id\}`\}/);
  assert.match(source, /id=\{section\.id\}/);
  assert.match(source, /rz-legal-grid/);
});
