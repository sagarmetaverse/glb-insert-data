## Usage

To add custom metadata to a GLB file, run the following command:

```powershell
node index.js <input-glb> <output-glb> <user-id>
```

**Example:**
```powershell
node index.js avatar.glb output-with-id.glb user_12345
```

- `<input-glb>`: Path to the source GLB file.
- `<output-glb>`: Path for the output GLB file with metadata.
- `<user-id>`: Unique identifier to embed in the GLB metadata.

The script will insert metadata under `asset.extras` in the output GLB file.