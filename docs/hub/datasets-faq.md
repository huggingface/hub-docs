# Datasets Frequently Asked Questions

## How are download stats generated for datasets?

The Hub provides download stats for all datasets loadable via the `datasets` library. To determine the number of downloads, the Hub counts every time `load_dataset` is called in Python, excluding Hugging Face's CI tooling on GitHub. This means that:

* Whether the data is directly stored on the Hub repo or if the repository has a script to load the data from an external source, the download count is not impacted.
* If a user manually downloads the data using tools like `wget` or through the Hub's user interface (UI), those downloads will not be included in the download count.