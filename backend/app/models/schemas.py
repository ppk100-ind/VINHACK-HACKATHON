from pydantic import BaseModel
from typing import List

class StockSearchResult(BaseModel):
    results: List[str]
    
class PriceRequest(BaseModel):
    symbol: str

class TrendRequest(BaseModel):
    prices: List[float]

class RiskRequest(BaseModel):
    prices: List[float]

class ChatRequest(BaseModel):
    prompt: str
