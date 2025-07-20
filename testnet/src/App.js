import React from 'react';
import WalletGenerator from './components/WalletGenerator';
import WalletInfo from './components/WalletInfo';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>BTC Hunt - Testnet</h1>
      <WalletGenerator />
      <hr />
      <WalletInfo />
    </div>
  );
};

export default App;
