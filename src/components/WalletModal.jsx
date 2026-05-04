import { useState, useEffect } from "react";
import styles from "./WalletModal.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function WalletModal({ isOpen, onClose, onConnect }) {
  const { t } = useLanguage();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const DEFAULT_WHALE = "0x7a16ff8270133f063aab6c9977183d9e72835428";

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAddress("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || address.trim().length !== 42 || !address.startsWith("0x")) {
      setError("Please enter a valid 42-character ERC-20 0x address.");
      return;
    }
    onConnect(address.trim());
    onClose();
  };

  const fillWhale = () => {
    setAddress(DEFAULT_WHALE);
    setError("");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>Connect Wallet</h2>
        <p className={styles.subtitle}>
          Enter an Ethereum wallet address to safely analyze its DeFi risk profile. No signatures required.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Wallet Address</label>
            <input
              type="text"
              className={styles.input}
              placeholder="0x..."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
              autoFocus
            />
            {error && <div style={{color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem'}}>{error}</div>}
            

          </div>

          <button 
            type="submit" 
            className={styles.actionBtn}
            disabled={!address || address.length < 10}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
            </svg>
            Analyze Portfolio
          </button>
        </form>
      </div>
    </div>
  );
}
