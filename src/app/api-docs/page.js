"use client";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApiDocsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: '#0b1120', color: '#fff', paddingTop: '100px', paddingBottom: '4rem', fontFamily: '"Space Grotesk", sans-serif' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #00d4ff, #7b2ff7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {t("apiDocs.title")}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#8f9ba8', lineHeight: '1.6' }}>
              {t("apiDocs.subtitle")}
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '3rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              ℹ️ {t("apiDocs.whyTitle")}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#a0aec0', lineHeight: '1.7' }}>
              {t("apiDocs.whyDesc")}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Clerk API Card */}
            <div style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '24px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#00d4ff' }}></div>
              <h3 style={{ fontSize: '1.5rem', color: '#00d4ff', marginBottom: '1rem' }}>
                {t("apiDocs.clerkTitle")}
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#a0aec0', lineHeight: '1.6' }}>
                {t("apiDocs.clerkDesc")}
              </p>
            </div>

            {/* Upcoming DeFi API Card */}
            <div style={{ background: 'rgba(123, 47, 247, 0.05)', border: '1px solid rgba(123, 47, 247, 0.2)', borderRadius: '24px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#7b2ff7' }}></div>
              <h3 style={{ fontSize: '1.5rem', color: '#7b2ff7', marginBottom: '1rem' }}>
                {t("apiDocs.defiTitle")}
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#a0aec0', lineHeight: '1.6' }}>
                {t("apiDocs.defiDesc")}
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
