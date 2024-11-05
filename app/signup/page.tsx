import { EmailForm } from "@/components/EmailForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import type { Metadata } from "next";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";

export const metadata: Metadata = {
  title: "Signup form protection example",
  description:
    "An example of Arcjet's signup form protection for Next.js which includes email verification, rate limiting, and bot protection.",
};

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet signup form protection
        </h1>
        <p className="max-w-[700px] text-lg">
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/signup-protection/concepts"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            Arcjet&apos;s signup form protection
          </Link>{" "}
          which includes:
        </p>
        <ul className="ms-8 max-w-[700px] list-outside list-disc text-secondary-foreground">
          <li className="text-lg">
            Arcjet server-side email verification configured to block disposable
            providers and ensure that the domain has a valid MX record.
          </li>
          <li className="pt-4 text-lg">
            Rate limiting set to 5 requests over a 2 minute sliding window - a
            reasonable limit for a signup form, but easily configurable.
          </li>
          <li className="pt-4 text-lg">
            Bot protection to stop automated clients from submitting the form.
          </li>
        </ul>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">Try it</h2>

        <div className="flex gap-4">
          <EmailForm />
        </div>

        {siteKey && <VisitDashboard />}

        <h2 className="text-xl font-bold">Test emails</h2>
        <p className="text-secondary-foreground">
          Try these emails to see how it works:
        </p>
        <ul className="ms-8 list-outside list-disc">
          <li className="text-muted-foreground">
            <code className="text-secondary-foreground">invalid.@arcjet</code>{" "}
            – is an invalid email address.
          </li>
          <li className="pt-2 text-muted-foreground">
            <code className="text-secondary-foreground">
              test@0zc7eznv3rsiswlohu.tk
            </code>{" "}
            – is from a disposable email provider.
          </li>
          <li className="pt-2 text-muted-foreground">
            <code className="text-secondary-foreground">
              nonexistent@arcjet.ai
            </code>{" "}
            – is a valid email address & domain, but has no MX records.
          </li>
        </ul>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">See the code</h2>
        <p className="text-secondary-foreground">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/signup/test/route.ts"
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
