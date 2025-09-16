import { verifyCredential } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'key-did-resolver';
import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();
const document = await io.read('output-with-id.glb');

const didResolver = new Resolver({ ...getResolver() });

try {

    const gltf = document.getRoot().getAsset();

    if (!gltf.extras?.avatarIdentity?.did) {
        throw new Error('No DID found in GLTF extras.avatarIdentity.did');
    }

    const did = gltf.extras.avatarIdentity.did;
    console.log(`Found DID: ${did}`);

    // Resolve the DID
    const didDocument = await didResolver.resolve(did);
    console.log('DID Resolver Result:', didDocument);

    if (!didDocument || !didDocument.didDocument) {
        throw new Error('Failed to resolve DID document.');
    }

    console.log('Resolved DID Document:', JSON.stringify(didDocument.didDocument, null, 2));

    // Check if the resolved DID matches the one in the GLB
    if (didDocument.didDocument.id !== did) {
        throw new Error('Resolved DID does not match the DID in the GLB file.');
    }

    console.log('DID verification successful.');

    // VC JWT Verification
    const vcJwt = gltf.extras.avatarIdentity.verifiableCredential;
    if (!vcJwt) {
        throw new Error('No verifiableCredential found in GLTF extras.avatarIdentity');
    }
    // vcJwt should be a JWT string
    try {
        const verifiedVC = await verifyCredential(vcJwt, didResolver);
        console.log('VC JWT verification successful.');
        console.log('Verified VC:', JSON.stringify(verifiedVC, null, 2));
    } catch (err) {
        throw new Error('VC JWT verification failed: ' + err.message);
    }

} catch (error) {
    console.error("Error verifying DID:", error.message);
}