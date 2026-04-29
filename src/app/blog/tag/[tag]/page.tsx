import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — Overseek Blog`,
    description: `Articles tagged with "${tag}" — AI and automation insights for small businesses.`,
    alternates: { canonical: `https://overseek.net/blog/tag/${tag}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  if (posts.length === 0) notFound();

  return (
    <div className="min-h-screen bg-base pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14">
          <span className="mb-3 inline-flex items-center rounded-full bg-accent-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Tag
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-text-primary">
            #{tag}
          </h1>
          <p className="text-text-secondary">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mb-10">
          <TagFilter tags={allTags} activeTag={tag} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
