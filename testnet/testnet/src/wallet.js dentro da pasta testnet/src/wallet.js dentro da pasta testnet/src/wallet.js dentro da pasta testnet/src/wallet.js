import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [address, setAddress] = useState('');
  const [wif, setWif] = useState('');

  return (
    <WalletContext.Provider value={{ address, setAddress, wif, setWif }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
