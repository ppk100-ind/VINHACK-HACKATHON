from fastapi import APIRouter
from app.services.stock_service import get_stock_price

router = APIRouter()

@router.get("/price/{symbol}")
async def get_price(symbol: str):
    # fetch price (dummy or real)
    return get_stock_price(symbol)

