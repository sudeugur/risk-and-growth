import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ProtocolTable from "@/components/ProtocolTable";
import RiskCards from "@/components/RiskCard";
import RiskCategories from "@/components/RiskCategories";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ProtocolTable />
        <RiskCards />
        <RiskCategories />
      </main>
      <Footer />
    </>
  );
}
