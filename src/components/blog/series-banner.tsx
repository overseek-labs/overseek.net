import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Post } from "@/lib/blog-types";

interface SeriesBannerProps {
  series: string;
  seriesOrder: number;
  totalInSeries: number;
  posts: Post[];
  currentSlug: string;
}

export function SeriesBanner({
  series,
  seriesOrder,
  totalInSeries,
  posts,
  currentSlug,
}: SeriesBannerProps) {
  const progress = Math.round((seriesOrder / totalInSeries) * 100);

  return (
    <div className="mb-10 rounded-2xl border border-accent/20 bg-accent-light p-6">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Series
        </span>
      </div>
      <p className="mb-1 font-bold text-text-primary">{series}</p>
      <p className="mb-4 text-sm text-text-secondary">
        Part {seriesOrder} of {totalInSeries}
      </p>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-accent/20">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="space-y-1.5">
        {posts.map((p) => (
          <li key={p.slug} className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                p.slug === currentSlug
                  ? "bg-accent text-white"
                  : "bg-accent/20 text-accent"
              }`}
            >
              {p.frontmatter.seriesOrder}
            </span>
            {p.slug === currentSlug ? (
              <span className="text-sm font-semibold text-text-primary">
                {p.frontmatter.title}
              </span>
            ) : (
              <Link
                href={`/blog/${p.slug}`}
                className="text-sm text-text-secondary hover:text-accent hover:underline"
              >
                {p.frontmatter.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
