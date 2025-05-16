import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  {
    ignores: ["dist/*", ".cache", "public", "node_modules", "*.esm.js"],
  },
]);
