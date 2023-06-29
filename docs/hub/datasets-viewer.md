# Dataset viewer

The dataset page includes a table with the contents of the dataset, arranged by pages of 100 rows. You can navigate between pages using the buttons at the bottom of the table.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-dark.png"/>
</div>

## Share a specific row

You can share a specific row by clicking on it, and then copying the URL in the address bar of your browser. For example https://huggingface.co/datasets/glue/viewer/mrpc/test?row=241 will open the dataset viewer on the MRPC dataset, on the test split, and on the 241th row.

## Access the parquet files

Every dataset is auto-converted to the Parquet format. Click on `Auto-converted to Parquet` to access the Parquet files. Refer to the [Datasets Server docs](/docs/datasets-server/parquet_process) to learn how to query the dataset with libraries such as Polars, Pandas or DuckDB.

## Dataset preview

For the biggest datasets, the page shows a preview of the first 100 rows instead of a full-featured viewer. This restriction only applies for datasets over 5GB that are not in Parquet format.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-preview.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-preview-dark.png"/>
</div>

## Disable the viewer

The dataset viewer can be disabled. To do this, add a YAML section to the dataset's `README.md` file (create one if it does not already exist) and add a `viewer` property with the value `false`.

```
---
viewer: false
---
```

Note that the viewer is always disabled on the private datasets.
