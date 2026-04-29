---
name: Blog architecture
description: Blog section structure for overseek.net — content model, routing, tech choices
type: project
---

Blog built April 2026. Stack: next-mdx-remote/rsc, gray-matter, rehype-pretty-code, rehype-slug, remark-gfm, reading-time.

**Content:** MDX files at `src/content/blog/[slug]/index.mdx` with YAML frontmatter.

**Key architectural decision:** `src/lib/blog-types.ts` holds types + formatDate (client-safe). `src/lib/blog.ts` holds fs/path file-reading (server-only, must not be imported by client components). Client components import from `blog-types`, server pages import from `blog`.

**Routes:**
- `/blog` — listing
- `/blog/[slug]` — article (SSG)
- `/blog/[slug]/raw` — plain markdown for LLM indexing
- `/blog/tag/[tag]` — tag filter
- `/blog/feed.xml` — RSS
- `/llms.txt` — LLM discovery file

**Authors:** defined in `src/lib/authors.ts` as a Record keyed by id string. Multiple authors supported. Currently only `george`.

**Why:** User wants AI/tech content for small businesses; blog is first content vehicle.

**How to apply:** When adding articles, follow the frontmatter schema in blog-types.ts. New authors go in authors.ts. Tag pages are auto-generated via generateStaticParams.
