import os
import httpx
from typing import Dict, Any

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

async def get_latest_news(symbol: str):
    try:
        if not NEWS_API_KEY:
            return {
                "news": [
                    {
                        "title": f"News for {symbol} - API Key Required",
                        "summary": "Configure NEWS_API_KEY to get real-time news",
                        "url": "#",
                        "source": "System"
                    }
                ]
            }

        url = "https://newsapi.org/v2/everything"
        params = {
            "q": symbol,
            "apiKey": NEWS_API_KEY,
            "pageSize": 5,
            "sortBy": "publishedAt",
            "language": "en",
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()

        if data.get("status") != "ok":
            return {"news": []}

        articles = data.get("articles", [])
        news_list = []
        for article in articles:
            news_list.append({
                "title": article.get("title"),
                "summary": article.get("description"),
                "url": article.get("url"),
                "source": article.get("source", {}).get("name")
            })

        return {"news": news_list}
    
    except Exception as e:
        return {
            "news": [
                {
                    "title": f"Error fetching news for {symbol}",
                    "summary": str(e),
                    "url": "#",
                    "source": "System"
                }
            ]
        }

async def get_market_news():
    """Get general market news"""
    try:
        if not NEWS_API_KEY:
            return {
                "articles": [
                    {
                        "title": "Market News - API Key Required",
                        "description": "Configure NEWS_API_KEY to get real-time market news",
                        "url": "#",
                        "source": "System"
                    }
                ]
            }

        url = "https://newsapi.org/v2/top-headlines"
        params = {
            "category": "business",
            "country": "us",
            "pageSize": 10,
            "apiKey": NEWS_API_KEY
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()

        if data.get("status") != "ok":
            return {"articles": []}

        return {"articles": data.get("articles", [])}
    
    except Exception as e:
        return {
            "articles": [
                {
                    "title": "Error fetching market news",
                    "description": str(e),
                    "url": "#",
                    "source": "System"
                }
            ]
        }
