import { WhatNext } from "@/components/compositions/WhatNext";
import useSiteKey from "@/components/effects/useSiteKey";

export default function IndexPage() {
  const { siteKey } = useSiteKey();

  return (
    <div className="page">
      <section className="section">
        <h1 className="heading-primary">Form submitted</h1>
        <p className="typography-primary">
          If this were a real form, your message would have been submitted.
        </p>
      </section>

      <hr className="divider" />

      <WhatNext deployed={siteKey != null} />
    </div>
  );
}
