from fastapi import APIRouter, HTTPException
from app.services import stock_services, news_services
import os

router = APIRouter()

@router.get("/overview/{symbol}")
async def get_stock_overview(symbol: str):
    """Get stock overview including price, change, and basic info"""
    try:
        price_data = await stock_services.get_stock_price(symbol)
        overview_data = await stock_services.get_company_overview(symbol)
        
        return {
            "symbol": symbol.upper(),
            "price": price_data.get("price", 0),
            "change": price_data.get("change", 0),
            "percent_change": price_data.get("percent_change", "0%"),
            "company_name": overview_data.get("Name", symbol),
            "sector": overview_data.get("Sector", "N/A"),
            "market_cap": overview_data.get("MarketCapitalization", "N/A")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")

@router.get("/price/{symbol}")
async def get_stock_price(symbol: str):
    """Get current stock price and change"""
    try:
        return await stock_services.get_stock_price(symbol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching price: {str(e)}")

@router.get("/trending")
async def get_trending_stocks():
    """Get list of trending stocks"""
    try:
        trending = await stock_services.get_trending_stocks()
        # Get price data for each trending stock
        stocks_with_prices = []
        for symbol in trending["trending"]:
            try:
                price_data = await stock_services.get_stock_price(symbol)
                stocks_with_prices.append({
                    "symbol": symbol,
                    "price": price_data.get("price", 0),
                    "change": price_data.get("change", 0),
                    "percent_change": price_data.get("percent_change", "0%")
                })
            except:
                # If error getting price for this stock, skip it
                continue
        
        return {"trending_stocks": stocks_with_prices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trending stocks: {str(e)}")

@router.get("/keydata/{symbol}")
async def get_key_data(symbol: str):
    """Get key financial data for a stock"""
    try:
        data = await stock_services.get_company_overview(symbol)
        return {
            "symbol": symbol.upper(),
            "market_cap": data.get("MarketCapitalization", "N/A"),
            "sector": data.get("Sector", "N/A"),
            "week_high_52": data.get("52WeekHigh", "N/A"),
            "week_low_52": data.get("52WeekLow", "N/A"),
            "pe_ratio": data.get("PERatio", "N/A"),
            "dividend_yield": data.get("DividendYield", "N/A"),
            "eps": data.get("EPS", "N/A")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching key data: {str(e)}")

@router.get("/news/{symbol}")
async def get_stock_news(symbol: str):
    """Get latest news for a stock"""
    try:
        return await news_services.get_latest_news(symbol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching news: {str(e)}")

@router.get("/news")
async def get_market_news():
    """Get general market news"""
    try:
        return await news_services.get_market_news()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching market news: {str(e)}")

@router.get("/chart/{symbol}")
async def get_stock_chart(symbol: str, period: str = "1d"):
    """Get chart data for a stock (placeholder for now)"""
    # TODO: Implement actual chart data from Alpha Vantage TIME_SERIES_DAILY
    try:
        # This is a placeholder - you would implement actual chart data fetching
        return {
            "symbol": symbol,
            "period": period,
            "message": "Chart data endpoint ready for implementation",
            "data_points": []  # Will contain time series data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching chart data: {str(e)}")
