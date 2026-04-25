export const formatTVL = (num) => {
  if (!num) return "$0";
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

export const calculateRisk = (tvl, category) => {
  let baseScore = 50;
  if (tvl > 5e9) baseScore = 12; // 5 Milyar Dolar üstü Aşırı Güvenilir
  else if (tvl > 1e9) baseScore = 22; 
  else if (tvl > 1e8) baseScore = 42; 
  else if (tvl > 1e7) baseScore = 65; 
  else baseScore = 85; 

  // TVL tabanlı ve tamamen deterministik bir jitter (oynaklık) ekliyoruz.
  const pseudoRandom = Math.floor(tvl % 11) - 5; 
  baseScore += pseudoRandom;
  
  if (category === "Yield") baseScore += 5; 
  if (category === "Derivatives") baseScore += 8;

  const score = Math.min(Math.max(baseScore, 1), 99);
  
  let level = "low";
  if (score < 30) level = "low";
  else if (score < 60) level = "medium";
  else if (score < 80) level = "high";
  else level = "critical";
  
  return { score, level };
};

export const generateSubRisks = (baseScore, tvl) => {
  // Projelerin TVL değerleri sürekli aynı olmadıkları için matematiksel sapmalar üretiyoruz
  const jitter1 = (Math.floor(tvl / 10) % 15) - 7;
  const jitter2 = (Math.floor(tvl / 100) % 20) - 5;
  const jitter3 = (Math.floor(tvl / 1000) % 15) - 4;
  const jitter4 = (Math.floor(tvl / 10000) % 10) - 8;

  // Bu sapmaları Base Score'a eklediğimizde artık hiçbir projenin "Smart Contract Risk"i birbiriyle pişti olmayacak.
  const smartContractRisk = Math.min(Math.max(baseScore - 2 + jitter1, 5), 95);
  const liquidityRisk = Math.min(Math.max(baseScore + 8 + jitter2, 8), 98); 
  const oracleRisk = Math.min(Math.max(baseScore + 1 + jitter3, 5), 90);
  const governanceRisk = Math.min(Math.max(baseScore - 5 + jitter4, 10), 85);

  return { smartContractRisk, liquidityRisk, oracleRisk, governanceRisk };
};
