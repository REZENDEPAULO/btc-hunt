import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../wallet';

const Balance = () => {
  const { address } = useContext(WalletContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://mempool.space/testnet/api/address/${address}`);
        const data = await response.json();
        setBalance(data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum);
      } catch (error) {
        console.error('Erro ao buscar saldo:', error);
      }
    };

    if (address) {
      fetchBalance();
    }
  }, [address]);

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h2>Saldo Testnet BTC</h2>
      {balance !== null ? (
        <p style={{ fontSize: '18px' }}>{(balance / 1e8).toFixed(8)} tBTC</p>
      ) : (
        <p>Carregando saldo...</p>
      )}
    </div>
  );
};

export default Balance;
