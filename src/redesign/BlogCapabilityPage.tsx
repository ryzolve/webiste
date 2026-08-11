import Link from 'next/link';

import SEO from './SEO';
import { FaqAccordion } from './FaqAccordion';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from './structured-data';
import type { BlogCapabilityEntry } from './blog-content';
import { SiteLayout } from './site';

export function BlogCapabilityPage({ entry }: { entry: BlogCapabilityEntry }) {
  const path = `/blogs/${entry.slug}`;

  return (
    <SiteLayout active="blogs">
      <SEO
        title={entry.title}
        description={entry.description}
        path={path}
        keywords={entry.keywords}
        type="article"
      />
      <ArticleJsonLd
        title={entry.title}
        description={entry.description}
        path={path}
        datePublished={entry.publishedAt}
      />
      <FaqJsonLd items={entry.faqs} path={path} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
          { name: entry.label, path },
        ]}
      />

      <main>
        <section className="rz-blog-hero">
          <div className="rz-wrap rz-blog-hero-grid">
            <div className="rz-blog-hero-copy">
              <Link className="rz-blog-back" href="/blogs">
                <span aria-hidden="true">←</span>
                All Ryzolve guides
              </Link>
              <p className="rz-eyebrow">{entry.eyebrow}</p>
              <h1>{entry.title}</h1>
              <p className="rz-blog-hero-description">{entry.description}</p>
              <div className="rz-page-hero-actions">
                <Link className="rz-btn rz-btn-blue" href={entry.ctaHref}>
                  <span>{entry.ctaLabel}</span>
                  <span className="rz-btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link className="rz-btn rz-btn-ghost" href="#article">
                  <span>Read the guide</span>
                  <span className="rz-btn-arrow" aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>
            {entry.image ? (
              <figure className="rz-blog-hero-figure">
                <img
                  alt={entry.imageAlt ?? ''}
                  height={669}
                  src={entry.image}
                  width={1200}
                />
              </figure>
            ) : (
            <div className="rz-blog-hero-panel" aria-label={`${entry.label} overview`}>
              <span className="rz-panel-eyebrow">{entry.label}</span>
              <strong>{entry.heroPanelTitle ?? entry.label}</strong>
              <p>{entry.heroPanelDescription ?? entry.description}</p>
              <div className="rz-blog-hero-rule" />
              <span className="rz-blog-hero-note">Built for Texas PAS agencies.</span>
            </div>
            )}
          </div>
        </section>

        <article id="article">
        <section id="workflow" className="rz-section bg-bg" aria-labelledby="blog-workflow-title">
          <div className="rz-wrap">
            <div className="rz-shead rz-blog-section-head">
              <p className="rz-eyebrow">How it works</p>
              <h2 id="blog-workflow-title">{entry.solutionTitle}</h2>
              <p>{entry.solutionDescription}</p>
            </div>
            <ol className="rz-blog-workflow-grid">
              {entry.workflowSteps.map((step) => (
                <li className="rz-blog-workflow-card" key={step.number}>
                  <span className="rz-blog-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {entry.articleSections.map((section) => (
          <section className="rz-section border-y border-rule bg-paper" key={section.title}>
            <div className="rz-wrap rz-blog-article-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}

        <section className="rz-section border-y border-rule bg-paper" aria-labelledby="blog-capabilities-title">
          <div className="rz-wrap rz-blog-two-column">
            <div className="rz-shead">
              <p className="rz-eyebrow">What your team can review</p>
              <h2 id="blog-capabilities-title">{entry.capabilitiesTitle ?? 'What your team can review at a glance.'}</h2>
            </div>
            <ul className="rz-blog-capability-list">
              {entry.capabilities.map((capability) => (
                <li key={capability}>
                  <span aria-hidden="true">✓</span>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rz-section bg-bg" aria-labelledby="blog-faq-title">
          <div className="rz-wrap">
            <div className="rz-shead rz-blog-section-head">
              <p className="rz-eyebrow">Questions Texas PAS teams ask</p>
              <h2 id="blog-faq-title">{entry.faqTitle ?? `${entry.label}, in plain language.`}</h2>
            </div>
            <FaqAccordion
              answerClassName="rz-blog-faq-answer"
              buttonClassName="rz-blog-faq-button"
              idPrefix={`${entry.slug}-faq`}
              itemClassName="rz-blog-faq"
              items={entry.faqs}
              listClassName="rz-blog-faq-list"
            />
          </div>
        </section>

        <section className="rz-section border-y border-rule bg-paper" aria-labelledby="blog-related-title">
          <div className="rz-wrap">
            <div className="rz-shead rz-blog-section-head">
              <p className="rz-eyebrow">Connected Ryzolve workflows</p>
              <h2 id="blog-related-title">{entry.relatedTitle ?? 'How this connects to the rest of your agency.'}</h2>
            </div>
            <div className="rz-blog-related-grid">
              {entry.relatedLinks.map((link) => (
                <Link className="rz-blog-related-card" href={link.href} key={link.href}>
                  <strong>{link.title}</strong>
                  <span>{link.description}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rz-blog-final-cta" aria-labelledby="blog-cta-title">
          <div className="rz-wrap rz-blog-final-cta-inner">
            <div>
              <p className="rz-eyebrow">Ready to review your workflow?</p>
              <h2 id="blog-cta-title">{entry.ctaTitle ?? 'See where this fits at your agency.'}</h2>
            </div>
            <Link className="rz-btn rz-btn-coral" href={entry.ctaHref}>
              <span>{entry.ctaLabel}</span>
              <span className="rz-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        </article>
      </main>
    </SiteLayout>
  );
}
