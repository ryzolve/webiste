import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legalContentPath = new URL('../src/redesign/legal-content.ts', import.meta.url);

async function legalContentSource() {
  return readFile(legalContentPath, 'utf8');
}

test('defines all three public legal policies with unique route metadata', async () => {
  const source = await legalContentSource();

  assert.match(source, /path: '\/privacy'/);
  assert.match(source, /path: '\/terms'/);
  assert.match(source, /path: '\/cookies'/);
  assert.match(source, /title: 'Privacy Policy'/);
  assert.match(source, /title: 'Terms of Service'/);
  assert.match(source, /title: 'Cookie Policy'/);
  assert.match(source, /lastUpdated: 'July 15, 2026'/);
});

test('centralizes unconfirmed legal and business decisions', async () => {
  const source = await legalContentSource();

  assert.match(source, /export const legalReviewItems/);
  assert.match(source, /retention/i);
  assert.match(source, /refund/i);
  assert.match(source, /governing law/i);
  assert.match(source, /cookie-consent/i);
  assert.match(source, /Stripe/);
});
