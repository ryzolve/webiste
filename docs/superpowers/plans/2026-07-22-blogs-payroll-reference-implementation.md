# Blogs Payroll Reference Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a reusable `/blogs` listing and data-driven payroll capability page at `/blogs/payroll-ready-evv-data` without changing existing product routes.

**Architecture:** Store published blog-capability entries in a typed registry. Render each entry through a shared page component that composes the existing SEO, breadcrumb, Service, and FAQ JSON-LD utilities. Use a Pages Router dynamic route for nested slugs and a paginated `/blogs` index that reads the same registry.

**Tech Stack:** Next.js Pages Router, React, TypeScript, existing redesign components/CSS, Node contract tests, Vinext/Cloudflare build.

## Global Constraints

- All new capability pages must be nested under `/blogs`; do not add new root-level capability routes.
- Existing `/document-management`, `/training`, and `/claims-and-bills` routes and canonicals remain unchanged.
- Use only approved client facts; do not invent metrics, pricing, certifications, integrations, customer names, or guaranteed outcomes.
- Do not add screenshots or a public comments system.
- Payroll reference copy must target Texas PAS agencies and state that clock-in/clock-out data stays current and ready for payroll processing regardless of payroll schedule.
- FAQ content must be visible and emitted through matching FAQ JSON-LD.
- Leave existing `.DS_Store` housekeeping changes untouched.

---

### Task 1: Add failing contract coverage for the `/blogs` architecture

**Files:**
- Create: `tests/blogs-payroll-contract.test.mjs`
- Read-only references: `pages/document-management/index.tsx`, `pages/training/index.tsx`, `pages/claims-and-bills/index.tsx`

**Interfaces:**
- Produces the test contract for `BlogCapabilityPage`, the blog registry, both blog routes, pagination, metadata/schema, and preservation of existing route files.

- [ ] **Step 1: Write the failing test**

Assert that:

```js
assert.match(indexRoute, /blogs/);
assert.match(slugRoute, /getStaticPaths|payroll-ready-evv-data/);
assert.match(page, /BlogCapabilityPage/);
assert.match(content, /payroll-ready-evv-data/);
assert.match(page, /<SEO/);
assert.match(page, /<ServiceJsonLd/);
assert.match(page, /<FaqJsonLd/);
assert.match(page, /clock-in\/clock-out/);
assert.match(page, /regardless of payroll schedule/);
assert.match(page, /pagination|page=/i);
assert.match(existingClaims, /ProductPage\s+slug="claims-and-bills"/);
assert.match(existingDocs, /ProductPage\s+slug="document-management"/);
assert.match(existingTraining, /TrainingPage|training/);
```

Also assert the current source does not include unsupported percentage, pricing, certification, integration, or customer-result claims in the new blog files.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/blogs-payroll-contract.test.mjs`

Expected: FAIL because the blog registry, component, and routes do not exist yet.

---

### Task 2: Create the typed blog-capability registry

**Files:**
- Create: `src/redesign/blog-content.ts`

**Interfaces:**
- Produces `BlogCapabilityEntry`, `BLOG_PAGE_SIZE`, `publishedBlogCapabilities`, and `getBlogCapability(slug: string)` for the listing and dynamic route.

- [ ] **Step 1: Define the entry shape**

The entry must include `slug`, `label`, `eyebrow`, `title`, `description`, `keywords`, `solutionTitle`, `solutionDescription`, `workflowSteps`, `capabilities`, `faqs`, `relatedLinks`, and CTA fields.

- [ ] **Step 2: Add only the published payroll entry**

Use copy based on the approved facts:

```ts
title: 'Payroll-ready EVV data for Texas PAS agencies.'
description: 'Keep clock-in and clock-out data current and ready for payroll processing, regardless of your payroll schedule.'
workflowSteps: [
  ['01', 'Keep visit data current', 'Maintain current clock-in and clock-out data for payroll review.'],
  ['02', 'Review payroll-ready data', 'Bring EVV-related time data into the payroll reporting workflow.'],
  ['03', 'Work on your schedule', 'Keep the data ready whether payroll runs weekly, biweekly, or on another schedule.'],
]
```

Do not add entries for the three reserved future slugs yet.

- [ ] **Step 3: Run the focused test**

Run: `node --test tests/blogs-payroll-contract.test.mjs`

Expected: FAIL only on missing renderer/routes; registry assertions pass.

---

### Task 3: Implement the reusable page renderer

**Files:**
- Create: `src/redesign/BlogCapabilityPage.tsx`
- Modify: `src/redesign/site.css`

**Interfaces:**
- Consumes `BlogCapabilityEntry`.
- Produces the exported `BlogCapabilityPage({ entry }: { entry: BlogCapabilityEntry })` component.

- [ ] **Step 1: Compose existing metadata and schema utilities**

Render `SEO` with the entry title/description/path/keywords, `BreadcrumbJsonLd` for Home → Blogs → entry, `ServiceJsonLd` for the capability, and `FaqJsonLd` from the same FAQ array used in visible markup.

- [ ] **Step 2: Build accessible page sections**

Render one H1 hero, workflow steps, capability list, visible `<details>/<summary>` FAQ, related internal links, and a `/calendly` CTA. Use native links and text-only visual treatment; do not import screenshots or add new global navigation.

- [ ] **Step 3: Add scoped responsive styles**

Add `.rz-blog-*` styles for hero, workflow, capability cards, FAQ, related links, and pagination. Use existing CSS variables and responsive grid utilities so the layout collapses at the existing mobile breakpoints.

- [ ] **Step 4: Run the focused test**

Run: `node --test tests/blogs-payroll-contract.test.mjs`

Expected: Renderer and content assertions pass; route assertions remain failing.

---

### Task 4: Add the `/blogs` listing and dynamic payroll route

**Files:**
- Create: `pages/blogs/index.tsx`
- Create: `pages/blogs/[slug].tsx`

**Interfaces:**
- `pages/blogs/index.tsx` exports a listing page that accepts `page` from `getServerSideProps` and renders `publishedBlogCapabilities` in deterministic pages of `BLOG_PAGE_SIZE`.
- `pages/blogs/[slug].tsx` exports `getStaticPaths`, `getStaticProps`, and a default page that renders `BlogCapabilityPage` for published entries.

- [ ] **Step 1: Implement deterministic listing pagination**

Use `?page=N`, clamp invalid values to page 1, emit Previous/Next links only when valid, and link each card to `/blogs/${entry.slug}`. The initial registry contains one published entry, so page 1 is the only emitted page.

- [ ] **Step 2: Implement static nested slug routing**

Return only `payroll-ready-evv-data` from `getStaticPaths`, use `fallback: false`, and return `notFound: true` for unknown slugs in `getStaticProps`.

- [ ] **Step 3: Run the focused test**

Run: `node --test tests/blogs-payroll-contract.test.mjs`

Expected: PASS.

---

### Task 5: Add sitemap coverage and full verification

**Files:**
- Modify: `pages/sitemap.xml.tsx`

- [ ] **Step 1: Add `/blogs` and the published payroll slug**

Add both routes to the existing sitemap list with the same URL construction and no future unpublished slugs.

- [ ] **Step 2: Run the complete contract suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass.

- [ ] **Step 3: Run the production build**

Run: `npm run build:vinext`

Expected: build completes and includes `/blogs` and `/blogs/payroll-ready-evv-data`.

- [ ] **Step 4: Verify local render and mobile basics**

Start `npx wrangler dev --config dist/ryzolve_website/wrangler.json --port 8787`, fetch both routes, and verify one H1, canonical metadata, visible FAQ count, Service/FAQ JSON-LD, approved copy, no unsupported claims, and no horizontal overflow at 390px.

- [ ] **Step 5: Review and commit only focused files**

Run `git diff --check`, review `git diff`, confirm existing product routes and SEO/schema housekeeping are untouched, then commit:

```bash
git add src/redesign/blog-content.ts src/redesign/BlogCapabilityPage.tsx src/redesign/site.css pages/blogs/index.tsx pages/blogs/[slug].tsx pages/sitemap.xml.tsx tests/blogs-payroll-contract.test.mjs
git commit -m "feat: add blogs payroll capability reference page"
```
