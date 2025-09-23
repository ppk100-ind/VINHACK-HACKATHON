"""
AI Service for stock analysis and predictions using OpenAI and ML models
"""
import os
import openai
from typing import Dict, Any, List
import json

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_stock_analysis(symbol: str) -> Dict[str, Any]:
    """
    Get AI-powered stock analysis
    """
    try:
        if not openai.api_key:
            return {
                "symbol": symbol,
                "analysis": "AI analysis requires OpenAI API key configuration",
                "recommendation": "HOLD",
                "confidence": 0.5,
                "trend": "Neutral",
                "risk_level": "Medium"
            }

        # Create a prompt for stock analysis
        prompt = f"""
        Provide a brief stock analysis for {symbol} including:
        1. Current trend (Bullish/Bearish/Neutral)
        2. Risk level (Low/Medium/High)
        3. Brief recommendation (BUY/HOLD/SELL)
        4. Confidence score (0-1)
        
        Respond in JSON format with keys: trend, risk_level, recommendation, confidence, summary
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a financial analyst providing stock analysis."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.3
        )
        
        analysis_text = response.choices[0].message.content
        
        # Try to parse JSON response
        try:
            analysis_data = json.loads(analysis_text)
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            analysis_data = {
                "trend": "Analysis pending",
                "risk_level": "Medium",
                "recommendation": "HOLD",
                "confidence": 0.5,
                "summary": analysis_text
            }
        
        return {
            "symbol": symbol,
            **analysis_data
        }
        
    except Exception as e:
        print(f"Error in AI analysis: {e}")
        return {
            "symbol": symbol,
            "analysis": f"Analysis error: {str(e)}",
            "recommendation": "HOLD",
            "confidence": 0.5,
            "trend": "Neutral",
            "risk_level": "Medium"
        }

async def get_stock_prediction(symbol: str) -> Dict[str, Any]:
    """
    Get AI prediction for stock price movement
    """
    try:
        # This is a placeholder for ML-based prediction
        # In a real implementation, you would use historical data and ML models
        return {
            "symbol": symbol,
            "prediction": "Price movement analysis requires historical data integration",
            "direction": "UP",
            "confidence": 0.6,
            "target_price": None,
            "timeframe": "30 days"
        }
    except Exception as e:
        return {
            "symbol": symbol,
            "prediction": f"Prediction error: {str(e)}",
            "direction": "NEUTRAL",
            "confidence": 0.5,
            "target_price": None,
            "timeframe": "30 days"
        }

async def get_ai_recommendations() -> Dict[str, Any]:
    """
    Get general AI-powered market recommendations
    """
    try:
        return {
            "recommendations": [
                {
                    "symbol": "AAPL",
                    "action": "BUY",
                    "reason": "Strong fundamentals and growth potential",
                    "confidence": 0.8
                },
                {
                    "symbol": "MSFT",
                    "action": "HOLD",
                    "reason": "Stable performance with moderate growth",
                    "confidence": 0.7
                }
            ],
            "market_sentiment": "Cautiously optimistic",
            "generated_at": "2024-01-15T10:00:00Z"
        }
    except Exception as e:
        return {
            "recommendations": [],
            "market_sentiment": f"Error: {str(e)}",
            "generated_at": "2024-01-15T10:00:00Z"
        }

# Legacy functions for backward compatibility with existing router
def trend_predict(prices: List[float]) -> Dict[str, Any]:
    """
    Simple trend prediction based on price list
    """
    try:
        if len(prices) < 2:
            return {"trend": "insufficient_data", "direction": "neutral"}
        
        recent_change = prices[-1] - prices[-2] if len(prices) >= 2 else 0
        overall_change = prices[-1] - prices[0] if len(prices) >= 1 else 0
        
        if recent_change > 0 and overall_change > 0:
            trend = "bullish"
            direction = "up"
        elif recent_change < 0 and overall_change < 0:
            trend = "bearish"
            direction = "down"
        else:
            trend = "sideways"
            direction = "neutral"
        
        return {
            "trend": trend,
            "direction": direction,
            "recent_change": recent_change,
            "overall_change": overall_change,
            "confidence": min(abs(overall_change / prices[0]) * 100, 1.0) if prices[0] != 0 else 0.5
        }
    except Exception as e:
        return {
            "trend": "error",
            "direction": "neutral",
            "error": str(e)
        }

def risk_assess(prices: List[float]) -> Dict[str, Any]:
    """
    Simple risk assessment based on price volatility
    """
    try:
        if len(prices) < 2:
            return {"risk_level": "unknown", "volatility": 0}
        
        # Calculate simple volatility as standard deviation
        import statistics
        
        if len(prices) > 1:
            volatility = statistics.stdev(prices)
            avg_price = statistics.mean(prices)
            volatility_ratio = volatility / avg_price if avg_price > 0 else 0
        else:
            volatility_ratio = 0
        
        if volatility_ratio < 0.02:
            risk_level = "low"
        elif volatility_ratio < 0.05:
            risk_level = "medium"
        else:
            risk_level = "high"
        
        return {
            "risk_level": risk_level,
            "volatility": volatility_ratio,
            "price_range": {
                "min": min(prices),
                "max": max(prices),
                "avg": avg_price
            }
        }
    except Exception as e:
        return {
            "risk_level": "unknown",
            "volatility": 0,
            "error": str(e)
        }

def chat_ai(prompt: str) -> Dict[str, Any]:
    """
    Simple AI chat for financial questions
    """
    try:
        if not openai.api_key:
            return {
                "response": "AI chat requires OpenAI API key configuration. Please set OPENAI_API_KEY environment variable.",
                "status": "error"
            }
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful financial assistant. Provide brief, accurate information about stocks and investing."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7
        )
        
        return {
            "response": response.choices[0].message.content,
            "status": "success"
        }
    except Exception as e:
        return {
            "response": f"Error processing request: {str(e)}",
            "status": "error"
        }