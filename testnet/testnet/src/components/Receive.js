import React, { useContext } from 'react';
import { WalletContext } from '../wallet';

const Receive = () => {
  const { address } = useContext(WalletContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    alert('Endereço copiado!');
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h2>Receber Testnet BTC</h2>
      <p style={{ wordBreak: 'break-word', fontSize: '18px' }}>{address}</p>
      <button onClick={copyToClipboard} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Copiar Endereço
      </button>
    </div>
  );
};

export default Receive;
