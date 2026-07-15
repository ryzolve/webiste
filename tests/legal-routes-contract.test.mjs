import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('exports each legal policy through a dedicated Pages Router route', async () => {
  for (const [path, policy] of [
    ['pages/privacy/index.tsx', 'privacyPolicy'],
    ['pages/terms/index.tsx', 'termsPolicy'],
    ['pages/cookies/index.tsx', 'cookiesPolicy'],
  ]) {
    const page = await source(path);
    assert.match(page, /import LegalPage from 'redesign\/LegalPage';/);
    assert.match(page, new RegExp(`import \\{ ${policy} \\} from 'redesign/legal-content';`));
    assert.match(page, new RegExp(`<LegalPage policy=\\{${policy}\\} />`));
  }
});

test('links legal pages in the footer and sitemap', async () => {
  const [site, sitemap] = await Promise.all([
    source('src/redesign/site.tsx'),
    source('pages/sitemap.xml.tsx'),
  ]);

  for (const path of ['/privacy', '/terms', '/cookies']) {
    assert.match(site, new RegExp(`<Link href="${path}">`));
    assert.match(sitemap, new RegExp(`path: '${path}'`));
  }
});
