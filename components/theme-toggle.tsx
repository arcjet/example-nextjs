"use client";

import ThemeSystem from "@/components/icons/ThemeSystem";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="defaultIcon"
      flavour="iconOnly"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <ThemeSystem classes={["size-4"]} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
