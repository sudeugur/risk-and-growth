export const protocols = [
  {
    id: 1,
    name: "Aave",
    symbol: "AAVE",
    chain: "Ethereum",
    category: "Lending",
    tvl: "$12.4B",
    riskScore: 18,
    riskLevel: "low",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#B6509E"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.9231 6L6.5 17.5V18.1408H8.8077L12.9231 10.5915L17.0384 18.1408H19.3461V17.5L12.9231 6ZM9.56412 18.1408H10.1282V17.5L12.9231 12.338L15.718 17.5V18.1408H16.2821L12.9231 11.9437L9.56412 18.1408Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 15,
    liquidityRisk: 12,
    oracleRisk: 20,
    governanceRisk: 25,
    change24h: -2.1,
  },
  {
    id: 2,
    name: "Uniswap",
    symbol: "UNI",
    chain: "Ethereum",
    category: "DEX",
    tvl: "$5.8B",
    riskScore: 22,
    riskLevel: "low",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FF007A"/>
        <path d="M13.6262 6.5C13.6262 7.39746 12.8986 8.125 12.0012 8.125C11.1037 8.125 10.3762 7.39746 10.3762 6.5C10.3762 5.60254 11.1037 4.875 12.0012 4.875C12.8986 4.875 13.6262 5.60254 13.6262 6.5Z" fill="white"/>
        <path d="M12 9C10.3431 9 9 10.3431 9 12V18H11V15H13V18H15V12C15 10.3431 13.6569 9 12 9Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 18,
    liquidityRisk: 25,
    oracleRisk: 15,
    governanceRisk: 30,
    change24h: 1.4,
  },
  {
    id: 3,
    name: "Lido",
    symbol: "LDO",
    chain: "Ethereum",
    category: "Staking",
    tvl: "$14.2B",
    riskScore: 35,
    riskLevel: "medium",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#00A3FF"/>
        <path d="M12 4C9.5 4 8 6 8 8C8 10 9 11 11 11.5L12 11.8C12.5 11.9 13 12 13 12.5C13 13 12 13.5 10 13C8 12.5 7.5 12.5 7.5 12.5L7 14.5C7 14.5 9.5 15.5 12.5 15.5C15.5 15.5 17 13.5 17 11.5C17 9.5 16 8.5 14 8L13 7.7C12.5 7.6 12 7.5 12 7C12 6.5 13 6 15 6.5L15.5 4.5C15.5 4.5 13.5 4 12 4Z" fill="white"/>
        <path d="M10.5 16L12 20L13.5 16H10.5Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 30,
    liquidityRisk: 28,
    oracleRisk: 35,
    governanceRisk: 45,
    change24h: -0.8,
  },
  {
    id: 4,
    name: "MakerDAO",
    symbol: "MKR",
    chain: "Ethereum",
    category: "Lending",
    tvl: "$8.1B",
    riskScore: 28,
    riskLevel: "low",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#1AAB9B"/>
        <path d="M7 6H17V8H13V18H11V8H7V6Z" fill="white"/>
        <path d="M6 10H8V18H6V10Z" fill="white"/>
        <path d="M16 10H18V18H16V10Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 22,
    liquidityRisk: 30,
    oracleRisk: 32,
    governanceRisk: 28,
    change24h: 3.2,
  },
  {
    id: 5,
    name: "Curve",
    symbol: "CRV",
    chain: "Ethereum",
    category: "DEX",
    tvl: "$3.2B",
    riskScore: 42,
    riskLevel: "medium",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FA2636"/>
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM13.5 10.5C13.5 11.3284 12.8284 12 12 12C11.1716 12 10.5 11.3284 10.5 10.5C10.5 9.67157 11.1716 9 12 9C12.8284 9 13.5 9.67157 13.5 10.5Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 38,
    liquidityRisk: 45,
    oracleRisk: 40,
    governanceRisk: 44,
    change24h: -5.3,
  },
  {
    id: 6,
    name: "Compound",
    symbol: "COMP",
    chain: "Ethereum",
    category: "Lending",
    tvl: "$2.9B",
    riskScore: 25,
    riskLevel: "low",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#00D395"/>
        <path d="M8 8H16V10H8V8Z" fill="white"/>
        <path d="M8 12H16V14H8V12Z" fill="white"/>
        <path d="M8 16H16V18H8V16Z" fill="white"/>
        <circle cx="6" cy="9" r="1" fill="white"/>
        <circle cx="6" cy="13" r="1" fill="white"/>
        <circle cx="6" cy="17" r="1" fill="white"/>
      </svg>
    ),
    smartContractRisk: 20,
    liquidityRisk: 22,
    oracleRisk: 28,
    governanceRisk: 30,
    change24h: 0.7,
  },
  {
    id: 7,
    name: "PancakeSwap",
    symbol: "CAKE",
    chain: "BSC",
    category: "DEX",
    tvl: "$1.8B",
    riskScore: 55,
    riskLevel: "high",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#D1884F"/>
        <path d="M6 14C6 14 8 16 12 16C16 16 18 14 18 14V17C18 17 16 19 12 19C8 19 6 17 6 17V14Z" fill="white" opacity="0.8"/>
        <path d="M6 11C6 11 8 13 12 13C16 13 18 11 18 11V14C18 14 16 16 12 16C8 16 6 14 6 14V11Z" fill="white" opacity="0.9"/>
        <path d="M6 8C6 8 8 10 12 10C16 10 18 8 18 8V11C18 11 16 13 12 13C8 13 6 11 6 11V8Z" fill="white"/>
        <circle cx="12" cy="7" r="2" fill="#FFA500"/>
      </svg>
    ),
    smartContractRisk: 50,
    liquidityRisk: 55,
    oracleRisk: 52,
    governanceRisk: 62,
    change24h: -1.9,
  },
  {
    id: 8,
    name: "dYdX",
    symbol: "DYDX",
    chain: "Ethereum",
    category: "Derivatives",
    tvl: "$980M",
    riskScore: 38,
    riskLevel: "medium",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#6966FF"/>
        <path d="M12 5V19M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 8L15 16M15 8L9 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    smartContractRisk: 35,
    liquidityRisk: 40,
    oracleRisk: 42,
    governanceRisk: 35,
    change24h: 4.1,
  },
  {
    id: 9,
    name: "Yearn Finance",
    symbol: "YFI",
    chain: "Ethereum",
    category: "Yield",
    tvl: "$450M",
    riskScore: 65,
    riskLevel: "high",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#0066FF"/>
        <path d="M7 7H11C12.1046 7 13 7.89543 13 9V12C13 13.1046 12.1046 14 11 14H7V7Z" fill="white"/>
        <path d="M16 11H13V14H16C16.5523 14 17 13.5523 17 13V12C17 11.4477 16.5523 11 16 11Z" fill="white"/>
        <path d="M7 17H13V15H7V17Z" fill="white"/>
      </svg>
    ),
    smartContractRisk: 60,
    liquidityRisk: 68,
    oracleRisk: 55,
    governanceRisk: 72,
    change24h: -3.5,
  },
  {
    id: 10,
    name: "Olympus DAO",
    symbol: "OHM",
    chain: "Ethereum",
    category: "Reserve",
    tvl: "$180M",
    riskScore: 82,
    riskLevel: "critical",
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#1C1C1C"/>
        <circle cx="12" cy="12" r="11" stroke="#E6E6E6" strokeWidth="1"/>
        <path d="M12 6L16 16H8L12 6Z" fill="#E6E6E6"/>
        <circle cx="12" cy="12" r="2" fill="#1C1C1C"/>
      </svg>
    ),
    smartContractRisk: 75,
    liquidityRisk: 85,
    oracleRisk: 78,
    governanceRisk: 88,
    change24h: -8.2,
  },
];

export const stats = [
  { labelKey: "stats.tvl", value: "$49.9B", icon: "🔒" },
  { labelKey: "stats.protocolsMonitored", value: "2,847", icon: "📡" },
  { labelKey: "stats.riskAlerts", value: "34", icon: "⚠️" },
  { labelKey: "stats.activeUsers", value: "128K", icon: "👥" },
];

export const riskCategories = [
  {
    id: "smart-contract",
    title: "Smart Contract Risk",
    icon: "📜",
    color: "#00d4ff",
    description:
      "Evaluates the security of protocol smart contracts including audit history, code complexity, upgrade mechanisms, and known vulnerability patterns.",
    factors: [
      "Audit coverage & quality",
      "Code complexity score",
      "Upgrade proxy patterns",
      "Historical exploits",
    ],
  },
  {
    id: "liquidity",
    title: "Liquidity Risk",
    icon: "💧",
    color: "#7b2ff7",
    description:
      "Assesses the depth and stability of liquidity pools, withdrawal mechanisms, and the risk of bank-run scenarios or liquidity crunches.",
    factors: [
      "Pool depth analysis",
      "Withdrawal queues",
      "Concentrated liquidity",
      "Impermanent loss exposure",
    ],
  },
  {
    id: "oracle",
    title: "Oracle Risk",
    icon: "🔮",
    color: "#ff6b35",
    description:
      "Analyzes the reliability and manipulation resistance of price feeds and data oracles used by the protocol for critical operations.",
    factors: [
      "Oracle source diversity",
      "Price feed freshness",
      "Manipulation resistance",
      "Fallback mechanisms",
    ],
  },
  {
    id: "governance",
    title: "Governance Risk",
    icon: "⚖️",
    color: "#00ff88",
    description:
      "Evaluates the decentralization level, voting power distribution, timelock mechanisms, and multisig configurations of protocol governance.",
    factors: [
      "Token distribution",
      "Voting power concentration",
      "Timelock durations",
      "Multisig thresholds",
    ],
  },
];
