from pygltflib import GLTF2, JSON

gltf = GLTF2().load("avatar.glb")

gltf.asset.extras = {
    "ssi": {
        "did": "did:key:z6MkjRagjFsC2VZQYtG8kLxK8VdD7NcJXb7eZxY6qJZJXqJZ",
        "identityType": "SSI Avatar",
        "verifiableCredential": {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            "type": ["VerifiableCredential", "AvatarCredential"],
            "credentialSubject": {
                "id": "did:key:z6MkjRagjFsC2VZQYtG8kLxK8VdD7NcJXb7eZxY6qJZJXqJZ",
                "modelHash": "sha256:deadbeef...",
                "issuedFor": "OpenMetaverse"
            }
        }
    }
}

if gltf.nodes:
    gltf.nodes[0].extras = {
        "identity": "Primary avatar node with embedded DID"
    }

gltf.save("avatar_with_identity.glb")