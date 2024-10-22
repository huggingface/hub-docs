# Datasets Download Stats

## How are download stats generated for datasets?

Counting the number of downloads for datasets is not a trivial task, as a single dataset repository might contain multiple files, from multiple subsets and splits (e.g. train/validation/test) and sometimes with many files in a single split. To avoid double counting downloads (e.g., counting a single download of a dataset as multiple downloads), the Hub counts as one download every series of files requests in an interval of 5 minutes per user. No information is sent from the user, and no additional calls are made for this. The count is done server-side as the Hub serves files for downloads. Every HTTP request to the files, including `GET` and `HEAD`, will be counted as a download.

## Before Setpember 2024

The Hub used to provide download stats only for the datasets loadable via the `datasets` library. To determine the number of downloads, the Hub previously counted every time `load_dataset` was called in Python, excluding Hugging Face's CI tooling on GitHub. No information was sent from the user, and no additional calls were made for this. The count was done server-side as we served files for downloads. This means that:

* The download count was the same regardless of whether the data is directly stored on the Hub repo or if the repository has a [script](/docs/datasets/dataset_script) to load the data from an external source.
* If a user manually downloaded the data using tools like `wget` or the Hub's user interface (UI), those downloads were not included in the download count.
