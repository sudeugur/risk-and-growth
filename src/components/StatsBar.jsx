"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./StatsBar.module.css";

import { formatTVL } from "@/utils/riskProxy";

const INITIAL_STATS = [
  { labelKey: "stats.tvl", value: "$0", icon: "🔒", key: "tvl" },
  { labelKey: "stats.protocolsMonitored", value: "0", icon: "📡", key: "monitored" },
  { labelKey: "stats.riskAlerts", value: "0", icon: "⚠️", key: "alerts" },
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
  const [activeUsers, setActiveUsers] = useState("128K");
  const [dynamicStats, setDynamicStats] = useState({
    tvl: "Yükleniyor...",
    monitored: "0",
    alerts: "0"
  });

  useEffect(() => {
    // Toplam protokol verilerini çek
    fetch("https://api.llama.fi/protocols")
      .then(res => res.json())
      .then(data => {
        let totalTVL = 0;
        let riskAlerts = 0;
        
        data.forEach(p => {
          totalTVL += (p.tvl || 0);
          // Gerçekçi Risk Uyarısı: Hacmi 10 Milyon $'dan büyük ve son gün %5'ten fazla düşüş yaşayanlar
          if (p.tvl > 1e7 && p.change_1d < -5) {
            riskAlerts++;
          }
        });
        
        setDynamicStats({
          tvl: formatTVL(totalTVL),
          monitored: data.length.toLocaleString(),
          alerts: riskAlerts.toString()
        });
      })
      .catch(err => {
        console.error("DeFiLlama fetch error for StatsBar:", err);
        setDynamicStats({ tvl: "$0", monitored: "0", alerts: "0" });
      });

    // Aktif kullanıcıları çek (Clerk API)
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.total_count) {
          setActiveUsers(data.total_count.toString());
        }
      })
      .catch(err => console.error("Could not fetch user stats:", err));
  }, []);

  const statsData = [
    { labelKey: "stats.tvl", value: dynamicStats.tvl, icon: "🔒" },
    { labelKey: "stats.protocolsMonitored", value: dynamicStats.monitored, icon: "📡" },
    { labelKey: "stats.riskAlerts", value: dynamicStats.alerts, icon: "⚠️" },
    { labelKey: "stats.activeUsers", value: activeUsers, icon: "👥" }
  ];

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
