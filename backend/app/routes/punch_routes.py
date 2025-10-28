# app/routes/punch_routes.py
from fastapi import APIRouter
from app.services.punch_tracker import PunchSession

router = APIRouter()
session = PunchSession()

@router.post("/sessions/start")
def start_session():
    session.start()
    return {"status": "session_started"}

@router.post("/sessions/stop")
def stop_session():
    stats = session.stop()
    return {"status": "session_stopped", "stats": stats}