import { SupportForm } from "@/components/SuppportForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import useSiteKey from "@/components/effects/useSiteKey";
import Divider from "@/components/elements/Divider";
import Link from "next/link";

import pageStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";

export default function IndexPage() {
  const { siteKey } = useSiteKey();

  return (
    <section className={pageStyles.Content}>
      <div className={pageStyles.Section}>
        <h1 className={styles.pageHeading}>Form submitted</h1>
        <p className={styles.pageDescription}>
          If this were a real form, your message would have been submitted.
        </p>
      </div>

      <Divider />

      <WhatNext deployed={siteKey != null} />
    </section>
  );
}
