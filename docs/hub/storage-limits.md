# Storage limits

At Hugging Face we aim to provide the AI community with significant volumes of **free storage space for public repositories**. We bill for storage space for **private repositories**, above a free tier (see table below).

> [!TIP]
> Storage limits and policies apply to both model and dataset repositories on the Hub.

We [optimize our infrastructure](https://huggingface.co/blog/xethub-joins-hf) continuously to [scale our storage](https://x.com/julien_c/status/1821540661973160339) for the coming years of growth in AI and Machine learning.

We do have mitigations in place to prevent abuse of free public storage, and in general we ask users and organizations to make sure any uploaded large model or dataset is **as useful to the community as possible** (as represented by numbers of likes or downloads, for instance). Finally, upgrade to a paid Organization or User (PRO) account to unlock higher limits.

## Storage plans

| Type of account          | Public storage                                                      | Private storage              |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------- |
| Free user or org         | Best-effort\* 🙏 <br> usually up to 5TB for impactful work          | 100GB                        |
| PRO                      | Up to 10TB included\* ✅ <br> grants available for impactful work†  | 1TB + pay-as-you-go          |
| Team Organizations       | 12TB base + 1TB per seat ✅                                         | 1TB per seat + pay-as-you-go |
| Enterprise Organizations | 200TB base + 1TB per seat 🏆 <br> Up to 1,000TB for large contracts | 1TB per seat + pay-as-you-go |

💡 [Team or Enterprise Organizations](https://huggingface.co/enterprise) include 1TB of private storage per seat in the subscription: for example, if your organization has 40 members, then you have 40TB of included private storage.

\* We aim to continue providing the AI community with generous free storage space for public repositories. Beyond the first few gigabytes, please use this resource responsibly by uploading content that offers genuine value to other users. If you need substantial storage space, you will need to upgrade to [PRO, Team or Enterprise](https://huggingface.co/pricing).

† We work with impactful community members to ensure it is as easy as possible for them to unlock large storage limits. If your models or datasets consistently get many likes and downloads and you hit limits, get in touch.

### Pay-as-you-go price

Above the included 1TB (or 1TB per seat) of private storage in [PRO](https://huggingface.co/subscribe/pro) and [Team or Enterprise Organizations](https://huggingface.co/enterprise), private storage is invoiced at **$25/TB/month**, in 1TB increments. See our [billing doc](./billing) for more details.

## Repository limitations and recommendations

In parallel to storage limits at the account (user or organization) level, there are some limitations to be aware of when dealing with a large amount of data in a specific repo. Given the time it takes to stream the data,
getting an upload/push to fail at the end of the process or encountering a degraded experience, be it on hf.co or when working locally, can be very annoying. In the following section, we describe our recommendations on how to best structure your large repos.

### Recommendations

We gathered a list of tips and recommendations for structuring your repo. If you are looking for more practical tips, check out [this guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/upload#tips-and-tricks-for-large-uploads) on how to upload large amount of data using the Python library.


| Characteristic     | Recommended        | Tips                                                   |
| ----------------   | ------------------ | ------------------------------------------------------ |
| Repo size          | -                  | contact us for large repos (TBs of data)               |
| Files per repo     | <100k              | merge data into fewer files                            |
| Entries per folder | <10k               | use subdirectories in repo                             |
| File size          | <200GB             | split data into chunked files                          |
| Commit size        | <100 files*        | upload files in multiple commits                       |
| Commits per repo   | -                  | upload multiple files per commit and/or squash history |

_\* Not relevant when using `git` CLI directly_

Please read the next section to better understand those limits and how to deal with them.

### Explanations

What are we talking about when we say "large uploads", and what are their associated limitations? Large uploads can be
very diverse, from repositories with a few huge files (e.g. model weights) to repositories with thousands of small files
(e.g. an image dataset).

Under the hood, the Hub uses Git to version the data, which has structural implications on what you can do in your repo.
If your repo is crossing some of the numbers mentioned in the previous section, **we strongly encourage you to check out [`git-sizer`](https://github.com/github/git-sizer)**,
which has very detailed documentation about the different factors that will impact your experience. Here is a TL;DR of factors to consider:

- **Repository size**: The total size of the data you're planning to upload. If you would like to upload more than 1TB, you will need to subscribe to Team/Enterprise or ask us to grant more storage. We consider storage grants for impactful work and when a subscription is not an option. To do that, please send an email with details of your project to datasets@huggingface.co (for datasets) or models@huggingface.co (for models).
- **Number of files**:
    - For optimal experience, we recommend keeping the total number of files under 100k, and ideally much less. Try merging the data into fewer files if you have more.
      For example, json files can be merged into a single jsonl file, or large datasets can be exported as Parquet files or in [WebDataset](https://github.com/webdataset/webdataset) format.
    - The maximum number of files per folder cannot exceed 10k files per folder. A simple solution is to
      create a repository structure that uses subdirectories. For example, a repo with 1k folders from `000/` to `999/`, each containing at most 1000 files, is already enough.
- **File size**: In the case of uploading large files (e.g. model weights), we strongly recommend splitting them **into chunks <200GB each.**.
There are a few reasons for this:
    - Uploading and downloading smaller files is much easier both for you and the other users. Connection issues can always
      happen when streaming data and smaller files avoid resuming from the beginning in case of errors.
    - Files are served to the users using CloudFront. From our experience, huge files are not cached by this service
      leading to a slower download speed.
In all cases, no single file will exceed 500GB. I.e. 500GB is the hard limit for a single file size.
- **Number of commits**: There is no hard limit for the total number of commits on your repo history. However, from
our experience, the user experience on the Hub starts to degrade after a few thousand commits. We are constantly working to
improve the service, but one must always remember that a git repository is not meant to work as a database with a lot of
writes. If your repo's history gets very large, it is always possible to squash all the commits to get a
fresh start using `huggingface_hub`'s [`super_squash_history`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.super_squash_history). Be aware that this is a non-revertible operation.
- **Number of operations per commit**: Once again, there is no hard limit here. When a commit is uploaded on the Hub, each
git operation (addition or delete) is checked by the server. When a hundred Large Files are committed at once,
each file is checked individually to ensure it's been correctly uploaded. When pushing data through HTTP,
a timeout of 60s is set on the request, meaning that if the process takes more time, an error is raised. However, it can
happen (in rare cases) that even if the timeout is raised client-side, the process is still
completed server-side. This can be checked manually by browsing the repo on the Hub. To prevent this timeout, we recommend
adding around 50-100 files per commit.

### Sharing large datasets on the Hub

One key way Hugging Face supports the machine learning ecosystem is by hosting datasets on the Hub, including very large ones. However, if your dataset is bigger than 1TB, you will need to subscribe to Team/Enterprise or  ask us to grant more storage.

In this case, to ensure we can effectively support the open-source ecosystem, we require you to let us know via datasets@huggingface.co.

When you get in touch with us, please let us know:

- What is the dataset, and who/what is it likely to be useful for?
- The size of the dataset.
- The format you plan to use for sharing your dataset.

For hosting large datasets on the Hub, we require the following for your dataset:

- A dataset card: we want to ensure that your dataset can be used effectively by the community and one of the key ways of enabling this is via a dataset card. This [guidance](./datasets-cards) provides an overview of how to write a dataset card.
- You are sharing the dataset to enable community reuse. If you plan to upload a dataset you anticipate won't have any further reuse, other platforms are likely more suitable.
- You must follow the repository limitations outlined above.
- Using file formats that are well integrated with the Hugging Face ecosystem. We have good support for [Parquet](https://huggingface.co/docs/datasets/v2.19.0/en/loading#parquet) and [WebDataset](https://huggingface.co/docs/datasets/v2.19.0/en/loading#webdataset) formats, which are often good options for sharing large datasets efficiently. This will also ensure the dataset viewer works for your dataset.
- Avoid the use of custom loading scripts when using datasets. In our experience, datasets that require custom code to use often end up with limited reuse.

Please get in touch with us if any of these requirements are difficult for you to meet because of the type of data or domain you are working in.

### Sharing large volumes of models on the Hub

Similarly to datasets, if you host models bigger than 1TB or if you plan on uploading a large number of smaller sized models (for instance, hundreds of automated quants) totalling more than 1TB, you will need to subscribe to Team/Enterprise or ask us to grant more storage. 

To do that, to ensure we can effectively support the open-source ecosystem, please send an email with details of your project to models@huggingface.co.

### Grants for private repositories

We recommend that academic and research institutions upgrade to Team, Enterprise, or Academia Hub for guaranteed storage limits. For researchers doing highly impactful work who are genuinely blocked by lack of institutional funding, PRO storage grants may be available on a case-by-case basis. Please contact datasets@huggingface.co or models@huggingface.co with a proposal explaining your use case and demonstrated impact.


## How can I free up storage space in my account/organization?

There are several ways to manage and free some storage space in your account or organization. First, if you need more storage space, upgrade to a PRO, Team or Enterprise plan for increased storage limits.

⚠️ **Important**: Deleting Large Files is a destructive operation that cannot be undone. Make sure to backup your files before proceeding.

Key points to remember:
- Deleting only LFS pointers doesn't free up space
- If you do not rewrite the Git history, future checkouts of branches/tags containing deleted LFS files with existing lfs pointers will fail (to avoid errors, add the following line to your `.gitconfig` file: `lfs.skipdownloaderrors=true`)


### Deleting individual LFS files

1. Navigate to your repository's Settings page
2. Click on "List LFS files" in the "Storage" section
3. Use the actions menu to delete specific files

### Deleting Pull request refs

[Pull requests](./repositories-pull-requests-discussions) create git refs that store their commits. After closing or merging a PR, you can delete its ref to free up storage space. This is especially useful when:
- PRs contain large files that were never merged
- You've squashed the main branch and removed files later on — those files remain in the PR branch history even if they weren't added by the PR itself

To delete a PR ref, open the closed or merged PR and look for the storage notice at the bottom showing the estimated space that could be freed. Click "Delete ref" to permanently remove it.

> [!NOTE]
> Deleting a PR ref is irreversible and will prevent anyone from fetching or checking out those commits locally.

### Super-squash your repository using the API

The super-squash operation compresses your entire Git history into a single commit. Consider using super-squash when you need to reclaim storage from old LFS versions you're not using. This operation is only available through the [Hub Python Library](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.super_squash_history) or the API.

⚠️ **Important**: This is a destructive operation that cannot be undone, commit history will be permanently lost and **LFS file history will be removed**

The effects from the squash operation on your storage quota are not immediate and will be reflected on your quota within 36 hours.

### Advanced: Track LFS file references

When you find an LFS file in your repository's "List LFS files" but don't know where it came from, you can trace its history using its SHA-256 OID by using the git log command: 

```bash
git log --all -p -S <SHA-256-OID>
```

For example:

```bash
git log --all -p -S 68d45e234eb4a928074dfd868cead0219ab85354cc53d20e772753c6bb9169d3

commit 5af368743e3f1d81c2a846f7c8d4a028ad9fb021
Date:   Sun Apr 28 02:01:18 2024 +0200

    Update LayerNorm tensor names to weight and bias

diff --git a/model.safetensors b/model.safetensors
index a090ee7..e79c80e 100644
--- a/model.safetensors
+++ b/model.safetensors
@@ -1,3 +1,3 @@
 version https://git-lfs.github.com/spec/v1
-oid sha256:68d45e234eb4a928074dfd868cead0219ab85354cc53d20e772753c6bb9169d3
+oid sha256:0bb7a1683251b832d6f4644e523b325adcf485b7193379f5515e6083b5ed174b
 size 440449768

commit 0a6aa9128b6194f4f3c4db429b6cb4891cdb421b (origin/pr/28)
Date:   Wed Nov 16 15:15:39 2022 +0000

    Adding `safetensors` variant of this model (#15)
    
    
    - Adding `safetensors` variant of this model (18c87780b5e54825a2454d5855a354ad46c5b87e)
    
    
    Co-authored-by: Nicolas Patry <Narsil@users.noreply.huggingface.co>

diff --git a/model.safetensors b/model.safetensors
new file mode 100644
index 0000000..a090ee7
--- /dev/null
+++ b/model.safetensors
@@ -0,0 +1,3 @@
+version https://git-lfs.github.com/spec/v1
+oid sha256:68d45e234eb4a928074dfd868cead0219ab85354cc53d20e772753c6bb9169d3
+size 440449768

commit 18c87780b5e54825a2454d5855a354ad46c5b87e (origin/pr/15)
Date:   Thu Nov 10 09:35:55 2022 +0000

    Adding `safetensors` variant of this model

diff --git a/model.safetensors b/model.safetensors
new file mode 100644
index 0000000..a090ee7
--- /dev/null
+++ b/model.safetensors
@@ -0,0 +1,3 @@
+version https://git-lfs.github.com/spec/v1
+oid sha256:68d45e234eb4a928074dfd868cead0219ab85354cc53d20e772753c6bb9169d3
+size 440449768

```
