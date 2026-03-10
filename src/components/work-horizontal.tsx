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
    image: "/images/work-mojar.jpg",
  },
  {
    title: "Education Infrastructure",
    category: "Cloud & DevOps",
    description:
      "Scalable learning management infrastructure supporting tens of thousands of concurrent users. SSO integration, real-time collaboration, and 99.99% uptime.",
    tags: ["AWS", "Docker", "Authentik", "CI/CD"],
    image: "/images/work-education.jpg",
  },
  {
    title: "Wall Art Platform",
    category: "Custom Software",
    description:
      "End-to-end printing platform with real-time preview, automated production workflows, and shipping integration serving thousands of artists and customers.",
    tags: ["React", "Node.js", "Docker", "AWS"],
    image: "/images/work-wallart.jpg",
  },
  {
    title: "Your Project",
    category: "Full-Stack Platform",
    description:
      "Your project description here.",
    tags: ["Magento", "Next.js", "API Gateway", "AWS"],
    image: "/images/work-ecommerce.jpg",
  },
];

export function WorkHorizontal() {
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

        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative grid overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.04] lg:grid-cols-[1fr_auto]"
            >
              <div className="relative p-8 lg:p-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] text-accent uppercase">
                    {p.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-text-primary lg:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
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

              <div className="hidden w-72 items-center justify-center border-l border-border-subtle lg:flex p-4">
                <ImageFrame
                  src={p.image}
                  alt={p.title}
                  label="Screenshot"
                  aspect="aspect-[3/4]"
                  rounded="rounded-xl"
                  padding="p-2"
                  className="w-full shadow-none"
                />
              </div>

              <div className="absolute right-6 top-8 lg:right-8 lg:top-10">
                <svg
                  className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
