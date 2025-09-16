import { generateKeyPair } from '@stablelib/ed25519';
import bs58 from 'bs58';

// Ed25519 public key multicodec header (0xED01)
const ED25519_HEADER = Buffer.from([0xED, 0x01]);

const { publicKey, secretKey } = generateKeyPair();

// Multicodec + publicKey
const mcPubKey = Buffer.concat([ED25519_HEADER, Buffer.from(publicKey)]);

// Multibase (base58btc, prefix 'z')
const mbPubKey = 'z' + bs58.encode(mcPubKey);

// DID:key
const didKey = `did:key:${mbPubKey}`;

console.log("DID:", didKey);
console.log("Public Key (base58btc):", mbPubKey);
console.log("Private Key (base64):", Buffer.from(secretKey).toString("base64"));