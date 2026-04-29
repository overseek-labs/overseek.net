"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import { getAuthor as lookupAuthor } from "@/lib/authors";

interface BlogCardProps {
  post: Post;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { frontmatter, slug, readingTime } = post;
  const author = lookupAuthor(frontmatter.author);
  const primaryTag = frontmatter.tags[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:shadow-black/5"
      >
        {primaryTag && (
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            {primaryTag}
          </span>
        )}

        <h2 className="mb-2 text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-accent line-clamp-2">
          {frontmatter.title}
        </h2>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between border-t border-border-subtle pt-4">
          <div className="flex items-center gap-2">
            {author?.image ? (
              <img
                src={author.image}
                alt={author.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-xs font-bold text-accent">
                {author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2) ?? "O"}
              </span>
            )}
            <span className="text-xs font-medium text-text-secondary">
              {author?.name ?? "Overseek"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
