import React from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import { useWallet } from '../wallet';

export default function GenerateWallet() {
  const { setAddress, setWIF } = useWallet();

  const generateWallet = () => {
    const keyPair = bitcoin.ECPair.makeRandom({ network: bitcoin.networks.testnet });
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.testnet });
    const wif = keyPair.toWIF();

    setAddress(address);
    setWIF(wif);
  };

  return (
    <div>
      <h2>Gerar Carteira BTC (Testnet)</h2>
      <button onClick={generateWallet}>Gerar Carteira</button>
    </div>
  );
}
