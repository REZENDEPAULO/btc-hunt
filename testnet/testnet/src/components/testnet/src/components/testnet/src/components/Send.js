import React, { useState, useContext } from 'react';
import { WalletContext } from '../wallet';

const Send = () => {
  const { address } = useContext(WalletContext);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    setStatus('Preparando transação...');

    try {
      // Apenas simulação neste momento
      setTimeout(() => {
        setStatus(`Simulado: ${amount} tBTC enviado para ${recipient}`);
      }, 1500);

      // Aqui no futuro vai o código real de envio via biblioteca como bitcoinjs-lib
    } catch (error) {
      setStatus('Erro ao enviar transação.');
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h2>Enviar Testnet BTC</h2>
      <input
        type="text"
        placeholder="Endereço de destino"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <input
        type="text"
        placeholder="Quantidade em tBTC"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleSend} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Enviar
      </button>
      <p style={{ marginTop: '10px' }}>{status}</p>
    </div>
  );
};

export default Send;
