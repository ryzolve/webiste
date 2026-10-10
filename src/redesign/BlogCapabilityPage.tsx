import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

import SEO from './SEO';
import { FaqAccordion } from './FaqAccordion';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from './structured-data';
import type { BlogArticleBlock, BlogArticleTable, BlogCapabilityEntry } from './blog-content';
import { getBlogCapability } from './blog-content';
import type { BlogOffer } from './blog-offers';
import { blogOffer } from './blog-offers';
import { BlogCtaLink, BlogEndCta, BlogInlineCta, BlogStickyCta } from './BlogCta';
import { SiteLayout } from './site';

/* Article paragraphs come from markdown, so a few carry inline links, bold, and
   italics. Without this they printed as raw syntax ("[label](url)"). Bold/italic
   recurse so a link nested inside emphasis still renders. */
const INLINE_MD = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;

function renderInlineMarkdown(text: string, keyPrefix = ''): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(INLINE_MD.source, 'g');

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}${match.index}`;

    if (token.startsWith('[')) {
      const parts = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (parts) {
        const label = parts[1].replace(/\s*→\s*$/, '');
        const href = parts[2].replace(/^https?:\/\/ryzolve\.com/, '') || '/';
        out.push(
          href.startsWith('/') ? (
            <Link href={href} key={key}>{label}</Link>
          ) : (
            <a href={href} key={key} rel="noopener noreferrer" target="_blank">{label}</a>
          )
        );
      }
    } else if (token.startsWith('**')) {
      out.push(<strong key={key}>{renderInlineMarkdown(token.slice(2, -2), `${key}-`)}</strong>);
    } else {
      out.push(<em key={key}>{renderInlineMarkdown(token.slice(1, -1), `${key}-`)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* "Connected workflows" mixes sibling guides with product pages, so a card's
   thumbnail comes either from the linked post's hero or a per-page image. */
const RELATED_IMAGES: Record<string, string> = {
  '/compliance-regulation': '/img/related/compliance-regulation.jpg',
  '/document-management': '/img/related/document-management.jpg',
  '/claims-and-bills': '/img/related/claims-and-bills.jpg',
  '/training': '/img/related/training.jpg',
};

function relatedImage(href: string): string | undefined {
  const blog = href.match(/^\/blogs\/([a-z0-9-]+)$/);
  if (blog) return getBlogCapability(blog[1])?.image;
  if (RELATED_IMAGES[href]) return RELATED_IMAGES[href];
  if (href.startsWith('/training')) return RELATED_IMAGES['/training'];
  return undefined;
}

function ArticleList({ items, ordered, heading }: { items: string[]; ordered?: boolean; heading?: string }) {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <div className="rz-blog-article-list">
      {heading && <p className="rz-blog-article-list-heading">{heading}</p>}
      <ListTag>
        {items.map((item) => (
          <li key={item}>{renderInlineMarkdown(item)}</li>
        ))}
      </ListTag>
    </div>
  );
}

function ArticleTable({ table }: { table: BlogArticleTable }) {
  return (
    <div className="rz-blog-table-wrap">
      <table className="rz-blog-table">
        <thead>
          <tr>
            {table.head.map((cell) => (
              <th key={cell} scope="col">{renderInlineMarkdown(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cell} scope="row">{renderInlineMarkdown(cell)}</th>
                ) : (
                  // data-label names the column once rows stack on phones.
                  <td data-label={table.head[cellIndex]} key={cell}>
                    {renderInlineMarkdown(cell)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleBlock({
  block,
  entry,
  offer,
}: {
  block: BlogArticleBlock;
  entry: BlogCapabilityEntry;
  offer: BlogOffer;
}) {
  if (block.type === 'p') return <p>{renderInlineMarkdown(block.text)}</p>;
  if (block.type === 'list') {
    return <ArticleList heading={block.heading} items={block.items} ordered={block.ordered} />;
  }
  if (block.type === 'table') return <ArticleTable table={block} />;
  const href = block.href.replace(/^https?:\/\/ryzolve\.com/, '') || '/';
  return (
    <p className="rz-blog-article-cta">
      <BlogCtaLink
        className="rz-btn rz-btn-blue"
        link={{ label: block.label, href, external: !href.startsWith('/') }}
        offer={offer}
        placement="body"
        rank={href === offer.primary.href ? 'primary' : 'secondary'}
        slug={entry.slug}
      />
    </p>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function BlogCapabilityPage({ entry }: { entry: BlogCapabilityEntry }) {
  const path = `/blogs/${entry.slug}`;
  const offer = blogOffer(entry);
  const inlineCtaAfter = entry.inlineCtaAfter ?? 0;
  const lastSection = entry.articleSections.length - 1;

  return (
    <SiteLayout active="blogs">
      <SEO
        title={entry.seoTitle ?? entry.title}
        description={entry.description}
        path={path}
        keywords={entry.keywords}
        image={entry.image}
        type="article"
      />
      <ArticleJsonLd
        title={entry.title}
        description={entry.description}
        path={path}
        datePublished={entry.publishedAt}
        dateModified={entry.updatedAt}
        image={entry.image}
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
        <section
          className={`rz-blog-hero${entry.image ? ' rz-blog-hero--image' : ''}`}
          style={entry.image ? ({ ['--rz-hero-image']: `url(${entry.image})` } as CSSProperties) : undefined}
          // A CSS background isn't announced, so carry the alt text on the section.
          {...(entry.image && entry.imageAlt
            ? { 'aria-label': entry.imageAlt, role: 'img' as const }
            : {})}
        >
          <div className="rz-wrap rz-blog-hero-grid">
            <div className="rz-blog-hero-copy">
              <Link className="rz-blog-back" href="/blogs">
                <span aria-hidden="true">←</span>
                All Ryzolve guides
              </Link>
              <p className="rz-eyebrow">{entry.eyebrow}</p>
              <h1>{entry.title}</h1>
              <p className="rz-blog-hero-description">{entry.heroDescription ?? entry.description}</p>
              {entry.updatedAt && (
                <p className="rz-blog-hero-updated">
                  Updated <time dateTime={entry.updatedAt}>{formatDate(entry.updatedAt)}</time>
                </p>
              )}
              <div className="rz-page-hero-actions">
                <BlogCtaLink
                  className="rz-btn rz-btn-blue"
                  link={offer.primary}
                  offer={offer}
                  placement="hero"
                  rank="primary"
                  slug={entry.slug}
                />
                <Link className="rz-btn rz-btn-ghost" href="#article">
                  <span>Read the guide</span>
                  <span className="rz-btn-arrow" aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>
            {entry.image ? null : (
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
        {entry.workflowSteps.length > 0 && (
        <section id="workflow" className="rz-section bg-bg" aria-labelledby="blog-workflow-title">
          <div className="rz-wrap">
            <div className="rz-shead rz-blog-section-head">
              <p className="rz-eyebrow">{entry.solutionEyebrow ?? 'How it works'}</p>
              <h2 id="blog-workflow-title">{entry.solutionTitle}</h2>
              {entry.solutionDescription && <p>{entry.solutionDescription}</p>}
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
        )}

        {entry.articleSections.map((section, index) => (
          <section className="rz-section border-y border-rule bg-paper" key={section.title || `section-${index}`}>
            <div className="rz-wrap rz-blog-article-section">
              {/* An untitled section is the post's opening paragraphs. */}
              {section.title && <h2>{section.title}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
              ))}
              {section.blocks?.map((block, blockIndex) => (
                <ArticleBlock
                  block={block}
                  entry={entry}
                  key={`${block.type}-${blockIndex}`}
                  offer={offer}
                />
              ))}
              {section.lists?.map((list) => (
                <ArticleList heading={list.heading} items={list.items} key={list.heading ?? list.items[0]} />
              ))}
              {section.closing?.map((paragraph) => (
                <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
              ))}
              {section.table && <ArticleTable table={section.table} />}
              {index === lastSection && entry.sourceNote && (
                <p className="rz-blog-source-note">{renderInlineMarkdown(entry.sourceNote)}</p>
              )}
              {/* By default after the section that sets out the problem — the
                  first point in the read where the offer answers something. */}
              {index === inlineCtaAfter && <BlogInlineCta entry={entry} offer={offer} />}
            </div>
          </section>
        ))}

        {entry.capabilities.length > 0 && (
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
        )}

        <BlogEndCta entry={entry} offer={offer} />

        <section className="rz-section bg-bg" aria-labelledby="blog-faq-title">
          <div className="rz-wrap">
            <div className="rz-shead rz-blog-section-head">
              <p className="rz-eyebrow">{entry.faqEyebrow ?? 'Questions Texas PAS teams ask'}</p>
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
                  {relatedImage(link.href) && (
                    <img
                      alt=""
                      className="rz-blog-related-image"
                      loading="lazy"
                      src={relatedImage(link.href)}
                    />
                  )}
                  <strong>{link.title}</strong>
                  <span>{link.description}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </article>
      </main>
      <BlogStickyCta entry={entry} offer={offer} />
    </SiteLayout>
  );
}
