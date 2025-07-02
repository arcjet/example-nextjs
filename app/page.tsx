import { WhatNext } from "@/components/compositions/WhatNext";
import Link from "next/link";

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <main className="page">
      <div className="section">
        <h1 className="heading-primary">Arcjet Next.js example app</h1>
        <p className="typography-primary">
          <Link href="https://arcjet.com" target="_blank" className="link">
            Arcjet
          </Link>{" "}
          helps developers protect their apps in just a few lines of code. Bot
          detection. Rate limiting. Email validation. Attack protection. Data
          redaction. A developer-first approach to security.
        </p>
        <p className="typography-secondary">
          This is an example Next.js application using Arcjet. The code is{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            on GitHub
          </Link>
          .
        </p>
      </div>

      <div className="section">
        <h2 className="heading-secondary">Examples</h2>
        <div className="list-actions">
          <Link href="/signup" className="button-primary">
            Signup form protection
          </Link>
          <Link href="/bots" className="button-primary">
            Bot protection
          </Link>
          <Link href="/rate-limiting" className="button-primary">
            Rate limiting
          </Link>
          <Link href="/attack" className="button-primary">
            Attack protection
          </Link>
          <Link href="/sensitive-info" className="button-primary">
            Sensitive info
          </Link>
        </div>
      </div>

      {!siteKey && (
        <>
          <hr className="divider" />

          <div className="section">
            <h2 className="heading-secondary">Deploy it now</h2>
            <div className="list-actions">
              <a
                href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farcjet%2Fexample-nextjs&project-name=arcjet-example&repository-name=arcjet-example&developer-id=oac_1GEcKBuKBilVnjToj1QUwdb8&demo-title=Arcjet%20Example%20&demo-description=Example%20rate%20limiting%2C%20bot%20protection%2C%20email%20verification%20%26%20form%20protection.&demo-url=https%3A%2F%2Fgithub.com%2Farcjet%2Fexample-nextjs&demo-image=https%3A%2F%2Fapp.arcjet.com%2Fimg%2Fexample-apps%2Fvercel%2Fdemo-image.jpg&integration-ids=oac_1GEcKBuKBilVnjToj1QUwdb8&external-id=arcjet-js-example"
                title="Deploy with Vercel"
                target="_blank"
              >
                <img src="https://vercel.com/button" alt="Deploy with Vercel" />
              </a>
              <a
                href="https://app.netlify.com/start/deploy?repository=https://github.com/arcjet/example-nextjs"
                title="Deploy to Netlify"
                target="_blank"
              >
                <img
                  src="https://www.netlify.com/img/deploy/button.svg"
                  alt="Deploy to Netlify"
                />
              </a>
            </div>
          </div>
        </>
      )}

      <hr className="divider" />

      <WhatNext deployed={siteKey !== null} />
    </main>
  );
}
