from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.models.schemas import UserPosition
from app.services.data_fetcher import fetch_real_aave_portfolio
from app.services.risk_engine import RiskEngine

router = APIRouter()
risk_engine = RiskEngine()

class PositionRequest(BaseModel):
    wallet_address: str

class MLPrediction(BaseModel):
    probability_24h: float
    probability_7d: float
    risk_drivers: dict

class SimulatedHealthFactor(BaseModel):
    value: float
    description: str

class StressTestResult(BaseModel):
    scenario_name: str
    drop_percentage: float
    simulated_health_factor: SimulatedHealthFactor
    is_liquidatable: bool

class CurrentRisk(BaseModel):
    wallet_address: str
    health_factor: SimulatedHealthFactor
    is_liquidatable: bool

class RiskReportItem(BaseModel):
    wallet_address: str
    current_risk: CurrentRisk
    ml_prediction: MLPrediction
    stress_tests: List[StressTestResult]

class RiskReportResponse(BaseModel):
    total_positions_analyzed: int
    liquidatable_positions_count: int
    liquidatable_positions: List[CurrentRisk]
    reports: List[RiskReportItem]


@router.post("/risk/analyze_positions")
async def analyze_positions(req: PositionRequest):
    try:
        # 1. Fetch real portfolio data using The Graph
        position_data = await fetch_real_aave_portfolio(req.wallet_address)
        
        # 2. Pass to Python Risk Engine
        report = await risk_engine.generate_risk_report_async([position_data])
        
        # 3. Return report
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
