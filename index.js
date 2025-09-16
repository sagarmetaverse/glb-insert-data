import { NodeIO } from '@gltf-transform/core';
import { dedup } from '@gltf-transform/functions';


async function addMetadataToGLB(inputPath, outputPath, userId) {
    const io = new NodeIO();
    try {
        // Read the GLB file
        const document = await io.read(inputPath);

        // Set the custom metadata in asset.extras (global metadata)
        const asset = document.getRoot().getAsset();
        asset.extras = {
            avatarIdentity: {
                "did": "did:key:z6Mkniu3AZvAt7EgsB47xN9pH4Z4DarA3YFS5Wn17vuAjPff",
                "identityType": "SSI Avatar",
                "verifiableCredential": {
                    "@context": ["https://www.w3.org/2018/credentials/v1"],
                    "type": ["VerifiableCredential", "AvatarCredential"],
                    "credentialSubject": {
                        "id": "did:key:z6Mkniu3AZvAt7EgsB47xN9pH4Z4DarA3YFS5Wn17vuAjPff",
                        "modelHash": "sha256:deadbeefcafebabefeedface1234567890abcdef1234567890abcdef1234567890ab",
                        "issuedFor": "OpenMetaverse"
                    }
                }
            }
        };

        // Optional: Optimize the file
        await document.transform(dedup());

        // Write the modified GLB back to a file
        await io.write(outputPath, document);
        console.log(`Success: Metadata added and file saved to ${outputPath}`);
    } catch (error) {
        console.error('Error processing GLB file:', error.message);
        process.exit(1);
    }
}


// Command-line usage: node index.js <inputPath> <outputPath>
const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
    console.error('Usage: node index.js <inputPath> <outputPath> ');
    process.exit(1);
}
addMetadataToGLB(inputPath, outputPath);