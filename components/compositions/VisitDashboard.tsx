import LogoMarkSpark from "@/components/brand/LogoMarkSpark";
import useSiteKey from "@/components/effects/useSiteKey";
import IconArrowExternal from "@/components/icons/ArrowExternal";
import Link from "next/link";
import * as React from "react";
import { memo } from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const VisitDashboard = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    const { siteKey } = useSiteKey();

    return (
      <div className={`section ${className || ""}`} ref={ref} {...props}>
        <p className="typography-primary">
          The requests will show in the Arcjet&apos;s dashboard once issued.
        </p>
        <Link
          href={`https://app.arcjet.com/sites/${siteKey}`}
          target="arcjet-app"
          className="link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <LogoMarkSpark className="icon" />
          <span>Visit your site dashboard</span>
          <IconArrowExternal classes={["icon"]} />
        </Link>
      </div>
    );
  },
);
VisitDashboard.displayName = "VisitDashboard";

export default memo(VisitDashboard);
