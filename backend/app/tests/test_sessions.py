import pytest
from datetime import datetime
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def create_test_user():
    resp = client.post("/users/", json={
        "username": "test_user",
        "wallet_pubkey": "11111111111111111111111111111111111111111111"
    })
    return resp.json()["id"]

def test_record_session(create_test_user):
    user_id = create_test_user

    response = client.post("/sessions/", json={
        "user_id": user_id,
        "punch_count": 50,
        "avg_speed": 2.5
    })

    assert response.status_code == 200
    data = response.json()
    # Convert timestamp to string for comparison
    assert "timestamp" in data
    assert isinstance(data["timestamp"], str)
    assert data["punch_count"] == 50

def test_get_user_sessions(create_test_user):
    user_id = create_test_user

    # Record 2 sessions
    client.post("/sessions/", json={"user_id": user_id, "punch_count": 20, "avg_speed": 1.5})
    client.post("/sessions/", json={"user_id": user_id, "punch_count": 30, "avg_speed": 2.0})

    resp = client.get(f"/sessions/user/{user_id}")
    assert resp.status_code == 200
    sessions = resp.json()
    assert len(sessions) >= 2
    for s in sessions:
        assert "timestamp" in s
        assert isinstance(s["timestamp"], str)
