"use client";
import { useState } from "react";
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
      <Navbar walletAddress={walletAddress} onConnectWallet={handleConnectWallet} />
      <main>
        {walletAddress ? (
          <WalletDashboard walletAddress={walletAddress} />
        ) : (
          <>
            <HeroSection />
            <StatsBar />
            <ProtocolTable />
            <RiskCards />
            <RiskCategories />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
