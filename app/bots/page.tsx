import VisitDashboard from "@/components/compositions/VisitDashboard";
import { WhatNext } from "@/components/compositions/WhatNext";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bot protection example",
  description: "An example of Arcjet's bot protection for Next.js.",
};

export default async function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;
  const headersList = await headers();
  const hostname = headersList.get("host") || "example.arcjet.com"; // Default to hosted example if undefined
  const protocol = hostname?.match(/^(localhost|127.0.0.1):\d+$/)
    ? "http"
    : "https";

  return (
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">Arcjet bot protection example</h1>
        <p className="typography-primary">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="link"
          >
            Arcjet&apos;s bot protection
          </Link>{" "}
          configured to block automated clients.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>
        <p className="typography-secondary">
          Make a request using <code>curl</code>, which is considered an
          automated client:
        </p>
        <pre className="codeblock">
          curl -v {protocol}://{hostname}/bots/test
        </pre>
        <p className="typography-secondary">
          Your IP will be blocked for 60 seconds.
        </p>
        <p className="typography-secondary">
          Bot protection can also be installed in middleware to protect your
          entire site.
        </p>

        {siteKey && <VisitDashboard />}
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography-secondary">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/bots/test/route.ts"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            API route
          </Link>{" "}
          imports a{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/lib/arcjet.ts"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            centralized Arcjet client
          </Link>{" "}
          which sets base rules.
        </p>
      </div>

      <hr className="divider" />

      <WhatNext deployed={siteKey != null} />
    </main>
  );
}
