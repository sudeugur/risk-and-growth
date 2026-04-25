import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from app.models.schemas import MarketGrowthMetrics

class GrowthEngine:
    """
    GrowthEngine component for the Risk & Growth analytics platform.
    This component focuses on Investor (VC) perspective:
    - Unsupervised Clustering of Euler markets via Scikit-Learn KMeans
    - Calculating the VC Momentum Score (0-100) summary matrix.
    """
    
    def __init__(self):
        # We process KMeans dynamically depending on incoming endpoints
        self.scaler = StandardScaler()
        
    def _find_optimal_k(self, X_scaled) -> int:
        """
        Dynamically finds the ideal number of clusters using Silhouette Score.
        """
        n_samples = len(X_scaled)
        if n_samples < 3:
            return n_samples
            
        max_k = min(5, n_samples - 1)
        if max_k < 2:
            return 2
            
        best_k = 2
        best_score = -1
        for k in range(2, max_k + 1):
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = kmeans.fit_predict(X_scaled)
            score = silhouette_score(X_scaled, labels)
            if score > best_score:
                best_score = score
                best_k = k
        return best_k

    def _assign_labels_based_on_centroids(self, original_centroids) -> dict:
        """
        Dynamically labels clusters transparently by analyzing their mathematical centroid characteristics.
        Strictly avoiding subjective labeling.
        """
        labels = {}
        for idx, centroid in enumerate(original_centroids):
            # Feature logic layout: [tvl_growth, rev_efficiency, utilization, adoption]
            tvl_growth = centroid[0]
            rev_efficiency = centroid[1]
            
            # Simple data-driven assignment heuristics mapped over scaled inverses
            if tvl_growth > 0 and rev_efficiency < 0:
                labels[idx] = "High-Growth / High-Risk"
            elif tvl_growth > 0 and rev_efficiency >= 0:
                labels[idx] = "Blue-chip Resilient"
            elif tvl_growth <= 0 and rev_efficiency <= 0:
                labels[idx] = "Stagnant"
            else:
                labels[idx] = "Emerging Steady"
                
        return labels

    def cluster_markets(self, market_data: list[MarketGrowthMetrics]) -> tuple[dict, list]:
        """
        Segment Euler markets based on internal feature characteristics.
        """
        if not market_data:
            return {}, []
            
        # Extract features into an array representation for Scikit-Learn
        X = np.array([
            [m.tvl_growth_pct, m.revenue_efficiency, m.utilization_rate, m.adoption_trend]
            for m in market_data
        ])
        
        # Determine the safest cluster threshold based on mock ingestion amount
        if len(X) < 2:
            return {0: "Insufficient Segment Data"}, ["Insufficient Segment Data"] * len(X)
            
        # Standardize features before applying distance-sensitive algorithms
        X_scaled = self.scaler.fit_transform(X)
        
        # Calculate dynamic k
        optimal_k = self._find_optimal_k(X_scaled)
        
        # Fit predictions 
        kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
        cluster_indices = kmeans.fit_predict(X_scaled)
        
        # Inverse transform to read centroids in original scale for logical labeling bounds
        original_centroids = self.scaler.inverse_transform(kmeans.cluster_centers_)
        cluster_labels_map = self._assign_labels_based_on_centroids(original_centroids)
        
        # Create array of assigned string labels identifying each exact market
        assigned_labels = [cluster_labels_map.get(idx, "Unclassified") for idx in cluster_indices]
        return cluster_labels_map, assigned_labels
        
    def calculate_vc_momentum_score(self, market_metrics: list[MarketGrowthMetrics]) -> float:
        """
        Calculates VC Momentum Score (0-100) assessing total protocol health.
        Driven through weighted feature boundaries.
        """
        if not market_metrics:
            return 0.0
            
        avg_tvl_growth = np.mean([m.tvl_growth_pct for m in market_metrics])
        avg_rev_eff = np.mean([m.revenue_efficiency for m in market_metrics])
        avg_utilization = np.mean([m.utilization_rate for m in market_metrics])
        avg_adoption = np.mean([m.adoption_trend for m in market_metrics])
        
        # Threshold clipping to prevent extreme outlier score disruption
        cap_tvl = min(max(avg_tvl_growth, -20), 50) 
        cap_adopt = min(max(avg_adoption, -10), 40) 
        
        # Score mathematical scaling parameters (adding up to 100 max points)
        score_tvl = ((cap_tvl + 20) / 70) * 40 
        score_adopt = ((cap_adopt + 10) / 50) * 30
        score_util = min(avg_utilization, 1.0) * 20
        score_rev = min(avg_rev_eff / 0.05, 1.0) * 10
        
        total_score = score_tvl + score_adopt + score_util + score_rev
        return float(min(max(round(total_score, 2), 0.0), 100.0))

    def generate_growth_report(self, market_data: list[MarketGrowthMetrics]) -> dict:
        """
        Orchestration format exporting the final VC API Payload.
        """
        momentum_score = self.calculate_vc_momentum_score(market_data)
        
        clusters = []
        if len(market_data) > 0:
            mapping, labels = self.cluster_markets(market_data)
            
            for m, label in zip(market_data, labels):
                idx = 0
                for k, v in mapping.items():
                    if v == label:
                        idx = k
                        break
                        
                clusters.append({
                    "market_symbol": m.market_symbol,
                    "cluster_id": int(idx),
                    "cluster_label": str(label),
                    "metrics": m.model_dump() 
                })
                
        return {
            "total_markets_analyzed": len(market_data),
            "vc_momentum_score": momentum_score,
            "clusters": clusters
        }
