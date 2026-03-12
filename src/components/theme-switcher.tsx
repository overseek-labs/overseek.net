"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  // Greens
  { name: "Forest Green", accent: "#2C5545", hover: "#1F3D32", light: "#EDF5F1", gradientFrom: "#2C5545", gradientTo: "#5BA88A", darkLabel: "#5BA88A", swatch: "#2C5545" },
  { name: "Emerald", accent: "#2D6A4F", hover: "#1F4F3A", light: "#ECF5F0", gradientFrom: "#2D6A4F", gradientTo: "#5CB88A", darkLabel: "#5CB88A", swatch: "#2D6A4F" },
  { name: "Pine", accent: "#264E3B", hover: "#1A3829", light: "#EBF2EE", gradientFrom: "#264E3B", gradientTo: "#5E9E7E", darkLabel: "#5E9E7E", swatch: "#264E3B" },
  { name: "Sage", accent: "#5F7A6A", hover: "#4A6254", light: "#EFF3F0", gradientFrom: "#5F7A6A", gradientTo: "#8FAF9C", darkLabel: "#8FAF9C", swatch: "#5F7A6A" },
  { name: "Hunter", accent: "#355E3B", hover: "#264529", light: "#ECF2ED", gradientFrom: "#355E3B", gradientTo: "#6B9E73", darkLabel: "#6B9E73", swatch: "#355E3B" },
  { name: "Moss", accent: "#4A5D3C", hover: "#374629", light: "#EEF1EB", gradientFrom: "#4A5D3C", gradientTo: "#7E9968", darkLabel: "#7E9968", swatch: "#4A5D3C" },
  // Navy / Slate
  { name: "Slate Navy", accent: "#2B3A4E", hover: "#1E2A3A", light: "#EDF1F5", gradientFrom: "#2B3A4E", gradientTo: "#6B8DB5", darkLabel: "#6B8DB5", swatch: "#2B3A4E" },
  { name: "Midnight", accent: "#1C2B3A", hover: "#121E28", light: "#EBEEF2", gradientFrom: "#1C2B3A", gradientTo: "#4A7199", darkLabel: "#4A7199", swatch: "#1C2B3A" },
  { name: "Storm", accent: "#3A4A5C", hover: "#2A3644", light: "#EDF0F3", gradientFrom: "#3A4A5C", gradientTo: "#6A8099", darkLabel: "#7E9AB5", swatch: "#3A4A5C" },
  // Browns
  { name: "Espresso", accent: "#3C2415", hover: "#2A180D", light: "#F3EEEA", gradientFrom: "#3C2415", gradientTo: "#8B5E3C", darkLabel: "#9B7560", swatch: "#3C2415" },
  { name: "Tobacco", accent: "#6B4226", hover: "#52311B", light: "#F4EEEA", gradientFrom: "#6B4226", gradientTo: "#A07550", darkLabel: "#BF9470", swatch: "#6B4226" },
  { name: "Muted Copper", accent: "#8B5E3C", hover: "#6E472B", light: "#F5F0EB", gradientFrom: "#8B5E3C", gradientTo: "#B8936E", darkLabel: "#C49A78", swatch: "#8B5E3C" },
  { name: "Terracotta", accent: "#A0522D", hover: "#843F1F", light: "#F7F0EB", gradientFrom: "#A0522D", gradientTo: "#C8845A", darkLabel: "#D4956A", swatch: "#A0522D" },
  { name: "Chestnut", accent: "#714B2F", hover: "#573820", light: "#F4EFEB", gradientFrom: "#714B2F", gradientTo: "#A07A58", darkLabel: "#B8926E", swatch: "#714B2F" },
  // Others
  { name: "Warm Charcoal", accent: "#3D3632", hover: "#2A2421", light: "#F2EFED", gradientFrom: "#3D3632", gradientTo: "#6B5F58", darkLabel: "#8A7E78", swatch: "#3D3632" },
  { name: "Deep Teal", accent: "#1D4E5E", hover: "#143A47", light: "#EBF3F6", gradientFrom: "#1D4E5E", gradientTo: "#4A8FA5", darkLabel: "#4FA8BF", swatch: "#1D4E5E" },
  { name: "Burgundy", accent: "#6B2D3E", hover: "#52202E", light: "#F5EDEF", gradientFrom: "#6B2D3E", gradientTo: "#A05A72", darkLabel: "#B8708A", swatch: "#6B2D3E" },
  { name: "Deep Plum", accent: "#4A2D4F", hover: "#371F3B", light: "#F2EDF3", gradientFrom: "#4A2D4F", gradientTo: "#7E5A85", darkLabel: "#9B71A0", swatch: "#4A2D4F" },
];

function applyTheme(theme: (typeof themes)[0]) {
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-hover", theme.hover);
  root.style.setProperty("--accent-light", theme.light);
  root.style.setProperty("--primary", theme.accent);
  root.style.setProperty("--ring", theme.accent);
  root.style.setProperty("--chart-1", theme.accent);
  root.style.setProperty("--chart-2", theme.hover);
  root.style.setProperty("--sidebar-primary", theme.accent);
  root.style.setProperty("--sidebar-ring", theme.accent);
  root.style.setProperty("--gradient-from", theme.gradientFrom);
  root.style.setProperty("--gradient-to", theme.gradientTo);
  root.style.setProperty("--dark-label", theme.darkLabel);
}

export function ThemeSwitcher() {
  const [active, setActive] = useState(10);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9998]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-48 overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-xl shadow-black/[0.08] max-h-[70vh] overflow-y-auto"
          >
            <div className="px-3 py-2.5 border-b border-border-subtle">
              <p className="text-[10px] font-semibold tracking-widest text-text-muted uppercase">Theme</p>
            </div>
            {themes.map((t, i) => (
              <button
                key={t.name}
                onClick={() => {
                  setActive(i);
                  applyTheme(t);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface-raised ${active === i ? "bg-surface-raised" : ""}`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-border-subtle shadow-sm"
                  style={{ background: t.swatch }}
                />
                <span className={`text-[13px] ${active === i ? "font-semibold text-text-primary" : "text-text-secondary"}`}>
                  {t.name}
                </span>
                {active === i && (
                  <svg className="ml-auto h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-lg shadow-black/[0.08] transition-all duration-200 hover:shadow-xl"
      >
        <svg className="h-4.5 w-4.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      </button>
    </div>
  );
}
