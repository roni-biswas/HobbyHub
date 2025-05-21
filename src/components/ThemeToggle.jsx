import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const getInitialTheme = () => {
    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    // Otherwise, use OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Set DaisyUI theme
    document.documentElement.setAttribute("data-theme", theme);

    // Also set Tailwind's dark mode class
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate mx-4">
      {/* this hidden checkbox controls the state */}
      <input
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        type="checkbox"
        className="theme-controller"
      />

      {/* sun icon */}
      <span className="swap-off btn btn-sm  p-2 text-white py-3">🌞 Light</span>

      {/* moon icon */}
      <span className="swap-on btn btn-sm p-2 text-white">🌙 Dark</span>
    </label>
  );
};

export default ThemeToggle;
