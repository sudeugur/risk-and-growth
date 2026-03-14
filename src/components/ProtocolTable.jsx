import { protocols } from "@/data/mockData";
import styles from "./ProtocolTable.module.css";

function RiskBadge({ level, score }) {
  return (
    <span className={`${styles.badge} ${styles[level]}`}>
      {score}/100 · {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

export default function ProtocolTable() {
  return (
    <section className={styles.section} id="protocols">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Protocol Risk Dashboard</h2>
            <p className={styles.subtitle}>Real-time risk assessment of top DeFi protocols</p>
          </div>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
            <button className={styles.filterBtn}>Lending</button>
            <button className={styles.filterBtn}>DEX</button>
            <button className={styles.filterBtn}>Yield</button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Protocol</th>
                <th>Chain</th>
                <th>Category</th>
                <th>TVL</th>
                <th>Risk Score</th>
                <th>24h Change</th>
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
                    <RiskBadge level={p.riskLevel} score={p.riskScore} />
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
