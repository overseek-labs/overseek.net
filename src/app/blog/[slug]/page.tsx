import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Calendar, Clock } from "lucide-react";

import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getSeriesPosts,
  formatDate,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { mdxComponents } from "@/components/blog/mdx-components";
import { AuthorCard } from "@/components/blog/author-card";
import { SeriesBanner } from "@/components/blog/series-banner";
import { FAQSection } from "@/components/blog/faq-section";
import { RelatedArticles } from "@/components/blog/related-articles";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const url = `https://overseek.net/blog/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" as const }],
      [rehypePrettyCode, { theme: "github-light" }],
    ],
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const author = getAuthor(frontmatter.author);
  const relatedPosts = getRelatedPosts(post);
  const seriesPosts = frontmatter.series
    ? getSeriesPosts(frontmatter.series)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: author?.name ?? "Overseek",
    },
    publisher: {
      "@type": "Organization",
      name: "Overseek",
      url: "https://overseek.net",
    },
    url: `https://overseek.net/blog/${slug}`,
    keywords: frontmatter.tags.join(", "),
    ...(frontmatter.coverImage && {
      image: `https://overseek.net${frontmatter.coverImage}`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-base pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mx-auto max-w-3xl xl:mx-0 xl:grid xl:max-w-none xl:grid-cols-[1fr_280px] xl:gap-16">
            {/* Main content */}
            <div>
              {/* Series banner */}
              {frontmatter.series && seriesPosts.length > 1 && (
                <SeriesBanner
                  series={frontmatter.series}
                  seriesOrder={frontmatter.seriesOrder ?? 1}
                  totalInSeries={seriesPosts.length}
                  posts={seriesPosts}
                  currentSlug={slug}
                />
              )}

              {/* Header */}
              <header className="mb-10">
                <div className="mb-4 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="inline-flex items-center rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      {tag}
                    </a>
                  ))}
                </div>

                <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-text-primary lg:text-4xl">
                  {frontmatter.title}
                </h1>

                <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                  {frontmatter.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
                  <div className="flex items-center gap-4">
                    {author && <AuthorCard author={author} compact />}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(frontmatter.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {readingTime}
                    </span>
                    <ShareButtons title={frontmatter.title} slug={slug} />
                  </div>
                </div>
              </header>

              {/* Cover image */}
              {frontmatter.coverImage && (
                <div className="mb-10 overflow-hidden rounded-2xl">
                  <img
                    src={frontmatter.coverImage}
                    alt={frontmatter.title}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              {/* Article body */}
              <article className="prose-content">
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={mdxOptions as Parameters<typeof MDXRemote>[0]["options"]}
                />
              </article>

              {/* Author bio */}
              {author && (
                <div className="mt-12">
                  <AuthorCard author={author} />
                </div>
              )}

              {/* FAQ */}
              {frontmatter.faq?.length > 0 && (
                <FAQSection items={frontmatter.faq} />
              )}

              {/* Related articles */}
              <RelatedArticles posts={relatedPosts} />
            </div>

            {/* Sidebar TOC – desktop only */}
            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
