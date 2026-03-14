import { riskCategories } from "@/data/mockData";
import styles from "./RiskCategories.module.css";

export default function RiskCategories() {
  return (
    <section className={styles.section} id="categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Risk Assessment Framework</h2>
          <p className={styles.subtitle}>
            Our comprehensive risk model evaluates protocols across four critical dimensions
          </p>
        </div>

        <div className={styles.grid}>
          {riskCategories.map((cat, i) => (
            <div
              key={cat.id}
              className={styles.card}
              style={{
                animationDelay: `${i * 0.15}s`,
                "--accent": cat.color,
              }}
            >
              <div className={styles.cardIcon} style={{ background: `${cat.color}15` }}>
                <span>{cat.icon}</span>
              </div>
              <h3 className={styles.cardTitle} style={{ color: cat.color }}>
                {cat.title}
              </h3>
              <p className={styles.cardDesc}>{cat.description}</p>
              <ul className={styles.factors}>
                {cat.factors.map((f, j) => (
                  <li key={j} className={styles.factor}>
                    <span className={styles.factorDot} style={{ background: cat.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
