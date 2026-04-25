"use client";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import styles from "@/app/signing-out/SigningOut.module.css";

function AuthStateOverlay({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [showOverlay, setShowOverlay] = useState(false);
  const wasSignedIn = useRef(false);
  const [dots, setDots] = useState("");
  const { locale } = useLanguage();

  // Track if user was previously signed in
  if (isLoaded && isSignedIn && !wasSignedIn.current) {
    wasSignedIn.current = true;
  }

  // If they were signed in, and are now signed out, trigger overlay immediately before children render
  if (isLoaded && !isSignedIn && wasSignedIn.current && !showOverlay) {
    setShowOverlay(true);
  }

  useEffect(() => {
    if (showOverlay) {
      const dotTimer = setInterval(() => {
        setDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 300);
      
      const timer = setTimeout(() => {
        wasSignedIn.current = false;
        setShowOverlay(false);
      }, 1500);

      return () => {
        clearInterval(dotTimer);
        clearTimeout(timer);
      };
    }
  }, [showOverlay]);

  return (
    <>
      {showOverlay && (
        <div className={styles.container} style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, width: '100vw', height: '100vh', margin: 0 }}>
          <div className={styles.spinner}></div>
          <h2 className={styles.text}>{locale === "tr" ? "Çıkış Yapılıyor" : "Signing Out"}{dots}</h2>
        </div>
      )}
      {!showOverlay && children}
    </>
  );
}

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <AuthStateOverlay>{children}</AuthStateOverlay>
    </LanguageProvider>
  );
}
