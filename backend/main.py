from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

app = FastAPI(
    title="DeFi Risk & Growth Analysis Engine",
    description="Backend AI logic and Risk Analysis API for DeFi platforms.",
    version="1.0.0"
)

# Set up CORS to allow Next.js app to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "DeFi Risk Engine API is running. Check /docs for interactive Swagger UI."}
