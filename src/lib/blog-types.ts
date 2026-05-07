// Types and pure utilities — safe to import in client components

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  relatedSlugs: string[];
  faq: PostFaq[];
  coverImage?: string;
  coverImageSrc?: string;
  author: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
