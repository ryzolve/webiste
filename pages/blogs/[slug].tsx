import type { GetStaticPaths, GetStaticProps } from 'next';

import { BlogCapabilityPage } from 'redesign/BlogCapabilityPage';
import {
  getBlogCapability,
  publishedBlogCapabilities,
  type BlogCapabilityEntry,
} from 'redesign/blog-content';

type BlogCapabilityProps = { entry: BlogCapabilityEntry };

export default function BlogCapabilityRoute({ entry }: BlogCapabilityProps) {
  return <BlogCapabilityPage entry={entry} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: publishedBlogCapabilities.map((entry) => ({ params: { slug: entry.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogCapabilityProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const entry = getBlogCapability(slug);

  if (!entry) return { notFound: true };

  return { props: { entry } };
};
