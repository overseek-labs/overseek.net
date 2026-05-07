"use client";

import { useState } from "react";
import { Link2, Twitter, Linkedin, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
  variant?: "default" | "hero";
}

export function ShareButtons({ title, slug, variant = "default" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://overseek.net/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const isHero = variant === "hero";
  const buttonClass = isHero
    ? "h-10 w-10 rounded-full border-white/70 bg-white/90 text-[#5A4637] shadow-[0_10px_28px_rgba(82,49,27,0.12)] backdrop-blur-md hover:border-accent/25 hover:bg-white hover:text-accent"
    : "border-border-subtle bg-surface text-text-secondary hover:border-accent/20 hover:text-accent";
  const buttonSizeClass = isHero ? "h-10 w-10 rounded-full" : "h-8 w-8 rounded-lg";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {!isHero && <span className="text-xs text-text-muted">Share</span>}
      <a
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center border transition-all ${buttonSizeClass} ${buttonClass}`}
        aria-label="Share on X"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center border transition-all ${buttonSizeClass} ${buttonClass}`}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>
      <button
        onClick={copyLink}
        className={`flex items-center justify-center border transition-all ${buttonSizeClass} ${buttonClass}`}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
