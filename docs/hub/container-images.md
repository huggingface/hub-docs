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

[`hf image`](https://github.com/huggingface/hf-image), an extension of the `hf` CLI, only transfers the parts of each layer that changed since the previous version.

```bash
hf extensions install hf-image
hf image build -t cr.hf.co/my-org/my-app:v2 .   # optional: docker build works too
hf image push cr.hf.co/my-org/my-app:v2
hf image pull cr.hf.co/my-org/my-app:v2
```

It needs Docker with the [containerd image store](https://docs.docker.com/engine/storage/containerd/). Images pushed with `hf image` can be pulled by any client.

Because `hf image` stores layers uncompressed, the images it pushes get different digests than with `docker push`. To keep the `docker push` digests, for signatures or deployments pinned by digest, use `hf image push --preserve-digests`: changed layers are then uploaded in full.

## Deleting Images

Delete an image by tag or digest with [`hf image`](#faster-pushes-and-pulls-with-hf-image); this deletes the image and every tag on it:

```bash
hf image delete cr.hf.co/my-org/my-app:v1
```

Other OCI tools work too, such as [crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md) or [skopeo](https://github.com/containers/skopeo):

```bash
crane delete cr.hf.co/my-org/my-app:v1               # deletes the tag only
crane delete cr.hf.co/my-org/my-app@sha256:<digest>  # deletes the image and its tags
```

An image that loses its tag, deleted or pushed again with another image, stays in the repository until deleted by digest, and untagged images are not listed yet: to delete an image later, note its digest (`crane digest cr.hf.co/my-org/my-app:v1`) before moving its tag.

A multi-arch image is an index listing one image per platform. A platform image cannot be deleted while an index lists it, and deleting the index leaves its platform images behind. To delete a multi-arch image entirely, delete the index, then its platform images:

```bash
platforms=$(crane manifest cr.hf.co/my-org/my-app:v1 | jq -r '.manifests[].digest')
hf image delete cr.hf.co/my-org/my-app:v1
for d in $platforms; do hf image delete cr.hf.co/my-org/my-app@$d; done
```

Layers that no image references are deleted after about two days.

## Limits

- Image names are `cr.hf.co/<namespace>/<name>`, in lowercase.
- Layers up to 100 GB, manifests up to 4 MiB.
- Tag lists can take a few seconds to show a new tag.
