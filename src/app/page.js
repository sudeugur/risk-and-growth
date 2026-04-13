"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ProtocolTable from "@/components/ProtocolTable";
import RiskCards from "@/components/RiskCard";
import RiskCategories from "@/components/RiskCategories";
import Footer from "@/components/Footer";
import WalletDashboard from "@/components/WalletDashboard";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const { isSignedIn } = useAuth();
  const { t } = useLanguage();

  const handleConnectWallet = () => {
    if (walletAddress) {
      setWalletAddress(null); // Disconnect
      return;
    }
    // Generate a mock wallet address to simulate connection
    const mockAddress = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setWalletAddress(mockAddress);
  };

  return (
    <>
      <Navbar 
        walletAddress={walletAddress} 
        onConnectWallet={handleConnectWallet} 
        onGoHome={() => setWalletAddress(null)}
      />
      <main>
        {walletAddress ? (
          <WalletDashboard walletAddress={walletAddress} />
        ) : (
          <>
            <HeroSection walletAddress={walletAddress} onConnectWallet={handleConnectWallet} />
            {!isSignedIn ? (
              <>
                <StatsBar />
                <div id="membership" style={{ padding: '6rem 2rem', textAlign: 'center', color: '#a0aec0', maxWidth: '900px', margin: '0 auto', fontFamily: '"Space Grotesk", sans-serif' }}>
                  <h2 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{t("onboarding.title")}</h2>
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '4rem', color: '#8f9ba8' }} dangerouslySetInnerHTML={{ __html: t("onboarding.description") }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,212,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#00d4ff' }}></div>
                      <h3 style={{ color: '#00d4ff', marginBottom: '1rem', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', padding: '0.5rem', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>1</span>
                        {t("onboarding.step1Title")}
                      </h3>
                      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t("onboarding.step1Desc") }} />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(123,47,247,0.2)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#7b2ff7' }}></div>
                      <h3 style={{ color: '#7b2ff7', marginBottom: '1rem', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ background: 'rgba(123,47,247,0.1)', color: '#7b2ff7', padding: '0.5rem', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>2</span>
                        {t("onboarding.step2Title")}
                      </h3>
                      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t("onboarding.step2Desc") }} />
                    </div>
                  </div>
                </div>
                <RiskCards />
                <RiskCategories />
              </>
            ) : (
              <ProtocolTable />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
