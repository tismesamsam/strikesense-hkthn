from fastapi import APIRouter
from fastapi import Body

router = APIRouter()

@router.post("/send")
def send_transaction(lamports: int = Body(...), to_pubkey: str = Body(...)):
    tx_signature = "MOCK_TX_SIGNATURE_123"
    print(f"[MOCK BLOCKCHAIN] Sending {lamports} lamports to {to_pubkey}, tx: {tx_signature}")
    return {"tx_signature": tx_signature}
