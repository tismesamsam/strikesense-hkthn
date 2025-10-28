from pydantic import BaseModel
from datetime import datetime

class PunchSession(BaseModel):
    id: int
    user_id: int
    punch_count: int
    avg_speed: float
    timestamp: datetime
