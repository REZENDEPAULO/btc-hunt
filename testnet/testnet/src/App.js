import React from 'react';
import Home from './components/Home';
import { WalletProvider } from './wallet';

export default function App() {
  return (
    <WalletProvider>
      <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 600, margin: 'auto' }}>
        <Home />
      </div>
    </WalletProvider>
  );
}
