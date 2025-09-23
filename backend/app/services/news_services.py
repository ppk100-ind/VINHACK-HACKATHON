import os
import httpx

NEWS_API_KEY = "5eeab9f9ef2c491291985034a03196e0"

async def get_latest_news(symbol: str):
    try:
        if not NEWS_API_KEY:
            return {
                "news": [
                    {
                        "title": f"Stock News for {symbol} - API Key Required",
                        "summary": "Configure NEWS_API_KEY to get stock-related news",
                        "url": "#",
                        "source": "System"
                    }
                ]
            }

        url = "https://newsapi.org/v2/everything"
        params = {
            "q": f"{symbol} stock OR {symbol} shares OR {symbol} market",
            "sources": "bloomberg,cnbc,the-wall-street-journal,business-insider",
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
        news_list = [
            {
                "title": a.get("title"),
                "summary": a.get("description"),
                "url": a.get("url"),
                "source": a.get("source", {}).get("name")
            }
            for a in articles
        ]

        return {"news": news_list}
    
    except Exception as e:
        return {
            "news": [
                {
                    "title": f"Error fetching stock news for {symbol}",
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