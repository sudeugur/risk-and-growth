"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, UserButton } from "@clerk/nextjs";
import styles from "./Navbar.module.css";

export default function Navbar({ walletAddress, onConnectWallet }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, toggleLocale, t } = useLanguage();
  const { isSignedIn } = useAuth();

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

        <div 
          className={`${styles.links} ${menuOpen ? styles.open : ""}`}
          style={isSignedIn ? { position: 'absolute', left: '50%', transform: 'translateX(-50%)' } : {}}
        >
          <a href="#dashboard" className={styles.link}>{t("nav.dashboard")}</a>
          {!isSignedIn && <a href="#membership" className={styles.link}>{t("nav.membership")}</a>}
          {!isSignedIn && (
            <>
              <a href="#analytics" className={styles.link}>{t("nav.analytics")}</a>
              <a href="#categories" className={styles.link}>{t("nav.riskCategories")}</a>
            </>
          )}
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

          {isSignedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                className={styles.walletBtn} 
                onClick={walletAddress ? onConnectWallet : undefined}
                style={!walletAddress ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
              >
                <span className={styles.walletDot} style={{ background: walletAddress ? '#34d399' : '#8f9ba8', boxShadow: walletAddress ? '0 0 10px rgba(52,211,153,0.5)' : undefined }}></span>
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : t("nav.connectWallet")}
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
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
