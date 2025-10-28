# app/routes/punch_ws.py
from fastapi import APIRouter, WebSocket
from services.punch_couner import start_punch_counting

router = APIRouter()

@router.websocket("/ws/punches/{user_id}")
async def punch_ws(websocket: WebSocket, user_id: int):
    await websocket.accept()
    async for count in start_punch_counting(user_id):
        await websocket.send_json({"punch_count": count})

# app/routes/punch_ws.py (end session part)
from app.services.session_service import record_session_on_chain
from solana.rpc.async_api import AsyncClient

async def end_session(user_id: int, punch_count: int, wallet_pubkey: str):
    async with AsyncClient("https://api.devnet.solana.com") as client:
        await record_session_on_chain(
            user_id,
            {"punch_count": punch_count, "wallet_pubkey": wallet_pubkey, "avg_speed": 2.5},
            client
        )
