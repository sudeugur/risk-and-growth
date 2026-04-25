import numpy as np

def generate_synthetic_training_data(n_samples: int = 1000):
    """
    Generates synthetic training data for the ML Model.
    """
    np.random.seed(42)
    # Features: hf_trajectory, market_volatility, leverage_ratio, liquidity_depth
    X = np.random.rand(n_samples, 4) * 100 
    
    # Simple randomized binary targets
    y_24h = np.random.randint(0, 2, n_samples)
    y_7d = np.random.randint(0, 2, n_samples)
    
    return X, y_24h, y_7d
