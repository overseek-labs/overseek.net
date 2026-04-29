// Server-only: uses fs/path — do NOT import from client components
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type { PostFaq, PostFrontmatter, Post } from "./blog-types";
export { formatDate } from "./blog-types";
import type { Post } from "./blog-types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((dir) =>
    fs.existsSync(path.join(CONTENT_DIR, dir, "index.mdx"))
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    frontmatter: data as Post["frontmatter"],
    content,
    readingTime: `${Math.ceil(rt.minutes)} min read`,
  };
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime()
    ) as Post[];
}

export function getRelatedPosts(post: Post): Post[] {
  const explicit = (post.frontmatter.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean) as Post[];

  if (explicit.length >= 3) return explicit.slice(0, 3);

  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const tagMatched = all.filter((p) =>
    p.frontmatter.tags.some((t) => post.frontmatter.tags.includes(t))
  );

  const combined = [...explicit];
  for (const p of tagMatched) {
    if (!combined.find((c) => c.slug === p.slug)) combined.push(p);
    if (combined.length >= 3) break;
  }

  return combined;
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllPosts().forEach((p) =>
    p.frontmatter.tags.forEach((t) => tagSet.add(t))
  );
  return Array.from(tagSet).sort();
}

export function getSeriesPosts(series: string): Post[] {
  return getAllPosts()
    .filter((p) => p.frontmatter.series === series)
    .sort(
      (a, b) =>
        (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0)
    );
}
