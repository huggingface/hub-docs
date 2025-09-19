# Repositories

Models, Spaces, and Datasets are hosted on the Hugging Face Hub as [Git repositories](https://git-scm.com/about), which means that version control and collaboration are core elements of the Hub. In a nutshell, a repository (also known as a **repo**) is a place where code and assets can be stored to back up your work, share it with the community, and work in a team. 

Unlike other collaboration platforms, our Git repositories are optimized for Machine Learning and AI files – large binary files, usually in specific file formats like Parquet and Safetensors, and up to Terabyte-scale sizes!
To achieve this, we built [Xet](./storage-backends), a modern custom storage system built specifically for AI/ML development, enabling chunk-level deduplication, smaller uploads, and faster downloads.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/xet-speed.gif"/>
</div>

In these pages, you will go over the basics of getting started with Git and Xet and interacting with repositories on the Hub. Once you get the hang of it, you can explore the best practices and next steps that we've compiled for effective repository usage.

## Contents

- [Getting Started with Repositories](./repositories-getting-started)
- [Settings](./repositories-settings)
- [Storage Limits](./storage-limits)
- [Storage Backends](./storage-backends)
- [Pull Requests & Discussions](./repositories-pull-requests-discussions)
  - [Pull Requests advanced usage](./repositories-pull-requests-discussions#pull-requests-advanced-usage)
- [Collections](./collections)
- [Notifications](./notifications)
- [Webhooks](./webhooks)
- [Next Steps](./repositories-next-steps)
- [Licenses](./repositories-licenses)
