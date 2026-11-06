# Container Images Access Control

Who can pull and push an image follows the repository's visibility and each member's role in the organization: anyone can pull a public image, only members can pull a private one, and pushing needs the `write` role. Tokens follow the same rule: a [User Access Token](./security-tokens) with `read` pulls, one with `write` pushes.

## Access Control with Resource Groups

In an organization on a Team or Enterprise plan, an image can belong to a [Resource Group](./security-resource-groups). The members' role in the group then replaces their organization role for that image: `read` to pull, `write` to push. A private image in a Resource Group can only be pulled by the group's members and the organization admins.

Choose the group when creating the repository, from the image's settings, or from the **Resources** tab of the group. With the API, pass `resourceGroupId` when creating the repository, or move an existing one (the group's ID ends its page URL, and `GET /api/organizations/my-org/resource-groups` lists them):

```bash
curl -X POST https://huggingface.co/api/containers/my-org/my-app/resource-group \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"resourceGroupId": "<resource-group-id>"}'
```
