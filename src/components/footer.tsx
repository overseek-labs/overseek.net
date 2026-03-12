"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-12">
        <Image
          src="/overseek-logo.svg"
          alt="Overseek"
          width={100}
          height={22}
          className="h-4 w-auto opacity-30"
        />
        <div className="flex items-center gap-6">
          {["Services", "Work", "About", "Stack", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[11px] text-text-muted transition-colors hover:text-text-secondary"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-text-muted/50">
          &copy; {new Date().getFullYear()} Overseek
        </p>
      </div>
    </footer>
  );
}
