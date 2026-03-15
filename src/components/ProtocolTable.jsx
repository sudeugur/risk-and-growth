"use client";
import { useLanguage } from "@/context/LanguageContext";
import { protocols } from "@/data/mockData";
import styles from "./ProtocolTable.module.css";

function RiskBadge({ level, score, t }) {
  const labelKey = `risk.${level}`;
  return (
    <span className={`${styles.badge} ${styles[level]}`}>
      {score}/100 · {t(labelKey)}
    </span>
  );
}

export default function ProtocolTable() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="protocols">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t("protocols.title")}</h2>
            <p className={styles.subtitle}>{t("protocols.subtitle")}</p>
          </div>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>{t("protocols.all")}</button>
            <button className={styles.filterBtn}>{t("protocols.lending")}</button>
            <button className={styles.filterBtn}>{t("protocols.dex")}</button>
            <button className={styles.filterBtn}>{t("protocols.yield")}</button>
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
              {protocols.map((p, i) => (
                <tr key={p.id} className={styles.row} style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className={styles.rank}>{i + 1}</td>
                  <td>
                    <div className={styles.protocol}>
                      <span className={styles.protocolLogo}>{p.logo}</span>
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
                      {p.change24h >= 0 ? "+" : ""}{p.change24h}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
