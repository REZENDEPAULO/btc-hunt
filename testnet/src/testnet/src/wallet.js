import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';

export function generateWallet() {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
  const account = root.derivePath("m/44'/1'/0'/0/0");
  const { address } = bitcoin.payments.p2pkh({
    pubkey: account.publicKey,
    network: bitcoin.networks.testnet,
  });
  const privateKey = account.toWIF();

  return {
    mnemonic,
    address,
    privateKey,
  };
}
