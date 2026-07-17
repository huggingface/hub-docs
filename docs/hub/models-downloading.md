# Downloading models

## Integrated libraries

If a model on the Hub is tied to a [supported library](./models-libraries), loading the model can be done in just a few lines. For information on accessing the model, you can click on the "Use in _Library_" button on the model page to see how to do so. For example, `distilbert/distilgpt2` shows how to do so with 🤗 Transformers below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](https://github.com/huggingface/huggingface_hub) library to create, delete, update and retrieve information from repos. For example, to download the `HuggingFaceH4/zephyr-7b-beta` model from the command line, run
```bash
hf download HuggingFaceH4/zephyr-7b-beta
```
See the [CLI download documentation](https://huggingface.co/docs/huggingface_hub/en/guides/cli#download-an-entire-repository) for more information.

You can also integrate this into your own library. For example, you can quickly load a Scikit-learn model with a few lines.
```py
from huggingface_hub import hf_hub_download
import joblib

REPO_ID = "YOUR_REPO_ID"
FILENAME = "sklearn_model.joblib"

model = joblib.load(
    hf_hub_download(repo_id=REPO_ID, filename=FILENAME)
)
```

## Using Git

Since all models on the Model Hub are Xet-backed Git repositories, you can clone the models locally by [installing git-xet](./xet/using-xet-storage#git-xet) and running:

```bash
git xet install
git lfs install
git clone git@hf.co:<MODEL ID> # example: git clone git@hf.co:bigscience/bloom
```

If you have write-access to the particular model repo, you'll also have the ability to commit and push revisions to the model.

Add your SSH public key to [your user settings](https://huggingface.co/settings/keys) to push changes and/or access private repos.

## Faster downloads

### Test your download speed

You can test your download speed from Hugging Face's CDN at [fast.hf.co](https://fast.hf.co). This runs a quick bandwidth test against the nearest HF edge server, helping you understand your baseline throughput before tuning any settings.

You can also measure download speed directly from the terminal using the [`hf-speedtest`](https://github.com/julien-c/hf-speedtest) CLI extension:

```bash
hf extensions install julien-c/hf-speedtest
hf speedtest
```

### Adaptive concurrency with hf_xet

`hf_xet` is a Rust-based package leveraging the [Xet storage backend](https://huggingface.co/docs/hub/en/xet/index) to optimize file transfers with chunk-based deduplication. By default, `hf_xet` uses **adaptive concurrency** — it automatically tunes the number of parallel transfer streams based on real-time network conditions, starting conservatively (1 stream) and scaling up to 64 concurrent streams as bandwidth permits.

For most machines — including data center environments — the default settings will already saturate the available network bandwidth. For advanced users on machines with high bandwidth **and at least 64 GB of RAM**, `HF_XET_HIGH_PERFORMANCE=1` raises concurrency bounds and significantly increases memory buffer sizes, which can help when downloading many large files in parallel.

```bash
HF_XET_HIGH_PERFORMANCE=1 hf download ...
```

## Using hf-mount

For large models, you can mount a repo as a local filesystem with [hf-mount](https://github.com/huggingface/hf-mount) instead of downloading the full repo. Files are fetched lazily — only the bytes your code reads hit the network.

```bash
brew install hf-mount
hf-mount start repo openai-community/gpt2 /tmp/gpt2
```

Repos are mounted read-only. See [Mount as a Local Filesystem](./storage-buckets-access#mount-as-a-local-filesystem) for full setup details, backend options, and caching.

## Downloading behind a proxy or firewall

If your network restricts outbound traffic through a firewall or proxy, downloading models and datasets requires more than just `huggingface.co`. File contents are served from separate storage and CDN hostnames, and `from_pretrained` / `hf download` will fail if these are not reachable, even when `huggingface.co` itself is allowlisted.

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
