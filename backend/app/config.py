import os
from dotenv import load_dotenv

load_dotenv()

SOLANA_RPC_URL = os.getenv("SOLANA_RPC_URL", "https://api.devnet.solana.com")
WALLET_PRIVATE_KEY_PATH = os.getenv("WALLET_PRIVATE_KEY_PATH", "wallet.json")
