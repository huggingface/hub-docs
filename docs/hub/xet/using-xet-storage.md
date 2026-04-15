# Using Xet Storage

## Python

To access a Xet-aware version of the `huggingface_hub`, simply install the latest version:

```bash
pip install -U huggingface_hub
```

As of `huggingface_hub` 0.32.0, this will also install `hf_xet`. The `hf_xet` package integrates `huggingface_hub` with [`xet-core`](https://github.com/huggingface/xet-core), the Rust client for the Xet backend.

If you use the `transformers` or `datasets` libraries, it's already using `huggingface_hub`. So long as the version of `huggingface_hub` >= 0.32.0, no further action needs to be taken.

Where versions of `huggingface_hub` >= 0.30.0 and < 0.32.0 are installed, `hf_xet` must be installed explicitly:

```bash
pip install -U hf-xet
```

And that's it! You now get the benefits of Xet deduplication for both uploads and downloads. Team members using a version of `huggingface_hub` < 0.30.0 will still be able to upload and download repositories through the [backwards compatibility provided by the LFS bridge](legacy-git-lfs#backward-compatibility-with-lfs).

To see more detailed usage docs, refer to the `huggingface_hub` docs for:

- [Upload](https://huggingface.co/docs/huggingface_hub/guides/upload#faster-uploads)
- [Download](https://huggingface.co/docs/huggingface_hub/guides/download#hfxet)
- [Managing the `hf_xet` cache](https://huggingface.co/docs/huggingface_hub/guides/manage-cache#chunk-based-caching-xet)

## Git
<a id="git-xet"></a>

Git users can access the benefits of Xet by downloading and installing the Git Xet extension. Once installed, simply use the [standard workflows for managing Hub repositories with Git](../repositories-getting-started) - no additional changes necessary.

### Prerequisites

Install [Git](https://git-scm.com/) and [Git LFS](https://git-lfs.com/). 

### Install on macOS or Linux (amd64 or aarch64)

Install using an installation script with the following command in your terminal (requires `curl` and `unzip`):
```
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/huggingface/xet-core/refs/heads/main/git_xet/install.sh | sh
```

Or, install using [Homebrew](https://brew.sh/):
```
brew install git-xet
git xet install
```

To verify the installation, run:
```
git xet --version
```

### Windows (amd64)

Using `winget`:
```
winget install git-xet
```

Using an installer: 
 - Download `git-xet-windows-installer-x86_64.zip` ([available here](https://github.com/huggingface/xet-core/releases/download/git-xet-v0.2.0/git-xet-windows-installer-x86_64.zip)) and unzip. 
 - Run the `msi` installer file and follow the prompts.

Manual installation:
 - Download `git-xet-windows-x86_64.zip` ([available here](https://github.com/huggingface/xet-core/releases/download/git-xet-v0.2.0/git-xet-windows-x86_64.zip)) and unzip. 
 - Place the extracted `git-xet.exe` under a `PATH` directory.
 - Run `git xet install` in a terminal.

To verify the installation, run:
  ```
  git xet --version
  ```

### Using Git Xet

Once installed on your platform, using Git Xet is as simple as following the Hub's standard Git workflows.

Make sure all [prerequisites are installed and configured](https://huggingface.co/docs/hub/repositories-getting-started#requirements), follow the [setup instructions for working with repositories on the Hub](https://huggingface.co/docs/hub/repositories-getting-started#set-up), then commit your changes, and `push` to the Hub:

  ```
  # Create any files you like! Then...
  git add .
  git commit -m "Uploading new models"  # You can choose any descriptive message
  git push
  ```
Under the hood, the [Xet protocol](https://huggingface.co/docs/xet/index) is invoked to upload large files directly to Xet storage, increasing upload speeds through the power of [chunk-level deduplication](./deduplication).

### Uninstall on macOS or Linux

Using Homebrew:
```bash
git xet uninstall
brew uninstall git-xet
```
If you used the installation script (for MacOS or Linux), run the following in your terminal:
```bash
git xet uninstall
sudo rm $(which git-xet)
```
### Uninstall on Windows

If you used `winget`:
```
winget uninstall git-xet
```

If you used the installer:
-  Navigate to Settings -> Apps -> Installed apps
- Find "Git-Xet".
- Select the "Uninstall" option available in the context menu.

If you manually installed:
- Run `git xet uninstall` in a terminal. 
- Delete the `git-xet.exe` file from the location where it was originally placed.

## Recommendations

Xet integrates seamlessly with all of the Hub's workflows. However, there are a few steps you may consider to get the most benefits from Xet storage.

When uploading or downloading with Python:

- **Make sure `hf_xet` is installed**: While Xet remains backward compatible with legacy clients optimized for Git LFS, the `hf_xet` integration with `huggingface_hub` delivers optimal chunk-based performance and faster iteration on large files.
- **Adaptive concurrency is on by default**: `hf_xet` automatically adjusts the number of parallel transfer streams based on real-time network conditions — no configuration required. The default settings will saturate most network paths without any tuning.
- **Advanced tuning**: For fine-grained control, `HF_XET_FIXED_DOWNLOAD_CONCURRENCY` and `HF_XET_FIXED_UPLOAD_CONCURRENCY` let you pin concurrency to a fixed value, bypassing the adaptive controller. See `hf_xet`'s [environment variables](https://huggingface.co/docs/huggingface_hub/package_reference/environment_variables#xet) for the full list of options.

When uploading or downloading in Git or Python: 

- **Leverage frequent, incremental commits**: Xet's chunk-level deduplication means you can safely make incremental updates to models or datasets. Only changed chunks are uploaded, so frequent commits are both fast and storage-efficient.
- **Be Specific in .gitattributes**: When defining patterns for Xet or LFS, use precise file extensions (e.g., `*.safetensors`, `*.bin`) to avoid unnecessarily routing smaller files through large-file storage.
- **Prioritize community access**: Xet substantially increases the efficiency and scale of large file transfers. Instead of structuring your repository to reduce its total size (or the size of individual files), organize it for collaborators and community users so they may easily navigate and retrieve the content they need.

## Environment Variables

Both `hf_xet` and Git Xet are powered by `xet-core`, which can be configured via environment variables. The tables below list the individual variables for fine-grained control. Most users will not need to change any of these — the defaults are tuned to saturate most network paths automatically.

> [!NOTE]
> `HF_XET_HIGH_PERFORMANCE=1` is a convenience flag that adjusts several settings at once (concurrency bounds, buffer sizes, and parallel file limits). It is intended for machines with high bandwidth **and at least 64 GB of RAM** for buffering. On machines with less memory, it may degrade performance.

### Adaptive Concurrency

By default, `xet-core` uses adaptive concurrency — dynamically adjusting parallelism based on real-time network conditions. These are advanced settings that are unlikely to be needed in most cases. The variables below control the adaptive controller's behavior:

| Environment Variable | Default | Description |
|---|---|---|
| `HF_XET_CLIENT_ENABLE_ADAPTIVE_CONCURRENCY` | `true` | Enable or disable adaptive concurrency control. When disabled, concurrency stays at the initial value. |
| `HF_XET_CLIENT_AC_INITIAL_UPLOAD_CONCURRENCY` | `1` | Starting number of concurrent upload streams. HP mode: `16`. |
| `HF_XET_CLIENT_AC_INITIAL_DOWNLOAD_CONCURRENCY` | `1` | Starting number of concurrent download streams. HP mode: `16`. |
| `HF_XET_CLIENT_AC_MIN_UPLOAD_CONCURRENCY` | `1` | Lower bound for upload concurrency. HP mode: `4`. |
| `HF_XET_CLIENT_AC_MIN_DOWNLOAD_CONCURRENCY` | `1` | Lower bound for download concurrency. HP mode: `4`. |
| `HF_XET_CLIENT_AC_MAX_UPLOAD_CONCURRENCY` | `64` | Upper bound for upload concurrency. HP mode: `124`. |
| `HF_XET_CLIENT_AC_MAX_DOWNLOAD_CONCURRENCY` | `64` | Upper bound for download concurrency. HP mode: `124`. |
| `HF_XET_CLIENT_AC_TARGET_RTT` | `60s` | Target round-trip time. Concurrency increases as long as the predicted round-trip time for a full transfer is below this value. |
| `HF_XET_CLIENT_AC_MAX_HEALTHY_RTT` | `90s` | Maximum acceptable round-trip time. Transfers taking longer than this are counted as failures by the adaptive controller. |
| `HF_XET_CLIENT_AC_HEALTHY_SUCCESS_RATIO_THRESHOLD` | `0.8` | Success ratio above which the controller increases concurrency. |
| `HF_XET_CLIENT_AC_UNHEALTHY_SUCCESS_RATIO_THRESHOLD` | `0.5` | Success ratio below which the controller decreases concurrency. |
| `HF_XET_CLIENT_AC_LOGGING_INTERVAL_MS` | `10000` | Interval (in ms) at which concurrency status is logged. |

> [!TIP]
> To pin concurrency to a fixed value (bypassing the adaptive controller), use the convenience aliases `HF_XET_FIXED_UPLOAD_CONCURRENCY` and `HF_XET_FIXED_DOWNLOAD_CONCURRENCY`. These set the initial, minimum, and maximum concurrency to the same value.

### Network and Retry

| Environment Variable | Default | Description |
|---|---|---|
| `HF_XET_CLIENT_RETRY_MAX_ATTEMPTS` | `5` | Maximum number of retry attempts for failed requests. |
| `HF_XET_CLIENT_RETRY_BASE_DELAY` | `3000ms` | Base delay between retries (with exponential backoff). |
| `HF_XET_CLIENT_RETRY_MAX_DURATION` | `360s` | Maximum total time to spend retrying a request. |
| `HF_XET_CLIENT_CONNECT_TIMEOUT` | `60s` | TCP connection timeout. |
| `HF_XET_CLIENT_READ_TIMEOUT` | `120s` | Read timeout for HTTP responses. |
| `HF_XET_CLIENT_IDLE_CONNECTION_TIMEOUT` | `60s` | Timeout before idle connections are closed. |
| `HF_XET_CLIENT_MAX_IDLE_CONNECTIONS` | `16` | Maximum number of idle connections in the pool. |

### Data Transfer

| Environment Variable | Default | Description |
|---|---|---|
| `HF_XET_DATA_MAX_CONCURRENT_FILE_INGESTION` | `8` | Maximum number of files processed concurrently during upload. HP mode: `100`. |
| `HF_XET_DATA_MAX_CONCURRENT_FILE_DOWNLOADS` | `8` | Maximum number of files downloaded concurrently. |
| `HF_XET_DATA_INGESTION_BLOCK_SIZE` | `8mb` | Size of blocks read during file ingestion. |
| `HF_XET_DATA_PROGRESS_UPDATE_INTERVAL` | `200ms` | How often progress bars are updated. |
| `HF_XET_DATA_PROGRESS_UPDATE_SPEED_SAMPLING_WINDOW` | `10s` | Time window used for aggregating transfer speed measurements in progress reporting. |

### Download Buffers

These control memory usage during downloads. `HF_XET_HIGH_PERFORMANCE=1` raises these significantly.

| Environment Variable | Default | HP Mode | Description |
|---|---|---|---|
| `HF_XET_RECONSTRUCTION_MIN_RECONSTRUCTION_FETCH_SIZE` | `256mb` | `1gb` | Minimum fetch size for reconstruction requests. |
| `HF_XET_RECONSTRUCTION_MAX_RECONSTRUCTION_FETCH_SIZE` | `8gb` | `16gb` | Maximum fetch size for reconstruction requests. |
| `HF_XET_RECONSTRUCTION_DOWNLOAD_BUFFER_SIZE` | `2gb` | `16gb` | Total download buffer size. |
| `HF_XET_RECONSTRUCTION_DOWNLOAD_BUFFER_PERFILE_SIZE` | `512mb` | `2gb` | Per-file download buffer size. |
| `HF_XET_RECONSTRUCTION_DOWNLOAD_BUFFER_LIMIT` | `8gb` | `64gb` | Hard limit on total download buffer memory. |
| `HF_XET_RECONSTRUCTION_TARGET_BLOCK_COMPLETION_TIME` | `15m` | — | Target time for completing a prefetch block. Used to determine how much data to prefetch ahead during downloads. |
| `HF_XET_RECONSTRUCTION_MIN_PREFETCH_BUFFER` | `1gb` | — | Minimum amount of data to keep prefetched during downloads, regardless of estimated completion time. |

### Logging

| Environment Variable | Default | Description |
|---|---|---|
| `HF_XET_LOG_DEST` | (none) | Log destination. Accepts a file path or directory path (ending with `/`). When set to a directory, log files are created with timestamped names. When set to an empty string, logs go to the console. When unset, logs go to the `logs/` subdirectory in the Hugging Face Xet cache directory. |
| `HF_XET_LOG_FORMAT` | (none) | Log format. Set to `json` for JSON-formatted logs; otherwise plain text. By default, file logging uses JSON and console logging uses text. |
| `HF_XET_LOG_PREFIX` | `xet` | Prefix for log file names when logging to a directory. |
| `HF_XET_LOG_DIR_DISABLE_CLEANUP` | `false` | Disable automatic cleanup of old log files in the log directory. |
| `HF_XET_LOG_DIR_MAX_SIZE` | `250mb` | Maximum total size of log files in the log directory. Old files are pruned to stay under this limit. |
| `HF_XET_LOG_DIR_MIN_DELETION_AGE` | `1d` | Minimum age before a log file can be deleted during cleanup. |
| `HF_XET_LOG_DIR_MAX_RETENTION_AGE` | `14d` | Maximum age for log files. Files older than this are always deleted during cleanup. |

## Current Limitations

While Xet brings fine-grained deduplication and enhanced performance to Git-based storage, some features and platform compatibilities are still in development. As a result, keep the following constraints in mind when working with a Xet-enabled repository:

- **64-bit systems only**: Both `hf_xet` and Git Xet currently require a 64-bit architecture; 32-bit systems are not supported.
