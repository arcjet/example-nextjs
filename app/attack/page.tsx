import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import styles from "@/components/elements/PageShared.module.scss";
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
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet attack protection example
        </h1>
        <p className="max-w-[700px] text-lg">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/shield/concepts"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            Arcjet Shield
          </Link>
          .
        </p>
        <p className="max-w-[700px] text-lg text-secondary-foreground">
          Once a certain suspicion threshold is reached, subsequent requests
          from that client are blocked for a period of time. Shield detects{" "}
          <Link
            href={
              "https://docs.arcjet.com/shield/concepts#which-attacks-will-arcjet-shield-block"
            }
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            suspicious behavior
          </Link>
          , such as SQL injection and cross-site scripting attacks.
        </p>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">Try it</h2>
        <p className="text-secondary-foreground">
          Simulate an attack using <code>curl</code>:
        </p>
        <pre className="p-4">
          curl -v -H &quot;x-arcjet-suspicious: true&quot; {protocol}://
          {hostname}/attack/test
        </pre>
        <p className="max-w-[700px] text-secondary-foreground">
          After the 5th request, your IP will be blocked for 15 minutes.
          Suspicious requests must meet a threshold before they are blocked to
          avoid false positives.
        </p>
        <p className="max-w-[700px] text-secondary-foreground">
          Shield can also be installed in middleware to protect your entire
          site.
        </p>

        {siteKey && <VisitDashboard />}
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">See the code</h2>
        <p className="text-secondary-foreground">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/attack/test/route.ts"
            target="_blank"
            rel="noreferrer"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            API route
          </Link>{" "}
          imports a{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/lib/arcjet.ts"
            target="_blank"
            rel="noreferrer"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            centralized Arcjet client
          </Link>{" "}
          which sets base rules.
        </p>
      </div>

      <Divider />

      <WhatNext deployed={siteKey != null} />
    </section>
  );
}
