"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { formatTVL, calculateRisk, generateSubRisks } from "@/utils/riskProxy";
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
        style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1s ease-in-out' }}
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
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTopProtocols() {
      try {
        const res = await fetch("https://api.llama.fi/protocols");
        const data = await res.json();
        
        // Take top 6 for the Risk Cards
        const sorted = data.sort((a,b) => b.tvl - a.tvl).slice(0, 6);
        
        const mapped = sorted.map(p => {
          const riskDetails = calculateRisk(p.tvl, p.category);
          const subRisks = generateSubRisks(riskDetails.score, p.tvl);
          
          return {
            id: p.slug,
            name: p.name,
            symbol: p.symbol,
            chain: p.chain || "Multi",
            category: p.category,
            tvl: formatTVL(p.tvl),
            logoUrl: p.logo,
            riskScore: riskDetails.score,
            riskLevel: riskDetails.level,
            ...subRisks
          };
        });
        
        setProtocols(mapped);
      } catch (error) {
        console.error("DeFiLlama fetch error for RiskCards:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopProtocols();
  }, []);

  return (
    <section className={styles.section} id="analytics">
      <div className={styles.container}>
        <h2 
          className={styles.title} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', userSelect: 'none' }}
          onClick={() => setModalOpen(true)}
        >
          {t("riskCards.title")}
          <span style={{ fontSize: '1.2rem', color: '#00d4ff', opacity: 0.8, fontWeight: 'normal' }}>ⓘ</span>
        </h2>
        <p className={styles.subtitle} style={{ textAlign: 'center' }}>{t("riskCards.subtitle")} (Powered by DeFiLlama)</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#8f9ba8" }}>
            <div className={styles.spinner}></div>
            <p style={{ marginTop: "1rem" }}>Loading Live Data from DeFiLlama...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {protocols.map((p, i) => {
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
                      <span className={styles.cardLogo}>
                        <img src={p.logoUrl} alt={p.name} width={32} height={32} style={{borderRadius: '50%'}} />
                      </span>
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
                      {t(`risk.${p.riskLevel}`) || p.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'fadeIn 0.3s ease-out' }} onClick={() => setModalOpen(false)}>
          <div style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '20px', padding: '3rem 2rem', maxWidth: '500px', position: 'relative', textAlign: 'center', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)', animation: 'slideUp 0.4s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#9ca3af', fontSize: '2rem', cursor: 'pointer' }} onClick={() => setModalOpen(false)}>×</button>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 auto 1.5rem', color: '#fff', background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '80%' }}>
              {t("infoModal.riskTitle")}
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {t("infoModal.riskDesc")}
            </p>
            <button style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #7b2ff7, #00d4ff)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => setModalOpen(false)}>
              {t("modal.understand")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
