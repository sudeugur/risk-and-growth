"use client";
import { useLanguage } from "@/context/LanguageContext";
import { protocols } from "@/data/mockData";
import styles from "./RiskCard.module.css";

function CircularProgress({ score, size = 80 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "#00ff88";
  if (score > 30) color = "#ffd600";
  if (score > 50) color = "#ff6b35";
  if (score > 75) color = "#ff3232";

  return (
    <svg
      width={size}
      height={size}
      className={styles.circularProgress}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="6"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="1.1rem"
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

function MiniBar({ label, value, color }) {
  return (
    <div className={styles.miniBar}>
      <div className={styles.miniBarHeader}>
        <span className={styles.miniBarLabel}>{label}</span>
        <span className={styles.miniBarValue} style={{ color }}>{value}/100</span>
      </div>
      <div className={styles.miniBarTrack}>
        <div
          className={styles.miniBarFill}
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function RiskCards() {
  const { t } = useLanguage();
  const topProtocols = protocols.slice(0, 6);

  return (
    <section className={styles.section} id="analytics">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("riskCards.title")}</h2>
        <p className={styles.subtitle}>{t("riskCards.subtitle")}</p>

        <div className={styles.grid}>
          {topProtocols.map((p, i) => {
            let scoreColor = "#00ff88";
            if (p.riskScore > 30) scoreColor = "#ffd600";
            if (p.riskScore > 50) scoreColor = "#ff6b35";
            if (p.riskScore > 75) scoreColor = "#ff3232";

            return (
              <div
                key={p.id}
                className={styles.card}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLogo}>{p.logo}</span>
                    <div>
                      <h3 className={styles.cardName}>{p.name}</h3>
                      <span className={styles.cardChain}>{p.chain} · {p.category}</span>
                    </div>
                  </div>
                  <CircularProgress score={p.riskScore} />
                </div>

                <div className={styles.cardBody}>
                  <MiniBar label={t("riskCards.smartContract")} value={p.smartContractRisk} color="#00d4ff" />
                  <MiniBar label={t("riskCards.liquidity")} value={p.liquidityRisk} color="#7b2ff7" />
                  <MiniBar label={t("riskCards.oracle")} value={p.oracleRisk} color="#ff6b35" />
                  <MiniBar label={t("riskCards.governance")} value={p.governanceRisk} color="#00ff88" />
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.tvlLabel}>TVL: <strong>{p.tvl}</strong></span>
                  <span
                    className={`${styles.riskLabel} ${styles[p.riskLevel]}`}
                    style={{ borderColor: scoreColor, color: scoreColor }}
                  >
                    {t(`risk.${p.riskLevel}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
