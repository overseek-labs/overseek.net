import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";

export const metadata: Metadata = {
  title: "Blog — AI & Automation Insights for Small Business",
  description:
    "Practical guides on AI agents, workflow automation, and smart integrations — written for small business owners who want to move faster without hiring more people.",
  alternates: {
    canonical: "https://overseek.net/blog",
  },
  openGraph: {
    url: "https://overseek.net/blog",
    title: "Blog — AI & Automation Insights for Small Business",
    description:
      "Practical guides on AI agents, workflow automation, and smart integrations for small businesses.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-base pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14">
          <span className="mb-3 inline-flex items-center rounded-full bg-accent-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Blog
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-text-primary lg:text-5xl">
            AI & Automation for{" "}
            <span className="text-gradient-accent">Small Business</span>
          </h1>
          <p className="max-w-2xl text-lg text-text-secondary">
            Practical guides, real-world use cases, and step-by-step breakdowns
            — designed to help you integrate AI into your operations without
            needing a tech team.
          </p>
        </div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <div className="mb-10">
            <TagFilter tags={tags} />
          </div>
        )}

        {/* Grid */}
        {posts.length === 0 ? (
          <div className="py-24 text-center text-text-muted">
            No articles yet — check back soon.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
