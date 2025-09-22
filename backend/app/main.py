from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # load all variables from .env file

# Now os.getenv() will have access
print("Gemini API Key:", os.getenv('GEMINI_API_KEY'))

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
