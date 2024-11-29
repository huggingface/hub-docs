# Datasets Download Stats

## How are downloads counted for datasets?

Counting the number of downloads for datasets is not a trivial task, as a single dataset repository might contain multiple files, from multiple subsets and splits (e.g. train/validation/test) and sometimes with many files in a single split. To solve this issue and avoid counting one person's download multiple times, we treat all files downloaded by a user (based on their IP address) within a 5-minute window as a single dataset download. This counting happens automatically on our servers when files are downloaded (through GET or HEAD requests), with no need to collect any user information or make additional calls.

## Before September 2024

The Hub used to provide download stats only for the datasets loadable via the `datasets` library. To determine the number of downloads, the Hub previously counted every time `load_dataset` was called in Python, excluding Hugging Face's CI tooling on GitHub. No information was sent from the user, and no additional calls were made for this. The count was done server-side as we served files for downloads. This means that:

* The download count was the same regardless of whether the data is directly stored on the Hub repo or if the repository has a [script](/docs/datasets/dataset_script) to load the data from an external source.
* If a user manually downloaded the data using tools like `wget` or the Hub's user interface (UI), those downloads were not included in the download count.
