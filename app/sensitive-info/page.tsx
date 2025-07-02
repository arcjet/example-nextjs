import { SupportForm } from "@/components/SuppportForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import { WhatNext } from "@/components/compositions/WhatNext";
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
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">
          Arcjet sensitive info detection example
        </h1>
        <p className="typography-primary">
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/sensitive-info/concepts"
            className="link"
          >
            Arcjet&apos;s sensitive info detection
          </Link>{" "}
          feature which is configured to detect credit card numbers. It can be
          configured to detect other types of sensitive information and custom
          patterns.
        </p>
        <p className="typography-secondary">
          The request is analyzed entirely on your server so no sensitive
          information is sent to Arcjet.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>

        <SupportForm />

        {siteKey && <VisitDashboard />}
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography-secondary">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/sensitive-info/test/route.ts"
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
