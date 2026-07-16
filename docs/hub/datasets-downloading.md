# Downloading datasets

## Integrated libraries

If a dataset on the Hub is tied to a [supported library](./datasets-libraries), loading the dataset can be done in just a few lines. For information on accessing the dataset, you can click on the "Use this dataset" button on the dataset page to see how to do so. For example, [`samsum`](https://huggingface.co/datasets/knkarthick/samsum?library=datasets) shows how to do so with `datasets` below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](/docs/huggingface_hub) library to create, delete, update and retrieve information from repos. For example, to download the `HuggingFaceH4/ultrachat_200k` dataset from the command line, run

```bash
hf download HuggingFaceH4/ultrachat_200k --repo-type dataset
```

See the [HF CLI download documentation](https://huggingface.co/docs/huggingface_hub/en/guides/cli#download-a-dataset-or-a-space) for more information.

You can also integrate this into your own library! For example, you can quickly load a CSV dataset with a few lines using Pandas.
```py
from huggingface_hub import hf_hub_download
import pandas as pd

REPO_ID = "YOUR_REPO_ID"
FILENAME = "data.csv"

dataset = pd.read_csv(
    hf_hub_download(repo_id=REPO_ID, filename=FILENAME, repo_type="dataset")
)
```

## Using Git

Since all datasets on the Hub are Xet-backed Git repositories, you can clone the datasets locally by [installing git-xet](./xet/using-xet-storage#git-xet) and running:

```bash
git xet install
git lfs install
git clone git@hf.co:datasets/<dataset ID> # example: git clone git@hf.co:datasets/allenai/c4
```

If you have write-access to the particular dataset repo, you'll also have the ability to commit and push revisions to the dataset.

Add your SSH public key to [your user settings](https://huggingface.co/settings/keys) to push changes and/or access private repos.

## Faster downloads

You can test your download speed from Hugging Face's CDN at [fast.hf.co](https://fast.hf.co). This runs a quick bandwidth test against the nearest HF edge server, helping you understand your baseline throughput. You can also measure download speed from the terminal using the [`hf-speedtest`](https://github.com/julien-c/hf-speedtest) CLI extension:

```bash
hf extensions install julien-c/hf-speedtest
hf speedtest
```

For faster transfers, the Hub uses the [Xet storage backend](https://huggingface.co/docs/hub/en/xet/index) with adaptive concurrency that automatically tunes parallel streams based on network conditions. See [Faster downloads for models](./models-downloading#faster-downloads) for details on tuning options like `HF_XET_HIGH_PERFORMANCE=1`.

## Using hf-mount

For large datasets, you can mount a repo as a local filesystem with [hf-mount](https://github.com/huggingface/hf-mount) instead of downloading the full repo. Files are fetched lazily — only the bytes your code reads hit the network. Useful when your workflow expects local file paths (e.g. `tarfile`, `zipfile`, `imagefolder`) rather than Python iterators.

```bash
brew install hf-mount
hf-mount start repo datasets/stanfordnlp/imdb /tmp/imdb
```

Repos are mounted read-only. See [Mount as a Local Filesystem](./storage-buckets-access#mount-as-a-local-filesystem) for full setup details, backend options, and caching.

## Downloading behind a proxy or firewall

If your network restricts outbound traffic through a firewall or proxy, downloading datasets requires more than just `huggingface.co`. File contents are served from separate storage and CDN hostnames, and `load_dataset` / `hf download` will fail if these are not reachable, even when `huggingface.co` itself is allowlisted.

Allowlist the following hostnames (all over HTTPS / port 443):

| Hostname                     | Purpose                                   |
|------------------------------|-------------------------------------------|
| `huggingface.co`             | Hub API, metadata, and download redirects |
| `cas-server.xethub.hf.co`    | Xet storage protocol APIs + upload (US)   |
| `cas-server.xethub-eu.hf.co` | Xet storage protocol APIs + upload (EU)   |
| `transfer.xethub.hf.co`      | Xet storage download APIs (US)            |
| `transfer.xethub-eu.hf.co`   | Xet storage download APIs (EU)            |
| `us.aws.cdn.hf.co`           | CDN edge (US)                             |
| `us.gcp.cdn.hf.co`           | CDN edge (US)                             |
| `cdn-lfs-us-1.hf.co`         | LFS CDN (US)                              |
| `cdn-lfs-eu-1.hf.co`         | LFS CDN (EU)                              |

> [!TIP]
> Downloads follow HTTP redirects from `huggingface.co` to these hostnames, so
> allowlisting `huggingface.co` alone is not sufficient. A `ReadTimeoutError` (rather than
> a connection error) partway through a download usually means the initial connection
> succeeded but a storage or CDN host is blocked.

> [!TIP]
> Wildcard behavior depends on how your proxy matches domains. Many enterprise proxies
> treat an allowlist entry as a suffix match that covers subdomains at any depth. If yours
> does, the simplest option is to allowlist the suffixes `hf.co` and `huggingface.co` —
> these cover every current and future storage and CDN endpoint.
>
> If your proxy only supports single-label wildcards (where `*.hf.co` matches
> `cdn-lfs-us-1.hf.co` but not the deeper `us.aws.cdn.hf.co` or `cas-server.xethub.hf.co`),
> allowlist the explicit hostnames from the table above. Note that `*.xethub.hf.co` does
> not cover the EU hosts under `xethub-eu.hf.co`, and `*.cdn.hf.co` does not cover the
> two-label `us.aws.cdn.hf.co` / `us.gcp.cdn.hf.co`.

> [!WARNING]
> These hostnames may change as our storage and CDN infrastructure evolves. Where your
> security policy allows it, allowlist the `hf.co` and `huggingface.co` suffixes (all
> subdomains) so your rules don't break when a specific endpoint changes.
