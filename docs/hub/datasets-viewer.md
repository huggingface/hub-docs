# Dataset viewer

The dataset page includes a table with the contents of the dataset, arranged by pages of 100 rows. You can navigate between pages using the buttons at the bottom of the table.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-dark.png"/>
</div>

## Inspect data distributions

At the top of the columns you can see the graphs representing the distribution of their data. This gives you a quick insight on how balanced your classes are, what are the range and distribution of numerical data and lengths of texts, and what portion of the column data is missing.

## Filter by value

If you click on a bar of a histogram from a numerical column, the dataset viewer will filter the data and show only the rows with values that fall in the selected range.
Similarly, if you select one class from a categorical column, it will show only the rows from the selected category.

## Search a word in the dataset

You can search for a word in the dataset by typing it in the search bar at the top of the table. The search is case-insensitive and will match any row containing the word. The text is searched in the columns of `string`, even if the values are nested in a dictionary or a list.

## Share a specific row

You can share a specific row by clicking on it, and then copying the URL in the address bar of your browser. For example https://huggingface.co/datasets/nyu-mll/glue/viewer/mrpc/test?p=2&row=241 will open the dataset viewer on the MRPC dataset, on the test split, and on the 241st row.

## Large scale datasets

The Dataset Viewer supports large scale datasets, but depending on the data format it may only show the first 5GB of the dataset:

- For Parquet datasets: the Dataset Viewer shows the full dataset, but filtering and search are only enabled on the first 5GB.
- For datasets >5GB in other formats (e.g. [WebDataset](https://github.com/webdataset/webdataset) or JSON Lines): the Dataset Viewer only shows the first 5GB, and filtering and search are enabled on these first 5GB.

In this case, an informational message lets you know that the Viewer is partial. This should be a large enough sample to represent the full dataset accurately, let us know if you need a bigger sample.

## Access the parquet files

To power the dataset viewer, the first 5GB of every dataset are auto-converted to the Parquet format (unless it was already a Parquet dataset). In the dataset viewer (for example, see [GLUE](https://huggingface.co/datasets/nyu-mll/glue)), you can click on [_"Auto-converted to Parquet"_](https://huggingface.co/datasets/nyu-mll/glue/tree/refs%2Fconvert%2Fparquet/cola) to access the Parquet files. Please, refer to the [dataset viewer docs](/docs/datasets-server/parquet_process) to learn how to query the dataset parquet files with libraries such as Polars, Pandas or DuckDB.

<Tip>

Parquet is a columnar storage format optimized for querying and processing large datasets. Parquet is a popular choice for big data processing and analytics and is widely used for data processing and machine learning. You can learn more about the advantages associated with this format in the <a href="https://huggingface.co/docs/datasets-server/parquet">documentation</a>.

</Tip>

### Conversion bot

When you create a new dataset, the [`parquet-converter` bot](https://huggingface.co/parquet-converter) notifies you once it converts the dataset to Parquet. The [discussion](./repositories-pull-requests-discussions) it opens in the repository provides details about the Parquet format and links to the Parquet files.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parquet-converter-profile-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parquet-converter-profile-dark.png"/>
</div>

### Programmatic access

You can also access the list of Parquet files programmatically using the [Hub API](./api#get-apidatasetsrepoidparquet); for example, endpoint [`https://huggingface.co/api/datasets/nyu-mll/glue/parquet`](https://huggingface.co/api/datasets/nyu-mll/glue/parquet) lists the parquet files of the `nyu-mll/glue` dataset.

## Dataset preview

For the biggest datasets, the page shows a preview of the first 100 rows instead of a full-featured viewer. This restriction only applies for datasets over 5GB that are not natively in Parquet format or that have not been auto-converted to Parquet.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-preview.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-preview-dark.png"/>
</div>

## Configure the Dataset Viewer

To have a properly working Dataset Viewer for your dataset, make sure your dataset is in a supported format and structure.
There is also an option to configure your dataset using YAML.

For **private** datasets, the Dataset Viewer is enabled for [PRO users](https://huggingface.co/pricing) and [Enterprise Hub organizations](https://huggingface.co/enterprise).

For more information see our guide on [How to configure the Dataset Viewer](./datasets-viewer-configure).
