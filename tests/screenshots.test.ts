import { expect, test } from "@playwright/test";

// @ts-ignore build manifest may or may not exist
import appPathManifest from "../.next/app-path-routes-manifest.json";

const manifest = appPathManifest as Record<string, string>;

for (const [file, pathname] of Object.entries(manifest)) {
  // Skip over dynamic and api routes
  if (file.endsWith("/route") || file === "/_not-found/page") {
    continue;
  }

  test(`"${pathname}" screenshot matches`, async ({ page }) => {
    const response = await page.goto(pathname);
    await expect(response?.status()).toEqual(200);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.03,
      threshold: 0.2,
    });
  });
}
