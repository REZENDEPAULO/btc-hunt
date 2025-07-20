import React from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { useWallet } from '../wallet';

bitcoin.initEccLib(ecc);

function GenerateWallet() {
  const { setAddress, setWif } = useWallet();

  const generate = () => {
    const keyPair = bitcoin.ECPair.makeRandom({ network: bitcoin.networks.testnet });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: bitcoin.networks.testnet
    });
    const wif = keyPair.toWIF();

    setAddress(address);
    setWif(wif);
  };

  return (
    <div>
      <button onClick={generate}>Gerar Carteira Testnet</button>
    </div>
  );
}

export default GenerateWallet;
