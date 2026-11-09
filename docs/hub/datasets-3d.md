# 3D Dataset

The Hub previews 3D files in the browser, so you can inspect meshes, scenes, point clouds and Gaussian splats without downloading them. This guide covers:

- [Previewing 3D files](#previewing-3d-files) in an interactive viewer
- [3D files in the Dataset Viewer](#3d-files-in-the-dataset-viewer), with `Mesh` columns and a gallery of assets
- [Structuring your dataset](#structuring-your-dataset) so 3D files show up next to your other columns
- [SimReady datasets](#simready-datasets) of [OpenUSD](https://openusd.org) assets for robotics simulation

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-assets-card.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-assets-card-dark.png"/>
</div>

## Previewing 3D files

Click a 3D file in the **Files and versions** tab of a dataset or [Storage Bucket](./storage-buckets) to open it in an interactive 3D viewer. You can rotate, zoom and open the viewer in full screen.

| Format         | Extensions                        | Example                                                                                                  |
| -------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| glTF           | `.glb`, `.gltf`                   | [DamagedHelmet.glb](https://huggingface.co/datasets/cfahlgren1/3d-model-samples/blob/main/DamagedHelmet.glb) |
| Mesh           | `.obj`, `.stl`, `.ply`            | [cone.stl](https://huggingface.co/datasets/cfahlgren1/mesh-doc-test-formats/blob/main/meshes/cone.stl)   |
| Point cloud    | `.ply`                            | [birmingham_block_13.ply](https://huggingface.co/datasets/WhiteFlamesCN/sensaturban-citynav-ply/blob/main/birmingham_block_13.ply) |
| Gaussian splat | `.ply`, `.splat`                  | [a_monarch_butterfly.ply](https://huggingface.co/datasets/cfahlgren1/3d-splat-samples/blob/main/a_monarch_butterfly.ply) |
| OpenUSD        | `.usd`, `.usda`, `.usdc`, `.usdz` | [sm_box_corrugated_brown_b08_01.usd](https://huggingface.co/datasets/nvidia/simready-assets/blob/main/box_corrugated_brown_b08/simready_usd/sm_box_corrugated_brown_b08_01.usd) |

> [!TIP]
> glTF, mesh, point cloud and Gaussian splat files over 100 MB load when you click **Load 3D preview**. Files over 1 GB aren't previewed.

### Meshes and glTF

glTF files are rendered with their materials and textures. Use the buttons in the top right corner to switch between **Solid**, **Wireframe** and **Solid + wireframe**.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-gltf-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-gltf-viewer-dark.png"/>
</div>

### Point clouds

A `.ply` file with only vertices, such as a LiDAR or photogrammetry scan, is shown as a point cloud with its vertex colors:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-point-cloud-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-point-cloud-viewer-dark.png"/>
</div>

### Gaussian splats

Gaussian splats can be stored as `.splat` or `.ply` files:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-splat-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-splat-viewer-dark.png"/>
</div>

### OpenUSD

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer-dark.png"/>
</div>

A USD asset is often split across several files: a root file that references sublayers, payloads, materials and textures. The viewer loads these referenced files from the same repository, so keep the folder structure you authored the asset with, and use relative paths for references. References to absolute paths, or to files outside the repository, can't be loaded.

## 3D files in the Dataset Viewer

### Mesh columns

The Dataset Viewer shows a thumbnail for each cell of a [`Mesh`](https://huggingface.co/docs/datasets/main/en/package_reference/main_classes#datasets.Mesh) column. Thumbnails can be rendered for `.glb`, `.ply`, `.stl` and `.obj` files.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-mesh-column.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-mesh-column-dark.png"/>
</div>

Click a thumbnail to open the file in 3D, next to the other values of its row:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-mesh-preview.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-mesh-preview-dark.png"/>
</div>

### 3D Assets card

The dataset page also shows a **3D Assets** card with up to 15 thumbnails from the first rows of the selected subset and split, like the one at the [top of this page](#3d-dataset). Make sure the first rows have a mesh, otherwise the card doesn't appear.

For example, see [cfahlgren1/smithsonian-3d-glb](https://huggingface.co/datasets/cfahlgren1/smithsonian-3d-glb).

## Structuring your dataset

### Only 3D files

If your dataset only contains `.glb`, `.ply` or `.stl` files, you don't need to do anything: they get a `mesh` column automatically.

```
my_dataset_repository/
└── meshes
    ├── chair.glb
    ├── lamp.glb
    └── table.glb
```

### Additional columns

To add captions, labels or other columns, add a `metadata.jsonl` (or `metadata.csv`) file with a `file_name` column next to your 3D files:

```
my_dataset_repository/
└── train
    ├── box.glb
    ├── sphere.glb
    └── metadata.jsonl
```

See [Create a mesh dataset](https://huggingface.co/docs/datasets/main/en/mesh_dataset) for more details, and [cfahlgren1/mesh-doc-test-metadata](https://huggingface.co/datasets/cfahlgren1/mesh-doc-test-metadata) for an example.

### Parquet

If your dataset is stored as Parquet, the Dataset Viewer reads the Parquet files and doesn't add the 3D files in the repository as a column. To show 3D files next to your other columns, keep the files in the repository and add a `Mesh` column that references them:

```
my_dataset_repository/
├── meshes
│   ├── box.glb
│   ├── cone.stl
│   └── ...
└── train.parquet
```

```python
import json
import pyarrow as pa
import pyarrow.parquet as pq
from datasets import Features, Mesh, Value

table = pq.read_table("train.parquet")

cells = [
    {"bytes": None, "path": f"meshes/{row_id}.glb"}  # relative path from parquet directory to meshes
    for row_id in table["id"].to_pylist()
]
table = table.append_column("mesh", pa.array(cells, type=Mesh().pa_type))

# List all the columns of your dataset
features = Features({"id": Value("string"), "prompt": Value("string"), "mesh": Mesh()})
table = table.replace_schema_metadata(
    {"huggingface": json.dumps({"info": {"features": features.to_dict()}})}
)
pq.write_table(table, "train.parquet")
```

- Paths must be relative to the directory containing the Parquet file.
- Use `None` for rows without a 3D file.
- A folder can contain up to 10,000 files, so group larger sets of files into subfolders.

See [cfahlgren1/mesh-doc-test-formats](https://huggingface.co/datasets/cfahlgren1/mesh-doc-test-formats) for an example.

## SimReady datasets

[SimReady](https://github.com/NVIDIA/simready-foundation) is a specification for OpenUSD assets that are ready to use in simulation, with physics, materials and semantic labels. Datasets that contain SimReady packages show a **3D Assets** card on their page, with the number of packages and up to 15 thumbnails sampled across the dataset. Clicking a thumbnail opens its USD file in the viewer.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-simready-card.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-simready-card-dark.png"/>
</div>

For example, see [nvidia/simready-assets](https://huggingface.co/datasets/nvidia/simready-assets) or [nvidia/PhysicalAI-SimReady-Warehouse-01](https://huggingface.co/datasets/nvidia/PhysicalAI-SimReady-Warehouse-01).

These datasets also get the `simready` tag, so they show up when [filtering datasets](https://huggingface.co/datasets?other=simready).

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
