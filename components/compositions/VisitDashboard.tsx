import LogoMarkSpark from "@/components/brand/LogoMarkSpark";
import useSiteKey from "@/components/effects/useSiteKey";
import Block from "@/components/elements/Block";
import IconArrowExternal from "@/components/icons/ArrowExternal";
import { buttonVariants } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { memo } from "react";

import scssStyles from "./VisitDashboard.module.scss";
import styles from "./VisitDashboard.module.css";

export const variants = cva(scssStyles.VisitDashboard, {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const VisitDashboard = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, ...props }, ref) => {
    const { siteKey } = useSiteKey();

    return (
      <Block
        className={variants({ variant, className })}
        ref={ref}
        pad={3}
        {...props}
      >
        <p className={styles.paragraph}>
          The requests will show in the Arcjet&apos;s dashboard once issued.
        </p>
        <Link
          href={`https://app.arcjet.com/sites/${siteKey}`}
          target="arcjet-app"
          className={
            scssStyles.Link +
            " " +
            buttonVariants({
              variant: "link",
              size: "defaultTight",
            })
          }
        >
          <LogoMarkSpark className={styles.iconMargin} />{" "}
          <span className={styles.textMargin}>Visit your site dashboard</span>{" "}
          <IconArrowExternal classes={[styles.arrowIcon]} />
        </Link>
      </Block>
    );
  },
);
VisitDashboard.displayName = "VisitDashboard";

export default memo(VisitDashboard);
