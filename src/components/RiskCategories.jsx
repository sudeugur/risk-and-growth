"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./RiskCategories.module.css";

const categoriesData = [
  {
    id: "smart-contract",
    titleKey: "riskCat.smartContractTitle",
    icon: "📜",
    color: "#00d4ff",
    descKey: "riskCat.smartContractDesc",
    factorKeys: [
      "riskCat.smartContractF1",
      "riskCat.smartContractF2",
      "riskCat.smartContractF3",
      "riskCat.smartContractF4",
    ],
  },
  {
    id: "liquidity",
    titleKey: "riskCat.liquidityTitle",
    icon: "💧",
    color: "#7b2ff7",
    descKey: "riskCat.liquidityDesc",
    factorKeys: [
      "riskCat.liquidityF1",
      "riskCat.liquidityF2",
      "riskCat.liquidityF3",
      "riskCat.liquidityF4",
    ],
  },
  {
    id: "oracle",
    titleKey: "riskCat.oracleTitle",
    icon: "🔮",
    color: "#ff6b35",
    descKey: "riskCat.oracleDesc",
    factorKeys: [
      "riskCat.oracleF1",
      "riskCat.oracleF2",
      "riskCat.oracleF3",
      "riskCat.oracleF4",
    ],
  },
  {
    id: "governance",
    titleKey: "riskCat.governanceTitle",
    icon: "⚖️",
    color: "#00ff88",
    descKey: "riskCat.governanceDesc",
    factorKeys: [
      "riskCat.governanceF1",
      "riskCat.governanceF2",
      "riskCat.governanceF3",
      "riskCat.governanceF4",
    ],
  },
];

export default function RiskCategories() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("riskCat.title")}</h2>
          <p className={styles.subtitle}>{t("riskCat.subtitle")}</p>
        </div>

        <div className={styles.grid}>
          {categoriesData.map((cat, i) => (
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
                {t(cat.titleKey)}
              </h3>
              <p className={styles.cardDesc}>{t(cat.descKey)}</p>
              <ul className={styles.factors}>
                {cat.factorKeys.map((fk, j) => (
                  <li key={j} className={styles.factor}>
                    <span className={styles.factorDot} style={{ background: cat.color }} />
                    {t(fk)}
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
