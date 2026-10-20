# Container Images

Container Images are a repo type on the Hugging Face Hub for Docker and other [OCI](https://opencontainers.org/) images. The Hugging Face container registry, `cr.hf.co`, stores images on the [Xet](./xet/index) storage backend. Push and pull them with [`hf image`](#pushing-and-pulling-with-hf-image), the recommended client; standard clients such as Docker, Podman, crane, skopeo, ORAS and Helm work too.

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

## Pushing and Pulling with `hf image`

[`hf image`](https://github.com/huggingface/hf-image), an extension of the `hf` CLI, only transfers the parts of each layer that changed since the previous version, resulting in a faster experience compared to other OCI clients.

```bash
hf extensions install hf-image
hf auth login                                   # or set HF_TOKEN
hf image build -t cr.hf.co/my-org/my-app:v2 .   # optional: docker build works too
hf image push cr.hf.co/my-org/my-app:v2
hf image pull cr.hf.co/my-org/my-app:v2
```

It uses your Hugging Face [User Access Token](./security-tokens) (`read` to pull, `write` to push) and needs Docker with the [containerd image store](https://docs.docker.com/engine/storage/containerd/). Images pushed with `hf image` can be pulled by any client.

Because `hf image` stores layers uncompressed, the images it pushes get different digests than with `docker push`. To keep the `docker push` digests, for signatures or deployments pinned by digest, use `hf image push --preserve-digests`. It is slower: changed layers are then pushed and pulled in full, as with `docker push`.

## Using Docker and Other OCI Clients

Log in with your Hugging Face username and a [User Access Token](./security-tokens) as the password: `read` to pull, `write` to push. Public images can be pulled without logging in.

```bash
echo $HF_TOKEN | docker login cr.hf.co -u <username> --password-stdin
docker tag my-app cr.hf.co/my-org/my-app:v1
docker push cr.hf.co/my-org/my-app:v1
docker pull cr.hf.co/my-org/my-app:v1
```

Other OCI clients work the same way. Helm appends the chart name to the URL: `helm push mychart-0.1.0.tgz oci://cr.hf.co/my-org` pushes to `my-org/mychart`, which must exist beforehand.

## Deleting Images

On the Hub, remove a tag with **Delete this tag** in its menu, on the image page or the tag's page. With [`hf image`](#pushing-and-pulling-with-hf-image), remove an image's tags, then delete it by digest:

```bash
hf image untag cr.hf.co/my-org/my-app:v1                # prints the image's digest
hf image delete cr.hf.co/my-org/my-app@sha256:<digest>
```

If something still references the image, such as another tag, the delete is refused and lists what to remove first. Deleting a multi-arch image also deletes its platform images. Layers that no other image uses are deleted.

## Limits

- Image names are `cr.hf.co/<namespace>/<name>`, in lowercase.
- Layers up to 100 GB, manifests up to 4 MiB.
- Tag lists can take a few seconds to show a new tag.
