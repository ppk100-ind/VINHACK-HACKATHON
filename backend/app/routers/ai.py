from fastapi import APIRouter, Body
from app.services.ai_service import trend_predict, risk_assess, chat_ai, get_stock_analysis

router = APIRouter()

@router.get("/analysis/{symbol}")
async def get_analysis(symbol: str):
    """Get AI analysis for a stock symbol"""
    return await get_stock_analysis(symbol)

@router.post("/trend")
def get_trend(prices: list = Body(...)):
    return trend_predict(prices)

@router.post("/risk")
def get_risk(prices: list = Body(...)):
    return risk_assess(prices)

@router.post("/chatbot")
def chatbot_qa(prompt: str = Body(...)):
    return chat_ai(prompt)
