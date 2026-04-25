"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./SigningOut.module.css";

export default function SigningOutPage() {
  const { locale } = useLanguage();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Navigate strictly after 1.5s
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 300);
    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <h2 className={styles.text}>
        {locale === "tr" ? "Çıkış Yapılıyor" : "Signing Out"}{dots}
      </h2>
    </div>
  );
}
