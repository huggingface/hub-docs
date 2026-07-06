# S3 Compatibility

Storage Buckets can be accessed through an **S3-compatible API**, letting you use existing S3 tooling — the AWS CLI, `boto3`, `s5cmd`, and most other S3 SDKs — against your buckets without changing your code. 
Requests go through a gateway service at `https://s3.hf.co`.

The S3 API is one of several ways to reach bucket data — for Hugging Face-native access (the `hf` CLI, `hf://` paths, and filesystem mounts) without separate S3 credentials, see [Access Patterns](./storage-buckets-access).

> [!NOTE]
> The S3 API works only with [Storage Buckets](./storage-buckets). It does not expose other Hugging Face repository types (models, datasets, Spaces).

## Generating S3 Credentials

The gateway authenticates with AWS-style access keys derived from a Hugging Face [User Access Token](./security-tokens).

1. Go to your [Access Tokens settings](https://huggingface.co/settings/tokens). Create a token with the **Create new token** button if you don't already have one. The token's permissions become the S3 credentials' permissions — choose **Read** for read-only access to your buckets, or **Write** for read and write access.
2. Find the token in the list, open its dropdown menu, and choose **Generate S3 credentials**.

   <div class="flex justify-center">
   <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/bucket-generate-s3-credentials-light.png" alt="Generate S3 credentials option in access token's dropdown menu"/>
   <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/bucket-generate-s3-credentials-dark.png" alt="Generate S3 credentials option in access token's dropdown menu"/>
   </div>

3. Copy the generated **access key ID** (prefixed `HFAK…`) and **secret access key** somewhere safe — the secret is shown only once.

The S3 credentials inherit the permissions of the underlying access token. For fine-grained tokens, scope them to only the namespaces and buckets you intend to use.

## Configuring a Client

Point your S3 client at the gateway endpoint and set a few required options. Use your Hugging Face **namespace** (your username or an organization name) in the endpoint URL — see [Addressing buckets](#addressing-buckets) below.

| Setting                        | Value                          | Why                                                           |
|--------------------------------|--------------------------------|---------------------------------------------------------------|
| `endpoint_url`                 | `https://s3.hf.co/<namespace>` | The gateway, scoped to your namespace                         |
| `region`                       | `us-east-1`                    | Required; the gateway is currently single-region              |
| `s3.addressing_style`          | `path`                         | Buckets are addressed as path segments, not subdomains        |
| `request_checksum_calculation` | `when_required`                | Prevents recent clients from sending trailing checksums       |
| `response_checksum_validation` | `when_required`                | Prevents recent clients from expecting checksums in responses |

The two checksum settings matter for recent clients: AWS CLI ≥ 2.23 and recent `boto3` versions send trailing CRC32 checksums (via `aws-chunked` framing) by default, which the gateway does not parse. 
These settings tell the client to send checksums only when an operation strictly requires them.

The following are optional but recommended so large uploads use as few multipart parts as possible:

| Setting                  | Value |
|--------------------------|-------|
| `s3.multipart_threshold` | `2GB` |
| `s3.multipart_chunksize` | `2GB` |

### Example: AWS CLI profile

Add a profile to `~/.aws/config`:

```ini
[profile hf]
region = us-east-1
endpoint_url = https://s3.hf.co/<namespace>
s3 =
    addressing_style = path
    multipart_threshold = 2GB
    multipart_chunksize = 2GB
request_checksum_calculation = when_required
response_checksum_validation = when_required
```
Note: replace the `<namespace>` above with the username or organization your buckets are stored in.

Add the matching credentials for the profile to `~/.aws/credentials`:

```ini
[hf]
aws_access_key_id = HFAK...
aws_secret_access_key = ...
```

Then use any S3 command with the profile:

```bash
aws --profile hf s3 ls
aws --profile hf s3 mb s3://my-bucket
aws --profile hf s3 cp ./model.safetensors s3://my-bucket/models/model.safetensors
```

## Addressing Buckets

AWS S3 uses a single flat, globally-unique space of bucket names, and SDKs expect a bucket name to be a plain string with no `/`. Hugging Face buckets are instead identified as `namespace/bucket`, where the `namespace` is your username or organization. That extra level introduces a mismatch with S3 clients — many won't accept a `/` in a bucket name, or will URL-escape it incorrectly. There are two ways to work around it:

**1. Put the namespace in the endpoint URL** (recommended for most cases). This scopes every operation to that namespace, so the bucket name passed to the client is just the HF bucket name. It works well for your own buckets or buckets in a single org, but breaks down across namespaces — e.g. a server-side copy from a personal bucket into an org bucket.

```bash
aws --endpoint-url https://s3.hf.co/my-org s3api get-object \
  --bucket my-bucket --key some/object.txt ./object.txt
```

**2. Treat the namespace as the bucket** and prepend the HF bucket name to the object key. This works for object-level operations (uploads, downloads) but has issues with bucket-level operations such as creating or deleting buckets.

```bash
aws --endpoint-url https://s3.hf.co s3api get-object \
  --bucket my-org --key my-bucket/some/object.txt ./object.txt
```

## Limitations and Differences from AWS S3

Because Storage Buckets don't model every S3 concept, some behaviors differ or aren't supported.

### Object downloads

The gateway is currently single-region. To improve download performance, `GetObject` typically responds with an HTTP 302 redirect to the nearest Hugging Face CDN edge rather than serving bytes directly.

Some SDKs don't follow redirects from an S3 endpoint, so the gateway detects clients identifying as `aws-cli`, `botocore` (which covers `boto3`), or `aws-sdk-rust` and proxies the data through itself for them. All other clients (`rclone`, `s5cmd`, `curl`, the AWS Go SDK, etc.) receive the 302 and follow it natively, keeping the gateway out of the data path for faster downloads.

### Object key naming

Bucket object keys are more restricted than S3. A key must **not**:

- start or end with `/`
- contain consecutive slashes (`//`)
- contain `../` sequences
- start with `./`
- end with `..`
- contain backslashes (`\`) or null bytes (`\0`)

### ListObjects

- `ListObjectsV1` is not supported — use `ListObjectsV2`. Note that some clients (like rclone) 
  may need to be configured to use `ListObjectsV2` exclusively.
- Only `/` is allowed as the delimiter.

### Other API differences

- **Object metadata**: arbitrary user metadata (`x-amz-meta-*`) is not stored or returned. `Content-Type` is supported.
- **Unsupported features**: ACLs, bucket policies, object tagging, object versioning, lifecycle rules, server-side encryption (SSE), and bucket notifications are not supported. Objects are always reported with the `STANDARD` storage class. Related request headers and parameters are accepted but ignored.
- **CopyObject**: server-side copy works only within a single namespace. Cross-namespace copy and `UploadPartCopy` (copying a part from an existing object into a multipart upload) are not supported.
- **Conditional requests**: `If-Match` / `If-None-Match` preconditions are honored on `PutObject` and on the copy-source of `CopyObject`, but not on `GetObject`.
- **Multipart upload expiry**: in-flight multipart uploads that are never completed or aborted are automatically expired and cleaned up after 7 days.

## Examples

Real-world recipes for common tasks. Each builds on the [client configuration](#configuring-a-client) above.

### Read and write with `boto3`

[`boto3`](https://docs.aws.amazon.com/boto3/latest/) works against the gateway with the [client settings](#configuring-a-client) above. Replace `<namespace>` with your username or organization:

```python
import boto3
from botocore.config import Config

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hf.co/<namespace>",
    aws_access_key_id="HFAK...",
    aws_secret_access_key="...",
    config=Config(
        region_name="us-east-1",
        s3={"addressing_style": "path"},
        request_checksum_calculation="when_required",
        response_checksum_validation="when_required",
    ),
)

s3.upload_file("model.safetensors", "my-bucket", "models/model.safetensors")
s3.download_file("my-bucket", "models/model.safetensors", "model.safetensors")
```

### Query a bucket with DuckDB

With the `httpfs` extension, [DuckDB](https://duckdb.org/) can read Parquet (and other formats) straight from a bucket:

```sql
INSTALL httpfs;
LOAD httpfs;

CREATE SECRET hf (
    TYPE s3,
    KEY_ID 'HFAK...',
    SECRET '...',
    ENDPOINT 's3.hf.co/<namespace>',
    URL_STYLE 'path',
    REGION 'us-east-1'
);

SELECT * FROM read_parquet('s3://my-bucket/data.parquet');
```

> [!NOTE]
> `URL_STYLE 'path'` is required. Without it, DuckDB uses virtual-hosted-style addressing (`my-bucket.s3.hf.co`), which the gateway does not serve — you will see a "Could not resolve hostname" error.

### Import data using `rclone`

[`rclone`](https://rclone.org/) is a convenient way to copy data between two S3-compatible stores, so it's a good fit for moving an existing AWS S3 bucket (or any S3-compatible source) into a Storage Bucket.

The idea is to declare two remotes — your source bucket and the Hugging Face gateway — and let `rclone` stream the objects between them. Add both remotes to `~/.config/rclone/rclone.conf`. The first points at your existing S3 bucket; adjust it to match your source (here, plain AWS S3):

```ini
[aws]
type = s3
provider = AWS
access_key_id = AKIA...
secret_access_key = ...
region = us-east-1
```

The second points at the Hugging Face gateway. As with any other client, scope the endpoint to your [namespace](#addressing-buckets), use `path` addressing, force ListObjectsV2 (the only listing version the gateway supports), and set large multipart sizes so uploads use as few parts as possible:

```ini
[hf]
type = s3
provider = Other
endpoint = https://s3.hf.co/<namespace>
access_key_id = HFAK...
secret_access_key = ...
region = us-east-1
force_path_style = true
list_version = 2
upload_cutoff = 2G
chunk_size = 2G
```

Note: replace the `<namespace>` above with the username or organization your buckets are stored in, and use the [S3 credentials](#generating-s3-credentials) generated from your access token. The destination bucket must already exist under that namespace.

Now copy a source bucket into your Storage Bucket:

```bash
rclone copy aws:my-source-bucket hf:my-bucket --progress
```

`rclone copy` only transfers objects that are missing or changed at the destination, so it's safe to re-run to resume an interrupted import or pick up new objects. To make the destination an exact mirror of the source — deleting objects at the destination that no longer exist at the source — use `rclone sync` instead:

```bash
rclone sync aws:my-source-bucket hf:my-bucket --progress
```

> [!TIP]
> For large imports, add `--transfers` and `--checkers` to raise the concurrency (e.g. `--transfers 16 --checkers 16`), and run `rclone check aws:my-source-bucket hf:my-bucket` afterwards to confirm every object made it across.

### Version data with DVC

[DVC](https://dvc.org/) versions datasets and models in git by keeping small pointer files in the repository and pushing the actual data to a remote. A bucket works as a DVC remote through the gateway, so your code and `.dvc` pointers stay in git while the data lives in your bucket. Install DVC with S3 support (`pip install 'dvc[s3]'`), then add the remote using the [client settings](#configuring-a-client) above:

```bash
dvc remote add -d hf-bucket s3://my-bucket/dvc-store
dvc remote modify hf-bucket endpointurl https://s3.hf.co/<namespace>
dvc remote modify hf-bucket region us-east-1
```

Pass the [S3 credentials](#generating-s3-credentials) through the environment, or with `dvc remote modify --local` so they stay out of git:

```bash
export AWS_ACCESS_KEY_ID=HFAK...
export AWS_SECRET_ACCESS_KEY=...
```

Then track, push, and pull as usual — `dvc push` uploads to the bucket, and `dvc pull` on a fresh clone downloads it back:

```bash
dvc add data/
git add data.dvc .gitignore .dvc/config && git commit -m "Track data with DVC"
dvc push
```

> [!NOTE]
> Use your [namespace](#addressing-buckets) in `endpointurl` and the bare bucket name in the `s3://` URL. If `dvc push` fails with a checksum error, set `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` and `AWS_RESPONSE_CHECKSUM_VALIDATION=when_required` — recent `boto3` sends trailing checksums the gateway does not accept.
