import VisitDashboard from "@/components/compositions/VisitDashboard";
import { WhatNext } from "@/components/compositions/WhatNext";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Attack protection example",
  description:
    "An example of Arcjet's attack protection for Next.js. Protect Next.js against SQL injection, cross-site scripting, and other attacks.",
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
        <h1 className="heading-primary">Arcjet attack protection example</h1>
        <p className="typography-primary">
          This page is protected by{" "}
          <Link href="https://docs.arcjet.com/shield/concepts" className="link">
            Arcjet Shield
          </Link>
          .
        </p>
        <p className="typography-secondary">
          Once a certain suspicion threshold is reached, subsequent requests
          from that client are blocked for a period of time. Shield detects{" "}
          <Link
            href={
              "https://docs.arcjet.com/shield/concepts#which-attacks-will-arcjet-shield-block"
            }
            className="link"
          >
            suspicious behavior
          </Link>
          , such as SQL injection and cross-site scripting attacks.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>
        <p className="typography-secondary">
          Simulate an attack using <code>curl</code>:
        </p>
        <pre className="codeblock">
          curl -v -H &quot;x-arcjet-suspicious: true&quot; {protocol}://
          {hostname}/attack/test
        </pre>
        <p className="typography-secondary">
          After the 5th request, your IP will be blocked for 15 minutes.
          Suspicious requests must meet a threshold before they are blocked to
          avoid false positives.
        </p>
        <p className="typography-secondary">
          Shield can also be installed in middleware to protect your entire
          site.
        </p>

        {siteKey && <VisitDashboard />}
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography-secondary">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/attack/test/route.ts"
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
