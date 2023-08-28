# Dataset viewer

The dataset page includes a table with the contents of the dataset, arranged by pages of 100 rows. You can navigate between pages using the buttons at the bottom of the table.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-dark.png"/>
</div>

## Share a specific row

You can share a specific row by clicking on it, and then copying the URL in the address bar of your browser. For example https://huggingface.co/datasets/glue/viewer/mrpc/test?row=241 will open the dataset viewer on the MRPC dataset, on the test split, and on the 241st row.

## Access the parquet files

Every dataset is auto-converted to the Parquet format. Click on [_"Auto-converted to Parquet"_](https://huggingface.co/datasets/glue/tree/refs%2Fconvert%2Fparquet/cola) to access the Parquet files. Refer to the [Datasets Server docs](/docs/datasets-server/parquet_process) to learn how to query the dataset with libraries such as Polars, Pandas or DuckDB.

You can also access the list of Parquet files programmatically using the [Hub API](./api#endpoints-table): https://huggingface.co/api/datasets/glue/parquet.

## Very large datasets

For datasets >5GB, we only auto-convert to Parquet the first ~5GB of the dataset. 
In this case, an informational message lets you know that the Viewer is partial. This should be a large enough sample to represent the full dataset accurately, let us know if you need a bigger sample.

## Dataset preview

For the biggest datasets, the page shows a preview of the first 100 rows instead of a full-featured viewer. This restriction only applies for datasets over 5GB that are not natively in Parquet format.

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
