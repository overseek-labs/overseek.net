"use client";

import { motion } from "framer-motion";
import { ImageFrame } from "@/components/image-frame";

const projects = [
  {
    title: "mojar.ai",
    category: "AI SaaS Platform",
    description:
      "A sophisticated RAG platform transforming customer support through intelligent AI agents. Multi-channel deployment across web, Slack, and WhatsApp with 95%+ accuracy and enterprise-grade security.",
    tags: ["RAG", "LLM", "NLP", "React", "Node.js"],
    image: "/images/work-mojar.png",
    href: "https://www.mojar.ai/",
  },
  {
    title: "Positive Action",
    category: "Education Platform",
    description:
      "Scalable learning management infrastructure supporting tens of thousands of concurrent users. SSO integration, real-time collaboration, and 99.99% uptime.",
    tags: ["AWS", "Docker", "Authentik", "CI/CD"],
    image: "/images/work-education.svg",
    href: "https://positiveaction.net/",
  },
  {
    title: "Wall Art Platform",
    category: "Custom Software",
    description:
      "End-to-end printing platform with real-time preview, automated production workflows, and shipping integration serving thousands of artists and customers.",
    tags: ["React", "Node.js", "Docker", "AWS"],
    image: "/images/work-wallart.jpg",
  },
];

export function Work() {
  return (
    <section id="work" className="relative bg-surface-raised py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-xl"
        >
          <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-accent uppercase">
            Selected Work
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-text-primary sm:text-5xl">
            Projects that
            <br />
            <span className="text-gradient-accent">speak for themselves.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => {
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.06]">
                  <div className="p-3 pb-0">
                    <ImageFrame
                      src={p.image}
                      alt={p.title}
                      label={p.title}
                      aspect="aspect-[16/10]"
                      rounded="rounded-xl"
                      padding="p-2.5"
                      className="shadow-none"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 pt-5 lg:p-8 lg:pt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] text-accent uppercase">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-text-primary lg:text-2xl">
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label={p.title}
                          className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent"
                        >
                          <span>{p.title}</span>
                          <svg
                            className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </a>
                      ) : (
                        p.title
                      )}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border-subtle bg-surface-raised px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <a
              href="#contact"
              className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border-medium bg-surface p-12 text-center transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-black/[0.04]"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-subtle bg-surface-raised transition-colors duration-300 group-hover:bg-accent-light">
                <svg className="h-7 w-7 text-text-muted transition-colors duration-300 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 className="text-xl font-black tracking-tight text-text-primary lg:text-2xl">
                Your Project
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
                Have something ambitious in mind? Let&apos;s build it together. This spot is reserved for your next big idea.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 group-hover:bg-accent-hover group-hover:shadow-md group-hover:shadow-accent/15">
                Let&apos;s Talk
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
