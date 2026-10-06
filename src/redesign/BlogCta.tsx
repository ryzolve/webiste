import { useEffect, useState } from 'react';
import Link from 'next/link';

import { trackEvent } from './analytics';
import type { BlogCapabilityEntry } from './blog-content';
import type { BlogCtaPlacement, BlogOffer, BlogOfferLink } from './blog-offers';
import { withBlogUtm } from './blog-offers';

type CtaLinkProps = {
  link: BlogOfferLink;
  offer: BlogOffer;
  slug: string;
  placement: BlogCtaPlacement;
  rank: 'primary' | 'secondary';
  className: string;
};

/** One CTA: UTM-tagged, and reported as `blog_cta_clicked` so posts can be compared. */
export function BlogCtaLink({ link, offer, slug, placement, rank, className }: CtaLinkProps) {
  const href = withBlogUtm(link.href, slug, placement);
  const onClick = () =>
    trackEvent('blog_cta_clicked', {
      slug,
      placement,
      offer: offer.kind,
      cta: rank,
      label: link.label,
      destination: link.href,
    });
  const children = (
    <>
      <span>{link.label}</span>
      <span className="rz-btn-arrow" aria-hidden="true">{link.external ? '↗' : '→'}</span>
    </>
  );

  return link.external ? (
    <a className={className} href={href} onClick={onClick} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

type OfferProps = { entry: BlogCapabilityEntry; offer: BlogOffer };

/** Mid-article card, after the section that sets out the problem. */
export function BlogInlineCta({ entry, offer }: OfferProps) {
  return (
    <aside className="rz-blog-inline-cta" aria-label={offer.eyebrow}>
      <p className="rz-eyebrow">{offer.eyebrow}</p>
      <strong className="rz-blog-inline-cta-title">{offer.title}</strong>
      <p>{offer.body}</p>
      <ul className="rz-blog-inline-cta-points">
        {offer.points.map((point) => (
          <li key={point}>
            <span aria-hidden="true">✓</span>
            {point}
          </li>
        ))}
      </ul>
      <div className="rz-blog-inline-cta-actions">
        <BlogCtaLink
          className="rz-btn rz-btn-blue"
          link={offer.primary}
          offer={offer}
          placement="inline"
          rank="primary"
          slug={entry.slug}
        />
        <BlogCtaLink
          className="rz-blog-inline-cta-secondary"
          link={offer.secondary}
          offer={offer}
          placement="inline"
          rank="secondary"
          slug={entry.slug}
        />
      </div>
    </aside>
  );
}

/** Dark band where the article ends, before the FAQ and related links. */
export function BlogEndCta({ entry, offer }: OfferProps) {
  return (
    <section className="rz-blog-final-cta" id="blog-end-cta" aria-labelledby="blog-cta-title">
      <div className="rz-wrap rz-blog-final-cta-inner">
        <div>
          <p className="rz-eyebrow">{offer.eyebrow}</p>
          <h2 id="blog-cta-title">{entry.ctaTitle ?? offer.title}</h2>
          <p className="rz-blog-final-cta-body">{entry.ctaDescription ?? offer.body}</p>
        </div>
        <div className="rz-blog-final-cta-actions">
          <BlogCtaLink
            className="rz-btn rz-btn-coral"
            link={offer.primary}
            offer={offer}
            placement="end"
            rank="primary"
            slug={entry.slug}
          />
          <BlogCtaLink
            className="rz-btn rz-btn-ghost"
            link={offer.secondary}
            offer={offer}
            placement="end"
            rank="secondary"
            slug={entry.slug}
          />
        </div>
      </div>
    </section>
  );
}

const STICKY_DISMISSED_KEY = 'rz-blog-sticky-dismissed';

/**
 * Slim bar pinned to the bottom of the viewport while the reader is in the
 * article body: hidden over the hero (which has its own CTA) and once the end
 * CTA band comes into view. Dismissing it holds for the rest of the visit.
 * Leaves the bottom-right corner free for the tawk.to chat bubble.
 */
export function BlogStickyCta({ entry, offer }: OfferProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STICKY_DISMISSED_KEY)) setDismissed(true);
    } catch {
      // Storage blocked: the bar just won't remember a dismissal.
    }
  }, []);

  useEffect(() => {
    if (dismissed) return undefined;
    const hero = document.querySelector('.rz-blog-hero');
    const end = document.getElementById('blog-end-cta');
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const beforeEnd = end ? end.getBoundingClientRect().top > window.innerHeight : true;
      setVisible(pastHero && beforeEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    trackEvent('blog_sticky_cta_dismissed', { slug: entry.slug, offer: offer.kind });
    try {
      sessionStorage.setItem(STICKY_DISMISSED_KEY, '1');
    } catch {
      // See above.
    }
  };

  return (
    <aside
      aria-label="Next step"
      className={`rz-blog-sticky-cta${visible ? ' is-visible' : ''}`}
      inert={!visible}
    >
      <p>{offer.stickyText}</p>
      <BlogCtaLink
        className="rz-btn rz-btn-coral"
        link={offer.primary}
        offer={offer}
        placement="sticky"
        rank="primary"
        slug={entry.slug}
      />
      <button aria-label="Dismiss" className="rz-blog-sticky-close" onClick={dismiss} type="button">
        ×
      </button>
    </aside>
  );
}
