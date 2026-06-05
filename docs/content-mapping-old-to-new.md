# Ryzolve Website Content Mapping

This document maps the current public website content into the new redesign. The implementation keeps the current website copy as-is, including wording that may need client approval before it is improved.

## Client Approval Notes

The following items are intentionally preserved in the new version but should be reviewed with the client before changing copy:

- "Document Management that suites to fit your healthcare structure to increase Efficiency"
- "Managing paper work made easier"
- "reducing down paperwork & errors"
- "Implementing the software can be done in as little as week"
- "Our Philosophy ?"
- "Add the necessary contraints before submitting claims..."
- Footer social links for Instagram and Twitter currently point to generic URLs.
- Public software pricing has been removed from the homepage because the old plan cards used placeholder pricing. The homepage now sends visitors to the Training page instead.
- The Document Management about section currently has no CMS title/description, so the redesign preserves the bullet list and page structure.

## Home

| Old Section | New Section | Content Handling |
| --- | --- | --- |
| Header | New global header | Same product links, Training, About Us, Contact, Training Login, and Login destinations. |
| Hero | New split product hero | Keeps "Enhance your agency's", animated words, and the provider management subtitle. |
| Product/Benefit Cards | Four service cards | Keeps Improve Efficiency, Stay Compliant, Increase Profits, and Training copy. |
| Our Solutions | Split proof/content band | Keeps title, paragraph, "Personal Agency", bullets, and Book a Demo CTA. |
| Our Strategy | Three-card strategy section | Keeps Digital document management, Compliance regulation, Claims & Billing titles and bullets. |
| How It Works | Three-step timeline | Keeps Book a demo, Implement the software, and Improve efficiency & Stay compliant copy. |
| Pricing | Training CTA band | Removes placeholder public software pricing and points visitors to `/training` for real training options. |
| Testimonials | Testimonial band | Keeps current Ryzolve PAS explainer-video testimonial at `https://youtu.be/KeVOcQhl2S4`. |
| Lead Magnet | Contact CTA band | Keeps audit guide title, description, fields, and "Send email" button. |
| Footer | New global footer | Keeps Join the Community, Learn More, Get in Touch, social links, and copyright intent. |

## Product Pages

The three product pages use a shared product-detail template in the new design. This keeps the old page order: hero, What We Do, product solution, product about/feature section, testimonials, lead magnet, and footer.

| Old Route | New Route | Content Handling |
| --- | --- | --- |
| `/document-management` | `/document-management` | Keeps hero copy, What We Do copy, solution title/description, bullet list, testimonial, and lead CTA. |
| `/compliance-regulation` | `/compliance-regulation` | Keeps hero copy, background-check solution copy, OIG/TXL/DADS list, compliance evaluation copy, and data verification section. |
| `/claims-and-bills` | `/claims-and-bills` | Keeps hero copy, claims aggregation section, "contraints" sentence, and reduced workload/about copy. |

## About

| Old Section | New Section | Content Handling |
| --- | --- | --- |
| About Us hero | Page hero | Keeps "About Us". |
| Company Intro | Centered intro | Keeps "Empowering Growth Through Smart Solutions" and broad company description. |
| Service Summary Cards | Four service cards | Reuses homepage service card copy as current site does. |
| Our Philosophy | Philosophy band | Keeps philosophy heading and all existing philosophy statements. |
| Contact Info | Contact panel | Keeps address, phone, and email. |

## Contact

| Old Section | New Section | Content Handling |
| --- | --- | --- |
| Page Title | Page hero | Keeps "Get in Touch" and Home / Contact breadcrumb. |
| Contact Form | New styled form | Keeps First Name, Email, Subject, Message, "Send message", and required-fields note. |
| Submission | Strapi contact endpoint | Keeps `/api/contacts` destination and success intent. |

## Calendly

| Old Section | New Section | Content Handling |
| --- | --- | --- |
| Calendly embed | New booking page | Keeps the same Calendly event URL: `https://calendly.com/ryzolve-pas-software/ryzolve-demo`. |

## Training Cutover

The old `training-module` repository is not deleted. The new website adds a public `/training` page so the marketing surface can move into the public website while course execution and login can continue in the new learner platform.

| Old Training Surface | New Website Handling |
| --- | --- |
| Training navigation link | Points to `/training` on the redesigned public website. |
| Training Login | Points to `${NEXT_PUBLIC_RYZOLVE_TRAINING}/auth/login` when configured. |
| Course execution | Purchase CTAs point to `${NEXT_PUBLIC_RYZOLVE_TRAINING}/auth/register?redirect=<encoded /courses/<slug>?auto=1>` when configured. The learner app uses that redirect to auto-start checkout after signup/login. |
| Administrator course cards | Fetches live public course details from the main app API, with local static course copy only as a fallback. |
| Administrator course detail pages | New `/training/[slug]` website pages fetch live course description, outcomes, skills, artwork, and pricing. The page shows one purchase CTA, which redirects to the learner app checkout flow. |
| In-Service package signup | Agency plan and monthly-library CTAs point to `${NEXT_PUBLIC_RYZOLVE_AGENCY}/auth/register`, the agency package signup wizard. |

## Pages Preserved Even When Absent From Handoff

The redesign keeps public routes from the old website even if the handoff zip did not include a matching mockup.

| Route | New Handling |
| --- | --- |
| `/blank` | Preserved as a simple utility page with "This is blank page". |
| `/404` | Preserved with the old not-found heading/body and new shell. |
| `/calendly` | Preserved with the existing Calendly booking URL. |

## Form Endpoint Mapping

| Form | Endpoint Preserved |
| --- | --- |
| Lead magnet | `/api/customers` |
| Contact page | `/api/contacts` |
