import base64
import json
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.instruction import Instruction
from solders.transaction import Transaction
from solana.rpc.async_api import AsyncClient
from solana.rpc.commitment import Confirmed
from solana.rpc.types import TxOpts
from solders.system_program import transfer, TransferParams

MEMO_PROGRAM_ID = Pubkey.from_string("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
RPC_URL = "https://api.devnet.solana.com"


# ----------------------------------------------
# Solana Client
# ----------------------------------------------
async def get_solana_client():
    return AsyncClient(RPC_URL, commitment=Confirmed)


# ----------------------------------------------
# Generate a new Solana wallet
# ----------------------------------------------
def generate_wallet():
    kp = Keypair()
    return {
        "public_key": str(kp.pubkey()),
        "private_key": base64.b64encode(kp.secret()).decode("utf-8"),
    }


# ----------------------------------------------
# Request Devnet Airdrop
# ----------------------------------------------
async def request_airdrop(pubkey: str, sol_amount: float = 1.0):
    client = await get_solana_client()
    lamports = int(sol_amount * 1_000_000_000)
    resp = await client.request_airdrop(Pubkey.from_string(pubkey), lamports)
    await client.confirm_transaction(resp.value)
    await client.close()
    return resp.value


# ----------------------------------------------
# Send SOL between wallets
# ----------------------------------------------
async def send_sol(sender_private_key: str, recipient_pubkey: str, sol_amount: float):
    client = await get_solana_client()
    sender = Keypair.from_bytes(base64.b64decode(sender_private_key))
    recipient = Pubkey.from_string(recipient_pubkey)
    lamports = int(sol_amount * 1_000_000_000)

    params = TransferParams(from_pubkey=sender.pubkey(), to_pubkey=recipient, lamports=lamports)
    tx_instruction = transfer(params)

    tx = Transaction().add(tx_instruction)
    resp = await client.send_transaction(tx, sender, opts=TxOpts(skip_preflight=True))
    await client.close()
    return resp.value


# ----------------------------------------------
# Record training session data on-chain (via Memo)
# ----------------------------------------------
async def record_session_on_chain(wallet_private_key: str, session_data: dict):
    """
    Records session metadata on-chain using the Solana Memo program.
    Example session_data:
    {
        "user": "sam",
        "punch_count": 120,
        "avg_speed": 3.8
    }
    """
    client = await get_solana_client()
    wallet = Keypair.from_bytes(base64.b64decode(wallet_private_key))

    # Ensure the wallet has some SOL
    balance_resp = await client.get_balance(wallet.pubkey())
    if balance_resp.value < 1000000:  # less than 0.001 SOL
        print("💧 Airdropping 1 SOL for gas...")
        await request_airdrop(str(wallet.pubkey()), 1.0)

    memo_data = json.dumps(session_data).encode("utf-8")

    ix = Instruction(program_id=MEMO_PROGRAM_ID, accounts=[], data=memo_data)
    tx = Transaction().add(ix)

    resp = await client.send_transaction(tx, wallet, opts=TxOpts(skip_preflight=True))
    await client.confirm_transaction(resp.value)
    await client.close()

    print("✅ Session recorded on-chain:", resp.value)
    return resp.value
