import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchRiskReport } from "@/data/api";
import styles from "./WalletDashboard.module.css";

export default function WalletDashboard({ walletAddress }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchRiskReport(walletAddress);
        if (isMounted) setData(result.reports[0]);
      } catch (error) {
        console.error("Failed to load risk report:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [walletAddress]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>{t("dashboard.analyzing")}</p>
      </div>
    );
  }

  if (!data) return null;

  const hfValue = data.current_risk.health_factor.value;
  const isHealthy = hfValue >= 1.0;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("dashboard.title")}</h1>
        <p className={styles.subtitle}>
          {t("dashboard.wallet")}: <span className={styles.address}>{walletAddress}</span>
        </p>
      </header>

      <div className={styles.grid}>
        {/* Core Risk Metrics */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("dashboard.healthFactor")}</h2>
          <div className={`${styles.hfDisplay} ${isHealthy ? styles.safe : styles.danger}`}>
            {hfValue.toFixed(2)}
          </div>
          <p className={styles.cardDesc}>{data.current_risk.health_factor.description}</p>
          <div className={styles.statusBox}>
            <span className={styles.statusLabel}>{t("dashboard.status")}:</span>
            <span className={`${styles.statusValue} ${isHealthy ? styles.safeText : styles.dangerText}`}>
              {isHealthy ? t("risk.safe") : t("risk.liquidatable")}
            </span>
          </div>
        </div>

        {/* Machine Learning Predictions */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("dashboard.aiPrediction")}</h2>
          
          <div className={styles.barGroup}>
            <div className={styles.barLabelGroup}>
              <span>{t("dashboard.prob24h")}</span>
              <span>{data.ml_prediction.probability_24h}%</span>
            </div>
            <div className={styles.progressBg}>
              <div 
                className={`${styles.fill} ${styles.fillWarning}`} 
                style={{ width: `${data.ml_prediction.probability_24h}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.barGroup}>
            <div className={styles.barLabelGroup}>
              <span>{t("dashboard.prob7d")}</span>
              <span>{data.ml_prediction.probability_7d}%</span>
            </div>
            <div className={styles.progressBg}>
              <div 
                className={`${styles.fill} ${styles.fillDanger}`} 
                style={{ width: `${data.ml_prediction.probability_7d}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.driversBox}>
            <p className={styles.driversTitle}>{t("dashboard.riskDrivers")}</p>
            <ul className={styles.driversList}>
              {Object.entries(data.ml_prediction.risk_drivers).map(([driver, impact]) => (
                <li key={driver} className={styles.driverItem}>
                  <span>{driver.replace("_", " ")}</span>
                  <span>{impact}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stress Tests */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h2 className={styles.cardTitle}>{t("dashboard.stressTests")}</h2>
          <p className={styles.cardDesc}>{t("dashboard.stressDesc")}</p>
          <div className={styles.stressGrid}>
            {data.stress_tests.map((test, idx) => {
              const testIsHealthy = !test.is_liquidatable;
              return (
                <div key={idx} className={styles.stressBox}>
                  <h3 className={styles.stressScenario}>{test.scenario_name}</h3>
                  <div className={styles.stressValGroup}>
                    <span className={styles.stressLabel}>HF:</span>
                    <span className={`${styles.stressVal} ${testIsHealthy ? styles.safeText : styles.dangerText}`}>
                      {test.simulated_health_factor.value.toFixed(2)}
                    </span>
                  </div>
                  <span className={`${styles.badge} ${testIsHealthy ? styles.badgeSafe : styles.badgeDanger}`}>
                    {testIsHealthy ? t("risk.survives") : t("risk.liquidated")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
