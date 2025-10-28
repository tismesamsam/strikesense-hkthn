# app/tests/test_solana_utils.py
import pytest
from backend.app.utils import solana_utils

def test_generate_wallet():
    wallet = solana_utils.generate_wallet()
    assert "public_key" in wallet
    assert "secret_key" in wallet
    assert len(wallet["secret_key"]) == 64

def test_get_balance(monkeypatch):
    # Mock client response
    class MockClient:
        def get_balance(self, pub, commitment=None):
            return {"result": {"value": 2_000_000_000}}  # 2 SOL

    monkeypatch.setattr(solana_utils, "SolderClient", lambda rpc: MockClient())
    balance = solana_utils.get_balance("FakePubkey")
    assert balance == 2.0

def test_record_session(monkeypatch):
    class MockClient:
        pass  # No real RPC needed

    monkeypatch.setattr(solana_utils, "SolderClient", lambda rpc: MockClient())
    result = solana_utils.record_session("FakePubkey", punches=10, avg_speed=1.5)
    assert "status" in result
    assert "tx_preview" in result
    assert isinstance(result["tx_preview"], str)
