# Repository limitations and recommendations

There are some limitations to be aware of when dealing with a large amount of data in your repo. Given the time it takes to stream the data,
getting an upload/push to fail at the end of the process or encountering a degraded experience, be it on hf.co or when working locally, can be very annoying.

## Recommendations

We gathered a list of tips and recommendations for structuring your repo. If you are looking for more practical tips, check out [this guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/upload#tips-and-tricks-for-large-uploads) on how to upload large amount of data using the Python library.


| Characteristic     | Recommended        | Tips                                                   |
| ----------------   | ------------------ | ------------------------------------------------------ |
| Repo size          | -                  | contact us for large repos (TBs of data)               |
| Files per repo     | <100k              | merge data into fewer files                            |
| Entries per folder | <10k               | use subdirectories in repo                             |
| File size          | <5GB               | split data into chunked files                          |
| Commit size        | <100 files*        | upload files in multiple commits                       |
| Commits per repo   | -                  | upload multiple files per commit and/or squash history |

_* Not relevant when using `git` CLI directly_

Please read the next section to understand better those limits and how to deal with them.

## Explanations

What are we talking about when we say "large uploads", and what are their associated limitations? Large uploads can be
very diverse, from repositories with a few huge files (e.g. model weights) to repositories with thousands of small files
(e.g. an image dataset).

Under the hood, the Hub uses Git to version the data, which has structural implications on what you can do in your repo.
If your repo is crossing some of the numbers mentioned in the previous section, **we strongly encourage you to check out [`git-sizer`](https://github.com/github/git-sizer)**,
which has very detailed documentation about the different factors that will impact your experience. Here is a TL;DR of factors to consider:

- **Repository size**: The total size of the data you're planning to upload. There is no hard limit on a Hub repository size. However, if you plan to upload hundreds of GBs or even TBs of data, we would appreciate it if you could let us know in advance so we can better help you if you have any questions during the process. You can contact us at datasets@huggingface.co or on [our Discord](http://hf.co/join/discord).
- **Number of files**:
    - For optimal experience, we recommend keeping the total number of files under 100k. Try merging the data into fewer files if you have more.
      For example, json files can be merged into a single jsonl file, or large datasets can be exported as Parquet files or in [WebDataset](https://github.com/webdataset/webdataset) format.
    - The maximum number of files per folder cannot exceed 10k files per folder. A simple solution is to
      create a repository structure that uses subdirectories. For example, a repo with 1k folders from `000/` to `999/`, each containing at most 1000 files, is already enough.
- **File size**: In the case of uploading large files (e.g. model weights), we strongly recommend splitting them **into chunks of around 5GB each**.
There are a few reasons for this:
    - Uploading and downloading smaller files is much easier both for you and the other users. Connection issues can always
      happen when streaming data and smaller files avoid resuming from the beginning in case of errors.
    - Files are served to the users using CloudFront. From our experience, huge files are not cached by this service
      leading to a slower download speed.
In all cases no single LFS file will be able to be >50GB. I.e. 50GB is the hard limit for single file size.
- **Number of commits**: There is no hard limit for the total number of commits on your repo history. However, from
our experience, the user experience on the Hub starts to degrade after a few thousand commits. We are constantly working to
improve the service, but one must always remember that a git repository is not meant to work as a database with a lot of
writes. If your repo's history gets very large, it is always possible to squash all the commits to get a
fresh start using `huggingface_hub`'s [`super_squash_history`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.super_squash_history). Be aware that this is a non-revertible operation.
- **Number of operations per commit**: Once again, there is no hard limit here. When a commit is uploaded on the Hub, each
git operation (addition or delete) is checked by the server. When a hundred LFS files are committed at once,
each file is checked individually to ensure it's been correctly uploaded. When pushing data through HTTP,
a timeout of 60s is set on the request, meaning that if the process takes more time, an error is raised. However, it can
happen (in rare cases) that even if the timeout is raised client-side, the process is still
completed server-side. This can be checked manually by browsing the repo on the Hub. To prevent this timeout, we recommend
adding around 50-100 files per commit.

## Sharing large datasets on the Hub

One key way in which Hugging Face supports the machine learning ecosystem is by hosting datasets on the Hub, including very large datasets. To ensure we can effectively support the open-source ecosystem, we ask that you let us know in advance via datasets at huggingface.co or on [our Discord](http://hf.co/join/discord) if you are uploading datasets above a couple of hundred GBs or TBs of data.

When you get in touch with us, please let us know:

- What is the dataset, and who/what is it likely to be useful for?
- The size of the dataset.
- The format you plan to use for sharing your dataset.

For hosting large datasets on the Hub, we require the following for your dataset:

- A dataset card: we want to ensure that your dataset can be used effectively by the community and one of the key ways of enabling this is via a dataset card. This [guidance](docs/hub/datasets-cards.md) provides an overview of how to write a dataset card.
- You are sharing the dataset to enable community reuse. If you plan to upload a dataset you anticipate won't have any further reuse, other platforms are likely more suitable.
- You must follow the repository limitations outlined above.
- Using file formats that are well integrated with the Hugging Face ecosystem. We have good support for [Parquet](https://huggingface.co/docs/datasets/v2.19.0/en/loading#parquet) and [WebDataset](https://huggingface.co/docs/datasets/v2.19.0/en/loading#webdataset) formats, which are often good options for sharing large datasets efficiently. This will also ensure the dataset viewer works for your dataset.
- Avoid the use of custom loading scripts when using datasets. In our experience, datasets that require custom code to use often end up with limited reuse.

Please get in touch with us if any of these requirements are difficult for you to meet because of the type of data or domain you are working in.
