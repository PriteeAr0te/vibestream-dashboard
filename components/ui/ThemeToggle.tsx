"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../provider/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-light transition">
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
