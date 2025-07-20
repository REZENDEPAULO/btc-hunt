import React from 'react';
import WalletInfo from './components/WalletInfo';

function App() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '30px', color: '#fff' }}>
      <h1>BTC Hunt - Testnet</h1>
      <WalletInfo />
    </div>
  );
}

export default App;
