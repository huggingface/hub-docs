# Container Images

Container Images are a repo type on the Hugging Face Hub for Docker and other [OCI](https://opencontainers.org/) images, served by the Hugging Face container registry, `cr.hf.co`. Push and pull them with Docker or any OCI client, next to your models, datasets and Spaces.

> [!NOTE]
> Container Images are in private beta: [contact us](https://huggingface.co/contact/sales) to enable them for your organization.

## Why Host Images on the Hub

- **Next to the rest of your work**: images live in your user or organization namespace, with the same members, roles, visibility and [User Access Tokens](./security-tokens) as your other repos. There is no separate registry account to manage.
- **On your Hub storage**: images count toward your account's [storage](#storage-and-pricing), public or private, with no separate registry bill.
- **Served by the Hub's CDN**: layers are stored on [Xet](./xet/index) and downloaded through the Hugging Face CDN, with egress included in your plan.
- **A standard registry**: Docker, Podman, containerd and Kubernetes, crane, skopeo, ORAS, Helm and cosign work as they are, with multi-arch images and referrers (signatures, SBOMs and other artifacts attached to an image).
- **Cleaned up for you**: images that no tag points to are deleted automatically, so your storage follows what you tag.

<!-- TODO: link to a showcase container repo, with light and dark screenshots of its page -->

## Creating a Repository

Go to [huggingface.co/new-container](https://huggingface.co/new-container) and choose the organization, a name and the visibility. Or use the API:

```bash
curl -X POST https://huggingface.co/api/containers/my-org/my-app \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"private": true}'
```

Create the repository before pushing: a push to a missing one fails with `NAME_UNKNOWN`. Its page, `https://huggingface.co/containers/my-org/my-app`, lists its tags. Who can pull and push follows the repository's visibility and each member's role in the organization.

## Pushing and Pulling

Log in with your Hugging Face username and a [User Access Token](./security-tokens) as the password: `read` to pull, `write` to push. Public images can be pulled without logging in.

```bash
echo $HF_TOKEN | docker login cr.hf.co -u <username> --password-stdin
docker tag my-app cr.hf.co/my-org/my-app:v1
docker push cr.hf.co/my-org/my-app:v1
docker pull cr.hf.co/my-org/my-app:v1
```

Other OCI clients work the same way. Helm appends the chart name to the URL: `helm push mychart-0.1.0.tgz oci://cr.hf.co/my-org` pushes to `my-org/mychart`, which must exist beforehand.

## Pulling from Kubernetes

Store a `read` token in a pull secret, then reference it from your pods:

```bash
kubectl create secret docker-registry hf-registry \
  --docker-server=cr.hf.co \
  --docker-username=<username> \
  --docker-password=$HF_TOKEN
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: my-app
      image: cr.hf.co/my-org/my-app:v1
  imagePullSecrets:
    - name: hf-registry
```

Public images need no pull secret.

## Pushing from GitHub Actions

Add your username and a `write` token as repository secrets, here `HF_USERNAME` and `HF_TOKEN`, then log in and push:

```yaml
- uses: docker/login-action@v4
  with:
    registry: cr.hf.co
    username: ${{ secrets.HF_USERNAME }}
    password: ${{ secrets.HF_TOKEN }}
- uses: docker/setup-buildx-action@v4
- uses: docker/build-push-action@v7
  with:
    push: true
    tags: cr.hf.co/my-org/my-app:${{ github.sha }}
```

## Storage and Pricing

Images use the storage of the user or organization that owns them: private storage for private repositories, public storage for public ones, shared with your models, datasets and buckets. Layers count at the size they are pushed, `docker push` uploading them compressed. Each repository counts a layer once, however many tags and images use it.

Private storage is included in every plan: 100 GB on a free account, 1 TB with PRO, and 1 TB per seat for Team and Enterprise organizations. Beyond it, private storage costs $18 per TB per month, with discounts at volume. See [storage limits](./storage-limits#storage-plans) for public storage and the details, and [hf.co/storage](https://huggingface.co/storage) for the current prices.

For example:

- 20 tagged versions of a 5 GB image, all sharing the same 4 GB base layers, take 4 + 20 × 1 = 24 GB: they fit in a free account's private storage.
- A Team organization with 10 members includes 10 TB of private storage.
- Each private TB beyond what your plan includes costs $18 per month.

## Deleting Images

On the Hub, remove a tag using **Delete this tag** in its menu, on the image or tag's page. Clients that delete tags work too, such as crane:

```bash
crane delete cr.hf.co/my-org/my-app:v1
```

Deleting an image by digest is refused while a tag still points to it: delete its tags, and [garbage collection](#garbage-collection) deletes the image.

## Garbage Collection

The registry deletes images that no tag points to anymore, directly or through a multi-arch image, such as the previous `latest` after a new push. It also deletes the layers that no remaining image uses. To keep pulling an image by digest, keep a tag on it.

## Limits

- Image names are `cr.hf.co/<namespace>/<name>`, in lowercase.
- Layers up to 100 GB, manifests up to 4 MiB.
- Tag lists can take a few seconds to show a new tag.
