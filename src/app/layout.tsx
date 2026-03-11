import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://overseek.net"),
  title: {
    default: "Overseek — Engineering That Delivers",
    template: "%s | Overseek",
  },
  description:
    "Senior engineers building production-grade infrastructure, AI platforms, and custom software — from architecture to deployment. DevOps, Cloud, AI & Full-Stack.",
  keywords: [
    "software engineering",
    "DevOps",
    "cloud infrastructure",
    "AI development",
    "RAG pipeline",
    "AWS consulting",
    "custom software development",
    "Next.js development",
    "full-stack engineering",
    "IT consulting",
    "Docker",
    "CI/CD",
    "machine learning",
    "enterprise software",
    "Overseek",
  ],
  authors: [{ name: "Overseek", url: "https://overseek.net" }],
  creator: "Overseek",
  publisher: "Overseek",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://overseek.net",
    siteName: "Overseek",
    title: "Overseek — Engineering That Delivers",
    description:
      "Senior engineers building production-grade infrastructure, AI platforms, and custom software — from architecture to deployment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overseek — Engineering That Delivers",
    description:
      "Senior engineers building production-grade infrastructure, AI platforms, and custom software.",
    creator: "@overseek",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://overseek.net",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://overseek.net/#organization",
      name: "Overseek",
      url: "https://overseek.net",
      logo: {
        "@type": "ImageObject",
        url: "https://overseek.net/overseek-logo.svg",
      },
      description:
        "Senior engineers building production-grade infrastructure, AI platforms, and custom software — from architecture to deployment.",
      foundingDate: "2018",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@overseek.net",
        contactType: "customer service",
      },
      knowsAbout: [
        "Cloud Infrastructure",
        "DevOps",
        "AI Development",
        "RAG Pipelines",
        "Custom Software Development",
        "AWS",
        "Docker",
        "Next.js",
        "React",
        "Node.js",
        "Machine Learning",
        "CI/CD",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://overseek.net/#website",
      url: "https://overseek.net",
      name: "Overseek",
      publisher: { "@id": "https://overseek.net/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://overseek.net/#webpage",
      url: "https://overseek.net",
      name: "Overseek — Engineering That Delivers",
      isPartOf: { "@id": "https://overseek.net/#website" },
      about: { "@id": "https://overseek.net/#organization" },
      description:
        "Senior engineers building production-grade infrastructure, AI platforms, and custom software — from architecture to deployment.",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://overseek.net/#service",
      name: "Overseek Engineering Services",
      provider: { "@id": "https://overseek.net/#organization" },
      serviceType: [
        "Cloud Infrastructure & DevOps",
        "AI & Machine Learning Solutions",
        "Custom Software Development",
      ],
      areaServed: "Worldwide",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${satoshi.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-sans)] antialiased`}
      >
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
