import React, { createContext, useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [keyPair, setKeyPair] = useState(null);
  const [address, setAddress] = useState('');

  const generateWallet = () => {
    const testnet = bitcoin.networks.testnet;
    const pair = bitcoin.ECPair.makeRandom({ network: testnet });
    setKeyPair(pair);

    const { address } = bitcoin.payments.p2wpkh({ pubkey: pair.publicKey, network: testnet });
    setAddress(address);
  };

  return (
    <WalletContext.Provider value={{ keyPair, address, generateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
