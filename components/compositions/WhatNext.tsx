import Link from "next/link";

type Props = {
  deployed?: boolean;
}

export function WhatNext({ deployed }: Props) {
  if (deployed) {
    return (
      <div className="section">
        <h2 className="heading--secondary">What next?</h2>
        <div className="section__actions">
          <Link
            href="https://github.com/arcjet/arcjet-js/tree/main/examples"
            target="_blank"
            className="button button--secondary"
          >
            See all example apps
          </Link>
        </div>
        <p className="section__subtitle">
          Want to know more?{" "}
          <Link
            href="https://docs.arcjet.com"
            target="_blank"
            className="link"
          >
            Arcjet docs
          </Link>
          {" / "}
          <Link
            href="https://arcjet.com/discord"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Join our Discord
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="heading--secondary">What next?</h2>
      <div className="section__actions">
        <Link
          href="https://app.arcjet.com"
          target="_blank"
          className="button button--secondary"
        >
          Sign up for Arcjet
        </Link>
      </div>
      <p className="section__subtitle">
        Want to know more?{" "}
        <Link
          href="https://docs.arcjet.com"
          target="_blank"
          className="link"
        >
          Arcjet docs
        </Link>
        {" / "}
        <Link
          href="https://arcjet.com/discord"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Join our Discord
        </Link>
      </p>
    </div>
  );
}
