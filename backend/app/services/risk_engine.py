from app.models.schemas import UserPosition
from app.services.ml_model import LiquidationModel
from app.utils.data_generator import generate_synthetic_training_data

class RiskEngine:
    """
    RiskEngine component for the Risk & Growth analytics platform.
    This component is responsible for:
    - Health Factor (HF) calculations
    - Deterministic stress tests (price shocks)
    - Liquidation threshold control
    - Machine Learning Liquidation Early-Warning predictions
    """
    
    def __init__(self):
        # Liquidation occurs when Health Factor falls below 1.0
        self.LIQUIDATION_THRESHOLD = 1.0
        
        # Initialize and Train ML Model asynchronously/on-startup
        self.ml_model = LiquidationModel()
        
        # Use our dummy data generator for training the model initially
        X_train, y_24h, y_7d = generate_synthetic_training_data(1000)
        self.ml_model.train_dummy_model(X_train, y_24h, y_7d)
        
    def calculate_health_factor(self, collateral: list, debt: list, liquidation_threshold: float = 0.85) -> float:
        """
        Calculates Health Factor (HF) according to Euler protocol.
        HF = (Sum of Collateral Value in USD * Liquidation Threshold) / (Sum of Debt Value in USD)
        """
        total_collateral_usd = sum(c.amount * c.price_usd for c in collateral)
        total_debt_usd = sum(d.amount * d.price_usd for d in debt)
        
        if total_debt_usd == 0:
            return float('inf')  # Infinite health if there is no debt
            
        return (total_collateral_usd * liquidation_threshold) / total_debt_usd
        
    def run_stress_test(self, position: UserPosition, drop_percentage: float) -> float:
        """
        Simulates a market fluctuation by applying a percentage drop to all collateral tokens.
        """
        discounted_collateral = []
        for c in position.collateral:
            discounted_price = c.price_usd * (1 - drop_percentage)
            discounted_collateral.append(
                c.model_copy(update={'price_usd': discounted_price})
            )
            
        return self.calculate_health_factor(discounted_collateral, position.debt)
        
    def is_liquidatable(self, hf: float) -> bool:
        """
        Marks position as liquidatable if HF falls below threshold.
        """
        return hf < self.LIQUIDATION_THRESHOLD

    def _format_hf(self, hf: float) -> float:
        """
        Helper to format Health Factor for reports.
        Explicitly casts to float to satisfy strict type checkers for round().
        """
        if hf == float('inf'):
            return 9999.0
        return float(f"{float(hf):.4f}")

    async def generate_risk_report_async(self, positions: list[UserPosition]) -> dict:
        """
        Asynchronous method to generate comprehensive risk and ML stress-test reports.
        """
        reports = []
        liquidatable_positions = []
        
        for p in positions:
            current_hf = self.calculate_health_factor(p.collateral, p.debt)
            risk_flag = self.is_liquidatable(current_hf)
            
            # Extract ML Features or fallback to conservative defaults
            if p.risk_features:
                feats = [
                    p.risk_features.hf_history_trajectory,
                    p.risk_features.market_volatility,
                    p.risk_features.leverage_ratio,
                    p.risk_features.liquidity_depth
                ]
            else:
                feats = [0.0, 0.5, 2.0, 1_000_000]
                
            # ML Asynchronous Prediction to prevent event loop blocking
            prob_24h, prob_7d = await self.ml_model.predict_async(feats)
            risk_drivers = await self.ml_model.explain_predict_async(feats)
            
            # Data structuring
            current_summary = {
                "wallet_address": p.wallet_address,
                "health_factor": {
                    "value": self._format_hf(current_hf),
                    "description": "Health Factor (HF) = Total Collateral / Total Debt."
                },
                "is_liquidatable": risk_flag
            }
            
            if risk_flag:
                liquidatable_positions.append(current_summary)
                
            prediction_result = {
                "probability_24h": float(f"{float(prob_24h):.2f}"),
                "probability_7d": float(f"{float(prob_7d):.2f}"),
                "risk_drivers": risk_drivers
            }
                
            hf_drop_15 = self.run_stress_test(p, 0.15)
            hf_drop_30 = self.run_stress_test(p, 0.30)
            
            tests = [
                {
                    "scenario_name": "15% Market Drop",
                    "drop_percentage": 15.0,
                    "simulated_health_factor": {
                        "value": self._format_hf(hf_drop_15),
                        "description": "Projected HF if prices drop 15%."
                    },
                    "is_liquidatable": self.is_liquidatable(hf_drop_15)
                },
                {
                    "scenario_name": "30% Market Drop",
                    "drop_percentage": 30.0,
                    "simulated_health_factor": {
                        "value": self._format_hf(hf_drop_30),
                        "description": "Projected HF if prices drop 30%."
                    },
                    "is_liquidatable": self.is_liquidatable(hf_drop_30)
                }
            ]
            
            reports.append({
                "wallet_address": p.wallet_address,
                "current_risk": current_summary,
                "ml_prediction": prediction_result,
                "stress_tests": tests
            })
            
        return {
            "total_positions_analyzed": len(positions),
            "liquidatable_positions_count": len(liquidatable_positions),
            "liquidatable_positions": liquidatable_positions,
            "reports": reports
        }
