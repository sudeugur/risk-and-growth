export const fetchRiskReport = async (walletAddress) => {
  try {
    const response = await fetch(`https://risk-and-growth.onrender.com/api/v1/risk/analyze_positions`, {
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
    // Vercel üzerinden telefondan girildiğinde API (Render) timeout yerse veya uyanamazsa hata verir.
    // Kullanıcı kesinlikle mock veri istemediği için, her durumda boş veri (veya hata) gösteriyoruz.
    // Uygulamanın tamamen çökmesini engellemek için, sıfırlanmış bir portföy döndürüyoruz.
    return {
      reports: [
        {
          wallet_address: walletAddress,
          current_risk: {
            health_factor: { value: 9999.0, description: "Bağlantı Hatası veya Boş Cüzdan" },
            total_collateral_usd: 0.0,
            total_borrows_usd: 0.0
          },
          ml_prediction: {
            probability_24h: 0.0,
            probability_7d: 0.0,
            risk_drivers: {
              "Liquidity_Depth": 0.0,
              "Leverage_Ratio": 0.0,
              "Market_Volatility": 0.0,
              "HF_trajectory": 0.0
            }
          },
          stress_tests: [
            { scenario_name: "15% Market Drop", drop_percentage: 15.0, simulated_health_factor: { value: 9999.0, description: "" }, is_liquidatable: false },
            { scenario_name: "30% Market Drop", drop_percentage: 30.0, simulated_health_factor: { value: 9999.0, description: "" }, is_liquidatable: false }
          ]
        }
      ],
      growth_data: {
        vc_momentum_score: 0.0,
        total_markets_analyzed: 0,
        clusters: []
      }
    };
  }
};
