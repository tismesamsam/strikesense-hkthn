from datetime import datetime

def get_current_utc_timestamp() -> str:
    """Return the current UTC timestamp as ISO string."""
    return datetime.utcnow().isoformat()

def calculate_avg_speed(punch_count: int, duration_seconds: float) -> float:
    """Calculate average speed of punches per second."""
    if duration_seconds <= 0:
        return 0.0
    return punch_count / duration_seconds
