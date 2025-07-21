import type { Metadata } from "next";
import Link from "next/link";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import { WhatNext } from "@/components/compositions/WhatNext";
import { EmailForm } from "@/components/EmailForm";

export const metadata: Metadata = {
  title: "Signup form protection example",
  description:
    "An example of Arcjet's signup form protection for Next.js which includes email verification, rate limiting, and bot protection.",
};

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">Arcjet signup form protection</h1>
        <p className="typography-primary">
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/signup-protection/concepts"
            className="link"
          >
            Arcjet&apos;s signup form protection
          </Link>{" "}
          which includes:
        </p>
        <ul className="list-bullets-primary">
          <li>
            Arcjet server-side email verification configured to block disposable
            providers and ensure that the domain has a valid MX record.
          </li>
          <li>
            Rate limiting set to 5 requests over a 2 minute sliding window - a
            reasonable limit for a signup form, but easily configurable.
          </li>
          <li>
            Bot protection to stop automated clients from submitting the form.
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>

        <EmailForm />

        {siteKey && <VisitDashboard />}

        <h2 className="heading-secondary">Test emails</h2>
        <p className="typography-secondary">
          Try these emails to see how it works:
        </p>
        <ul className="list-bullets-secondary">
          <li>
            <code>invalid.@arcjet</code> – is an invalid email address.
          </li>
          <li>
            <code>test@0zc7eznv3rsiswlohu.tk</code>{" "}
            <span>– is from a disposable email provider.</span>
          </li>
          <li>
            <code>nonexistent@arcjet.ai</code> – is a valid email address &
            domain, but has no MX records.
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">See the code</h2>
        <p className="typography-secondary">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/signup/test/route.ts"
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
