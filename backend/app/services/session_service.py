import asyncio
from app.utils.solana_utils import record_session_data

def save_session_to_blockchain(wallet_private_key: str, session_data: dict):
    """
    Save the session to Solana blockchain using the given wallet.
    """
    loop = asyncio.get_event_loop()
    tx_sig = loop.run_until_complete(record_session_data(wallet_private_key, session_data))
    return tx_sig
