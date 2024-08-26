# Datasets Download Stats

## How are download stats generated for datasets?

The Hub provides download stats for all datasets loadable via the `datasets` library. To determine the number of downloads, the Hub counts every time `load_dataset` is called in Python, excluding Hugging Face's CI tooling on GitHub. No information is sent from the user, and no additional calls are made for this. The count is done server-side as we serve files for downloads. This means that:

* The download count is the same regardless of whether the data is directly stored on the Hub repo or if the repository has a [script](/docs/datasets/dataset_script) to load the data from an external source.
* If a user manually downloads the data using tools like `wget` or the Hub's user interface (UI), those downloads will not be included in the download count.
