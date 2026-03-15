"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./StatsBar.module.css";

const statsData = [
  { labelKey: "stats.tvl", value: "$49.9B", icon: "🔒" },
  { labelKey: "stats.protocolsMonitored", value: "2,847", icon: "📡" },
  { labelKey: "stats.riskAlerts", value: "34", icon: "⚠️" },
  { labelKey: "stats.activeUsers", value: "128K", icon: "👥" },
];

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "");
          const target = parseFloat(numericStr);
          const prefix = value.match(/^[^0-9]*/)?.[0] || "";
          const suffix = value.match(/[^0-9.]*$/)?.[0] || "";
          const hasDecimal = numericStr.includes(".");
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          let step = 0;

          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            const formatted = hasDecimal ? current.toFixed(1) : Math.round(current).toLocaleString();
            setDisplay(`${prefix}${formatted}${suffix}`);

            if (step >= steps) {
              setDisplay(value);
              clearInterval(interval);
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {statsData.map((stat, i) => (
          <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <span className={styles.statValue}>
              <AnimatedNumber value={stat.value} />
            </span>
            <span className={styles.statLabel}>{t(stat.labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
