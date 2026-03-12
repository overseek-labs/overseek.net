"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 16;
    const baseDotR = 0.95;
    const sweepBand = 0.14;
    const cycleDuration = 6000;
    const pauseDuration = 3000;
    const totalCycle = cycleDuration + pauseDuration;

    let dots: { x: number; y: number; norm: number }[] = [];

    const getAccentColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--accent").trim() || "#6B4226";
    };

    const hexToRgb = (hex: string) => {
      hex = hex.replace("#", "");
      if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
      const n = parseInt(hex, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      dots = [];

      const cos45 = Math.SQRT1_2;
      const sin45 = Math.SQRT1_2;
      const maxDiag = w + h;

      const extent = Math.ceil(maxDiag / spacing) + 6;

      for (let r = -extent; r < extent; r++) {
        for (let c = -extent; c < extent; c++) {
          const lx = c * spacing;
          const ly = r * spacing;
          const x = w * 0.5 + lx * cos45 - ly * sin45;
          const y = h * 0.5 + lx * sin45 + ly * cos45;
          if (x >= -spacing && x <= w + spacing && y >= -spacing && y <= h + spacing) {
            const norm = (x + y) / maxDiag;
            dots.push({ x, y, norm });
          }
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const draw = (time: number) => {
      if (!visibleRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const phase = time % totalCycle;
      const sweeping = phase < cycleDuration;
      let sweepCenter = -1;

      if (sweeping) {
        const t = phase / cycleDuration;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        sweepCenter = -0.15 + eased * 1.3;
      }

      const accent = hexToRgb(getAccentColor());

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        ctx.fillStyle = "rgba(0,0,0,0.13)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, baseDotR, 0, Math.PI * 2);
        ctx.fill();

        if (sweeping) {
          const dist = Math.abs(d.norm - sweepCenter);
          if (dist < sweepBand) {
            const intensity = 1 - dist / sweepBand;
            const eased = intensity * intensity;
            const alpha = eased * 0.7;
            const r = baseDotR + eased * 1.2;
            ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startLoop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    startLoop();

    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
