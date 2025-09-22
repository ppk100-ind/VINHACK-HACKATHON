from pydantic import BaseModel

class PriceRequest(BaseModel):
    symbol: str

class TrendRequest(BaseModel):
    prices: list

class RiskRequest(BaseModel):
    prices: list

class ChatRequest(BaseModel):
    prompt: str
