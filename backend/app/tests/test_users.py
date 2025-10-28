from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", json={
        "username": "new_user",
        "wallet_pubkey": "11111111111111111111111111111111111111111111"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "new_user"
    assert "id" in data

def test_get_user():
    # Create user first
    resp_create = client.post("/users/", json={
        "username": "get_user",
        "wallet_pubkey": "11111111111111111111111111111111111111111111"
    })
    user_id = resp_create.json()["id"]

    resp_get = client.get(f"/users/{user_id}")
    assert resp_get.status_code == 200
    data = resp_get.json()
    assert data["username"] == "get_user"
    assert data["id"] == user_id
