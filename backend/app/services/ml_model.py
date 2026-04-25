import numpy as np
from sklearn.ensemble import RandomForestClassifier
import asyncio

class LiquidationModel:
    def __init__(self):
        # Using Random Forest for native feature importance (Explainable AI requirement)
        self.model_24h = RandomForestClassifier(n_estimators=50, random_state=42)
        self.model_7d = RandomForestClassifier(n_estimators=50, random_state=42)
        self.is_trained = False
        
        # As per specification: Feature Set
        self.feature_names = ['HF_trajectory', 'Market_Volatility', 'Leverage_Ratio', 'Liquidity_Depth']

    def train_dummy_model(self, X_dummy, y_24h, y_7d):
        """Train models on the synthetic dataset."""
        self.model_24h.fit(X_dummy, y_24h)
        self.model_7d.fit(X_dummy, y_7d)
        self.is_trained = True

    async def predict_async(self, features: list):
        """
        Asynchronous inference via threadpool to prevent blocking the FastAPI event loop.
        Returns probabilities of liquidation in 24h and 7d.
        """
        if not self.is_trained:
            return 0.0, 0.0
            
        loop = asyncio.get_event_loop()
        X = np.array([features])
        
        # run_in_executor runs the synchronous sklearn code in a separate thread
        prob_24h_arr = await loop.run_in_executor(None, self.model_24h.predict_proba, X)
        prob_7d_arr = await loop.run_in_executor(None, self.model_7d.predict_proba, X)
        
        # Extract the probability for class 1 (liquidation)
        prob_24h = float(prob_24h_arr[0][1]) * 100
        prob_7d = float(prob_7d_arr[0][1]) * 100
        
        return prob_24h, prob_7d

    async def explain_predict_async(self, features: list):
        """
        Explainable AI method: Returns feature importance drivers that lead to the prediction.
        Weights are normalized to 100% for interpretability.
        """
        if not self.is_trained:
            return {}
            
        # Extract Gini importances from the trees
        importances_24h = self.model_24h.feature_importances_
        importances_7d = self.model_7d.feature_importances_
        
        # Combine importance for a holistic explanation
        avg_importances = (importances_24h + importances_7d) / 2
        
        explanation = {}
        for name, imp in zip(self.feature_names, avg_importances):
            explanation[name] = round(float(imp * 100), 2)
            
        # Return sorted descending (biggest driver first)
        sorted_exp = dict(sorted(explanation.items(), key=lambda item: item[1], reverse=True))
        return sorted_exp
