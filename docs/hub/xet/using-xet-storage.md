## Using Xet Storage

To start using Xet Storage, you need a Xet-enabled repository and a Xet-aware version of the [huggingface_hub](https://huggingface.co/docs/huggingface_hub) Python library. As of May 23rd, 2025, Xet-enabled repositories are the default [for all new users and organizations on the Hub](https://huggingface.co/changelog/xet-default-for-new-users).

> [!TIP]
> For user and organization profiles created before May 23rd, 2025, you can make Xet the default for all your repositories by [signing up here](https://huggingface.co/join/xet). You can apply for yourself or your entire organization (requires [admin permissions](https://huggingface.co/docs/hub/organizations-security)). Once approved, all existing repositories will be automatically migrated to Xet and future repositories will be Xet-enabled by default.
>
> PRO users and Team or Enterprise organizations will be fast-tracked for access.

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

### Recommendations

Xet integrates seamlessly with the Hub's current Python-based workflows. However, there are a few steps you may consider to get the most benefits from Xet storage:

- **Use `hf_xet`**: While Xet remains backward compatible with legacy clients optimized for Git LFS, the `hf_xet` integration with `huggingface_hub` delivers optimal chunk-based performance and faster iteration on large files.
- **Utilize `hf_xet` environment variables**: The default installation of `hf_xet` is designed to support the broadest range of hardware. To take advantage of setups with more network bandwidth or processing power read up on `hf_xet`'s [environment variables](https://huggingface.co/docs/huggingface_hub/package_reference/environment_variables#xet) to further speed up downloads and uploads.
- **Leverage frequent, incremental commits**: Xet's chunk-level deduplication means you can safely make incremental updates to models or datasets. Only changed chunks are uploaded, so frequent commits are both fast and storage-efficient.
- **Be Specific in .gitattributes**: When defining patterns for Xet or LFS, use precise file extensions (e.g., `*.safetensors`, `*.bin`) to avoid unnecessarily routing smaller files through large-file storage.
- **Prioritize community access**: Xet substantially increases the efficiency and scale of large file transfers. Instead of structuring your repository to reduce its total size (or the size of individual files), organize it for collaborators and community users so they may easily navigate and retrieve the content they need.

### Current Limitations

While Xet brings fine-grained deduplication and enhanced performance to Git-based storage, some features and platform compatibilities are still in development. As a result, keep the following constraints in mind when working with a Xet-enabled repository:

- **64-bit systems only**: The `hf_xet` client currently requires a 64-bit architecture; 32-bit systems are not supported.
- **Git client integration (git-xet)**: Under active development - coming soon, stay tuned!
