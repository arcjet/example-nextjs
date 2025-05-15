import { EmailForm } from "@/components/EmailForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import type { Metadata } from "next";
import Link from "next/link";

import sharedStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Signup form protection example",
  description:
    "An example of Arcjet's signup form protection for Next.js which includes email verification, rate limiting, and bot protection.",
};

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <section className={sharedStyles.Content}>
      <div className={sharedStyles.Section}>
        <h1 className={styles.title}>Arcjet signup form protection</h1>
        <p className={styles.description}>
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/signup-protection/concepts"
            className={styles.link}
          >
            Arcjet&apos;s signup form protection
          </Link>{" "}
          which includes:
        </p>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            Arcjet server-side email verification configured to block disposable
            providers and ensure that the domain has a valid MX record.
          </li>
          <li className={styles.featureItemWithSpace}>
            Rate limiting set to 5 requests over a 2 minute sliding window - a
            reasonable limit for a signup form, but easily configurable.
          </li>
          <li className={styles.featureItemWithSpace}>
            Bot protection to stop automated clients from submitting the form.
          </li>
        </ul>
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>Try it</h2>

        <div className={styles.formContainer}>
          <EmailForm />
        </div>

        {siteKey && <VisitDashboard />}

        <h2 className={styles.sectionHeading}>Test emails</h2>
        <p className={styles.secondaryText}>
          Try these emails to see how it works:
        </p>
        <ul className={styles.testList}>
          <li className={styles.testItem}>
            <code className={styles.testCode}>invalid.@arcjet</code> – is an
            invalid email address.
          </li>
          <li className={styles.testItemWithSpace}>
            <code className={styles.testCode}>test@0zc7eznv3rsiswlohu.tk</code>{" "}
            – is from a disposable email provider.
          </li>
          <li className={styles.testItemWithSpace}>
            <code className={styles.testCode}>nonexistent@arcjet.ai</code> – is
            a valid email address & domain, but has no MX records.
          </li>
        </ul>
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>See the code</h2>
        <p className={styles.secondaryText}>
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/signup/test/route.ts"
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
