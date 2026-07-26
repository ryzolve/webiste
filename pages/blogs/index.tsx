import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import SEO from 'redesign/SEO';
import { BreadcrumbJsonLd, CollectionPageJsonLd } from 'redesign/structured-data';
import {
  BLOG_PAGE_SIZE,
  publishedBlogCapabilities,
  type BlogCapabilityEntry,
} from 'redesign/blog-content';
import { SiteLayout } from 'redesign/site';

type BlogIndexProps = {
  entries: BlogCapabilityEntry[];
  page: number;
  totalPages: number;
};

function parsePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw || 1);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatPublishedDate(value: string) {
  return blogDateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export default function BlogsIndexPage({ entries, page, totalPages }: BlogIndexProps) {
  return (
    <SiteLayout active="blogs">
      <SEO
        title="Ryzolve Workflow Guides for Texas PAS Agencies"
        description="Explore Ryzolve blog guides for payroll-ready EVV data and connected Texas PAS agency workflows."
        path="/blogs"
        keywords={['Texas PAS capability guides', 'EVV payroll reporting', 'PAS agency workflows']}
      />
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Blogs', path: '/blogs' }]} />
      <CollectionPageJsonLd
        description="Educational Ryzolve articles for Texas PAS agencies."
        items={entries.map((entry) => ({ name: entry.title, path: `/blogs/${entry.slug}` }))}
        name="Ryzolve Workflow Guides for Texas PAS Agencies"
        path="/blogs"
      />
      <main>
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
        <section className="rz-blog-index-section" aria-labelledby="blog-list-title">
          <div className="rz-wrap">
            <div className="rz-shead">
              <p className="rz-eyebrow">Latest guides</p>
              <h2 id="blog-list-title">Practical guidance for connected agency workflows.</h2>
            </div>
            <div className="rz-blog-index-grid">
              {entries.map((entry) => (
                <Link className="rz-blog-index-card" href={`/blogs/${entry.slug}`} key={entry.slug}>
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
            {totalPages > 1 && (
              <nav className="rz-blog-pagination" aria-label="Blog pages">
                {page > 1 && <Link href={`/blogs?page=${page - 1}`}>Previous</Link>}
                <span aria-current="page">Page {page} of {totalPages}</span>
                {page < totalPages && <Link href={`/blogs?page=${page + 1}`}>Next</Link>}
              </nav>
            )}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

export const getServerSideProps: GetServerSideProps<BlogIndexProps> = async ({ query }) => {
  const totalPages = Math.max(1, Math.ceil(publishedBlogCapabilities.length / BLOG_PAGE_SIZE));
  const requestedPage = parsePage(query.page);
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * BLOG_PAGE_SIZE;

  return {
    props: {
      entries: publishedBlogCapabilities.slice(start, start + BLOG_PAGE_SIZE),
      page,
      totalPages,
    },
  };
};
