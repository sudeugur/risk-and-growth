"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, UserButton, useClerk } from "@clerk/nextjs";
import styles from "./Navbar.module.css";

export default function Navbar({ walletAddress, onConnectWallet, onGoHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, toggleLocale, t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const pathname = usePathname();

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
          <a
            href={
              pathname === "/" 
                ? (walletAddress ? "#" : "#dashboard") 
                : (isSignedIn ? "/" : "/#dashboard")
            }
            className={styles.link}
            onClick={(e) => {
              if (pathname === "/" && walletAddress && onGoHome) {
                e.preventDefault();
                onGoHome();
              }
            }}
          >
            {walletAddress ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                {t("nav.dashboard")}
              </span>
            ) : (
              t("nav.dashboard")
            )}
          </a>
          {!isSignedIn && <a href="#membership" className={styles.link}>{t("nav.membership")}</a>}
          {!isSignedIn && (
            <>
              <a href="#analytics" className={styles.link}>{t("nav.analytics")}</a>
              <a href="#categories" className={styles.link}>{t("nav.riskCategories")}</a>
            </>
          )}

          <div className={styles.mobileActions}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', width: '100%' }}>
                <button 
                  className={styles.walletBtn} 
                  style={walletAddress ? { cursor: 'default', width: '100%', justifyContent: 'center' } : { width: '100%', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={(e) => {
                    if (!walletAddress) {
                      e.preventDefault();
                      setMenuOpen(false);
                      onConnectWallet();
                    }
                  }}
                >
                  <span className={styles.walletDot} style={{ background: walletAddress ? '#34d399' : '#8f9ba8', boxShadow: walletAddress ? '0 0 10px rgba(52,211,153,0.5)' : undefined }}></span>
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : t("nav.connectWallet")}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <UserButton afterSignOutUrl="/" />
                  <button 
                    onClick={() => signOut()}
                    style={{ background: 'transparent', border: 'none', color: '#ff6b35', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    Sign Out →
                  </button>
                </div>
              </div>
            )}
          </div>
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
                style={walletAddress ? { cursor: 'default' } : { opacity: 0.6, cursor: 'not-allowed' }}
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
