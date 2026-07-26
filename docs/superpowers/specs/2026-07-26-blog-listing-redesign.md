# Blog Listing Redesign

**Date:** July 26, 2026  
**Status:** Approved design, pending written-spec review

## Goal

Bring `/blogs` into the established Ryzolve marketing-site visual system and make each article card useful enough for a visitor to judge what the article covers and how much time it will take to read.

The page should feel like part of the same site as About and the product pages, while retaining a clear editorial purpose for Texas PAS agency buyers.

## Scope

This redesign covers the `/blogs` listing page and the article metadata needed to render its cards. It does not rewrite the existing payroll article or introduce new articles, authors, filtering, search, or a content-management system.

## Visual Direction

### Hero

Reuse the established Ryzolve page-hero language instead of maintaining a separate plain blog hero:

- Apply the existing soft blue and coral ambient gradient treatment.
- Center the breadcrumb, title, and supporting copy to match the About-page hierarchy.
- Keep the `Ryzolve blogs` eyebrow as a contextual label.
- Add the existing animated coral underline beneath the most meaningful phrase in the title.
- Respect `prefers-reduced-motion` through the site's existing motion rules.

The hero copy remains specific to the page:

- Eyebrow: `Ryzolve blogs`
- Heading: `Workflow guides for Texas PAS agencies.`
- Description: `Practical pages about the workflows that keep agency data, records, and teams ready for the next step.`

The gradient and underline are the signature elements. No additional illustration or decorative animation is required.

## Page Rhythm

Reduce the vertical distance between the hero and the article listing. The first listing heading and card should appear as a direct continuation of the hero rather than below a large empty field.

The listing introduction becomes:

- Eyebrow: `Latest guides`
- Heading: `Practical guidance for connected agency workflows.`

Desktop spacing should preserve an intentional section break without exceeding the spacing used between comparable sections elsewhere on the site. Mobile spacing should compress proportionally.

## Article Data

Each `BlogCapabilityEntry` gains the following required fields:

- `publishedAt`: ISO date string used for machine-readable output and display formatting.
- `readingMinutes`: positive integer used to render the estimated reading time.

The existing `eyebrow` supplies the category. No author is shown until Ryzolve establishes a real named author or approved editorial byline.

For the existing payroll article:

- Published date: July 22, 2026
- Reading time: 7 minutes
- Category: Texas PAS payroll reporting

Article metadata should use semantic `<time datetime="...">` markup for the publication date.

## Article Cards

Replace the small generic related-link card treatment on the listing page with a dedicated editorial card. Article-detail related links can continue using their current compact card style.

Each listing card includes, in order:

1. Category
2. Published date
3. Reading time
4. Article title
5. Description
6. `Read guide` action with arrow

The card should:

- Use a wider editorial proportion and occupy the available listing width gracefully when only one article exists.
- Keep title and description readable rather than compressing them into a narrow four-column card.
- Use restrained blue and coral accents derived from existing site variables.
- Provide a subtle hover lift and border-color response.
- Show an obvious keyboard focus state.
- Make the full card link to the article while keeping its accessible name understandable.

The listing grid should support future growth without redesign:

- One article: a well-proportioned card with a controlled maximum width.
- Two or more articles: responsive multi-column layout where space permits.
- Mobile: one column with reduced padding and no horizontal overflow.

## Pagination

Keep the current pagination behavior. It remains hidden while only one page of posts exists and appears automatically after the configured page size is exceeded.

## Structured Data and SEO

Keep the existing page title, description, breadcrumb schema, and `CollectionPage` schema. The metadata additions must not change canonical routes or create duplicate pages.

The visible publication date should match any article structured-data publication date introduced now or later. This redesign does not require adding an author or fabricating an organization byline.

## Accessibility

- Preserve one page-level `<h1>` and the existing `<h2>` for the listing section.
- Render publication dates with semantic `<time>` elements.
- Keep card text contrast compliant with the existing palette.
- Maintain visible keyboard focus.
- Treat the animated underline as decorative and hide it from assistive technology.
- Ensure reduced-motion visitors do not receive unnecessary animation.

## Responsive Behavior

- Desktop: centered gradient hero and editorial cards sized for comfortable reading.
- Tablet: retain the centered hero while reducing padding; cards may use one or two columns based on available width.
- Mobile: compact hero, wrapped metadata, single-column cards, and tighter section spacing.

## Verification

Automated contract coverage should verify that:

- Blog entries define `publishedAt` and `readingMinutes`.
- The listing renders category, semantic publication date, reading time, and `Read guide` text.
- The listing uses dedicated hero and card classes rather than the compact related-link card class.
- Pagination remains hidden for one page of entries.
- Existing blog routes, structured data, and internal links remain intact.

After automated checks and a production build, visually verify desktop and mobile layouts, hover/focus behavior, hero continuity, and the reduced gap before the first card.

## Non-goals

- Adding fabricated authors or customer commentary
- Adding article thumbnails without approved source imagery
- Creating filters, tags, search, or sorting controls
- Changing the existing article body design
- Changing blog routes or pagination rules
