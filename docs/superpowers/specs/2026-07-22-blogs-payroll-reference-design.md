# Blog Capability Pages Design

## Goal

Create a reusable, data-driven page pattern for new high-intent Ryzolve capability pages under `/blogs`, publish `/blogs/payroll-ready-evv-data` as the reference implementation, and reserve the remaining approved slugs without changing existing product routes.

## URL architecture

- `/blogs` is the paginated listing entry point.
- `/blogs/payroll-ready-evv-data` is the first published capability page.
- `/blogs/caregiver-onboarding-compliance` is reserved for the next page.
- `/blogs/client-onboarding-document-management` is reserved for the next page.
- `/blogs/in-service-administrator-training` is reserved for the next page.
- Existing `/document-management`, `/training`, and `/claims-and-bills` routes remain unchanged and retain their current canonicals.

Pagination will use the listing page's `page` query parameter. The reference pass will expose the listing route and its reusable pagination contract without inventing unpublished page content.

## Page structure

The new page component will consume a typed blog-entry object containing:

- slug, label, title, eyebrow, description, keywords, and canonical path;
- approved hero, workflow, capability, and benefit copy;
- FAQ questions and answers rendered both visibly and as FAQ JSON-LD;
- internal links to existing Ryzolve routes;
- CTA label and destination.

The shared renderer will preserve the current redesign's visual language and use existing `SEO`, `BreadcrumbJsonLd`, `ServiceJsonLd`, and `FaqJsonLd` utilities. It will use accessible headings, native links, and a text-first workflow panel; no screenshots or public comments are added.

## Reference page content

The payroll reference page targets Texas PAS agencies and uses only these approved facts:

- Clock-in/clock-out data stays current and ready for payroll processing regardless of payroll schedule.
- Payroll-ready EVV data and payroll reporting support the agency's review workflow.
- Broader approved workflows can be referenced where relevant, including claims, billing, documents, communications, compliance checks, and notifications.

The page will not invent metrics, pricing, certifications, integrations, customer names, or guaranteed outcomes. It will include a plain-language workflow, buyer-problem framing, visible FAQ, demo CTA, and internal links to claims, document management, compliance, and training routes that already exist.

## Listing behavior

The `/blogs` page will render published entries from the same registry used by the dynamic page route. Pagination will be deterministic and accessible: page links use `?page=N`, unavailable pages are not emitted, and each card links to the nested slug. Only the payroll reference entry is published in this pass; the three remaining slugs are documented for follow-up implementation and do not render unpublished entries.

## Verification

- Add a contract test covering the `/blogs` listing, payroll slug, approved copy, metadata/canonical, internal links, visible FAQ, FAQ JSON-LD, Service JSON-LD, and preservation of existing product route files.
- Run the full Node contract suite.
- Run `npm run build:vinext`.
- Start the local Worker preview and verify the rendered reference page has one H1, no horizontal overflow at a mobile viewport, valid metadata/canonical, visible FAQ items, matching JSON-LD, and no unsupported claims.
- Review the diff so unrelated housekeeping changes and existing SEO/schema work are not included.
