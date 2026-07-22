import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import SEO from 'redesign/SEO';
import { BreadcrumbJsonLd } from 'redesign/structured-data';
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
      <main>
        <section className="rz-blog-hero">
          <div className="rz-wrap">
            <p className="rz-eyebrow">Ryzolve blogs</p>
            <h1>Workflow guides for Texas PAS agencies.</h1>
            <p className="rz-blog-hero-description">
              Practical pages about the workflows that keep agency data, records, and teams ready for the next step.
            </p>
          </div>
        </section>
        <section className="rz-section bg-bg" aria-labelledby="blog-list-title">
          <div className="rz-wrap">
            <div className="rz-shead">
              <p className="rz-eyebrow">Explore the workflows</p>
              <h2 id="blog-list-title">Start with a workflow guide.</h2>
            </div>
            <div className="rz-blog-related-grid">
              {entries.map((entry) => (
                <Link className="rz-blog-related-card" href={`/blogs/${entry.slug}`} key={entry.slug}>
                  <span className="rz-panel-eyebrow">{entry.eyebrow}</span>
                  <strong>{entry.title}</strong>
                  <span>{entry.description}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <nav className="rz-blog-pagination" aria-label="Blog pages">
              {page > 1 ? <Link href={`/blogs?page=${page - 1}`}>Previous</Link> : <span aria-disabled="true">Previous</span>}
              <span aria-current="page">Page {page} of {totalPages}</span>
              {page < totalPages ? <Link href={`/blogs?page=${page + 1}`}>Next</Link> : <span aria-disabled="true">Next</span>}
            </nav>
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
