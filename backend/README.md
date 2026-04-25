# 🚀 DeFi Risk & Growth Analysis Engine

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-Machine%20Learning-orange.svg)

## 📌 Overview
The DeFi Risk & Growth Analysis Engine is a robust backend API designed to evaluate cryptocurrency market dynamics and individual wallet vulnerabilities in Decentralized Finance (DeFi) protocols. Built with a modular architecture, it processes complex, hierarchical on-chain data to provide real-time risk assessments and machine-learning-driven market clustering.

This system acts as the core intelligence layer, connecting data pipelines (ETL) with frontend dashboard visualizations.

## ⚙️ Core Architecture & Subsystems

The backend is strictly separated into three main layers:

### 1. API & Orchestration Subsystem
* **FastAPI Framework:** High-performance RESTful API endpoints with auto-generated Swagger UI documentation.
* **Data Validation:** Strict Pydantic models ensuring corrupted or malformed data is rejected (`422 Unprocessable Entity`) before reaching the calculation engines.
* **State Management:** In-memory persistence ensuring the latest analyzed batch is instantly available for frontend `GET` requests without reprocessing.

### 2. Risk Layer (Deterministic & Probabilistic)
* **Health Factor (HF) Engine:** Calculates accurate liquidation thresholds based on collateral-to-debt ratios.
* **Stress Testing Simulator:** Evaluates portfolio survivability against 15% and 30% sudden market crashes.
* **Explainable AI (Early Warning):** Provides 24-hour and 7-day liquidation probability metrics with contextual reasoning.

### 3. Growth Layer (Machine Learning)
* **Unsupervised Clustering (K-Means):** Utilizes `Scikit-learn` with `StandardScaler` to accurately group markets (e.g., separating hyper-growth assets like PEPE from stablecoins like USDC).
* **Dynamic Centroid Labeling:** Dynamically assigns labels such as "Blue-chip Resilient", "High-Growth/High-Risk", or "Emerging Steady" based on mathematical cluster centers.
* **VC Momentum Score:** Calculates an aggregate score representing overall market traction and institutional interest.

## 🛠️ Installation & Execution (Docker)

The application is fully containerized for seamless cross-platform execution. No local Python environment setup is required.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME
Build and spin up the Docker container:

Bash
docker-compose up --build
Access the API:

Open your browser and navigate to http://localhost:8000/

Note: The root URL will automatically redirect to the interactive Swagger UI (/docs) for easy endpoint testing.

🔌 Frontend Integration (Endpoints)
POST /api/v1/growth/analyze_markets : Ingest and cluster market data.

POST /api/v1/risk/analyze_positions : Ingest wallet data and calculate Health Factors.

GET /api/v1/analytics/growth : Retrieve the latest persistence data for UI rendering.

GET /api/v1/test/generate_mock_markets : Fallback generator providing structured dummy data for UI testing.
