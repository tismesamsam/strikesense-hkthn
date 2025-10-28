from pydantic import BaseModel

class SendTransactionRequest(BaseModel):
    amount: int            # lamports to send
    recipient_pubkey: str  # Solana public key of recipient

from pydantic import BaseModel

class RecordSessionOnChainRequest(BaseModel):
    user_pubkey: str       # user's Solana public key
    session_data: dict     # dictionary containing punch_count, avg_speed, etc.
