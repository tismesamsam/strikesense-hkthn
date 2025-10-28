import React, { useState } from "react";
import { Wallet, ArrowUpRight, Copy, Check, AlertCircle, DollarSign, TrendingUp, Eye, EyeOff } from "lucide-react";

const WalletPage = () => {
  const [balance] = useState(47.85); // Demo balance in SOL
  const [solPrice] = useState(142.50); // Demo SOL price in USD
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Demo transaction history
  const [transactions] = useState([
    { id: 1, type: "Earned", amount: 12.5, date: "2025-10-27", status: "completed" },
    { id: 2, type: "Earned", amount: 8.3, date: "2025-10-26", status: "completed" },
    { id: 3, type: "Withdrawn", amount: -15.0, date: "2025-10-25", status: "completed" },
    { id: 4, type: "Earned", amount: 20.0, date: "2025-10-24", status: "completed" },
  ]);

  const demoAddress = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";
  const demoPrivateKey = "5J3mBbAH58CpQ3Y2hnwC3YxJqJH..."; // Truncated for demo

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !walletAddress) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setWithdrawSuccess(true);
      setTimeout(() => {
        setWithdrawSuccess(false);
        setWithdrawAmount("");
        setWalletAddress("");
      }, 3000);
    }, 2000);
  };

  const maxWithdraw = () => {
    setWithdrawAmount((balance - 0.01).toFixed(2)); // Keep 0.01 SOL for fees
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', animation: 'fadeInDown 0.6s ease-out' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #ff1c1c 0%, #ffffff 40%, #ff1c1c 60%, #cc0000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-2px',
          marginBottom: '0.5rem',
          filter: 'drop-shadow(0 0 20px rgba(255, 28, 28, 0.4))'
        }}>
          Wallet
        </h1>
        <p style={{ color: '#999', fontSize: '1.125rem' }}>
          Manage your earnings and withdraw to your Solana wallet
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Balance Card */}
        <div style={{
          background: 'rgba(10, 10, 10, 0.85)',
          borderRadius: '1rem',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 28, 28, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 28, 28, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 28, 28, 0.1), transparent)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Wallet size={24} style={{ color: '#ff1c1c' }} />
              <span style={{ color: '#999', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '1px' }}>
                TOTAL BALANCE
              </span>
            </div>
            
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ff1c1c 0%, #ffffff 50%, #cc0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              marginBottom: '0.5rem',
              filter: 'drop-shadow(0 0 20px rgba(255, 28, 28, 0.4))'
            }}>
              {balance.toFixed(2)} SOL
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#999', fontSize: '1.125rem' }}>
              <DollarSign size={18} />
              <span>${(balance * solPrice).toFixed(2)} USD</span>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 28, 28, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#999' }}>SOL Price</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' }}>
                  <TrendingUp size={16} />
                  <span style={{ fontWeight: 700 }}>${solPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address Card */}
        <div style={{
          background: 'rgba(10, 10, 10, 0.85)',
          borderRadius: '1rem',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 28, 28, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 28, 28, 0.08), transparent)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#999', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '1px' }}>
                YOUR WALLET ADDRESS
              </span>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 28, 28, 0.2)',
              marginBottom: '1rem',
              wordBreak: 'break-all',
              fontSize: '0.875rem',
              color: '#ccc',
              fontFamily: 'monospace'
            }}>
              {demoAddress}
            </div>

            <button
              onClick={() => handleCopy(demoAddress)}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: copied ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 28, 28, 0.1)',
                border: copied ? '2px solid #4ade80' : '2px solid rgba(255, 28, 28, 0.3)',
                borderRadius: '0.5rem',
                color: copied ? '#4ade80' : '#ff1c1c',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = 'rgba(255, 28, 28, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = 'rgba(255, 28, 28, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.3)';
                }
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Address'}
            </button>

            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#999', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '1px' }}>
                  PRIVATE KEY
                </span>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff1c1c',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPrivateKey ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              
              <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 28, 28, 0.2)',
                wordBreak: 'break-all',
                fontSize: '0.875rem',
                color: '#ccc',
                fontFamily: 'monospace',
                filter: showPrivateKey ? 'none' : 'blur(8px)',
                transition: 'filter 0.2s ease'
              }}>
                {demoPrivateKey}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Section */}
      <div style={{
        marginTop: '2rem',
        background: 'rgba(10, 10, 10, 0.85)',
        borderRadius: '1rem',
        padding: '2rem',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 28, 28, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255, 28, 28, 0.08), transparent)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ArrowUpRight size={24} style={{ color: '#ff1c1c' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>
                Withdraw Funds
              </h2>
            </div>
            <p style={{ color: '#999', fontSize: '0.875rem' }}>
              Transfer your earnings to any Solana wallet address
            </p>
          </div>

          {withdrawSuccess && (
            <div style={{
              padding: '1rem',
              background: 'rgba(74, 222, 128, 0.1)',
              border: '2px solid #4ade80',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <Check size={20} style={{ color: '#4ade80' }} />
              <span style={{ color: '#4ade80', fontWeight: 700 }}>
                Withdrawal successful! Transaction is being processed.
              </span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                color: '#999',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '0.5rem'
              }}>
                AMOUNT (SOL)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max={balance}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 28, 28, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 700,
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.6)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.3)'}
                />
                <button
                  onClick={maxWithdraw}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(255, 28, 28, 0.2)',
                    border: '1px solid rgba(255, 28, 28, 0.4)',
                    borderRadius: '0.25rem',
                    color: '#ff1c1c',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 28, 28, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 28, 28, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.4)';
                  }}
                >
                  MAX
                </button>
              </div>
              {withdrawAmount && (
                <p style={{ color: '#999', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  ≈ ${(parseFloat(withdrawAmount) * solPrice).toFixed(2)} USD
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#999',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '0.5rem'
              }}>
                RECIPIENT WALLET ADDRESS
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter Solana wallet address"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '2px solid rgba(255, 28, 28, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.3)'}
              />
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 165, 0, 0.1)',
            border: '1px solid rgba(255, 165, 0, 0.3)',
            borderRadius: '0.5rem',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <AlertCircle size={20} style={{ color: '#ffa500', flexShrink: 0, marginTop: '0.125rem' }} />
            <div style={{ fontSize: '0.875rem', color: '#ffa500' }}>
              <strong>Important:</strong> Network fees of ~0.01 SOL will be deducted. Always double-check the recipient address before confirming.
            </div>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: (!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance)
                ? 'rgba(100, 100, 100, 0.3)'
                : 'linear-gradient(135deg, #ff1c1c, #cc0000)',
              border: '2px solid',
              borderColor: (!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance)
                ? 'rgba(100, 100, 100, 0.5)'
                : '#ff1c1c',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 900,
              letterSpacing: '1px',
              cursor: (!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance)
                ? 'not-allowed'
                : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: (!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance)
                ? 'none'
                : '0 0 40px rgba(255, 28, 28, 0.5)',
              transition: 'all 0.2s ease',
              opacity: (!withdrawAmount || !walletAddress || isProcessing || parseFloat(withdrawAmount) > balance) ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (withdrawAmount && walletAddress && !isProcessing && parseFloat(withdrawAmount) <= balance) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 28, 28, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 28, 28, 0.5)';
            }}
          >
            {isProcessing ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                PROCESSING...
              </>
            ) : (
              <>
                <ArrowUpRight size={20} />
                WITHDRAW FUNDS
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{
        marginTop: '2rem',
        background: 'rgba(10, 10, 10, 0.85)',
        borderRadius: '1rem',
        padding: '2rem',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 28, 28, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff' }}>
          Transaction History
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                padding: '1.25rem',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 28, 28, 0.2)',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.2)';
              }}
            >
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                  {tx.type}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#999' }}>
                  {tx.date}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 900,
                  color: tx.amount > 0 ? '#4ade80' : '#ff1c1c'
                }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} SOL
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#4ade80',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default WalletPage;