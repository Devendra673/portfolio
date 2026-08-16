"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
