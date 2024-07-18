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

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-main-button.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-main-button-dark.png"/>
</div>

It will open a modal with the iframe code that you can copy and paste into your webpage:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-main-button-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-main-button-modal-dark.png"/>
</div>

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

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-search-button.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-search-button-dark.png"/>
</div>

It will open a modal with the iframe code that you can copy and paste into your webpage:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-search-button-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-search-button-modal-dark.png"/>
</div>

## Examples

The embedded dataset viewer is used in multiple Machine Learning tools and platforms to display datasets. Here are a few examples. 

Open a [pull request](https://github.com/huggingface/hub-docs/blob/main/docs/hub/datasets-viewer-embed.md) if you want to appear in this section!

### Tool: ZenML

[`htahir1`](https://huggingface.co/htahir1) shares code in a [blog post](https://www.zenml.io/blog/embedding-huggingface-datasets-visualizations-with-zenml) to visualize a Hugging Face dataset within a [ZenML](https://huggingface.co/zenml) pipeline.

<div class="flex justify-center">
<a href="https://www.zenml.io/blog/embedding-huggingface-datasets-visualizations-with-zenml">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-example-zenml.gif"/>
</a>
</div>

### Tool: Metaflow + Outerbounds

[`eddie-OB`](https://huggingface.co/eddie-OB) shows in a [demo video](https://www.linkedin.com/posts/eddie-mattia_the-team-at-hugging-facerecently-released-activity-7219416449084272641-swIu) how to include the dataset viewer in Metaflow cards on [Outerbounds](https://huggingface.co/outerbounds).

<div class="flex justify-center">
<a href="https://www.linkedin.com/posts/eddie-mattia_the-team-at-hugging-facerecently-released-activity-7219416449084272641-swIu">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-example-outerbounds.png"/>
</a>
</div>

### Tool: AutoTrain

[`abhishek`](https://huggingface.co/abhishek) showcases how the dataset viewer is integrated into [AutoTrain](https://huggingface.co/autotrain) in a [demo video](https://x.com/abhi1thakur/status/1813892464144798171).

<div class="flex justify-center">
<a href="https://x.com/abhi1thakur/status/1813892464144798171">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-example-autotrain.png"/>
</a>
</div>

### Datasets: Alpaca-style datasets gallery

[`davanstrien`](https://huggingface.co/davanstrien) showcases the [collection of Alpaca-style datasets](https://huggingface.co/collections/librarian-bots/alpaca-style-datasets-66964d3e490f463859002588) in a [space](https://huggingface.co/spaces/davanstrien/collection_dataset_viewer).

<div class="flex justify-center">
<a href="https://huggingface.co/spaces/davanstrien/collection_dataset_viewer">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-example-gallery.png"/>
</a>
</div>

### App: Electric Vehicle Charge Finder

[`cfahlgren1`](https://huggingface.co/cfahlgren1) [embeds](https://x.com/calebfahlgren/status/1813356638239125735) the dataset viewer in the [Electric Vehicle Charge Finder app](https://charge-finder.vercel.app/).

<div class="flex justify-center">
<a href="https://charge-finder.vercel.app">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dataset-viewer-embed-example-map.png"/>
</a>
</div>
