import { SupportForm } from "@/components/SuppportForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import sharedStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sensitive info detection example",
  description:
    "An example of Arcjet's sensitive info detection for Next.js. Detect credit card numbers and other PII with Next.js.",
};

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <section className={sharedStyles.Content}>
      <div className={sharedStyles.Section}>
        <h1 className={styles.title}>
          Arcjet sensitive info detection example
        </h1>
        <p className={styles.description}>
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/sensitive-info/concepts"
            className={styles.link}
          >
            Arcjet&apos;s sensitive info detection
          </Link>{" "}
          feature which is configured to detect credit card numbers. It can be
          configured to detect other types of sensitive information and custom
          patterns.
        </p>
        <p className={styles.subdescription}>
          The request is analyzed entirely on your server so no sensitive
          information is sent to Arcjet.
        </p>
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>Try it</h2>

        <div className={styles.formContainer}>
          <SupportForm />
        </div>

        {siteKey && <VisitDashboard />}
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>See the code</h2>
        <p className={styles.secondaryText}>
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/sensitive-info/test/route.ts"
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
