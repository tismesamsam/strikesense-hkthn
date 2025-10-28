from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.utils.solana_utils import record_session_data, send_sol, generate_wallet
import asyncio

app = FastAPI()

# Demo wallet (sender) — in production store securely
SENDER_WALLET = generate_wallet()

class SessionData(BaseModel):
    user: str
    punch_count: int
    avg_speed: float
    wallet_address: str | None = None  # optional user wallet

@app.get("/")
def root():
    return {"message": "Strikesense API is running."}

@app.post("/api/session")
async def save_session(data: SessionData):
    try:
        # Record session on-chain (Memo program or your program)
        tx_sig = await record_session_data(SENDER_WALLET["private_key"], data.dict())

        reward_sig = None
        # Reward every 1000 punches if wallet provided
        if data.punch_count >= 1000 and data.wallet_address:
            reward_sig = await send_sol(
                SENDER_WALLET["private_key"],
                data.wallet_address,
                0.05  # reward amount
            )

        return {
            "message": "Session recorded successfully!",
            "tx_signature": tx_sig,
            "reward_signature": reward_sig
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
