import { buttonVariants } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { memo } from "react";

import styles from "./WhatNext.module.scss";

export const variants = cva([styles.Comp, " grid items-center gap-6"], {
  variants: {
    variant: {
      live: styles.Live,
      deployed: styles.Deployed,
    },
  },
  defaultVariants: {
    variant: "live",
  },
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {
  deployed?: boolean;
}

const WhatNext = React.forwardRef<HTMLDivElement, Props>(
  ({ className, deployed, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={variants({ variant, className })} {...props}>
        <h2 className="text-xl font-bold">What next?</h2>
        <div className="flex flex-col gap-8">
          {deployed ? (
            <>
              <div className="flex items-center gap-6">
                <Link
                  href="https://github.com/arcjet/arcjet-js/tree/main/examples"
                  target="_blank"
                  className={buttonVariants({ variant: "outline" })}
                >
                  See all example apps
                </Link>
                <Link
                  href="https://docs.arcjet.com"
                  target="_blank"
                  className="font-bold decoration-1 underline-offset-2 hover:underline"
                >
                  Arcjet docs
                </Link>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary-foreground">Get in touch</span>

                <Link
                  href="https://arcjet.com/discord"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold decoration-1 underline-offset-2 hover:underline"
                >
                  Join our Discord
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link
                  href="https://app.arcjet.com"
                  target="_blank"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign up for Arcjet
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="text-secondary-foreground">
                  Want to know more?
                </span>

                <span className="inline-block">
                  <Link
                    href="https://docs.arcjet.com"
                    target="_blank"
                    className="font-bold decoration-1 underline-offset-2 hover:underline"
                  >
                    Arcjet docs
                  </Link>
                  <span className="text-muted-foreground">
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                  </span>
                  <Link
                    href="https://arcjet.com/discord"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold decoration-1 underline-offset-2 hover:underline"
                  >
                    Join our Discord
                  </Link>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);
WhatNext.displayName = "WhatNext";

export default memo(WhatNext);
