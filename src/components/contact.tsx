"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 lg:py-44">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-accent uppercase">
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Have a project <span className="text-gradient-accent">in mind?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-text-secondary">
            Whether you need a full engineering team or expert guidance on a
            specific challenge — we&apos;re ready.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10"
        >
          <a
            href="mailto:info@overseek.net"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/20"
          >
            info@overseek.net
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-text-muted">
            We typically respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
