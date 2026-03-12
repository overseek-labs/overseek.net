"use client";

import { motion } from "framer-motion";
import { WorkflowAnimation } from "@/components/workflow-animation";

export function Automation() {
  return (
    <section
      id="automation"
      className="relative overflow-hidden bg-base py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Title — centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
            Automation & AI Agents
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Let AI agents do{" "}
            <span className="text-gradient-accent">the heavy lifting.</span>
          </h2>
        </motion.div>

        {/* Animation — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto hidden overflow-hidden rounded-2xl border border-border-subtle shadow-lg shadow-black/[0.06] md:block"
          style={{ maxWidth: 820, aspectRatio: "860 / 540" }}
        >
          <WorkflowAnimation />
        </motion.div>

        {/* Mobile — static workflow illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto overflow-hidden rounded-2xl border border-border-subtle bg-[#F5F3F0] p-6 shadow-lg shadow-black/[0.06] md:hidden"
        >
          <div className="flex flex-col gap-3">
            {[
              { icon: "⚡", label: "Webhook", sub: "HTTP Trigger" },
              { icon: "⚙", label: "Filter", sub: "Conditions" },
              { icon: "✦", label: "OpenAI", sub: "GPT-4o" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="ml-5 -mt-3 mb-1 flex flex-col items-center">
                    <div className="h-3 w-px bg-accent/30" />
                    <svg className="h-2 w-2 text-accent/50" viewBox="0 0 8 8"><path d="M4 0L8 4H0z" fill="currentColor" transform="rotate(180 4 4)" /></svg>
                  </div>
                )}
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3 shadow-sm">
                  <span className="text-base opacity-50">{node.icon}</span>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-[0.2em] text-text-primary uppercase">{node.label}</div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-wide text-text-muted">{node.sub}</div>
                  </div>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                </div>
              </div>
            ))}
            <div className="ml-5 flex gap-4 pl-3">
              <div className="flex flex-col items-center">
                <div className="h-3 w-px bg-accent/30" />
                <svg className="h-2 w-2 text-accent/50" viewBox="0 0 8 8"><path d="M4 0L8 4H0z" fill="currentColor" transform="rotate(180 4 4)" /></svg>
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                {["✉ Email", "♪ TikTok", "▶ YouTube", "▦ Sheets", "◈ Slack"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-black/[0.06] bg-white px-3 py-1.5 font-[family-name:var(--font-mono)] text-[9px] font-bold tracking-[0.15em] text-text-muted uppercase shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description + pills — below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10 flex flex-col items-center gap-6 text-center"
        >
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary lg:text-[17px]">
            We design and deploy autonomous workflows that connect your
            tools, process your data, and act on your behalf — around the
            clock. From intelligent document routing to multi-step AI
            pipelines, we build the systems that let your team focus on what
            matters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Workflow Automation",
              "Autonomous AI Agents",
              "Multi-tool Integration",
              "24/7 Autonomous Ops",
            ].map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-text-secondary shadow-sm"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {b}
              </div>
            ))}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
            >
              Automate Your Workflow
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
