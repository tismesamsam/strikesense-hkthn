from pydantic import BaseModel

class PunchSessionCreate(BaseModel):
    user_id: int           # ID of the user
    punch_count: int       # punches in the session
    avg_speed: float       # average speed of punches

class PunchSessionResponse(PunchSessionCreate):
    id: int                # session ID
    timestamp: str         # UTC timestamp of session creation

