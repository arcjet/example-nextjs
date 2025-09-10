// @ts-check
import path from "node:path";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // In our arcjet/examples monorepo Next.js warns about the root
  // `package-lock.json`. Here we tell Next.js to ignore it and instead use
  // the adjacent `package-lock.json` file for tracing instead.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output#caveats
  outputFileTracingRoot: path.join(import.meta.dirname, "."),
};

export default nextConfig;
