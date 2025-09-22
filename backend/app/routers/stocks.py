import os
import httpx

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"

async def get_stock_price(symbol):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            BASE_URL,
            params={"function": "GLOBAL_QUOTE", "symbol": symbol, "apikey": API_KEY}
        )
        data = response.json()
    # Extract needed data from API response
    quote = data.get("Global Quote", {})
    return {
        "symbol": symbol,
        "price": quote.get("05. price"),
        "change": quote.get("09. change"),
        "percent_change": quote.get("10. change percent"),
    }
