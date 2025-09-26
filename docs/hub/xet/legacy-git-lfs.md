## Backward Compatibility with LFS

Xet storage provides a seamless transition for existing Hub repositories. It isn't necessary to know if the Xet backend is involved at all. Xet-backed repositories continue to use the Git LFS pointer file format; the addition of the `Xet backed hash` is only added to the web interface as a convenience. Practically, this means existing repos and newly created repos will not look any different if you do a `bare clone` of them. Each of the large files (or binary files) will continue to have a pointer file that matches the Git LFS pointer file specification.

This symmetry allows non-Xet-aware clients (e.g., older versions of the `huggingface_hub`) to interact with Xet-backed repositories without concern. In fact, within a repository a mixture of Git LFS and Xet backed files are supported. The Xet backend indicates whether a file is in Git LFS or Xet storage, allowing downstream services to request the proper URL(s) from S3, regardless of which storage system holds the content.

Within the Xet architecture, backward compatibility for downloads is achieved by the Git LFS bridge. While a Xet-aware client will receive file reconstruction information from CAS to download the Xet-backed file, a legacy client will get a single URL from the bridge which does the work of reconstructing the request file and returning the URL to the resource. This allows downloading files through a URL so that you can continue to use the Hub's web interface or `curl`.

Meanwhile, uploads from non‑Xet‑aware clients still follow the standard Git LFS path, even if the file is already Xet-backed. Once the file is uploaded to LFS, a background process automatically migrates the content, turning it into a Xet-backed revision. Coupled with the Git LFS bridge, this lets repository maintainers and the rest of the Hub adopt Xet at their own pace without disruption.

## Legacy Storage: Git LFS

The legacy storage system on the Hub, Git LFS utilizes many of the same conventions as Xet-backed repositories. The Hub's Git LFS backend is [Amazon Simple Storage Service (S3)](https://aws.amazon.com/s3/). When Git LFS is invoked, it stores the file contents in S3 using the SHA hash to name the file for future access. This storage architecture is relatively simple and has allowed Hub to store millions of models, datasets, and spaces repositories' files (45PB total as of this writing).

The primary limitation of Git LFS is its file-centric approach to deduplication. Any change to a file, irrespective of how large of small that change is, means the entire file is versioned - incurring significant overheads in file transfers as the entire file is uploaded (if committing to a repository) or downloaded (if pulling the latest version to your machine).

This leads to a worse developer experience along with a proliferation of additional storage.
