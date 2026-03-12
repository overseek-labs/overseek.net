"use client";

import { motion } from "framer-motion";

const logos: { name: string; src: string | null }[] = [
  { name: "mojar.ai", src: "/images/logos/mojar.svg" },
  { name: "Positive Action", src: "/images/logos/positive-action.svg" },
  { name: "ZOR.com", src: null },
  { name: "NeodenUSA", src: null },
  { name: "wavedistro", src: null },
];

function LogoItem({ name, src }: { name: string; src: string | null }) {
  return (
    <div className="flex h-10 w-32 shrink-0 items-center justify-center opacity-30 grayscale transition-all duration-500 hover:opacity-60 hover:grayscale-0">
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name}
          className="max-h-8 max-w-full object-contain"
        />
      ) : (
        <span className="font-[family-name:var(--font-mono)] text-sm font-medium tracking-wide text-text-primary">
          {name}
        </span>
      )}
    </div>
  );
}

function LogoTrack() {
  return (
    <div className="flex shrink-0 items-center gap-16">
      {logos.map((logo) => (
        <LogoItem key={logo.name} name={logo.name} src={logo.src} />
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative border-t border-border-subtle bg-surface-raised py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 lg:px-12"
      >
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-text-muted uppercase">
          Trusted by teams building what&apos;s next
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-raised to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-raised to-transparent" />

        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-16">
          <LogoTrack />
          <LogoTrack />
          <LogoTrack />
        </div>
      </div>
    </section>
  );
}
