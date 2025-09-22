import os
import numpy as np
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Trend detection using simple linear regression
def trend_predict(prices):
    if len(prices) < 2:
        return {"trend": "neutral", "confidence": 50}

    X = np.arange(len(prices)).reshape(-1, 1)
    y = np.array(prices).reshape(-1, 1)
    from sklearn.linear_model import LinearRegression
    model = LinearRegression().fit(X, y)
    slope = model.coef_[0][0]
    confidence = min(int(abs(slope) * 100), 100)
    trend = "bullish" if slope > 0 else "bearish"
    return {"trend": trend, "confidence": confidence}

# Risk assessment using volatility
def risk_assess(prices):
    if not prices:
        return {"risk": "unknown"}
    std = float(np.std(prices))
    if std < 2:
        risk = "low"
    elif std < 5:
        risk = "medium"
    else:
        risk = "high"
    return {"risk": risk}

# LLM-powered chatbot (OpenAI GPT-3.5/4)
def chat_ai(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
        max_tokens=128,
    )
    return {"answer": response.choices[0].message.content.strip()}
