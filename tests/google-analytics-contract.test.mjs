import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('ships the configured GA4 measurement ID through the single global gtag integration', async () => {
  const app = await readFile(new URL('pages/_app.tsx', root), 'utf8');

  assert.match(app, /const GA_ID = process\.env\.NEXT_PUBLIC_GA_ID \|\| 'G-52HDP4VLQG';/);
  assert.match(app, /<Head>[\s\S]*<script async src=\{`https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{GA_ID\}`\}/);
  assert.match(app, /gtag\('config', '\$\{GA_ID\}', \{ send_page_view: true \}\)/);
  assert.equal((app.match(/googletagmanager\.com\/gtag\/js/g) || []).length, 1);
});
