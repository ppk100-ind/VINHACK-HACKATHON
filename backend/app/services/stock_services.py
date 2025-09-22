import os
import httpx

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"

async def get_stock_price(symbol):
    params = {
        "function": "GLOBAL_QUOTE",
        "symbol": symbol,
        "apikey": API_KEY
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(BASE_URL, params=params)
        data = resp.json().get("Global Quote", {})
    return {
        "symbol": symbol,
        "price": float(data.get("05. price", 0.0)),
        "change": float(data.get("09. change", 0.0)),
        "percent_change": data.get("10. change percent", "0%")
    }

async def get_company_overview(symbol):
    params = {
        "function": "OVERVIEW",
        "symbol": symbol,
        "apikey": API_KEY
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(BASE_URL, params=params)
        data = resp.json()
    return data

async def get_trending_stocks():
    return {"trending": ["AAPL", "TSLA", "GOOG", "MSFT", "AMZN"]}
