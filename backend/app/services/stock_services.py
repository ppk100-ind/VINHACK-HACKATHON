import os
import httpx
from typing import Dict, Any

# Finnhub API configuration
API_KEY = "d38r9tpr01qthpo150ugd38r9tpr01qthpo150v0"
BASE_URL = "https://finnhub.io/api/v1"

async def get_stock_price(symbol):
    try:
        print(f"API_KEY loaded: {API_KEY is not None}")
        print(f"API_KEY value: {API_KEY[:10] if API_KEY else 'None'}...")
        
        if not API_KEY:
            print("No API key found!")
            return {
                "symbol": symbol,
                "price": 0.0,
                "change": 0.0,
                "percent_change": "0%",
                "error": "Finnhub API key not configured"
            }

        # Get current price from Finnhub quote endpoint
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/quote",
                params={"symbol": symbol, "token": API_KEY}
            )
            data = response.json()
        
        # Debug: Print the response to see what we're getting
        print(f"Finnhub response for {symbol}: {data}")
        
        if not data or 'c' not in data or data.get('c') == 0:
            return {
                "symbol": symbol,
                "price": 0.0,
                "change": 0.0,
                "percent_change": "0%",
                "error": f"No data available for symbol {symbol}"
            }
        
        current_price = data.get('c', 0)  # Current price
        change = data.get('d', 0)  # Change
        percent_change = data.get('dp', 0)  # Percent change
        
        # Ensure we have valid numbers
        if current_price is None or current_price == 0:
            return {
                "symbol": symbol,
                "price": 0.0,
                "change": 0.0,
                "percent_change": "0%",
                "error": f"Invalid price data for {symbol}"
            }
        
        return {
            "symbol": symbol.upper(),
            "price": round(float(current_price), 2),
            "change": round(float(change), 2),
            "percent_change": f"{round(float(percent_change), 2)}%"
        }
    except Exception as e:
        print(f"Error in get_stock_price for {symbol}: {str(e)}")
        return {
            "symbol": symbol,
            "price": 0.0,
            "change": 0.0,
            "percent_change": "0%",
            "error": str(e)
        }

async def get_company_overview(symbol):
    try:
        if not API_KEY:
            return {
                "Symbol": symbol,
                "Name": symbol,
                "Sector": "N/A",
                "MarketCapitalization": "N/A",
                "52WeekHigh": "N/A",
                "52WeekLow": "N/A",
                "PERatio": "N/A",
                "EPS": "N/A",
                "DividendYield": "N/A",
                "error": "Finnhub API key not configured"
            }

        async with httpx.AsyncClient() as client:
            # Get company profile
            profile_response = await client.get(
                f"{BASE_URL}/stock/profile2",
                params={"symbol": symbol, "token": API_KEY}
            )
            profile_data = profile_response.json()
            
            # Get basic financials
            financials_response = await client.get(
                f"{BASE_URL}/stock/metric",
                params={"symbol": symbol, "metric": "all", "token": API_KEY}
            )
            financials_data = financials_response.json()
        
        if not profile_data or 'name' not in profile_data:
            return {
                "Symbol": symbol,
                "Name": symbol,
                "Sector": "N/A",
                "MarketCapitalization": "N/A",
                "52WeekHigh": "N/A",
                "52WeekLow": "N/A",
                "PERatio": "N/A",
                "EPS": "N/A",
                "DividendYield": "N/A",
                "error": "Invalid symbol or no data available"
            }
        
        # Extract metrics from financials data
        metrics = financials_data.get('metric', {})
        
        return {
            "Symbol": symbol.upper(),
            "Name": profile_data.get('name', symbol),
            "Sector": profile_data.get('finnhubIndustry', 'N/A'),
            "MarketCapitalization": str(int(profile_data.get('marketCapitalization', 0) * 1000000)) if profile_data.get('marketCapitalization') else "N/A",
            "52WeekHigh": str(metrics.get('52WeekHigh', 'N/A')),
            "52WeekLow": str(metrics.get('52WeekLow', 'N/A')),
            "PERatio": str(metrics.get('peNormalizedAnnual', 'N/A')),
            "EPS": str(metrics.get('epsInclExtraItemsAnnual', 'N/A')),
            "DividendYield": str(metrics.get('dividendYieldIndicatedAnnual', 'N/A'))
        }
    except Exception as e:
        return {
            "Symbol": symbol,
            "Name": symbol,
            "Sector": "N/A",
            "MarketCapitalization": "N/A",
            "52WeekHigh": "N/A",
            "52WeekLow": "N/A",
            "PERatio": "N/A",
            "EPS": "N/A",
            "DividendYield": "N/A",
            "error": str(e)
        }

async def get_trending_stocks():
    try:
        return {"trending": ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN", "META"]}
    except Exception as e:
        return {"trending": ["AAPL", "MSFT", "GOOGL"], "error": str(e)}

