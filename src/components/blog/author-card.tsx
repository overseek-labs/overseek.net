import { Linkedin, Twitter, Globe, BookOpen } from "lucide-react";
import type { Author, AuthorSocialLink } from "@/lib/authors";

const platformIcon = (platform: AuthorSocialLink["platform"]) => {
  switch (platform) {
    case "linkedin":
      return <Linkedin className="h-3.5 w-3.5" />;
    case "twitter":
      return <Twitter className="h-3.5 w-3.5" />;
    case "medium":
      return <BookOpen className="h-3.5 w-3.5" />;
    default:
      return <Globe className="h-3.5 w-3.5" />;
  }
};

const platformLabel = (platform: AuthorSocialLink["platform"]) => {
  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    twitter: "X",
    medium: "Medium",
    github: "GitHub",
    website: "Website",
  };
  return labels[platform] ?? platform;
};

interface AuthorCardProps {
  author: Author;
  compact?: boolean;
}

export function AuthorCard({ author, compact = false }: AuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {author.image ? (
          <img
            src={author.image}
            alt={author.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-sm font-bold text-accent">
            {initials}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-text-primary">{author.name}</p>
          <p className="text-xs text-text-muted">{author.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6">
      <div className="flex gap-5">
        {author.image ? (
          <img
            src={author.image}
            alt={author.name}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-light text-xl font-bold text-accent">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-bold text-text-primary">{author.name}</p>
          <p className="mb-3 text-sm text-accent">{author.title}</p>
          <p className="text-sm leading-relaxed text-text-secondary">
            {author.shortBio}
          </p>
          {author.socialLinks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {author.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
                >
                  {platformIcon(link.platform)}
                  {platformLabel(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {author.expertise.length > 0 && (
        <div className="mt-5 border-t border-border-subtle pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Expertise
          </p>
          <div className="flex flex-wrap gap-1.5">
            {author.expertise.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-surface-raised px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
