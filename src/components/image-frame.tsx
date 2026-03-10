"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageFrameProps {
  src?: string;
  alt: string;
  aspect?: string;
  label?: string;
  rounded?: string;
  padding?: string;
  className?: string;
}

function Placeholder({ label, aspect, rounded }: { label: string; aspect: string; rounded: string }) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden ${rounded} flex items-center justify-center`}>
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-surface shadow-sm">
          <svg
            className="h-5 w-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
        <p className="text-[11px] text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export function ImageFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  label,
  rounded = "rounded-2xl",
  padding = "p-3",
  className = "",
}: ImageFrameProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  const isSvg = src?.endsWith(".svg");

  return (
    <div
      className={`img-placeholder ${rounded} ${padding} shadow-lg shadow-black/[0.04] ${className}`}
    >
      {showImage ? (
        isSvg ? (
          <div className={`relative ${aspect} w-full overflow-hidden ${rounded} flex items-center justify-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[60%] max-w-[70%] object-contain"
              onError={() => setFailed(true)}
            />
          </div>
        ) : (
          <div className={`relative ${aspect} w-full overflow-hidden ${rounded}`}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setFailed(true)}
            />
          </div>
        )
      ) : (
        <Placeholder label={label || alt} aspect={aspect} rounded={rounded} />
      )}
    </div>
  );
}
