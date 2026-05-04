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
        if (isMounted) setData({ ...result.reports[0], growth_data: result.growth_data });
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
  
  // Enforce mathematical logic: 7-day probability must be >= 24-hour probability
  const rawProb24h = data.ml_prediction.probability_24h;
  const rawProb7d = data.ml_prediction.probability_7d;
  const displayProb24h = Math.min(rawProb24h, rawProb7d);
  const displayProb7d = Math.max(rawProb24h, rawProb7d);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("dashboard.title")}</h1>
        <p className={styles.subtitle}>
          {t("dashboard.wallet")}: <span className={styles.address}>{walletAddress}</span>
        </p>
      </header>

      <div className={styles.grid}>
        {/* Risk Section Header */}
        <h2 className={styles.sectionHeader}>
          {t("dashboard.riskSection")}
        </h2>
        
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
              <span>{displayProb24h}%</span>
            </div>
            <div className={styles.progressBg}>
              <div 
                className={`${styles.fill} ${styles.fillDanger}`} 
                style={{ width: `${displayProb24h}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.barGroup}>
            <div className={styles.barLabelGroup}>
              <span>{t("dashboard.prob7d")}</span>
              <span>{displayProb7d}%</span>
            </div>
            <div className={styles.progressBg}>
              <div 
                className={`${styles.fill} ${styles.fillWarning}`} 
                style={{ width: `${displayProb7d}%` }}
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
        
        {/* Growth Data Section */}
        {data.growth_data && data.growth_data.total_markets_analyzed > 0 && (
          <>
            <h2 className={styles.sectionHeader}>
              {t("dashboard.growthSection")}
            </h2>
            <div className={`${styles.card} ${styles.fullWidth}`}>
              <h2 className={styles.cardTitle}>{t("dashboard.vcMomentum")}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div className={styles.momentumScoreRing}>
                  {data.growth_data.vc_momentum_score}
                </div>
                <p className={styles.cardDesc} style={{ textAlign: 'left', margin: 0, fontSize: '0.95rem' }}>
                  {t("dashboard.vcDesc")}
                </p>
              </div>
              
              <div className={styles.driversBox}>
                <p className={styles.driversTitle}>{t("dashboard.analyzedMarkets")}: {data.growth_data.total_markets_analyzed}</p>
                <ul className={styles.driversList} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                  {data.growth_data.clusters.slice(0, 8).map((c, idx) => {
                    let badgeClass = "";
                    if (c.cluster_label.includes("Blue-chip")) badgeClass = styles.bluechip;
                    else if (c.cluster_label.includes("High-Growth")) badgeClass = styles.highgrowth;
                    
                    return (
                      <li key={idx} className={styles.driverItem} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontWeight: '600' }}>{c.market_symbol}</span>
                        <span className={`${styles.clusterBadge} ${badgeClass}`}>
                          {c.cluster_label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
