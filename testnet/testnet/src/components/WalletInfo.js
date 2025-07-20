import React from 'react';
import { useWallet } from '../wallet';

function WalletInfo() {
  const { address, wif } = useWallet();

  return (
    <div>
      <h3>Informações da Carteira</h3>
      {address ? (
        <>
          <p><strong>Endereço:</strong> {address}</p>
          <p><strong>Chave Privada (WIF):</strong> {wif}</p>
        </>
      ) : (
        <p>Nenhuma carteira gerada.</p>
      )}
    </div>
  );
}

export default WalletInfo;
