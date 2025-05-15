import { RLForm } from "@/components/RLForm";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";

import sharedStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Rate limiting example",
  description: "An example of Arcjet's rate limiting for Next.js.",
};

export default async function IndexPage() {
  const session = await auth();

  return (
    <section className={sharedStyles.Content}>
      <div className={sharedStyles.Section}>
        <h1 className={styles.title}>Arcjet rate limiting example</h1>
        <p className={styles.description}>
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className={styles.link}
          >
            Arcjet&apos;s rate limiting
          </Link>
          .
        </p>
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>Try it</h2>
        <RLForm />

        {session?.user ? (
          <>
            <p className={styles.authSuccess}>
              You are authenticated as {session.user?.email}
              <span className={styles.secondaryText}>
                {" "}
                – the limit is set to 5 requests every 60 seconds.
              </span>
            </p>
          </>
        ) : (
          <>
            <p className={styles.authFailure}>
              You are not authenticated
              <span className={styles.secondaryText}>
                {" "}
                – the limit is set to 2 requests every 60 seconds.
              </span>
            </p>
          </>
        )}

        <p className={styles.explanation}>
          Rate limits can be{" "}
          <Link
            href="https://docs.arcjet.com/reference/nextjs#ad-hoc-rules"
            className={styles.link}
          >
            dynamically adjusted
          </Link>{" "}
          e.g. to set a limit based on the authenticated user.
        </p>

        {session?.user ? <SignOut /> : <SignIn />}
      </div>

      <Divider />

      <div className={sharedStyles.Section}>
        <h2 className={styles.sectionHeading}>See the code</h2>
        <p className={styles.secondaryText}>
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/rate-limiting/test/route.ts"
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

      <WhatNext />
    </section>
  );
}
