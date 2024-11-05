import { RLForm } from "@/components/RLForm";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import WhatNext from "@/components/compositions/WhatNext";
import Divider from "@/components/elements/Divider";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";

export const metadata: Metadata = {
  title: "Rate limiting example",
  description: "An example of Arcjet's rate limiting for Next.js.",
};

export default async function IndexPage() {
  const session = await auth();

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet rate limiting example
        </h1>
        <p className="max-w-[700px] text-lg">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            Arcjet&apos;s rate limiting
          </Link>
          .
        </p>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">Try it</h2>
        <RLForm />

        {session?.user ? (
          <>
            <p className="text-green-500">
              You are authenticated as {session.user?.email}
              <span className="text-secondary-foreground">
                {" "}
                – the limit is set to 5 requests every 60 seconds.
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-red-400">
              You are not authenticated
              <span className="text-secondary-foreground">
                {" "}
                – the limit is set to 2 requests every 60 seconds.
              </span>
            </p>
          </>
        )}

        <p className="max-w-[700px] text-secondary-foreground">
          Rate limits can be{" "}
          <Link
            href="https://docs.arcjet.com/reference/nextjs#ad-hoc-rules"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            dynamically adjusted
          </Link>{" "}
          e.g. to set a limit based on the authenticated user.
        </p>

        {session?.user ? <SignOut /> : <SignIn />}
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">See the code</h2>
        <p className="text-secondary-foreground">
          The{" "}
          <Link
            href="https://github.com/arcjet/example-nextjs/blob/main/app/rate-limiting/test/route.ts"
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

      <WhatNext />
    </section>
  );
}
