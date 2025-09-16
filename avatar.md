# Avatar GLTF Structure Documentation

This document describes the structure and key elements of the avatar GLTF data as defined in `avatar.json`.

## Asset Metadata

- **Generator:** Ready Player Me
- **Version:** 2.0

## Meshes

The avatar contains the following meshes:
- **EyeLeft**
- **EyeRight**
- **Wolf3D_Head**
- **Wolf3D_Teeth**
- **Wolf3D_Hair**
- **Wolf3D_Glasses**
- **Wolf3D_Outfit_Top**
- **Wolf3D_Outfit_Bottom**
- **Wolf3D_Outfit_Footwear**
- **Wolf3D_Body**

Each mesh may have primitives with attributes such as POSITION, NORMAL, TEXCOORD_0, JOINTS_0, WEIGHTS_0, and optionally TANGENT.

## Materials

Materials are defined for each mesh, including properties for metallic/roughness, base color textures, and normal maps. Some materials use extensions like `KHR_materials_ior` and `KHR_materials_specular`.

## Textures & Images

Textures reference images stored in bufferViews. Images include JPEG and PNG formats for skin, hair, clothing, and accessories.

## Skinning

- **Skin:** Armature
- **Joints:** 67 bones (nodes), including facial bones, hands, arms, legs, and body.
- **Inverse Bind Matrices:** Provided for skin deformation.

## Nodes (Skeleton)

Nodes define the skeleton hierarchy, including translations and rotations for each bone. The hierarchy covers the full humanoid skeleton, including fingers, toes, and facial bones.

## Morph Targets

Some meshes (e.g., eyes, head, teeth) support morph targets for facial expressions like `mouthOpen` and `mouthSmile`.

## BufferViews & Accessors

- BufferViews define how binary data is segmented.
- Accessors describe the type, count, and layout of vertex attributes and indices.

## Scene

- **Scene:** Contains a root node ("Armature") which references all mesh nodes.

## Extensions

- **KHR_materials_ior:** Index of refraction for materials.
- **KHR_materials_specular:** Specular color factors.

---

This avatar GLTF structure supports skinned meshes, morph targets, PBR materials, and a detailed humanoid skeleton for animation and customization.