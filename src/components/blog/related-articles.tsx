import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

interface RelatedArticlesProps {
  posts: Post[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border-subtle pt-12">
      <h2 className="mb-6 text-2xl font-bold text-text-primary">
        Keep Reading
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-5 transition-all duration-300 hover:border-accent/20 hover:shadow-md"
          >
            {post.frontmatter.tags[0] && (
              <span className="mb-3 inline-flex w-fit rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                {post.frontmatter.tags[0]}
              </span>
            )}
            <h3 className="mb-2 font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent line-clamp-2">
              {post.frontmatter.title}
            </h3>
            <p className="mb-4 flex-1 text-sm text-text-secondary line-clamp-2">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">
                {formatDate(post.frontmatter.date)}
              </span>
              <ArrowRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
