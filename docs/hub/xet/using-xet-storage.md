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
- **Utilize `hf_xet` environment variables**: The default installation of `hf_xet` is designed to support the broadest range of hardware. To take advantage of setups with more network bandwidth or processing power read up on `hf_xet`'s [environment variables](https://huggingface.co/docs/huggingface_hub/package_reference/environment_variables#xet) to optimize downloads and uploads.

When uploading or downloading in Git or Python: 

- **Leverage frequent, incremental commits**: Xet's chunk-level deduplication means you can safely make incremental updates to models or datasets. Only changed chunks are uploaded, so frequent commits are both fast and storage-efficient.
- **Be Specific in .gitattributes**: When defining patterns for Xet or LFS, use precise file extensions (e.g., `*.safetensors`, `*.bin`) to avoid unnecessarily routing smaller files through large-file storage.
- **Prioritize community access**: Xet substantially increases the efficiency and scale of large file transfers. Instead of structuring your repository to reduce its total size (or the size of individual files), organize it for collaborators and community users so they may easily navigate and retrieve the content they need.

## Current Limitations

While Xet brings fine-grained deduplication and enhanced performance to Git-based storage, some features and platform compatibilities are still in development. As a result, keep the following constraints in mind when working with a Xet-enabled repository:

- **64-bit systems only**: Both `hf_xet` and Git Xet currently require a 64-bit architecture; 32-bit systems are not supported.
