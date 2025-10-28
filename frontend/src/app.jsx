import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PunchCounter from "./Components/Session/PunchCounter";
import Wallet from "./wallet.jsx";

// Solana Wallet Imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

// Import the default styles for the connect wallet button
import '@solana/wallet-adapter-react-ui/styles.css';

const History = () => (
  <div className="text-white p-6 text-center text-xl">History Page Coming Soon</div>
);

const Settings = () => (
  <div className="text-white p-6 text-center text-xl">Settings Page Coming Soon</div>
);

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PunchCounter />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wallet" element={<Wallet />} /> 
      </Routes>
    </Layout>
  );
}

export default function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}