"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "@/locales/en";
import tr from "@/locales/tr";

const translations = { en, tr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("rg-lang");
    if (saved && translations[saved]) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "tr" : "en";
      localStorage.setItem("rg-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      return translations[locale]?.[key] || translations.en[key] || key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
