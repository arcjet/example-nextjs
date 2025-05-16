"use client";

import ThemeSystem from "@/components/icons/ThemeSystem";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="defaultIcon"
      flavour="iconOnly"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <ThemeSystem classes={[styles.themeIcon]} />
      <span className={styles.srOnly}>Toggle theme</span>
    </Button>
  );
}
