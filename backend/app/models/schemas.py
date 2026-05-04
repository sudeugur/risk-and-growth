from pydantic import BaseModel
from typing import List, Optional

class TokenBase(BaseModel):
    symbol: str
    amount: float
    price_usd: float

class RiskFeatures(BaseModel):
    hf_history_trajectory: float
    market_volatility: float
    leverage_ratio: float
    liquidity_depth: float

class UserPosition(BaseModel):
    wallet_address: str
    collateral: List[TokenBase]
    debt: List[TokenBase]
    risk_features: Optional[RiskFeatures] = None

class MarketGrowthMetrics(BaseModel):
    market_symbol: str
    tvl_growth_pct: float
    revenue_efficiency: float
    utilization_rate: float
    adoption_trend: float
