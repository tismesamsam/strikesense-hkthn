from solana.rpc.async_api import AsyncClient
from config import SOLANA_RPC_URL

async def get_solana_client():
    client = AsyncClient(SOLANA_RPC_URL)
    try:
        yield client
    finally:
        await client.close()
