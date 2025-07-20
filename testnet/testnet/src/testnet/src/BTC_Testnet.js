import React, { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";

export default function BTC_Testnet() {
  const testnet = bitcoin.networks.testnet;
  const [keyPair, setKeyPair] = useState(null);
  const [address, setAddress] = useState("");
  const [privKeyWIF, setPrivKeyWIF] = useState("");
  const [txHex, setTxHex] = useState("");

  const generateKey = () => {
    const pair = bitcoin.ECPair.makeRandom({ network: testnet });
    setKeyPair(pair);
    setPrivKeyWIF(pair.toWIF());
    const { address } = bitcoin.payments.p2wpkh({ pubkey: pair.publicKey, network: testnet });
    setAddress(address);
    setTxHex("");
  };

  const simulateTx = () => {
    if (!keyPair) {
      alert("Gere uma chave primeiro!");
      return;
    }

    try {
      const psbt = new bitcoin.Psbt({ network: testnet });

      // Dados fictícios para simulação
      psbt.addInput({
        hash: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        index: 0,
        witnessUtxo: {
          script: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: testnet }).output,
          value: 100000,
        },
      });

      psbt.addOutput({
        address: address,
        value: 90000,
      });

      psbt.signInput(0, keyPair);
      psbt.validateSignaturesOfInput(0);
      psbt.finalizeAllInputs();

      const tx = psbt.extractTransaction();
      setTxHex(tx.toHex());
    } catch (e) {
      alert("Erro ao gerar transação: " + e.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "Arial", textAlign: "center" }}>
      <h2>Bitcoin Testnet</h2>
      <button onClick={generateKey} style={{ padding: 10, margin: 10 }}>
        Gerar chave Testnet
      </button>
      {address && (
        <>
          <p><b>Endereço:</b> {address}</p>
          <p style={{ wordBreak: "break-all" }}><b>Chave privada (WIF):</b> {privKeyWIF}</p>
          <button onClick={simulateTx} style={{ padding: 10, margin: 10 }}>
            Simular transação
          </button>
          {txHex && (
            <>
              <p><b>Raw Tx Hex:</b></p>
              <textarea readOnly style={{ width: "100%", height: 100 }}>{txHex}</textarea>
            </>
          )}
        </>
      )}
    </div>
  );
}
