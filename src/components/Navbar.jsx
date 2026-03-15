"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoText}>
            Risk<span className={styles.logoAccent}>&Growth</span>
          </span>
        </a>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <a href="#dashboard" className={styles.link}>{t("nav.dashboard")}</a>
          <a href="#protocols" className={styles.link}>{t("nav.protocols")}</a>
          <a href="#analytics" className={styles.link}>{t("nav.analytics")}</a>
          <a href="#categories" className={styles.link}>{t("nav.riskCategories")}</a>
        </div>

        <div className={styles.rightGroup}>
          <button
            className={styles.langToggle}
            onClick={toggleLocale}
            aria-label="Toggle language"
          >
            <span className={locale === "tr" ? styles.langActive : ""}>TR</span>
            <span className={styles.langDivider}>|</span>
            <span className={locale === "en" ? styles.langActive : ""}>EN</span>
          </button>

          <button className={styles.walletBtn}>
            <span className={styles.walletDot}></span>
            {t("nav.connectWallet")}
          </button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
