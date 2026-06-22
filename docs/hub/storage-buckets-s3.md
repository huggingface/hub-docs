# S3 Compatibility

Storage Buckets can be accessed through an **S3-compatible API**, letting you use existing S3 tooling — the AWS CLI, `boto3`, `rclone`, `s5cmd`, and most other S3 SDKs — against your buckets without changing your code. Requests go through a gateway at `https://s3.hf.co`.

> [!NOTE]
> The S3 API works only with [Storage Buckets](./storage-buckets). It does not expose other Hugging Face repository types (models, datasets, Spaces).

## Generating S3 Credentials

The gateway authenticates with AWS-style access keys derived from a Hugging Face [User Access Token](./security-tokens).

1. Go to your [Access Tokens settings](https://huggingface.co/settings/tokens). Create a token with the **Create new token** button if you don't already have one.
2. Find the token in the list, open its dropdown menu, and choose **Generate S3 credentials**.
3. Copy the generated **access key ID** (prefixed `HFAK…`) and **secret access key** somewhere safe — the secret is shown only once.

The S3 credentials inherit the permissions of the underlying access token, so scope your token to the namespaces and buckets you intend to use.

## Configuring a Client

Point your S3 client at the gateway endpoint and set a few required options. Use your Hugging Face **namespace** (your username or an organization name) in the endpoint URL — see [Addressing buckets](#addressing-buckets) below.

| Setting | Value | Why |
|---------|-------|-----|
| `endpoint_url` | `https://s3.hf.co/<namespace>` | The gateway, scoped to your namespace |
| `region` | `us-east-1` | Required; the gateway is currently single-region |
| `s3.addressing_style` | `path` | Buckets are addressed as path segments, not subdomains |
| `request_checksum_calculation` | `when_required` | Prevents recent clients from sending trailing checksums the gateway can't parse |
| `response_checksum_validation` | `when_required` | Same, for responses |

The two checksum settings matter for recent clients: AWS CLI ≥ 2.23 and recent `boto3` versions send trailing CRC32 checksums (via `aws-chunked` framing) by default, which the gateway does not parse. These settings tell the client to send checksums only when an operation strictly requires them.

The following are optional but recommended so large uploads use as few multipart parts as possible:

| Setting | Value |
|---------|-------|
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

and the matching credentials to `~/.aws/credentials`:

```ini
[hf]
aws_access_key_id = HFAK...
aws_secret_access_key = ...
```

Then use any S3 command with the profile:

```bash
aws s3 ls --profile hf
aws s3 cp ./model.safetensors s3://my-bucket/models/model.safetensors --profile hf
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

- `ListObjectsV1` is not supported — use `ListObjectsV2`.
- Only `/` is allowed as the delimiter.

### Other API differences

- **Object metadata**: arbitrary user metadata (`x-amz-meta-*`) is not stored or returned. `Content-Type` is supported.
- **Unsupported features**: ACLs, bucket policies, object tagging, object versioning, lifecycle rules, server-side encryption (SSE), and bucket notifications are not supported. Objects are always reported with the `STANDARD` storage class. Related request headers and parameters are accepted but ignored.
- **CopyObject**: server-side copy works only within a single namespace. Cross-namespace copy and `UploadPartCopy` (copying a part from an existing object into a multipart upload) are not supported.
- **Conditional requests**: `If-Match` / `If-None-Match` preconditions are honored on `PutObject` and on the copy-source of `CopyObject`, but not on `GetObject`.
- **Multipart upload expiry**: in-flight multipart uploads that are never completed or aborted are automatically expired and cleaned up after 7 days.
