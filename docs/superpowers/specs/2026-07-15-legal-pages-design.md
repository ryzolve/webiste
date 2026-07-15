# Ryzolve Legal Pages Design

## Purpose

Add public Privacy Policy, Terms of Service, and Cookie Policy pages to the Ryzolve marketing site. The pages will describe only services and integrations confirmed in the marketing-site code and will avoid unverified legal or business claims.

## Scope

- Public routes: `/privacy`, `/terms`, and `/cookies`.
- Existing `SiteLayout` header and footer on every route.
- A shared legal-page presentation component and structured, page-specific content.
- Footer links updated from placeholders to the three routes.
- Unique SEO metadata, canonical URLs, Open Graph metadata, one H1 per page, and `BreadcrumbJsonLd` on each route.
- Legal pages added to the existing public sitemap at a low, monthly-change priority.
- An internal implementation note that centralizes legal/business facts requiring confirmation.

## Content Boundaries

The policy text may refer to the following confirmed website behavior:

- Provider-management software and training marketed to PAS, Home Health, and Hospice agencies.
- Demo booking through Calendly.
- Contact, lead-magnet, and plan-lead forms protected with Cloudflare Turnstile.
- Deferred Tawk.to live chat and optional GA4 analytics.
- Cloudflare-hosted marketing pages and Cloudflare-related request/security processing.
- Links to the Ryzolve application and learning portal; administrator-course checkout occurs in the learning portal.

The text must not claim HIPAA compliance, HHSC approval, accreditation, certification, a refund period, a data-retention period, dispute/arbitration requirements, governing law, or Stripe's precise role unless the repository supplies a source for the claim.

## Page Experience

Each page uses the existing site visual language with a constrained reading column, visible last-updated date, plain-language introductory text, section headings, and a compact table of contents that links to stable section IDs. It remains comfortable on narrow screens and adds no dependency or newly eager third-party integration.

No public draft or legal-review notice will be shown. Review needs will be kept only in the internal implementation note.

## Architecture

`src/redesign/legal-content.ts` will own content types, shared review items, and the three policy data records. `src/redesign/LegalPage.tsx` will render a policy data record with `SiteLayout`, `SEO`, `BreadcrumbJsonLd`, and the reusable readable-content layout. Three thin Pages Router entry points will select the appropriate content record.

The footer will use Next.js internal links. `pages/sitemap.xml.tsx` will include the three public legal routes with `monthly` change frequency and low priority, matching the existing sitemap's inclusion of other public static pages.

## Validation

Before implementation, introduce a focused test that verifies the legal content contract: all pages have a unique path/title/description/H1 and the required review items are centrally available. After implementation, run that test, `npm run build:vinext`, static searches for remaining footer placeholders, and route/metadata/mobile-layout checks.

## Legal and Business Review Items

1. Policy effective date / displayed last-updated date.
2. Data retention schedule.
3. Privacy-rights request process and response timing.
4. International-transfer practices.
5. Payment processor and transaction-data handling for learning-portal purchases.
6. Refund, cancellation, and subscription terms.
7. Governing law, venue, arbitration, and dispute-resolution terms.
8. Production analytics and cookie-consent configuration.

## Non-Goals

- No deployment, commit, push, merge, branch change, or worktree creation.
- No main-navigation addition.
- No change to deferred homepage performance integrations.
- No legal advice or representation that the policy copy is legally complete.
