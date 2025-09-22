from fastapi import APIRouter, Depends, HTTPException
from app.services.firebase_service import verify_token

router = APIRouter()

# Placeholder: Put actual DB code here, currently stores in-memory
user_watchlists = {}

@router.get("/")
def get_watchlist(uid: str):
    return {"watchlist": user_watchlists.get(uid, [])}

@router.post("/add")
def add_to_watchlist(uid: str, symbol: str):
    if uid not in user_watchlists:
        user_watchlists[uid] = []
    user_watchlists[uid].append(symbol)
    return {"watchlist": user_watchlists[uid]}

@router.post("/remove")
def remove_from_watchlist(uid: str, symbol: str):
    if uid in user_watchlists and symbol in user_watchlists[uid]:
        user_watchlists[uid].remove(symbol)
    return {"watchlist": user_watchlists.get(uid, [])}
