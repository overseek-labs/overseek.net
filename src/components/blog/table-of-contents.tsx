"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".prose-content h2, .prose-content h3"
    );
    const parsed: Heading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: Number(el.tagName[1]),
    }));
    setHeadings(parsed);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
        On this page
      </p>
      <ol className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-0.5 text-sm leading-snug transition-colors ${
                level === 3 ? "pl-3" : ""
              } ${
                activeId === id
                  ? "font-medium text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
