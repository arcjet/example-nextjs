import { buttonVariants } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { memo } from "react";

import scssStyles from "./WhatNext.module.scss";
import cssStyles from "./WhatNext.module.css";

export const variants = cva([scssStyles.Comp, cssStyles.gridLayout], {
  variants: {
    variant: {
      live: scssStyles.Live,
      deployed: scssStyles.Deployed,
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
        <h2 className={cssStyles.heading}>What next?</h2>
        <div className={cssStyles.contentContainer}>
          {deployed ? (
            <>
              <div className={cssStyles.linkContainer}>
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
                  className={cssStyles.textLink}
                >
                  Arcjet docs
                </Link>
              </div>
              <div className={cssStyles.textContainer}>
                <span className={cssStyles.infoText}>Get in touch</span>

                <Link
                  href="https://arcjet.com/discord"
                  target="_blank"
                  rel="noreferrer"
                  className={cssStyles.textLink}
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
              <div className={cssStyles.wrapContainer}>
                <span className={cssStyles.infoText}>Want to know more?</span>

                <span className={cssStyles.inlineBlock}>
                  <Link
                    href="https://docs.arcjet.com"
                    target="_blank"
                    className={cssStyles.textLink}
                  >
                    Arcjet docs
                  </Link>
                  <span className={cssStyles.divider}>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                  </span>
                  <Link
                    href="https://arcjet.com/discord"
                    target="_blank"
                    rel="noreferrer"
                    className={cssStyles.textLink}
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
