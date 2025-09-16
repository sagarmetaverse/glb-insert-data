import { EdDSASigner } from 'did-jwt';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';

// Replace with your real private key
const privateKey = Buffer.from('z0tkhTxKEkpAy6NYT4Rqk9Yosq75EAqiPvFzljiZHqkXjVOqei37Tu2w58px7uGxR8Gt17VtQ6mnxnJQtHXxkw==', 'base64');
const did = 'did:key:z6Mkg3CQtXGbPTQiypAMfgcUNBxWnLe6ka4JK6nMCyHSu9w8';

const vcPayload = {
  sub: did,
  iss: did,
  nbf: Math.floor(Date.now() / 1000),
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'AvatarCredential'],
    credentialSubject: {
      id: did,
      modelHash: 'sha256:deadbeefcafebabefeedface1234567890abcdef1234567890abcdef1234567890ab',
      issuedFor: 'OpenMetaverse'
    }
  }
};

const jwt = await createVerifiableCredentialJwt(vcPayload, { 
  signer: EdDSASigner(privateKey),
  alg: 'EdDSA'
});
console.log(jwt);
