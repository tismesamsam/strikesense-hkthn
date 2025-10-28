import pytest
from unittest.mock import AsyncMock, patch
from solders.keypair import Keypair
from backend.app.utils.solana_utils import send_transaction, load_wallet_keypair

@pytest.mark.asyncio
async def test_send_transaction():
    # Mock client
    mock_client = AsyncMock()
    mock_client.send_transaction.return_value = {"result": "mock_tx_signature"}

    # Mock wallet keypair to avoid reading wallet.json
    test_keypair = Keypair()
    with patch("app.services.solana_utils.load_wallet_keypair", return_value=test_keypair):
        resp = await send_transaction(
            lamports=1000,
            to_pubkey="9DBZpAnfrM1UTrKDZtWpKuu64MPEj9NxACkFTzZJRbYQ",
            client=mock_client
        )

    assert resp == {"result": "mock_tx_signature"}
