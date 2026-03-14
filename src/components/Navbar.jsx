"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>📊</span>
          <span className={styles.logoText}>
            Risk<span className={styles.logoAccent}>&Growth</span>
          </span>
        </a>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <a href="#dashboard" className={styles.link}>Dashboard</a>
          <a href="#protocols" className={styles.link}>Protocols</a>
          <a href="#analytics" className={styles.link}>Analytics</a>
          <a href="#categories" className={styles.link}>Risk Categories</a>
        </div>

        <button className={styles.walletBtn}>
          <span className={styles.walletDot}></span>
          Connect Wallet
        </button>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
