import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";

export default function IndexPage() {
  const siteKey = process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null;

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <div className="flex max-w-[980px] flex-col items-start gap-6">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Arcjet Next.js example app
          </h1>
          <p className="max-w-[700px] text-lg">
            <Link
              href="https://arcjet.com"
              target="_blank"
              className="font-bold decoration-1 underline-offset-2 hover:underline"
            >
              Arcjet
            </Link>{" "}
            helps developers protect their apps in just a few lines of code. Bot
            detection. Rate limiting. Email validation. Attack protection. Data
            redaction. A developer-first approach to security.
          </p>
          <p className="max-w-[700px] text-secondary-foreground">
            This is an example Next.js application using Arcjet. The code is{" "}
            <Link
              href="https://github.com/arcjet/example-nextjs"
              target="_blank"
              rel="noreferrer"
              className="font-bold decoration-1 underline-offset-2 hover:underline"
            >
              on GitHub
            </Link>
            .
          </p>
        </div>

        <div className="flex max-w-[980px] flex-col items-start gap-6 pt-8">
          <h2 className="text-xl font-bold">Examples</h2>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className={buttonVariants({ variant: "default" })}
            >
              Signup form protection
            </Link>
            <Link
              href="/bots"
              className={buttonVariants({ variant: "default" })}
            >
              Bot protection
            </Link>
            <Link
              href="/rate-limiting"
              className={buttonVariants({ variant: "default" })}
            >
              Rate limiting
            </Link>
            <Link
              href="/attack"
              className={buttonVariants({ variant: "default" })}
            >
              Attack protection
            </Link>
            <Link
              href="/sensitive-info"
              className={buttonVariants({ variant: "default" })}
            >
              Sensitive info
            </Link>
          </div>
        </div>
      </div>

      {!siteKey && (
        <>
          <Divider />

          <div className={styles.Section}>
            <h2 className="text-xl font-bold">Deploy it now</h2>
            <div className="flex gap-4">
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

      <Divider />

      <WhatNext deployed={siteKey != null} />
    </section>
  );
}
