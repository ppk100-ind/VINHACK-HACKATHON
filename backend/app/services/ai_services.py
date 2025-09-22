import os
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
