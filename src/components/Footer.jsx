import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>📊</span>
              <span className={styles.logoText}>
                Risk<span className={styles.logoAccent}>&Growth</span>
              </span>
            </div>
            <p className={styles.brandDesc}>
              Institutional-grade DeFi risk analytics platform. Monitor, evaluate, and grow your
              digital assets with real-time risk intelligence.
            </p>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Platform</h4>
            <a href="#dashboard" className={styles.footerLink}>Dashboard</a>
            <a href="#protocols" className={styles.footerLink}>Protocols</a>
            <a href="#analytics" className={styles.footerLink}>Analytics</a>
            <a href="#categories" className={styles.footerLink}>Risk Framework</a>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Resources</h4>
            <a href="#" className={styles.footerLink}>Documentation</a>
            <a href="#" className={styles.footerLink}>API</a>
            <a href="#" className={styles.footerLink}>Blog</a>
            <a href="#" className={styles.footerLink}>Status</a>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Community</h4>
            <a href="#" className={styles.footerLink}>Twitter</a>
            <a href="#" className={styles.footerLink}>Discord</a>
            <a href="#" className={styles.footerLink}>Telegram</a>
            <a href="#" className={styles.footerLink}>GitHub</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2026 Risk&Growth. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy</a>
            <a href="#" className={styles.bottomLink}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
