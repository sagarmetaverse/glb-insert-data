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

    // Optional: Check if the resolved DID matches the one in the GLB
    if (didDocument.didDocument.id !== did) {
        throw new Error('Resolved DID does not match the DID in the GLB file.');
    }

    console.log('DID verification successful.');

} catch (error) {
    console.error("Error verifying DID:", error.message);
}