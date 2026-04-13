"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>
                Risk<span className={styles.logoAccent}>&Growth</span>
              </span>
            </div>
            <p className={styles.brandDesc}>{t("footer.brandDesc")}</p>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>{t("footer.resources")}</h4>
            <a href="https://riskgrowth.my.canva.site" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{t("footer.documentation")}</a>
            <a href="#" className={styles.footerLink}>API</a>
            <a href="https://riskgrowth.my.canva.site" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{t("footer.blog")}</a>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>{t("footer.community")}</h4>
            <a href="https://github.com/sudeugur/risk-and-growth" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>{t("footer.copyright")}</span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>{t("footer.privacy")}</a>
            <a href="#" className={styles.bottomLink}>{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
