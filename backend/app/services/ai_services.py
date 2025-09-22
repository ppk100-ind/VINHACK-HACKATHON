import os
from openai import OpenAI


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def chat_ai(prompt):
    response = await client.chat.completions.acreate(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.75,
        max_tokens=100,
    )
    return {"answer": response.choices[0].message.content}


import numpy as np
from sklearn.linear_model import LinearRegression

def trend_predict(prices):
    prices = np.array(prices).reshape(-1, 1)
    X = np.arange(len(prices)).reshape(-1, 1)

    model = LinearRegression().fit(X, prices)
    slope = model.coef_[0][0]

    if slope > 0:
        return {"trend": "bullish", "confidence": min(abs(slope) * 100, 100)}
    else:
        return {"trend": "bearish", "confidence": min(abs(slope) * 100, 100)}

def trend_predict(prices):
    if prices[-1] > prices[-5]:
        return {"trend": "bullish", "confidence": 80}
    else:
        return {"trend": "bearish", "confidence": 80}

def risk_assess(prices):
    import numpy as np
    vol = np.std(prices)
    if vol < 2:
        return {"risk": "low"}
    elif vol < 5:
        return {"risk": "medium"}
    else:
        return {"risk": "high"}

def chat_ai(prompt):
    return {"answer": f"AI response to: {prompt}"}
