"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImageFrame } from "@/components/image-frame";
import { DotGrid } from "@/components/dot-grid";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!isVisibleRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <DotGrid />
        <div className="absolute -right-60 top-0 h-[700px] w-[700px] rounded-full bg-accent/[0.04] blur-[180px]" />
        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:pt-0 lg:pb-0">
        <div className="max-w-xl">
          <motion.div {...fade(0.1)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-widest text-text-muted uppercase shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Engineering · AI · Infrastructure
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="mt-8 text-[2.75rem] font-black leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            We engineer the systems behind
            <span className="text-gradient-accent"> ambitious products.</span>
          </motion.h1>

          <motion.p
            {...fade(0.35)}
            className="mt-6 max-w-md text-base leading-relaxed text-text-secondary lg:text-[17px]"
          >
            Senior engineers delivering production-grade infrastructure, AI
            platforms, and custom software — from architecture to deployment.
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-10 flex items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
            >
              Start a Project
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#work"
              className="rounded-full border border-border-medium px-7 py-3.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-text-muted hover:text-text-primary"
            >
              Our Work
            </a>
          </motion.div>

          <motion.div
            {...fade(0.65)}
            className="mt-16 flex items-center gap-10 border-t border-border-subtle pt-8"
          >
            {[
              { val: "15+", label: "Years" },
              { val: "50+", label: "Projects" },
              { val: "99.9%", label: "Uptime" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-mono)] text-2xl font-medium text-text-primary">
                  {s.val}
                </div>
                <div className="mt-0.5 text-xs tracking-wider text-text-muted uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block will-change-transform"
          style={{ transform: `translateY(${offset * 0.06}px)` }}
        >
          <ImageFrame
            src="/images/hero.jpg"
            alt="Hero"
            aspect="aspect-[4/3]"
            rounded="rounded-3xl"
            padding="p-3"
            className="shadow-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 rounded-2xl border border-border-subtle bg-surface p-5 shadow-lg shadow-black/[0.04]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light">
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Enterprise Ready</div>
                <div className="text-[11px] text-text-muted">SOC 2 · GDPR · HIPAA</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
    </section>
  );
}
