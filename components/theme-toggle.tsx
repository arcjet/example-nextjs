"use client";

import ThemeSystem from "@/components/icons/ThemeSystem";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      type="button"
      className="button-secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        padding: "0.5rem",
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemeSystem classes={["icon"]} />
      <span style={{ position: "absolute", left: "-9999px" }}>
        Toggle theme
      </span>
    </button>
  );
}
