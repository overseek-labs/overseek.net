import type { Metadata } from "next";
import Image from "next/image";
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
  const hasCoverImage = Boolean(frontmatter.coverImage);
  const coverImageSrc = frontmatter.coverImageSrc ?? frontmatter.coverImage;

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
          {/* Series banner */}
          {frontmatter.series && seriesPosts.length > 1 && (
            <div className="mx-auto mb-6 max-w-3xl xl:mx-0">
              <SeriesBanner
                series={frontmatter.series}
                seriesOrder={frontmatter.seriesOrder ?? 1}
                totalInSeries={seriesPosts.length}
                posts={seriesPosts}
                currentSlug={slug}
              />
            </div>
          )}

          {/* Header */}
          <header
            className={`relative mb-16 overflow-hidden rounded-[2rem] border border-border-subtle bg-surface ${
              hasCoverImage
                ? "min-h-[560px] shadow-[0_30px_90px_rgba(107,66,38,0.12)] lg:mb-20 lg:min-h-[620px]"
                : "p-8 sm:p-10 lg:p-12"
            }`}
          >
            {frontmatter.coverImage && (
              <>
                <Image
                  src={coverImageSrc ?? frontmatter.coverImage}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#FAFAF8_0%,rgba(250,250,248,0.94)_30%,rgba(250,250,248,0.58)_50%,rgba(250,250,248,0.14)_72%,rgba(250,250,248,0.02)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_19%_28%,rgba(255,255,255,0.64),transparent_34%),linear-gradient(180deg,rgba(250,250,248,0.1)_0%,rgba(250,250,248,0.18)_100%)] md:bg-[radial-gradient(circle_at_19%_28%,rgba(255,255,255,0.58),transparent_35%)]" />
              </>
            )}

            <div
              className={`relative z-10 flex flex-col ${
                hasCoverImage
                  ? "min-h-[560px] px-6 pt-20 pb-8 sm:px-10 sm:pt-24 lg:min-h-[620px] lg:px-16 lg:pt-28 lg:pb-12"
                  : ""
              }`}
            >
              <div className="max-w-3xl">
                <div className="mb-7 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="inline-flex items-center rounded-full bg-white/55 px-4 py-1.5 text-xs font-medium text-accent shadow-sm ring-1 ring-accent/5 backdrop-blur-md transition-colors hover:bg-accent hover:text-white"
                    >
                      {tag}
                    </a>
                  ))}
                </div>

                <h1 className="mb-6 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-text-primary sm:text-5xl lg:text-6xl">
                  {frontmatter.title}
                </h1>

                <p className="mb-10 max-w-2xl text-lg leading-8 text-[#5A534D] sm:text-xl">
                  {frontmatter.description}
                </p>

                <div className="flex max-w-2xl flex-col gap-4 border-t border-accent/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                  {author && <AuthorCard author={author} compact />}
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#6B625A] sm:ml-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(frontmatter.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-start pt-8 sm:absolute sm:right-8 sm:bottom-8 lg:right-12 lg:bottom-12">
                <ShareButtons title={frontmatter.title} slug={slug} variant="hero" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-3xl xl:mx-0 xl:grid xl:max-w-none xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-16 xl:px-12 2xl:px-4">
            {/* Main content */}
            <div className="max-w-3xl">

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
              <div className="sticky top-28 rounded-3xl border border-border-subtle bg-surface/70 p-7 shadow-[0_24px_70px_rgba(107,66,38,0.08)] backdrop-blur-xl">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
