import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="dashboard">
      <div className={styles.bgGrid}></div>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>
      <div className={styles.glowOrb3}></div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Real-Time Risk Monitoring
        </div>
        <h1 className={styles.title}>
          Navigate DeFi with
          <br />
          <span className={styles.gradient}>Confidence</span>
        </h1>
        <p className={styles.subtitle}>
          Advanced blockchain risk analytics platform that monitors, evaluates, and scores DeFi
          protocols in real-time. Protect your assets with institutional-grade risk intelligence.
        </p>
        <div className={styles.buttons}>
          <a href="#protocols" className={styles.primaryBtn}>
            Explore Dashboard
            <span className={styles.btnArrow}>→</span>
          </a>
          <a href="#categories" className={styles.secondaryBtn}>
            View Risk Framework
          </a>
        </div>
        <div className={styles.trustBar}>
          <span className={styles.trustItem}>🔒 256-bit Encryption</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>📊 Real-time Data</span>
          <span className={styles.trustDivider}>|</span>
          <span className={styles.trustItem}>🛡️ Audited Protocols</span>
        </div>
      </div>
    </section>
  );
}
