from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.session_service import save_session_to_blockchain

router = APIRouter()

# Request body model
class SessionData(BaseModel):
    wallet_private_key: str
    user: str
    punch_count: int
    avg_speed: float

@router.post("/session/save")
async def save_session(session: SessionData):
    try:
        tx_signature = save_session_to_blockchain(session.wallet_private_key, session.dict(exclude={"wallet_private_key"}))
        return {"status": "success", "tx_signature": tx_signature}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
