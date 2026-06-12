# Landing Page StoryBrand Implementation Mapping

Source reference: `/Users/anurag/Downloads/ryzolve_landing_storybrand_clarity.html`

This HTML file is treated as the client's final content and structure direction for the landing page. The implementation should follow the content hierarchy and section intent, while preserving the redesigned website's existing colors, fonts, spacing language, component styling, and responsive behavior. Do not copy the HTML file's standalone CSS, header implementation, footer implementation, or inline assets.

## Implementation Handling

| Reference Section | Current Website Area | Implementation Handling | Notes |
| --- | --- | --- | --- |
| Top announcement bar | Existing global announcement/header | Preserve current shell, update copy only if needed | Avoid copying the standalone header. |
| Hero | Homepage hero | Replace hero content | Use StoryBrand headline/body/CTA intent in the existing hero design. |
| Hero side problem card | Homepage hero visual / nearby proof area | Represent through current visuals or before/after section | Do not duplicate the same problem comparison twice. |
| Metrics | Existing proof/stats bands | Keep the client-provided metric set | Avoid duplicate metric sections. |
| "What Ryzolve does" | Homepage "What we do" | Implement as primary capability section | Current six-card section should use the final client labels and copy. |
| Before & after | Homepage after capabilities | Add section | This is a final structural addition. |
| Product modules | Homepage strategy/modules | Replace older strategy copy | Use final three-module content in current card style. |
| Training split | Homepage training CTA + `/training` page | Implement as two clear training paths | Avoid duplicate training sections on the homepage. |
| How it works | Homepage how-it-works | Replace older step copy | Use final operational copy. |
| Testimonials | Existing testimonials | Keep aligned with final content | Current section already matches closely. |
| Free guide | Existing lead magnet | Replace generic description/button copy | Keep current form behavior. |
| Footer | Existing global footer | Preserve current footer shell | Do not copy HTML footer styling. |

## Section-by-Section Mapping

### 1. Header And Announcement

Reference content:

- "Built for Texas PAS agencies that want less paperwork, cleaner compliance, and better operational control."
- "Book a demo"
- Nav: Home, Our Products, Training, About, Contact, Login, Book a demo.

Current handling:

- The redesigned site already has a global announcement/header, product navigation, Training, About, Contact, login, and demo paths.

Implementation:

- `preserve shell`
- Use the announcement line only if we want to sharpen the current topbar.
- Do not copy the standalone header/nav from the HTML file.

Approval notes:

- None, unless client wants the topbar promise changed globally.

### 2. Hero

Reference content:

- Eyebrow: "Built for Texas PAS agencies"
- H1: "Stop chasing paperwork. Run your agency with confidence."
- Body: "Ryzolve gives PAS agencies one place to manage EVV-connected schedules, claims, compliance records, payroll, hiring, and staff training."
- CTAs: "Book a Demo", "See How Ryzolve Works"
- Trust items: "Less paperwork", "Fewer missed tasks", "Cleaner agency operations"

Current handling:

- Current hero says "Enhance your agency's" with animated words "profits", "efficiency", and "compliance".
- Current body says "Provider management software to help PAS agencies be more efficient".

Implementation:

- `replace current hero content`
- This is a stronger homepage opening because it names the pain, the audience, and the outcome in plain language.
- Keep current Ryzolve visual theme and interaction style.

Suggested final direction:

- Primary hero: "Stop chasing paperwork. Run your agency with confidence."
- Supporting copy can use the reference wording with minor tightening.
- Keep the demo CTA primary.
- "See How Ryzolve Works" should scroll to the relevant section, not create another button destination unless needed.

Approval notes:

- Confirm whether the homepage should focus specifically on Texas PAS agencies or continue mentioning Home Health and Hospice in the first viewport.

### 3. Hero Problem Card

Reference content:

- Kicker: "The agency operations problem"
- Heading: "Your team should not need five systems to know what happened today."
- Copy: "Ryzolve brings the daily work into one operating flow so your agency can move from scattered tasks to organized execution."
- Before Ryzolve: Missed clock-ins, Paper forms, Claim follow-ups, Survey stress.
- With Ryzolve: EVV-connected workflows, Digital records, Claim visibility, Audit-ready files.

Current handling:

- Current hero uses a designed product/operations visual instead of this problem comparison card.

Implementation:

- `represent without duplicating`
- Good content, but it is more structural than copy-only.
- Build in the existing visual language rather than importing the HTML card style.

Approval notes:

- This may overlap with the separate before/after section. Choose either this card or a full before/after section to avoid repeating the same idea.

### 4. Metrics

Reference content:

- "4+ yrs" / "No penalties across founding-customer agencies"
- "< 1 wk" / "Average implementation from contract to first live client"
- "99.2%" / "First-pass claim acceptance rate"
- "$1.4M" / "Recovered revenue from year-one denials, agency average"

Current handling:

- Current site already has proof points and a stats band using similar metrics.

Implementation:

- `use client-provided metric set`
- Prefer one metrics section instead of showing the same claims in multiple places.

Source notes:

- Keep metric wording aligned with the client handoff.
- Use the StoryBrand metric set in one place only to avoid repeating or expanding claims beyond the supplied structure.
- Remove older metric claims that are not part of this handoff from the homepage flow.

### 5. What Ryzolve Does / What We Do

Reference content:

- Eyebrow: "What Ryzolve does"
- Title: "Run your Texas PAS agency on one platform."
- Description: "Built for Texas PAS agencies first, with support for Home Health and Hospice operations, Ryzolve brings together the daily workflows that determine whether your agency stays compliant, gets paid, and grows with confidence."
- Cards:
  - EVV-Connected Scheduling
  - TMHP Claims & Payments
  - Authorizations & Eligibility
  - Payroll Reconciliation
  - Compliance & Audit Readiness
  - Hiring, Onboarding & Training

Current handling:

- Current homepage "What we do" already uses:
  - Scheduling + EVV
  - TMHP Claims + Payments
  - Authorizations + Eligibility
  - Payroll + Reconciliation
  - Compliance + Audit Readiness
  - Hiring + Training

Implementation:

- `implement`
- Keep the current section style and reconcile labels/copy to the final content.

Potential copy refinements:

- "Hiring + Training" could become "Hiring, Onboarding + Training".
- "Compliance + Audit Readiness" description could mention background checks and monthly checks if that is accurate.
- Main description could include "support for Home Health and Hospice operations" only if the client wants that positioning on the homepage.

Approval notes:

- Confirm whether Home Health and Hospice should be included in the homepage "What we do" description.

### 6. Before & After

Reference content:

- Eyebrow: "Before & after"
- Title: "Replace scattered processes with one connected workflow."
- Without Ryzolve:
  - Schedules, EVV, claims, forms, and payroll live in different places.
  - Staff spend hours chasing missing documents, signatures, and training records.
  - Claims are submitted without enough visibility into line-level status or denials.
  - Audit preparation becomes a scramble instead of a routine.
- With Ryzolve:
  - Agency workflows are centralized across scheduling, EVV, claims, compliance, and training.
  - Admins can track caregiver records, training, forms, and compliance requirements.
  - Billing teams see claim and payment status with fewer blind spots.
  - Survey readiness becomes a daily operating standard.

Current handling:

- No exact current equivalent on the homepage.

Implementation:

- `adopt`
- This is the clearest new structural addition in the handoff.
- Add it as a new section after the primary capabilities.

Approval notes:

- Confirm whether to include "payroll" in the "Without Ryzolve" list if payroll support is not fully represented in the current product navigation.

### 7. Product Modules

Reference content:

- Eyebrow: "Product modules"
- Title: "Each module earns its keep. Together, they remove a category of work from your week."
- Modules:
  - Document Management: Caregiver and client forms; Audit-ready document tracking; Hiring and onboarding records.
  - Compliance Regulation: Monthly OIG and LEIE checks; Training and certificate records; Survey-focused reminders.
  - Claims & Billing: TMHP and MCO claim workflows; 277 / 835 visibility; Payment and denial tracking.

Current handling:

- Current homepage "Our Strategy" already has three module cards:
  - Digital document management
  - Compliance regulation
  - Claims & Billing

Implementation:

- `replace copy`
- Keep the current three-card module structure.
- Replace the older bullet wording with the final reference bullets.

Approval notes:

- Confirm "LEIE" wording and whether it should appear publicly.
- Confirm if "MCO" should be written as "Managed Care" for a broader audience.

### 8. Training Section

Reference content:

- Eyebrow: "Ryzolve Training"
- Title: "Administrator Training and In-Service Training, clearly separated."
- Copy: "Give users the right path without confusing one-time administrator courses with agency in-service plans."
- Administrator Training: 8h, 12h, and 16h self-paced courses.
- In-Service Training: Agency plans for monthly caregiver and staff training.

Current handling:

- Current homepage already has a Training CTA.
- `/training` already has the detailed split between Administrator Training and In-Service Training.

Implementation:

- `implement as one homepage section`
- Keep one homepage training section with two clear paths, then route users to `/training`.

Approval notes:

- None.

### 9. How It Works

Reference content:

- Title: "Managing claims and paperwork should be easier."
- Steps:
  - Book a demo
  - Implement the software
  - Improve efficiency and stay compliant

Current handling:

- Current homepage has the same three-step structure with older copy.

Implementation:

- `replace copy`
- Keep existing design and replace step descriptions with the cleaner reference wording.

Approval notes:

- Confirm implementation claim. Earlier copy says "as little as week"; reference says "core agency setup, workflow training, data import, and operational readiness", which is safer.

### 10. Testimonials

Reference content:

- Video title: "How Ryzolve streamlines a Texas PAS agency."
- Video copy: "Watch a short walkthrough of where Ryzolve fits — from intake to claim paid."
- Quote 1: Lola / CFO, TRM Hospice Care.
- Quote 2: Marcus / Administrator.

Current handling:

- Current testimonial section already uses this video title, similar copy, and these two quotes.

Implementation:

- `keep aligned`
- No major copy change needed.

Source notes:

- Client names and roles are present in the supplied handoff, so keep the testimonial content aligned with that handoff.

### 11. Free Guide

Reference content:

- Eyebrow: "Free guide"
- Title: "7 Common Reasons Agencies Fail State Audits."
- Copy: "Get a practical checklist for what HHSC looks for, common audit triggers, and a weekly 60-minute prep routine."
- Fields: Your name, Work email.
- Button: "Send guide"
- Fine print: "No spam. We email it once. Unsubscribe anytime."

Current handling:

- Current lead magnet already has the same title and form.
- Current description is more generic: "Complete the form below to receive the free downloadable guide."

Implementation:

- `replace copy`
- Keep current section and form behavior.
- Replace the generic description with the more specific reference copy.

Source notes:

- The guide copy is present in the supplied handoff. Keep the current form behavior unless the client provides a new delivery workflow.

### 12. Footer

Reference content:

- Product links: Document Management, Compliance Regulation, Claims & Bills, Training.
- Company links: About, Contact, Pricing, Support.
- Contact details.
- Footer pitch: "Provider management software for PAS, Home Health, and Hospice agencies. Less paperwork. Fewer denials. Audit-ready by default."

Current handling:

- Current site already has a global footer and contact details.
- Earlier product pricing was intentionally removed from public homepage flow.

Implementation:

- `preserve shell`
- Keep footer structure.
- Do not reintroduce Pricing unless specifically requested.
- Consider using the footer pitch if it fits current brand positioning.

Source notes:

- Preserve the current footer shell and avoid adding unsupported links from the standalone HTML unless the site already has destinations for them.

## Implementation Plan

Implementation order:

1. Hero copy: use the StoryBrand headline and clearer body copy in the existing homepage hero.
2. Before/after section: add the comparison content after the primary capabilities.
3. What we do copy reconciliation: keep current six-card section styling and use the final card labels and descriptions.
4. Product modules: replace older strategy bullets with cleaner module bullets.
5. How it works: replace older step descriptions with safer operational copy.
6. Lead magnet: replace generic guide description with the more specific checklist promise.
7. Footer: preserve current shell and avoid unsupported standalone HTML links.
