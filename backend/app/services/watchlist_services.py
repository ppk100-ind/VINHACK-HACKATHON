# Simple in-memory user watchlist storage
user_watchlists = {}

def get_watchlist(uid: str):
    """
    Returns the watchlist for a given user ID.
    """
    watchlist = user_watchlists.get(uid)
    if watchlist is None:
        return {"watchlist": []}
    return {"watchlist": watchlist}

def add_to_watchlist(uid: str, symbol: str):
    """
    Adds a stock symbol to the user's watchlist if not already present
    and returns the updated watchlist.
    """
    if not uid or not symbol:
        raise ValueError("User ID and symbol must be provided")

    watchlist = user_watchlists.setdefault(uid, [])
    if symbol not in watchlist:
        watchlist.append(symbol)
    return {"watchlist": watchlist}

def remove_from_watchlist(uid: str, symbol: str):
    """
    Removes a stock symbol from the user's watchlist if present
    and returns the updated watchlist.
    """
    if not uid or not symbol:
        raise ValueError("User ID and symbol must be provided")

    watchlist = user_watchlists.get(uid, [])
    if symbol in watchlist:
        watchlist.remove(symbol)
    return {"watchlist": watchlist}
