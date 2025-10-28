from typing import Any

def validate_positive_int(value: Any, field_name: str) -> int:
    """Ensure a value is a positive integer."""
    if not isinstance(value, int) or value <= 0:
        raise ValueError(f"{field_name} must be a positive integer")
    return value

def validate_wallet_pubkey(pubkey: str) -> str:
    """Basic validation for Solana public key length."""
    if not isinstance(pubkey, str) or len(pubkey) != 44:
        raise ValueError("Invalid Solana public key")
    return pubkey
