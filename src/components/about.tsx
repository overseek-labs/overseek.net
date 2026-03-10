"use client";

import { motion } from "framer-motion";
import { ImageFrame } from "@/components/image-frame";

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            <ImageFrame
              src="/images/team.jpg"
              alt="Team"
              label="Team image"
              aspect="aspect-[5/4]"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-8 -right-4 grid grid-cols-2 gap-3 lg:-right-8"
            >
              {[
                { val: "8+", label: "Years" },
                { val: "50+", label: "Projects" },
                { val: "99.9%", label: "Uptime" },
                { val: "24/7", label: "Support" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border-subtle bg-surface px-5 py-4 text-center shadow-lg shadow-black/[0.04]"
                >
                  <div className="font-[family-name:var(--font-mono)] text-xl font-medium text-text-primary">
                    {s.val}
                  </div>
                  <div className="mt-0.5 text-[10px] tracking-wider text-text-muted uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-accent uppercase">
              Who We Are
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-text-primary sm:text-5xl">
              Not an agency.
              <br />
              <span className="text-gradient-accent">An engineering team.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary">
              We&apos;re a tight-knit group of senior engineers who&apos;ve
              spent years building infrastructure that scales, AI systems that
              actually work, and software that businesses depend on daily.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {[
                {
                  n: "01",
                  title: "Senior engineers only",
                  desc: "No juniors learning on your dime. Every team member has 5+ years of battle-tested production experience.",
                },
                {
                  n: "02",
                  title: "Ownership, not outsourcing",
                  desc: "We own outcomes — from architecture decisions through to production monitoring.",
                },
                {
                  n: "03",
                  title: "Built to last",
                  desc: "We write code that the next engineer will thank us for. Clean, documented, long-term.",
                },
              ].map((p) => (
                <div key={p.n} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 font-[family-name:var(--font-mono)] text-sm font-medium text-accent">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-text-primary">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
