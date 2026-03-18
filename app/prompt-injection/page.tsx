import type { Metadata } from "next";
import Link from "next/link";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import { WhatNext } from "@/components/compositions/WhatNext";
import { PromptForm } from "@/components/PromptForm";

export const metadata: Metadata = {
  title: "Prompt injection detection example",
  description: "An example of Arcjet's prompt injection detection for Next.js.",
};

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">
          Arcjet prompt injection detection example
        </h1>
        <p className="typography-primary">
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/ai-protection/prompt-injection"
            className="link"
          >
            Arcjet&apos;s prompt injection detection
          </Link>{" "}
          to analyze user prompts for injection attacks. It can detect attempts
          to manipulate AI systems through jailbreaks, role-play escapes, or
          instruction overrides.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>

        <PromptForm />

        {siteKey && <VisitDashboard />}
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography-secondary">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/prompt-injection/test/route.ts"
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
