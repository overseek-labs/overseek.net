"use client";

import { motion } from "framer-motion";

const categories = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Nest.js", "GraphQL", "REST APIs"] },
  { label: "Infrastructure", items: ["AWS", "Docker", "CI/CD", "Terraform"] },
  { label: "AI & Data", items: ["RAG Pipelines", "Mistral LLM", "Vector DBs", "NLP"] },
  { label: "Security", items: ["Authentik OAuth", "SSO", "RBAC", "GDPR/HIPAA"] },
  { label: "Platforms", items: ["Magento", "Shopify", "WordPress", "Custom CMS"] },
];

export function Technologies() {
  return (
    <section id="tech" className="section-dark relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--dark-label)' }}>
            Our Stack
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Tools we trust.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06]"
            >
              <h3 className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--dark-label)' }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
