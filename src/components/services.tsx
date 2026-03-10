"use client";

import { motion } from "framer-motion";
import { ImageFrame } from "@/components/image-frame";

const features = [
  {
    label: "Cloud & DevOps",
    title: "Infrastructure that scales with you.",
    description:
      "We design, build, and manage cloud infrastructure on AWS with Docker orchestration, CI/CD pipelines, and monitoring — so your systems run flawlessly while you focus on your product.",
    bullets: ["AWS Architecture", "Docker & Kubernetes", "CI/CD Pipelines", "24/7 Monitoring"],
    imageSide: "right" as const,
    image: "/images/service-cloud.jpg",
  },
  {
    label: "AI & Machine Learning",
    title: "AI that actually understands your business.",
    description:
      "From RAG pipelines to self-hosted LLMs, we build AI systems that read your docs, answer your customers, and integrate with your tools — with 95%+ accuracy and full data privacy.",
    bullets: ["RAG Pipelines", "Self-Hosted LLMs", "Document Processing", "Multi-channel Deploy"],
    imageSide: "left" as const,
    image: "/images/service-ai.jpg",
  },
  {
    label: "Custom Software",
    title: "Built exactly the way you need it.",
    description:
      "Full-stack applications with Next.js, React, and Node.js. Enterprise APIs, admin dashboards, e-commerce platforms, and everything in between — crafted by senior engineers who've seen it all.",
    bullets: ["Next.js & React", "Enterprise APIs", "E-Commerce", "SSO & Security"],
    imageSide: "right" as const,
    image: "/images/service-software.jpg",
  },
];

function FeatureBlock({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const isImageLeft = feature.imageSide === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${isImageLeft ? "" : "lg:[direction:rtl]"}`}
    >
      <div className={isImageLeft ? "" : "lg:[direction:ltr]"}>
        <ImageFrame
          src={feature.image}
          alt={feature.label}
          label={`Image ${index + 1}`}
        />
      </div>

      <div className={`max-w-lg ${isImageLeft ? "" : "lg:[direction:ltr]"}`}>
        <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
          {feature.label}
        </span>
        <h3 className="text-3xl font-black leading-tight tracking-tight text-text-primary lg:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-text-secondary">
          {feature.description}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {feature.bullets.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-text-secondary shadow-sm"
            >
              <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {b}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-surface-raised py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-xl"
        >
          <span className="mb-3 inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-accent uppercase">
            What We Do
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-text-primary sm:text-5xl">
            Three pillars.
            <br />
            <span className="text-gradient-accent">One team.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-28 lg:gap-36">
          {features.map((f, i) => (
            <FeatureBlock key={f.label} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
