# Container Images

Container Images are a repo type on the Hugging Face Hub for Docker and other [OCI](https://opencontainers.org/) images. The Hugging Face container registry, `cr.hf.co`, works with standard clients such as Docker, Podman, crane, skopeo, ORAS and Helm, and stores images on the [Xet](./xet/index) storage backend.

> [!NOTE]
> Container Images are in private beta: [contact us](https://huggingface.co/contact/sales) to enable them for your organization.

## Creating a Repository

Go to [huggingface.co/new-container](https://huggingface.co/new-container) and choose the organization, a name and the visibility. Or use the API:

```bash
curl -X POST https://huggingface.co/api/containers/my-org/my-app \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"private": true}'
```

Create the repository before pushing: a push to a missing one fails with `NAME_UNKNOWN`. Its page, `https://huggingface.co/containers/my-org/my-app`, lists its tags. Who can pull and push follows the repository's visibility and each member's role in the organization.

## Logging In

Log in with your Hugging Face username and a [User Access Token](./security-tokens) as the password: `read` to pull, `write` to push.

```bash
echo $HF_TOKEN | docker login cr.hf.co -u <username> --password-stdin
```

Public images can be pulled without logging in.

## Pushing and Pulling

```bash
docker tag my-app cr.hf.co/my-org/my-app:v1
docker push cr.hf.co/my-org/my-app:v1
docker pull cr.hf.co/my-org/my-app:v1
```

Other OCI clients work the same way. Helm appends the chart name to the URL: `helm push mychart-0.1.0.tgz oci://cr.hf.co/my-org` pushes to `my-org/mychart`, which must exist.

## Faster Pushes and Pulls with `hf image`

[`hf image`](https://github.com/huggingface/hf-image), an extension of the `hf` CLI, stores layers uncompressed so that Xet deduplicates them chunk by chunk: rebuilding a 2 GB layer that changed by 100 MB uploads about 100 MB, and pulling it over the previous version downloads about 100 MB.

```bash
hf extensions install hf-image
hf image build -t cr.hf.co/my-org/my-app:v2 .
hf image push cr.hf.co/my-org/my-app:v2
hf image pull cr.hf.co/my-org/my-app:v2
```

It needs Docker with the [containerd image store](https://docs.docker.com/engine/storage/containerd/). Images stay plain OCI: any client can pull them, and the registry compresses their layers on the wire. Because layers are stored uncompressed, their digests differ from those of `docker push`; `hf image push --preserve-digests` keeps the original digests, without chunk deduplication.

## Deleting Images

Docker cannot delete images from a registry; use [crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md) or [skopeo](https://github.com/containers/skopeo):

```bash
crane delete cr.hf.co/my-org/my-app:v1               # deletes the tag
crane delete cr.hf.co/my-org/my-app@sha256:<digest>  # deletes the image and its tags
```

Untagged images are kept until deleted by digest. Layers that no image references are deleted after about two days.

## Limits

- Image names are `cr.hf.co/<namespace>/<name>`, in lowercase.
- Layers up to 100 GB, manifests up to 4 MiB.
- Tag lists can take a few seconds to show a new tag.
- Upload sessions expire after 24 hours of inactivity.
- The registry has no catalog (`/v2/_catalog`): browse your images on the Hub.
