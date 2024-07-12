# Embed the Dataset Viewer in a webpage

You can embed the Dataset Viewer in your own webpage using an iframe.

The URL to use is `https://huggingface.co/datasets/<namespace>/<dataset-name>/embed/viewer`, where `<namespace>` is the owner of the dataset (user or organization) and `<dataset-name>` is the name of the dataset. You can also pass other parameters like the configuration, split, filter, search or selected row.

For example, the following iframe embeds the Dataset Viewer for the `glue` dataset from the `nyu-mll` organization:

```html
<iframe
  src="https://huggingface.co/datasets/nyu-mll/glue/embed/viewer"
  frameborder="0"
  width="100%"
  height="560px"
></iframe>
```

You can also get the embed code directly from the Dataset Viewer interface. Click on the `Embed` button in the top right corner of the Dataset Viewer:

<image1>

It will open a modal with the iframe code that you can copy and paste into your webpage:

<image2>

## Parameters

All the parameters of the dataset viewer page can also be passed to the embedded viewer (filter, search, specific split, etc.) by adding them to the iframe URL. For example, to show the results of the search on `mangrove` in the `test` split of the `rte` subset of the `nyu-mll/glue` dataset, you can use the following URL:

```html
<iframe
  src="https://huggingface.co/datasets/nyu-mll/glue/embed/viewer/rte/split?search=mangrove"
  frameborder="0"
  width="100%"
  height="560px"
></iframe>
```

You can get this code directly from the Dataset Viewer interface by performing the search, clicking on the `⋮` button then `Embed`:

<image3>

It will open a modal with the iframe code that you can copy and paste into your webpage:

<image4>
