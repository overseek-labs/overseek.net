import Link from "next/link";

interface TagFilterProps {
  tags: string[];
  activeTag?: string;
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
          !activeTag
            ? "bg-accent text-white"
            : "border border-border-subtle bg-surface text-text-secondary hover:border-accent/30 hover:text-text-primary"
        }`}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            activeTag === tag
              ? "bg-accent text-white"
              : "border border-border-subtle bg-surface text-text-secondary hover:border-accent/30 hover:text-text-primary"
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
