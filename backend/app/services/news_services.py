import os
import requests

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

def get_latest_news(symbol: str):
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": symbol,
        "apiKey": NEWSAPI_KEY,
        "pageSize": 5,
        "sortBy": "publishedAt",
        "language": "en",
    }
    response = requests.get(url, params=params)
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
