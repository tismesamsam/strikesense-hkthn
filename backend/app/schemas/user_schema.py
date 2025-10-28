from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str          # frontend username input
    wallet_pubkey: str     # Solana wallet public key

class UserResponse(BaseModel):
    id: int                # user ID assigned by backend
    username: str
    wallet_pubkey: str
