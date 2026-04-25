"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProtocolTable.module.css";

function RiskBadge({ level, score, t }) {
  const labelKey = `risk.${level}`;
  return (
    <span className={`${styles.badge} ${styles[level]}`}>
      {score}/100 · {t(labelKey) || level.toUpperCase()}
    </span>
  );
}

import { formatTVL, calculateRisk } from "@/utils/riskProxy";

export default function ProtocolTable() {
  const { t } = useLanguage();
  const [allProtocols, setAllProtocols] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.llama.fi/protocols");
        const data = await res.json();
        
        // Hacmi en yüksek ilk 200 protokolü çekelim ki filtrelediğimizde elimizde yeterli data kalsın
        const sorted = data.sort((a,b) => b.tvl - a.tvl).slice(0, 200);
        
        const mapped = sorted.map(p => {
          const riskDetails = calculateRisk(p.tvl, p.category);
          return {
            id: p.slug,
            name: p.name,
            symbol: p.symbol,
            chain: p.chain || "Multi",
            category: p.category,
            tvl: formatTVL(p.tvl),
            change24h: p.change_1d ? p.change_1d.toFixed(1) : 0,
            logoUrl: p.logo,
            riskScore: riskDetails.score,
            riskLevel: riskDetails.level
          };
        });
        
        setAllProtocols(mapped);
      } catch (error) {
        console.error("DeFiLlama fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const visibleProtocols = allProtocols.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Lending") return p.category === "Lending" || p.category === "CDP";
    if (activeFilter === "DEX") return p.category === "Dexes" || p.category === "Derivatives";
    if (activeFilter === "Yield") return p.category === "Yield" || p.category === "Yield Aggregator" || p.category === "Liquid Staking";
    return true;
  }).slice(0, 20);

  return (
    <section className={styles.section} id="protocols">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 
              className={styles.title} 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', userSelect: 'none' }}
              onClick={() => setModalOpen(true)}
            >
              {t("protocols.title")} (Live)
              <span style={{ fontSize: '1.2rem', color: '#00d4ff', opacity: 0.8, fontWeight: 'normal' }}>ⓘ</span>
            </h2>
            <p className={styles.subtitle}>{t("protocols.subtitle")} (Powered by DeFiLlama)</p>
          </div>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${activeFilter === "All" ? styles.active : ""}`}
              onClick={() => setActiveFilter("All")}
            >{t("protocols.all")}</button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === "Lending" ? styles.active : ""}`}
              onClick={() => setActiveFilter("Lending")}
            >{t("protocols.lending")}</button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === "DEX" ? styles.active : ""}`}
              onClick={() => setActiveFilter("DEX")}
            >{t("protocols.dex")}</button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === "Yield" ? styles.active : ""}`}
              onClick={() => setActiveFilter("Yield")}
            >{t("protocols.yield")}</button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>{t("protocols.thProtocol")}</th>
                <th>{t("protocols.thChain")}</th>
                <th>{t("protocols.thCategory")}</th>
                <th>{t("protocols.thTVL")}</th>
                <th>{t("protocols.thRiskScore")}</th>
                <th>{t("protocols.th24hChange")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{textAlign: "center", padding: "3rem", color: "#8f9ba8"}}>
                    <div className={styles.spinner}></div>
                    Loading Real-time DeFi Data...
                  </td>
                </tr>
              ) : visibleProtocols.map((p, i) => (
                <tr key={p.id} className={styles.row} style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className={styles.rank}>{i + 1}</td>
                  <td>
                    <div className={styles.protocol}>
                      <img src={p.logoUrl} alt={p.name} width={24} height={24} style={{borderRadius: '50%'}} />
                      <div>
                        <span className={styles.protocolName}>{p.name}</span>
                        <span className={styles.protocolSymbol}>{p.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.chain}>{p.chain}</span>
                  </td>
                  <td>
                    <span className={styles.category}>{p.category}</span>
                  </td>
                  <td className={styles.tvl}>{p.tvl}</td>
                  <td>
                    <RiskBadge level={p.riskLevel} score={p.riskScore} t={t} />
                  </td>
                  <td>
                    <span className={p.change24h >= 0 ? styles.positive : styles.negative}>
                      {p.change24h > 0 ? "+" : ""}{p.change24h}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'fadeIn 0.3s ease-out' }} onClick={() => setModalOpen(false)}>
          <div style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '20px', padding: '3rem 2rem', maxWidth: '500px', position: 'relative', textAlign: 'center', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)', animation: 'slideUp 0.4s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#9ca3af', fontSize: '2rem', cursor: 'pointer' }} onClick={() => setModalOpen(false)}>×</button>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff', background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t("infoModal.protocolTitle")}
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {t("infoModal.protocolDesc")}
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
