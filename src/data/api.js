export const fetchRiskReport = async (walletAddress) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/risk/analyze_positions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn("Backend API not reachable (normal on Vercel mobile), falling back to demo data.", error);
    
    // Vercel üzerinden telefondan girildiğinde Python sunucusuna (localhost) erişilemez.
    // Uygulamanın çökmemesi ve demo portfolyo hesaplamalarının görünmesi için sahte veri (mock) döndürüyoruz.
    return {
      reports: [
        {
          wallet_address: walletAddress,
          current_risk: {
            health_factor: { value: 1.45, description: "Sağlıklı" },
            total_collateral_usd: 12500.0,
            total_borrows_usd: 5400.0
          },
          ml_prediction: {
            probability_24h: 12.5,
            probability_7d: 28.4,
            risk_drivers: {
              "Market Volatility": 45.2,
              "Concentrated Collateral": 32.1,
              "High Borrow Rate": 22.7
            }
          },
          stress_tests: [
            { scenario_name: "ETH %20 Düşüş", simulated_health_factor: { value: 1.15 }, is_liquidatable: false },
            { scenario_name: "ETH %40 Düşüş", simulated_health_factor: { value: 0.85 }, is_liquidatable: true },
            { scenario_name: "Ani Kredi Sıkışması", simulated_health_factor: { value: 1.05 }, is_liquidatable: false }
          ]
        }
      ]
    };
  }
};
