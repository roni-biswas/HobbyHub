import { useEffect, useState } from "react";

const ThemeToggle = () => {
  /* ── 1. figure out the very first theme ───────────────── */
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  /* ── 2. whenever theme changes, update <html> + storage ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // DaisyUI
    document.documentElement.classList.toggle("dark", theme === "dark"); // Tailwind
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  /* ── 3. UI (DaisyUI “swap” button) ─────────────────────── */
  return (
    <label className="swap swap-rotate mx-4 cursor-pointer">
      {/* The checkbox controls swap-on / swap-off */}
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        className="hidden"
      />

      {/* 🌞 shows while NOT checked */}
      <span className="swap-off btn btn-sm bg-primary text-black border-0">
        🌞 Light
      </span>

      {/* 🌙 shows while checked */}
      <span className="swap-on btn btn-sm bg-black text-white border-0">
        🌙 Dark
      </span>
    </label>
  );
};

export default ThemeToggle;
