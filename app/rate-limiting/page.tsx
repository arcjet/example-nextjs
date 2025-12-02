import type { Metadata } from "next";
import Link from "next/link";
import { WhatNext } from "@/components/compositions/WhatNext";
import { RLForm } from "@/components/RLForm";

export const metadata: Metadata = {
  title: "Rate limiting example",
  description: "An example of Arcjet's rate limiting for Next.js.",
};

export default async function IndexPage() {
  return (
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">Arcjet rate limiting example</h1>
        <p className="typography--description">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="link"
          >
            Arcjet&apos;s rate limiting
          </Link>
          .
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>
        <RLForm />

        <p>The limit is set to 2 requests every 60 seconds.</p>
        <p className="typography--subtitle">
          Rate limits can be{" "}
          <Link
            href="https://docs.arcjet.com/reference/nextjs#ad-hoc-rules"
            className="link"
          >
            dynamically adjusted
          </Link>{" "}
          e.g. to set a limit based on the authenticated user.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography--subtitle">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/rate-limiting/test/route.ts"
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

      <WhatNext />
    </main>
  );
}
