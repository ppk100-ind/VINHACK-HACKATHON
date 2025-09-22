from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#CORS to be added
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return {"status": "ok"}
