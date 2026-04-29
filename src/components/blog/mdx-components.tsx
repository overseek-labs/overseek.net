import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-text-primary"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-text-primary"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-text-primary"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-7 text-text-secondary">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-1.5 pl-5 text-text-secondary marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-text-secondary marker:text-accent">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-accent pl-5 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    if (className) return <code className={className}>{children}</code>;
    return (
      <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-sm text-accent">
        {children}
      </code>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  hr: () => <hr className="my-10 border-border-subtle" />,
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <Image src={src ?? ""} alt={alt ?? ""} fill className="object-cover" />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-raised text-text-primary">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-border-subtle px-4 py-3 text-text-secondary">
      {children}
    </td>
  ),
};
