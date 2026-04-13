"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, SignInButton } from "@clerk/nextjs";
import styles from "./HeroSection.module.css";

export default function HeroSection({ walletAddress, onConnectWallet }) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <div className={styles.buttons}>
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
            <button onClick={() => setIsModalOpen(true)} className={styles.secondaryBtn}>
              {t("hero.integrationGuide")}
            </button>
          ) : (
            <a href="#categories" className={styles.secondaryBtn}>
              {t("hero.viewRiskFramework")}
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

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            <h2 className={styles.modalTitle}>{t("modal.portfolioTitle")}</h2>
            <p className={styles.modalText}>{t("modal.portfolioDesc1")}</p>
            <p className={styles.modalText} dangerouslySetInnerHTML={{ __html: t("modal.portfolioDesc2") }}></p>
            <button className={styles.modalActionBtn} onClick={() => setIsModalOpen(false)}>
              {t("modal.understand")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
