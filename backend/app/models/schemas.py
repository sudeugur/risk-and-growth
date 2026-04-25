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
    asset_id: str
    tvl: float
    volume_24h: float
    active_users: int
    dev_commits: int
