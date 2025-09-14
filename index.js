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
            uniqueIdentity: {
                userId: userId,
                creationDate: new Date().toISOString(),
                creator: "My Avatar System",
                // ... any other data
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


// Command-line usage: node index.js <inputPath> <outputPath> <userId>
const [,, inputPath, outputPath, userId] = process.argv;
if (!inputPath || !outputPath || !userId) {
    console.error('Usage: node index.js <inputPath> <outputPath> <userId>');
    process.exit(1);
}
addMetadataToGLB(inputPath, outputPath, userId);