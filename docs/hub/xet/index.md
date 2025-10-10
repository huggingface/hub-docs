# Xet: our Storage Backend

Repositories on the Hugging Face Hub are different from those on software development platforms. They contain files that are:

- Large - model or dataset files are in the range of GB and above. We have a few TB-scale files!
- Binary - not in a human readable format by default (e.g., [Safetensors](https://huggingface.co/docs/safetensors/en/index) or [Parquet](https://huggingface.co/docs/dataset-viewer/en/parquet#what-is-parquet))

While the Hub leverages modern version control with the support of Git, these differences make [Model](https://huggingface.co/docs/hub/models) and [Dataset](https://huggingface.co/docs/hub/datasets) repositories quite different from those that contain only source code.

Storing these files directly in a pure Git repository is impractical. Not only are the typical storage systems behind Git repositories unsuited for such files, but when you clone a repository, Git retrieves the entire history, including all file revisions. This can be prohibitively large for massive binaries, forcing you to download gigabytes of historic data you may never need.

Instead, on the Hub, these large files are tracked using "pointer files" and identified through a `.gitattributes` file (both discussed in more detail below), which remain in the Git repository while the actual data is stored in remote storage (like [Amazon S3](https://aws.amazon.com/s3/)). As a result, the repository stays small and typical Git workflows remain efficient.

Historically, Hub repositories have relied on [Git LFS](https://git-lfs.com/) for this mechanism. While Git LFS remains supported (see [Backwards Compatibility & Legacy](./legacy-git-lfs)), the Hub has adopted Xet, a modern custom storage system built specifically for AI/ML development. It enables chunk-level deduplication, smaller uploads, and faster downloads than Git LFS.

### Open Source Xet Protocol

If you are looking to understand the underlying Xet protocol or are looking to build a new client library to access Xet Storage, check out the [Xet Protocol Specification](https://huggingface.co/docs/xet/index).

In these pages you will get started in using Xet Storage.

## Contents

- [Xet History & Overview](./overview)
- [Using Xet Storage](./using-xet-storage)
- [Security](./security)
- [Backwards Compatibility & Legacy](./legacy-git-lfs)
- [Deduplication](./deduplication)

