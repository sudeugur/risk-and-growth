"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, SignInButton } from "@clerk/nextjs";
import styles from "./HeroSection.module.css";

export default function HeroSection({ walletAddress, onConnectWallet }) {
  const { t } = useLanguage();
  const [modalType, setModalType] = useState(null); // 'system' or 'portfolio'
  const { isSignedIn } = useAuth();

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div className={styles.buttons} style={{ marginBottom: 0 }}>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className={styles.primaryBtn}>
                  {t("hero.exploreDashboard")}
                  <span className={styles.btnArrow}>→</span>
                </button>
              </SignInButton>
            ) : (
              <button onClick={onConnectWallet} className={styles.primaryBtn} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={styles.walletDot} style={{ background: walletAddress ? '#34d399' : '#818cf8', boxShadow: walletAddress ? '0 0 10px rgba(52,211,153,0.5)' : undefined, width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block' }}></span>
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : t("nav.connectWallet")}
              </button>
            )}

            {isSignedIn ? (
              <button onClick={() => setModalType('portfolio')} className={styles.secondaryBtn}>
                {t("hero.integrationGuide")}
              </button>
            ) : (
              <button onClick={() => setModalType('system')} className={styles.secondaryBtn}>
                {t("hero.viewRiskFramework")}
              </button>
            )}
          </div>
          
          {isSignedIn && (
            <a href="#risk-overview" className={styles.secondaryBtn} style={{ padding: '0.8rem 2.5rem', background: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.4)', color: '#00d4ff', marginTop: '0.5rem' }}>
              {t("hero.livePanel")}
            </a>
          )}
        </div>
        <div className={styles.trustBar}>
          <span className={styles.trustItem}>{t("hero.encryption")}</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>{t("hero.realTimeData")}</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>{t("hero.auditedProtocols")}</span>
        </div>
      </div>

      {modalType && (
        <div className={styles.modalOverlay} onClick={() => setModalType(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setModalType(null)}>×</button>
            
            <h2 className={styles.modalTitle}>
              {modalType === 'system' ? t("modal.title") : t("modal.portfolioTitle")}
            </h2>
            <p className={styles.modalText}>
              {modalType === 'system' ? t("modal.p1") : t("modal.portfolioDesc1")}
            </p>
            <p className={styles.modalText} dangerouslySetInnerHTML={{ __html: modalType === 'system' ? t("modal.p2") : t("modal.portfolioDesc2") }}></p>
            
            <button className={styles.modalActionBtn} onClick={() => setModalType(null)}>
              {t("modal.understand")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
