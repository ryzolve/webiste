# Ryzolve Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish consistent, indexable `/privacy`, `/terms`, and `/cookies` pages that accurately describe confirmed Ryzolve marketing-site behavior without inventing legal terms.

**Architecture:** Keep policy copy and page metadata in `src/redesign/legal-content.ts`, render it through one `LegalPage` component, and expose it through thin Pages Router files. The component composes existing `SiteLayout`, `SEO`, and `BreadcrumbJsonLd`; no global layout or performance-integration behavior changes.

**Tech Stack:** Next.js Pages Router, React 19, TypeScript, Tailwind utility classes, existing Ryzolve redesign CSS, and Node’s built-in test runner for focused source-contract tests.

> **Execution adjustment:** Vitest cannot start with this repository's vinext and Cloudflare Vite plugins. The implementation uses the repository's existing dependency-free `node --test` source-contract convention instead, so no test dependency or package-script change is required.

## Global Constraints

- Work only in `/Users/anurag/bubbble/upwork/ryzolve/website-redesign-cutover` on `codex/website-redesign-cutover`.
- Preserve the existing `.DS_Store` modification and `public/fonts/.DS_Store` deletion; do not stage, commit, deploy, push, merge, switch branches, or create worktrees.
- Use existing `SiteLayout`, `SEO`, and `BreadcrumbJsonLd`; do not add the legal pages to the main navigation.
- Keep the existing deferred Tawk.to, Turnstile, and GA4 behavior unchanged.
- Do not state unverified retention periods, refund/cancellation terms, governing law, arbitration/venue terms, Stripe processing roles, HIPAA compliance, HHSC approval, accreditation, or certification.
- Do not show a public draft or legal-review notice. Keep unresolved items only in internal documentation.
- All production content must be plain language and use the confirmed processors/integrations only: Cloudflare, Turnstile, Tawk.to, Calendly, optional GA4, and linked Ryzolve application and learning portal.

---

### Task 1: Establish a testable legal-content contract

**Files:**
- Modify: `package.json`
- Modify: lockfile in the repository root, if the package manager changes one
- Create: `src/redesign/legal-content.test.ts`
- Create: `src/redesign/legal-content.ts`

**Interfaces:**
- Produces: `legalPolicies`, an array of `LegalPolicy` objects, and `legalReviewItems`, an array of internal review strings.
- Consumed by: `LegalPage.tsx` and the three page-route wrappers.

- [ ] **Step 1: Add the failing contract test**

Create `src/redesign/legal-content.test.ts` with this exact test. It defines the externally required metadata and ensures review choices remain centralized instead of leaking into public copy.

```ts
import { describe, expect, it } from 'vitest';

import { legalPolicies, legalReviewItems } from './legal-content';

describe('legal policy content', () => {
  it('defines the three public legal routes with complete unique metadata', () => {
    expect(legalPolicies.map(({ path }) => path)).toEqual(['/privacy', '/terms', '/cookies']);
    expect(new Set(legalPolicies.map(({ title }) => title)).size).toBe(3);

    for (const policy of legalPolicies) {
      expect(policy.h1).toBeTruthy();
      expect(policy.description.length).toBeGreaterThan(80);
      expect(policy.sections.length).toBeGreaterThan(5);
      expect(policy.sections.every((section) => section.id && section.heading && section.body.length > 0)).toBe(true);
    }
  });

  it('keeps outstanding legal and business decisions in one internal list', () => {
    expect(legalReviewItems).toEqual(
      expect.arrayContaining([
        expect.stringContaining('retention'),
        expect.stringContaining('refund'),
        expect.stringContaining('governing law'),
      ]),
    );
  });
});
```

- [ ] **Step 2: Add the test runner and verify the test fails because the module is absent**

Add `vitest` to `devDependencies` and a `test` script:

```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

Run:

```bash
npm test -- src/redesign/legal-content.test.ts
```

Expected: FAIL with a module-resolution error for `./legal-content`.

- [ ] **Step 3: Implement the typed content module**

Create these shared types and export the three policy records. Use the specified metadata and section subjects; write complete, factual prose under each heading. Keep headings as title case and IDs kebab-cased.

```ts
export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
};

export type LegalPolicy = {
  path: '/privacy' | '/terms' | '/cookies';
  title: string;
  description: string;
  h1: string;
  intro: string;
  lastUpdated: 'July 15, 2026';
  sections: LegalSection[];
};

export const legalReviewItems = [
  'Confirm the policy effective date before publication.',
  'Confirm the retention schedule for lead, account, training, and transaction records.',
  'Confirm the privacy-request process, response timing, and international-transfer practices.',
  'Confirm learning-portal payment processor roles and transaction-data handling.',
  'Confirm refund, cancellation, and subscription terms.',
  'Confirm governing law, venue, arbitration, and dispute-resolution terms.',
  'Confirm whether GA4 and a cookie-consent mechanism are enabled in production.',
] as const;
```

Use these page-specific metadata values:

| Path | Title | H1 |
| --- | --- | --- |
| `/privacy` | `Privacy Policy` | `Privacy Policy` |
| `/terms` | `Terms of Service` | `Terms of Service` |
| `/cookies` | `Cookie Policy` | `Cookie Policy` |

Populate the Privacy Policy with sections for information provided; demo, contact, guide-download, and training information; account and transaction information where applicable; automatic technical information; cookies; processing purposes; processors and sharing; marketing choices; retention and security; children; Texas/US operation and international visitors; privacy choices; changes and contact.

Populate the Terms with sections for acceptance; service description; eligibility and business use; demo communications; accounts and security; training, purchases, and certificates; payment; acceptable use; intellectual property; submissions and feedback; third-party services; availability; disclaimers; liability; indemnity; suspension; changes and contact. State that purchase, cancellation, and refund terms are presented in the applicable learning-portal checkout flow rather than inventing terms.

Populate the Cookie Policy with sections for cookie basics; essential operations; Cloudflare/Turnstile security; Tawk.to; Calendly; optional GA4; app/training-portal cookies; duration categories; browser controls; consent/withdrawal; third-party policies; updates and contact. State that analytics cookies are only used when GA4 is configured.

- [ ] **Step 4: Re-run the focused test**

Run:

```bash
npm test -- src/redesign/legal-content.test.ts
```

Expected: PASS with two passing tests.

### Task 2: Render every policy with one reusable page component

**Files:**
- Create: `src/redesign/LegalPage.tsx`
- Modify: `src/redesign/site.tsx`
- Modify: `src/redesign/site.css`

**Interfaces:**
- Consumes: `LegalPolicy` from `legal-content.ts`, `SiteLayout` from `site.tsx`, `SEO` from `SEO.tsx`, and `BreadcrumbJsonLd` from `structured-data.tsx`.
- Produces: `LegalPage({ policy })`, which renders exactly one H1, policy metadata, a navigable table of contents, and accessible sections.

- [ ] **Step 1: Add a failing component-level assertion**

Extend `src/redesign/legal-content.test.ts` with a third test that imports the default `LegalPage` component and checks it is a function. This ensures the new public rendering boundary exists before it is implemented.

```ts
import LegalPage from './LegalPage';

it('exposes one reusable renderer for all policy records', () => {
  expect(typeof LegalPage).toBe('function');
});
```

Run:

```bash
npm test -- src/redesign/legal-content.test.ts
```

Expected: FAIL with a module-resolution error for `./LegalPage`.

- [ ] **Step 2: Implement the shared renderer**

Create `src/redesign/LegalPage.tsx`. The component must compose the existing site building blocks and render semantic content from `policy`:

```tsx
export default function LegalPage({ policy }: { policy: LegalPolicy }) {
  return (
    <SiteLayout active="blank">
      <SEO title={policy.title} description={policy.description} path={policy.path} />
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: policy.h1, path: policy.path }]} />
      <main className="rz-legal-page">
        <section className="rz-legal-hero">
          <div className="rz-legal-container">
            <p className="rz-breadcrumb"><Link href="/">Home</Link><span className="sep">/</span><span className="current">{policy.h1}</span></p>
            <p className="rz-legal-eyebrow">Ryzolve legal</p>
            <h1>{policy.h1}</h1>
            <p className="rz-legal-intro">{policy.intro}</p>
            <p className="rz-legal-updated">Last updated: {policy.lastUpdated}</p>
          </div>
        </section>
        <section className="rz-legal-content">
          <div className="rz-legal-container rz-legal-grid">
            <nav className="rz-legal-toc" aria-label={`${policy.h1} table of contents`}>
              <p>On this page</p>
              <ol>{policy.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
            </nav>
            <article className="rz-legal-article">
              {policy.sections.map((section) => <section key={section.id} id={section.id}><h2>{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            </article>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
```

Use existing imports with `src` aliases where available. Add `"legal"` to `ActiveKey` in `src/redesign/site.tsx`, then pass `active="legal"`; this avoids treating legal pages as the blank preview page.

- [ ] **Step 3: Add responsive, scoped styling**

Append `.rz-legal-*` rules to `src/redesign/site.css`. The desktop grid should reserve a narrow sticky TOC column beside a readable article column, while a mobile media query returns the layout to one column and removes sticky positioning. Include `scroll-margin-top` on article sections so anchored headings are not hidden by the sticky header. Use existing `--rz-*` color variables, current body typography, and the same container width conventions as the surrounding redesign.

- [ ] **Step 4: Re-run the focused test and lint**

Run:

```bash
npm test -- src/redesign/legal-content.test.ts
npm run lint
```

Expected: the focused test passes and lint completes without errors introduced by the legal-page files.

### Task 3: Add the three routes and integrate discovery links

**Files:**
- Create: `pages/privacy/index.tsx`
- Create: `pages/terms/index.tsx`
- Create: `pages/cookies/index.tsx`
- Modify: `src/redesign/site.tsx`
- Modify: `pages/sitemap.xml.tsx`

**Interfaces:**
- Consumes: `LegalPage` and exact `LegalPolicy` records from `legal-content.ts`.
- Produces: crawlable public routes, working footer links, and sitemap discovery.

- [ ] **Step 1: Add failing route-module assertions**

Create `pages/legal-routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import CookiesPage from './cookies';
import PrivacyPage from './privacy';
import TermsPage from './terms';

describe('legal page routes', () => {
  it('exports a Pages Router component for every legal URL', () => {
    expect(typeof PrivacyPage).toBe('function');
    expect(typeof TermsPage).toBe('function');
    expect(typeof CookiesPage).toBe('function');
  });
});
```

Run:

```bash
npm test -- pages/legal-routes.test.ts
```

Expected: FAIL because the three route modules do not exist.

- [ ] **Step 2: Add thin Pages Router wrappers**

Create the three files using this exact pattern, with the matching policy identifier in each:

```tsx
import LegalPage from 'redesign/LegalPage';
import { privacyPolicy } from 'redesign/legal-content';

export default function PrivacyPage() {
  return <LegalPage policy={privacyPolicy} />;
}
```

The other wrappers must import and pass `termsPolicy` and `cookiesPolicy`, respectively. Export those named policy records alongside `legalPolicies` from `legal-content.ts`.

- [ ] **Step 3: Replace all footer placeholders with internal links**

In `Footer` inside `src/redesign/site.tsx`, replace the three anchor elements with Next.js `Link` components:

```tsx
<Link href="/privacy">Privacy</Link>
<Link href="/terms">Terms</Link>
<Link href="/cookies">Cookies</Link>
```

- [ ] **Step 4: Add legal pages to the sitemap**

Add these static entries to `STATIC_ENTRIES` in `pages/sitemap.xml.tsx`:

```ts
{ path: '/privacy', changefreq: 'monthly', priority: '0.3' },
{ path: '/terms', changefreq: 'monthly', priority: '0.3' },
{ path: '/cookies', changefreq: 'monthly', priority: '0.3' },
```

This follows the existing sitemap policy for public, indexable static pages while giving legal policies lower priority than product and contact content.

- [ ] **Step 5: Re-run the focused tests and check for placeholder links**

Run:

```bash
npm test -- src/redesign/legal-content.test.ts pages/legal-routes.test.ts
rg -n 'href="#"' src/redesign/site.tsx
```

Expected: all tests pass; the search produces no footer legal placeholders.

### Task 4: Record review items and validate the production build

**Files:**
- Create: `docs/legal-pages-review.md`
- Modify: files only if a validation failure requires a targeted fix

**Interfaces:**
- Consumes: `legalReviewItems` as the canonical unresolved-facts list.
- Produces: a non-public handoff note for business/legal review and verified build output.

- [ ] **Step 1: Create the internal review note**

Create `docs/legal-pages-review.md` with the eight review items from `legalReviewItems`, plus this opening sentence:

```markdown
# Legal Pages Business and Legal Review

These public policies describe current marketing-site behavior but require qualified business and legal review before publication as final legal terms.
```

Do not import, render, or link this document from public pages.

- [ ] **Step 2: Run the full build and focused tests**

Run:

```bash
npm test
npm run build:vinext
```

Expected: both commands exit 0. Investigate and fix only failures introduced by this feature.

- [ ] **Step 3: Verify rendered routes and metadata locally**

Start the supported local server, then verify each of `/privacy`, `/terms`, and `/cookies`:

```bash
npm run dev:vinext
```

For each URL, confirm a 200 response, exactly one H1, the page-specific title and meta description, `https://ryzolve.com/<path>` canonical when `NEXT_PUBLIC_SITE_URL` is unset, Open Graph tags, BreadcrumbList JSON-LD, functioning header/footer links, and no console errors. At a narrow viewport, confirm there is no horizontal scrolling and that the table of contents appears above the article instead of as a sticky sidebar.

- [ ] **Step 4: Check regression boundaries**

Confirm the existing deferred integration code remains unchanged:

```bash
git diff -- pages/_app.tsx src/redesign/site.tsx
rg -n 'href="#"' src/redesign/site.tsx
```

Expected: no changes to `pages/_app.tsx`; no legal footer placeholder remains. Review the `site.tsx` diff to ensure only the `ActiveKey` addition and footer links changed outside legal-specific rendering.

## Plan Self-Review

- Spec coverage: Tasks 1–4 cover dedicated routes, readable shared layout, factual policy scope, SEO, structured data, footer links, sitemap inclusion, review notes, no public review notice, and build/mobile verification.
- Placeholder scan: no implementation task contains an unresolved work marker; all unconfirmed business terms are explicitly constrained and listed in the review note.
- Type consistency: `LegalPolicy`, `legalPolicies`, `privacyPolicy`, `termsPolicy`, `cookiesPolicy`, `legalReviewItems`, and `LegalPage({ policy })` are defined before use in the route or test tasks.
