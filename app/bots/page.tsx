import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import sharedStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";

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
    <section className={sharedStyles.Content}>
      <div className={sharedStyles.Section}>
        <h1 className={styles.title}>Arcjet bot protection example</h1>
        <p className={styles.description}>
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className={styles.link}
          >
            Arcjet&apos;s bot protection
          </Link>{" "}
          configured to block automated clients.
        </p>
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>Try it</h2>
        <p className={styles.secondaryText}>
          Make a request using <code>curl</code>, which is considered an
          automated client:
        </p>
        <pre className={styles.codeExample}>
          curl -v {protocol}://{hostname}/bots/test
        </pre>
        <p className={styles.secondaryText}>
          Your IP will be blocked for 60 seconds.
        </p>
        <p className={styles.explanation}>
          Bot protection can also be installed in middleware to protect your
          entire site.
        </p>

        {siteKey && <VisitDashboard />}
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>See the code</h2>
        <p className={styles.secondaryText}>
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/bots/test/route.ts"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            API route
          </Link>{" "}
          imports a{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/lib/arcjet.ts"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
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
