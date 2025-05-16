import pageStyles from "@/components/elements/PageShared.module.scss";
import styles from "./page.module.css";

export default function WelcomePage() {
  return (
    <section className={pageStyles.Content}>
      <div className={pageStyles.Section}>
        <h1 className={styles.pageHeading}>Thanks!</h1>
        <p className={styles.pageDescription}>
          If this were a real form you would be signed up.
        </p>
      </div>
    </section>
  );
}
