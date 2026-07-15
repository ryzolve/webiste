import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const structuredDataPath = new URL('../src/redesign/structured-data.tsx', import.meta.url);

async function structuredDataSource() {
  return readFile(structuredDataPath, 'utf8');
}

test('models Ryzolve as one Organization rather than a local ProfessionalService', async () => {
  const source = await structuredDataSource();

  assert.doesNotMatch(source, /ProfessionalService/);
  assert.match(source, /'@id': orgId\(\)/);
  assert.match(source, /contentUrl: `\$\{url\}\/img\/ryzolve-logo-512\.svg`/);
  assert.match(source, /width: 512/);
  assert.match(source, /height: 512/);
});

test('keeps linked structured-data entities on stable IDs', async () => {
  const source = await structuredDataSource();

  assert.match(source, /function websiteId\(\)/);
  assert.match(source, /provider: \{ '@id': orgId\(\) \}/);
  assert.match(source, /function CourseListJsonLd/);
  assert.match(source, /'@type': 'ItemList'/);
});
