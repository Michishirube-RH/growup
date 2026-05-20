"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "grow-up-hub:theme";

function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const next = readTheme();
      applyTheme(next);
      setTheme(next);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Ganti mode terang gelap"
        className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-teal-50 hover:text-[#1D9E75] dark:text-teal-300 dark:hover:bg-[#101A2C]"
      >
        <span className="text-lg leading-none">{theme === "dark" ? "LT" : "DK"}</span>
        {theme === "dark" ? "Terang" : "Gelap"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-bold text-[#1D9E75] transition hover:bg-teal-50 dark:border-teal-400/30 dark:bg-[#101A2C] dark:text-teal-300 dark:hover:bg-[#162238]"
    >
      {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}
