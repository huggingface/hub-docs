# 3D Dataset

This guide shows how 3D files are previewed on the Hub, and how to structure a dataset of [OpenUSD](https://openusd.org) assets, such as [SimReady](https://github.com/NVIDIA/simready-foundation) packages for robotics simulation. 3D files aren't shown in the [Dataset Viewer](./data-studio), but you can preview each file on its page, and SimReady datasets get a gallery of their assets on the dataset page.

## Previewing 3D files

Click a 3D file in the **Files and versions** tab of a dataset, model or [Storage Bucket](./storage-buckets) to open it in an interactive 3D viewer. You can rotate, zoom and open the viewer in full screen.

| Format  | Extensions                         |
| ------- | ---------------------------------- |
| OpenUSD | `.usd`, `.usda`, `.usdc`, `.usdz`  |
| glTF    | `.glb`, `.gltf`                    |

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer-dark.png"/>
</div>

### OpenUSD layers and textures

A USD asset is often split across several files: a root file that references sublayers, payloads, materials and textures. The viewer loads these referenced files from the same repository, so keep the folder structure you authored the asset with, and use relative paths for references. References to absolute paths, or to files outside the repository, can't be loaded.

## SimReady datasets

[SimReady](https://github.com/NVIDIA/simready-foundation) is a specification for OpenUSD assets that are ready to use in simulation, with physics, materials and semantic labels. Datasets that contain SimReady packages show a **3D Assets** card on their page, with the number of packages and up to 15 thumbnails sampled across the dataset. Clicking a thumbnail opens its USD file in the viewer.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-simready-card.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-simready-card-dark.png"/>
</div>

For example, see [nvidia/simready-assets](https://huggingface.co/datasets/nvidia/simready-assets) or [nvidia/PhysicalAI-SimReady-Warehouse-01](https://huggingface.co/datasets/nvidia/PhysicalAI-SimReady-Warehouse-01).

### Package structure

A package is a folder that contains a `com.nvidia.simready.packaging.json` file. Packages can be at any depth in the repository, and folders inside a package are part of that package.

Each package needs a thumbnail of its root USD file to appear in the card. Following the SimReady requirement for thumbnails, the thumbnail of `<folder>/<file>.usd` is `<folder>/.thumbs/256x256/<file>.usd.png` (or `.usda.png`, `.usdc.png`, `.usdz.png`), in the package folder or one folder below it:

```
my_dataset_repository/
├── IV_pole_a01
│   ├── com.nvidia.simready.packaging.json
│   └── simready_usd
│       ├── .thumbs
│       │   └── 256x256
│       │       ├── sm_IV_pole_a01_01.usd.png
│       │       └── sm_IV_pole_a01_01.usd_light.png
│       ├── sm_IV_pole_a01_01.usd
│       └── payloads
│           └── ...
└── IV_pole_a02
    ├── com.nvidia.simready.packaging.json
    └── ...
```

- An optional `<file>.usd_light.png` is shown in light mode, and `<file>.usd.png` in dark mode.
- Thumbnails larger than 4 MB are skipped.

The card is updated after each push to the dataset.

## Modality tag

Datasets with 3D files get the `3d` modality, so they show up when filtering [datasets by modality](https://huggingface.co/datasets?modality=modality:3d). You can also set it in the dataset card, see [Force set a dataset modality](./datasets-cards#force-set-a-dataset-modality).
