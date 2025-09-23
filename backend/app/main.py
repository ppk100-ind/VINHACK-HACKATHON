from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys
from pathlib import Path

# Add the parent directory to sys.path to enable imports
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Import routers
from app.routers import stocks, ai, watchlist

load_dotenv()  # load all variables from .env file

# Now os.getenv() will have access
print("Gemini API Key:", os.getenv('GEMINI_API_KEY'))

app = FastAPI(title="Stock Trading Analyser API", version="1.0.0")

#CORS to be added
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include routers
app.include_router(stocks.router, prefix="/stocks", tags=["stocks"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])
app.include_router(watchlist.router, prefix="/watchlist", tags=["watchlist"])

@app.get("/")
async def root():
    return {"message": "Stock Trading Analyser API", "status": "running"}

@app.get("/ping")
async def ping():
    return {"status": "ok"}
