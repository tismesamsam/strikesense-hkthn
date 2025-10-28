from app.models.user import User

users = []

async def create_user(user_data):
    user = User(
        id=len(users)+1,
        username=user_data.username,
        wallet_pubkey=user_data.wallet_pubkey
    )
    users.append(user)
    return user

async def get_user(user_id: int):
    for u in users:
        if u.id == user_id:
            return u
    return None
