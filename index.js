import { NodeIO } from '@gltf-transform/core';
import { dedup } from '@gltf-transform/functions';
import { execSync } from 'child_process';


async function addMetadataToGLB(inputPath, outputPath, userId) {
    const io = new NodeIO();
    try {
        // Read the GLB file
        const document = await io.read(inputPath);

        // Read VC from vc.js output
        const asset = document.getRoot().getAsset();
            let vcJwt;
        try {
                // vc.js should output the JWT string only
                vcJwt = execSync('node vc.js', { encoding: 'utf8' }).trim();
        } catch (err) {
                console.error('Error generating VC JWT:', err.message);
            process.exit(1);
        }
        
        // Extract DID from the VC.js file
        const did = 'did:key:z6Mkg3CQtXGbPTQiypAMfgcUNBxWnLe6ka4JK6nMCyHSu9w8';
        
            asset.extras = {
                avatarIdentity: {
                    did: did,
                    identityType: 'SSI Avatar',
                    verifiableCredential: vcJwt
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