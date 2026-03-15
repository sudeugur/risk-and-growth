"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero} id="dashboard">
      <div className={styles.bgGrid}></div>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>
      <div className={styles.glowOrb3}></div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          {t("hero.badge")}
        </div>
        <h1 className={styles.title}>
          {t("hero.titleLine1")}
          <br />
          <span className={styles.gradient}>{t("hero.titleHighlight")}</span>
        </h1>
        <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        <div className={styles.buttons}>
          <a href="#protocols" className={styles.primaryBtn}>
            {t("hero.exploreDashboard")}
            <span className={styles.btnArrow}>→</span>
          </a>
          <a href="#categories" className={styles.secondaryBtn}>
            {t("hero.viewRiskFramework")}
          </a>
        </div>
        <div className={styles.trustBar}>
          <span className={styles.trustItem}>{t("hero.encryption")}</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>{t("hero.realTimeData")}</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>{t("hero.auditedProtocols")}</span>
        </div>
      </div>
    </section>
  );
}
