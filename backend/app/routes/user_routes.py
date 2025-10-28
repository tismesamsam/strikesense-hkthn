from fastapi import APIRouter
from fastapi import Body

router = APIRouter()

# In-memory "DB"
users_db = {}
next_id = 1

@router.post("/")
def create_user(username: str = Body(...), wallet_pubkey: str = Body(...)):
    global next_id
    user_id = next_id
    next_id += 1
    users_db[user_id] = {"id": user_id, "username": username, "wallet_pubkey": wallet_pubkey}
    return users_db[user_id]

@router.get("/{user_id}")
def get_user(user_id: int):
    return users_db.get(user_id, {"error": "user not found"})
