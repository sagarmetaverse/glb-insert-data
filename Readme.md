# GLB Avatar Identity & Verifiable Credentials

A complete system for embedding cryptographically signed Verifiable Credentials (VCs) into GLB files using decentralized identifiers (DIDs) and W3C standards.

## Features

- **Decentralized Identity**: Uses `did:key` for self-sovereign avatar identity
- **Verifiable Credentials**: W3C-compliant VCs embedded as signed JWTs
- **Cryptographic Security**: Ed25519 digital signatures prevent tampering
- **Real Verification**: Complete cryptographic proof of authenticity
- **GLB Integration**: Seamless embedding in 3D model metadata

## Installation

```bash
npm install
```

## Quick Start

### 1. Generate Avatar Identity & VC
```bash
# Creates a signed verifiable credential JWT
node vc.js
```

### 2. Embed VC in GLB File
```bash
# Embeds the signed VC into GLB metadata
node index.js <input-glb> <output-glb>
```

**Example:**
```bash
node index.js avatar.glb output-with-id.glb
```

### 3. Verify Avatar Identity
```bash
# Performs complete cryptographic verification
node verify.js
```

## What Gets Embedded

The system embeds the following structure in `asset.extras.avatarIdentity`:

```json
{
  "did": "did:key:z6Mkg3CQtXGbPTQiypAMfgcUNBxWnLe6ka4JK6nMCyHSu9w8",
  "identityType": "SSI Avatar",
  "verifiableCredential": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
}
```

## Verification Process

The verification system performs:

1. **DID Resolution**: Resolves the avatar's DID to get public key
2. **JWT Signature Verification**: Validates the VC's cryptographic signature
3. **Credential Structure Validation**: Ensures W3C compliance
4. **Identity Binding**: Confirms the VC belongs to the avatar

## Security Features

- **Digital Signatures**: Prevents VC tampering
- **Decentralized Identity**: No central authority required
- **Industry Standards**: W3C VCs and JWT tokens
- **Strong Cryptography**: Ed25519 elliptic curve signatures

## Files

- `vc.js` - Generates signed verifiable credentials
- `index.js` - Embeds VCs into GLB files
- `verify.js` - Performs complete verification
- `did-key.js` - DID key generation utilities