# Blog Listing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/blogs` to match Ryzolve's established gradient hero language, tighten the listing rhythm, and render useful editorial cards with category, publication date, and reading time.

**Architecture:** Extend the existing static `BlogCapabilityEntry` model with publication metadata, pass the publication date into the existing Article JSON-LD helper, and give the listing route dedicated semantic markup and CSS classes. Reuse existing Ryzolve color, typography, motion, layout, and reduced-motion primitives rather than adding dependencies or a separate design system.

**Tech Stack:** Next.js Pages Router, React 18, TypeScript, CSS, Node.js built-in test runner, Vinext/Vite production build.

## Global Constraints

- Keep `/blogs` and `/blogs/payroll-ready-evv-data` as the canonical routes.
- Keep the existing page title, description, breadcrumb schema, `CollectionPage` schema, and pagination behavior.
- Use `publishedAt: string` with an ISO date and `readingMinutes: number` with a positive integer.
- Show metadata in this order: category, published date, reading time.
- Do not add an author, thumbnail, filtering, search, sorting, or CMS integration.
- Use semantic `<time dateTime="...">` markup.
- Use existing Ryzolve CSS variables and motion primitives; support `prefers-reduced-motion`.
- Keep article-detail related cards on their current compact treatment.
- Preserve visible keyboard focus and a single page-level `<h1>`.
- Preserve the pre-existing uncommitted `.DS_Store` changes and exclude them from every commit.

---

### Task 1: Add canonical article publication metadata

**Files:**
- Modify: `tests/blogs-payroll-contract.test.mjs`
- Modify: `src/redesign/blog-content.ts`
- Modify: `src/redesign/structured-data.tsx`
- Modify: `src/redesign/BlogCapabilityPage.tsx`

**Interfaces:**
- Produces: `BlogCapabilityEntry.publishedAt: string`
- Produces: `BlogCapabilityEntry.readingMinutes: number`
- Produces: `ArticleJsonLd({ title, description, path, datePublished })`
- Consumes: the existing payroll article entry and Article JSON-LD helper

- [ ] **Step 1: Write the failing metadata contract test**

Add this test to `tests/blogs-payroll-contract.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the contract test and verify RED**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: FAIL because `publishedAt` and `readingMinutes` do not exist.

- [ ] **Step 3: Extend the article data model**

In `src/redesign/blog-content.ts`, add the fields to `BlogCapabilityEntry`:

```ts
publishedAt: string;
readingMinutes: number;
```

Add these values to the payroll article after `description`:

```ts
publishedAt: '2026-07-22',
readingMinutes: 7,
```

- [ ] **Step 4: Add the publication date to Article JSON-LD**

Update `ArticleJsonLd` in `src/redesign/structured-data.tsx` to accept and emit the date:

```ts
export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
```

Add `datePublished` beside the existing article description in the JSON-LD data object. Update `src/redesign/BlogCapabilityPage.tsx`:

```tsx
<ArticleJsonLd
  title={entry.title}
  description={entry.description}
  path={path}
  datePublished={entry.publishedAt}
/>
```

- [ ] **Step 5: Run the contract test and verify GREEN**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: all blog contract tests PASS.

- [ ] **Step 6: Commit the metadata change**

```bash
git add tests/blogs-payroll-contract.test.mjs src/redesign/blog-content.ts src/redesign/structured-data.tsx src/redesign/BlogCapabilityPage.tsx
git commit -m "feat: add blog publication metadata"
```

---

### Task 2: Build the semantic editorial listing markup

**Files:**
- Modify: `tests/blogs-payroll-contract.test.mjs`
- Modify: `pages/blogs/index.tsx`

**Interfaces:**
- Consumes: `BlogCapabilityEntry.publishedAt`, `BlogCapabilityEntry.readingMinutes`, and `BlogCapabilityEntry.eyebrow`
- Produces: dedicated `.rz-blog-index-*` hero, section, grid, card, metadata, and action markup

- [ ] **Step 1: Write the failing listing-markup contract test**

Add this test to `tests/blogs-payroll-contract.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: FAIL because the listing still uses `.rz-blog-hero` and `.rz-blog-related-card`.

- [ ] **Step 3: Add a deterministic date formatter**

In `pages/blogs/index.tsx`, add:

```ts
const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatPublishedDate(value: string) {
  return blogDateFormatter.format(new Date(`${value}T00:00:00Z`));
}
```

- [ ] **Step 4: Replace the listing hero markup**

Use a dedicated centered hero with breadcrumb, eyebrow, heading, animated accent, and existing description:

```tsx
<section className="rz-blog-index-hero">
  <div className="rz-blog-index-hero-inner">
    <p className="rz-breadcrumb rz-about-breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span>Blogs</span>
    </p>
    <p className="rz-eyebrow">Ryzolve blogs</p>
    <h1>
      Workflow guides for{' '}
      <span className="rz-tr-accent">
        Texas PAS agencies
        <span className="rz-tr-accent-underline" aria-hidden="true" />
      </span>
      .
    </h1>
    <p className="rz-blog-index-hero-description">
      Practical pages about the workflows that keep agency data, records, and teams ready for the next step.
    </p>
  </div>
</section>
```

- [ ] **Step 5: Replace the listing section and cards**

Use `rz-blog-index-section`, update the section eyebrow and heading, and replace the related-card grid with:

```tsx
<div className="rz-blog-index-grid">
  {entries.map((entry) => (
    <Link
      className="rz-blog-index-card"
      href={`/blogs/${entry.slug}`}
      key={entry.slug}
    >
      <span className="rz-blog-index-category">{entry.eyebrow}</span>
      <span className="rz-blog-index-meta">
        <time dateTime={entry.publishedAt}>{formatPublishedDate(entry.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{entry.readingMinutes} min read</span>
      </span>
      <strong>{entry.title}</strong>
      <span className="rz-blog-index-description">{entry.description}</span>
      <span className="rz-blog-index-action">
        Read guide <span aria-hidden="true">→</span>
      </span>
    </Link>
  ))}
</div>
```

Set the listing introduction to `Latest guides` and `Practical guidance for connected agency workflows.` Keep the existing pagination block unchanged beneath the new grid.

- [ ] **Step 6: Run the contract test and verify GREEN**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: all blog contract tests PASS.

- [ ] **Step 7: Commit the semantic listing**

```bash
git add tests/blogs-payroll-contract.test.mjs pages/blogs/index.tsx
git commit -m "feat: enrich blog listing cards"
```

---

### Task 3: Match the blog listing to the Ryzolve visual system

**Files:**
- Modify: `tests/blogs-payroll-contract.test.mjs`
- Modify: `src/redesign/site.css`

**Interfaces:**
- Consumes: `.rz-blog-index-*` markup from Task 2 and existing `--rz-*`, `.rz-tr-accent-underline`, and reduced-motion primitives
- Produces: responsive gradient hero, compact section rhythm, and editorial card presentation

- [ ] **Step 1: Replace the obsolete index-specific CSS contract and add failing visual contracts**

Replace the test named `keeps the blog hero contained and its secondary CTA visible on light backgrounds` with:

```js
test('styles the blog hub with the shared gradient hero and compact section rhythm', async () => {
  const css = await read('src/redesign/site.css');

  assert.match(css, /\.rz-blog-index-hero\s*\{[\s\S]*?background:[\s\S]*?radial-gradient/);
  assert.match(css, /\.rz-blog-index-hero-inner\s*\{[\s\S]*?text-align:\s*center;/);
  assert.match(css, /\.rz-blog-index-section\s*\{[\s\S]*?padding-top:\s*56px;/);
  assert.match(css, /\.rz-blog-index-grid\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.rz-blog-index-card:focus-visible/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.rz-blog-index-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
});
```

Keep the existing article-detail hero CTA and FAQ contracts because they cover `/blogs/[slug]` rather than the listing page.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: FAIL because `.rz-blog-index-*` styles do not exist.

- [ ] **Step 3: Add the blog listing hero and section styles**

Add a separate `Blog listing` block before the existing `Blog capability pages` CSS. Use the established palette:

```css
.rz-blog-index-hero {
  position: relative;
  overflow: hidden;
  padding: 52px 56px 64px;
  border-bottom: 1px solid var(--rz-rule);
  background:
    radial-gradient(circle at 22% 34%, rgb(215 237 248 / 72%), transparent 34%),
    radial-gradient(circle at 80% 52%, rgb(255 226 211 / 72%), transparent 35%),
    var(--rz-bg);
}
.rz-blog-index-hero-inner {
  position: relative;
  z-index: 1;
  width: min(100%, 960px);
  margin: 0 auto;
  text-align: center;
}
.rz-blog-index-hero h1 {
  margin: 18px 0 0;
  color: var(--rz-ink);
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.02;
}
.rz-blog-index-hero-description {
  max-width: 720px;
  margin: 24px auto 0;
  color: var(--rz-ink-2);
  font-size: 19px;
  line-height: 1.6;
}
.rz-blog-index-section { padding-top: 56px; }
.rz-blog-index-section .rz-shead { margin-bottom: 32px; }
```

- [ ] **Step 4: Add the editorial grid and card styles**

Add dedicated layout and interaction rules:

```css
.rz-blog-index-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  max-width: 1120px;
}
.rz-blog-index-grid > :only-child { max-width: 760px; }
.rz-blog-index-card {
  display: flex;
  min-height: 300px;
  flex-direction: column;
  padding: 30px;
  border: 1px solid var(--rz-rule);
  border-radius: 18px;
  background: var(--rz-paper);
  box-shadow: 0 16px 44px rgb(17 35 52 / 6%);
  color: var(--rz-ink);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}
.rz-blog-index-card:hover,
.rz-blog-index-card:focus-visible {
  border-color: rgb(13 89 146 / 48%);
  box-shadow: 0 20px 52px rgb(17 35 52 / 10%);
  transform: translateY(-3px);
}
.rz-blog-index-card:focus-visible {
  outline: 3px solid rgb(13 89 146 / 24%);
  outline-offset: 4px;
}
.rz-blog-index-category {
  color: var(--rz-blue);
  font-family: var(--rz-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.rz-blog-index-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;
  color: var(--rz-muted);
  font-size: 13px;
}
.rz-blog-index-card > strong {
  max-width: 680px;
  margin-top: 28px;
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.045em;
  line-height: 1.08;
}
.rz-blog-index-description {
  max-width: 650px;
  margin-top: 16px;
  color: var(--rz-ink-2);
  font-size: 16px;
  line-height: 1.6;
}
.rz-blog-index-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 30px;
  color: var(--rz-blue);
  font-weight: 650;
}
.rz-blog-index-card:hover .rz-blog-index-action span { transform: translateX(3px); }
.rz-blog-index-action span { transition: transform 180ms ease; }
```

- [ ] **Step 5: Add responsive and reduced-motion behavior**

Inside the existing `@media (max-width: 760px)` blog block, add:

```css
.rz-blog-index-hero { padding: 38px 24px 48px; }
.rz-blog-index-hero h1 { font-size: clamp(38px, 11vw, 54px); }
.rz-blog-index-hero-description { font-size: 17px; }
.rz-blog-index-section { padding-top: 42px; }
.rz-blog-index-grid { grid-template-columns: 1fr; }
.rz-blog-index-card { min-height: 0; padding: 24px; }
.rz-blog-index-card > strong { font-size: 25px; }
```

Confirm the existing reduced-motion rule includes `.rz-tr-accent-underline`. If it does not, add it to the selector whose animation is disabled under `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run:

```bash
node --test tests/blogs-payroll-contract.test.mjs
```

Expected: all blog contract tests PASS.

- [ ] **Step 7: Run the full focused contract suite**

Run:

```bash
node --test tests/google-analytics-contract.test.mjs tests/claims-page-contract.test.mjs tests/blogs-payroll-contract.test.mjs tests/legal-page-renderer-contract.test.mjs tests/legal-pages-contract.test.mjs tests/legal-routes-contract.test.mjs tests/structured-data-contract.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 8: Build the production application**

Run:

```bash
npm run build:vinext
```

Expected: exit code 0, with `/blogs` and `/blogs/:slug` included in the route list.

- [ ] **Step 9: Visually verify desktop and mobile**

Run the local production preview or development server and inspect `/blogs` at approximately 1440px and 390px widths. Confirm:

- the gradient and animated underline match the About-page visual language;
- the first card begins shortly after the listing heading;
- metadata wraps cleanly;
- the one-card state has a controlled width;
- hover and keyboard focus are visible;
- mobile has no horizontal overflow;
- reduced-motion mode removes the underline animation.

- [ ] **Step 10: Commit the visual redesign**

```bash
git add tests/blogs-payroll-contract.test.mjs src/redesign/site.css
git commit -m "style: align blog hub with site design"
```

---

### Task 4: Final repository and remote verification

**Files:**
- No source changes expected

**Interfaces:**
- Consumes: the three implementation commits from Tasks 1–3
- Produces: a verified local `main` ready to push to `Anuragtech02/ryzolve-website`

- [ ] **Step 1: Confirm only pre-existing system files remain dirty**

Run:

```bash
git status --short
```

Expected: only `.DS_Store` and `pages/.DS_Store` appear as uncommitted modifications.

- [ ] **Step 2: Confirm the implementation commits are based on current main**

Run:

```bash
git log --oneline -5
```

Expected: the metadata, listing-card, and visual-redesign commits appear above the approved spec and plan commits.

- [ ] **Step 3: Push the correct deployment remote when authorized**

Run:

```bash
git push ryzolve-website main
```

Expected: `Anuragtech02/ryzolve-website` advances and Cloudflare's Git integration begins a new build.

- [ ] **Step 4: Verify the deployed page after Cloudflare completes**

Open `https://ryzolve.com/blogs` and confirm the live HTML and visible page include the new hero, `Jul 22, 2026`, `7 min read`, and `Read guide` card action.
