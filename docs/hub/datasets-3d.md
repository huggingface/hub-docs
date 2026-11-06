# 3D Dataset

This guide shows how 3D files are previewed on the Hub, and how to structure a dataset of [OpenUSD](https://openusd.org) assets, such as [SimReady](https://github.com/NVIDIA/simready-foundation) packages for robotics simulation. You can preview each 3D file on its page. In the [Dataset Viewer](./data-studio), `Mesh` columns show a thumbnail that opens in 3D, and the dataset page shows a gallery of the assets. Repositories of `.glb`, `.ply` or `.stl` files get a `Mesh` column automatically. SimReady datasets also get a gallery of their assets.

## Previewing 3D files

Click a 3D file in the **Files and versions** tab of a dataset or [Storage Bucket](./storage-buckets) to open it in an interactive 3D viewer. You can rotate, zoom and open the viewer in full screen.

| Format         | Extensions                        |
| -------------- | --------------------------------- |
| OpenUSD        | `.usd`, `.usda`, `.usdc`, `.usdz` |
| glTF           | `.glb`, `.gltf`                   |
| Mesh           | `.obj`, `.stl`, `.ply`            |
| Point cloud    | `.ply`                            |
| Gaussian splat | `.ply`, `.splat`                  |

glTF, mesh, point cloud and Gaussian splat files over 100 MB load when you click **Load 3D preview**, and files over 1 GB aren't previewed.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-3d-usd-viewer-dark.png"/>
</div>

### OpenUSD layers and textures

A USD asset is often split across several files: a root file that references sublayers, payloads, materials and textures. The viewer loads these referenced files from the same repository, so keep the folder structure you authored the asset with, and use relative paths for references. References to absolute paths, or to files outside the repository, can't be loaded.

## 3D files in the Dataset Viewer

The Dataset Viewer shows a thumbnail for each cell of a [`Mesh`](https://huggingface.co/docs/datasets/main/en/package_reference/main_classes#datasets.Mesh) column. Clicking a thumbnail opens the file in 3D. Thumbnails can be rendered for `.glb`, `.ply`, `.stl` and `.obj` files.

The dataset page also shows a **3D Assets** card with up to 15 thumbnails from the first rows of the selected subset and split. Make sure the first rows have a mesh, otherwise the card doesn't appear.

### Repository of 3D files

If your dataset only contains `.glb`, `.ply` or `.stl` files, you don't need to do anything: they get a `mesh` column automatically. See [Create a mesh dataset](https://huggingface.co/docs/datasets/main/en/mesh_dataset) to add metadata.

### Parquet dataset with 3D files

Mixing raw 3D files and Parquet files as subsets or splits isn't supported. To show 3D files next to your other columns, keep the files in the repository and add a `Mesh` column that references them:

```python
import json
import pyarrow as pa
import pyarrow.parquet as pq
from datasets import Features, Mesh, Value

repo_id = "username/my-dataset"
table = pq.read_table("train.parquet")

cells = [
    {"bytes": None, "path": f"hf://datasets/{repo_id}@main/meshes/{row_id}.glb"}
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

- Paths must be relative to the directory containing the Parquet file
- Use `None` for rows without a 3D file.
- A folder can contain up to 10,000 files, so group larger sets of files into subfolders.

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
