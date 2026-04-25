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
    console.error("Failed to fetch risk report:", error);
    throw error;
  }
};
