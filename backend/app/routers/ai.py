from fastapi import APIRouter, Body
from app.services.ai_service import trend_predict, risk_assess, chat_ai

router = APIRouter()

@router.post("/trend")
def get_trend(prices: list = Body(...)):
    return trend_predict(prices)

@router.post("/risk")
def get_risk(prices: list = Body(...)):
    return risk_assess(prices)

@router.post("/chatbot")
def chatbot_qa(prompt: str = Body(...)):
    return chat_ai(prompt)
