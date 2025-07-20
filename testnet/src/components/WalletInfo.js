import React, { useEffect, useState } from 'react';
import { generateWallet } from '../wallet';

function WalletInfo() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const newWallet = generateWallet();
    setWallet(newWallet);
  }, []);

  if (!wallet) return <div>Gerando carteira...</div>;

  return (
    <div style={{ background: '#111', padding: '20px', borderRadius: '8px', color: '#0f0' }}>
      <h2>Carteira BTC - Testnet</h2>
      <p><strong>Endereço:</strong> {wallet.address}</p>
      <p><strong>Chave Privada:</strong> {wallet.privateKey}</p>
      <p><strong>Mnemonico:</strong> {wallet.mnemonic}</p>
    </div>
  );
}

export default WalletInfo;
