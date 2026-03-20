# User access tokens

## What are User Access Tokens?

User Access Tokens are the preferred way to authenticate an application or notebook to Hugging Face services. You can manage your access tokens in your [settings](https://huggingface.co/settings/tokens).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/User-Access-Token.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/User-Access-Token-dark.png"/>
</div>

Access tokens allow applications and notebooks to perform specific actions specified by the scope of the roles shown in the following:

- `fine-grained`: tokens with this role can be used to provide fine-grained access to specific resources, such as a specific model or models in a specific organization. This type of token is useful in production environments, as you can use your own token without sharing access to all your resources.

- `read`: tokens with this role can only be used to provide read access to repositories you could read. That includes public and private repositories that you, or an organization you're a member of, own. Use this role if you only need to read content from the Hugging Face Hub (e.g. when downloading private models or doing inference).

- `write`: tokens with this role additionally grant write access to the repositories you have write access to. Use this token if you need to create or push content to a repository (e.g., when training a model or modifying a model card).

Note that Organization API Tokens have been deprecated: 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/API-token.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/API-token_dark.png"/>
</div>

If you are a member of an organization with read/write/admin role, then your User Access Tokens will be able to read/write the resources according to the token permission (read/write) and organization membership (read/write/admin).

## How to manage User Access Tokens?

To create an access token, go to your settings, then click on the [Access Tokens tab](https://huggingface.co/settings/tokens). Click on the **New token** button to create a new User Access Token.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/new-token.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/new-token-dark.png"/>
</div>

Select a role and a name for your token and voilà - you're ready to go!

You can delete and rotate User Access Tokens by clicking on the **Manage** button.

<div class="flex justify-center">
<img class="block dark:hidden" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/delete-token.png"/>
<img class="hidden dark:block" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/delete-token-dark.png"/>
</div>

## How to use User Access Tokens?

There are plenty of ways to use a User Access Token to access the Hugging Face Hub, granting you the flexibility you need to build awesome apps on top of it.

User Access Tokens can be:
- used **in place of a password** to access the Hugging Face Hub with git or with basic authentication.
- passed as a **bearer token** when calling [Inference Providers](https://huggingface.co/docs/inference-providers).
- used in the Hugging Face Python libraries, such as `transformers` or `datasets`:

```python
from transformers import AutoModel

access_token = "hf_..."

model = AutoModel.from_pretrained("private/model", token=access_token)
```

> [!WARNING]
> Try not to leak your token! Though you can always rotate it, anyone will be able to read or write your private repos in the meantime which is 💩

### Token rotation

You can rotate a token to generate a new token value while keeping the same name, permissions, and scopes. This is useful if a token may have been compromised. Rotate a token via the UI in your [Access Tokens settings](https://huggingface.co/settings/tokens), or programmatically via the API:

```
POST https://huggingface.co/api/settings/tokens/{token_id}/rotate
```

For fine-grained tokens, you can also retrieve an overview of the token's permissions and scopes:

```
GET https://huggingface.co/api/settings/tokens/{token_id}/fine-grained-overview
```

### Fine-grained token permission scopes

When creating a fine-grained token, you can select from the following permission scopes:

**Repository permissions** (applied per-repo or per-org):

| Scope | Description |
|-------|-------------|
| `repo.content.read` | Read repository content (files, commits) |
| `repo.content.write` | Push commits, create/delete branches and tags |
| `repo.config.read` | Read repository settings |
| `repo.config.write` | Modify repository settings |
| `repo.config.visibility.write` | Change repository visibility (public/private) |
| `repo.config.variables.write` | Manage Space variables |
| `repo.config.secrets.write` | Manage Space secrets |
| `repo.config.doi.write` | Generate or update DOI |
| `repo.access.read` | Read gated access settings and requests |
| `repo.access.write` | Approve/deny gated access requests |
| `repo.lfs.read` | Read LFS files |
| `repo.devMode.read` | Access VS Code dev mode |

**Discussion & community permissions:**

| Scope | Description |
|-------|-------------|
| `discussion.write` | Create/edit discussions and pull requests |
| `post.write` | Create/edit social posts |
| `collection.read` | Read collections |
| `collection.write` | Create/edit collections |

**User permissions** (applied to your own account):

| Scope | Description |
|-------|-------------|
| `user.tokens.read` | List your tokens |
| `user.tokens.write` | Create/manage tokens |
| `user.billing.read` | View billing information |
| `user.billing.write` | Modify billing settings |
| `user.webhooks.read` | List your webhooks |
| `user.webhooks.write` | Create/manage webhooks |
| `user.inference-providers.write` | Manage inference provider API keys |

**Infrastructure permissions:**

| Scope | Description |
|-------|-------------|
| `inference.endpoints.read` | View Inference Endpoints |
| `inference.endpoints.write` | Create/manage Inference Endpoints |
| `inference.serverless.write` | Use serverless inference |
| `job.read` | View Jobs |
| `job.write` | Create/manage Jobs |
| `sql-console.embed.read` | Read SQL Console embeds |
| `sql-console.embed.write` | Create/manage SQL Console embeds |

**Organization permissions** (applied per-org):

| Scope | Description |
|-------|-------------|
| `org.read` | Read organization info |
| `org.write` | Manage organization settings |
| `org.billing.read` | View organization billing |
| `org.billing.write` | Modify organization billing |
| `resourceGroup.read` | View resource groups |
| `resourceGroup.write` | Manage resource groups |
| `resourceGroup.settings.write` | Manage resource group settings/members |
| `resourceGroup.repos.write` | Add/remove repos in resource groups |

### Best practices

We recommend you create one access token per app or usage. For instance, you could have a separate token for:
 * A local machine.
 * A Colab notebook.
 * An awesome custom inference server. 
 
 This way, you can invalidate one token without impacting your other usages.

We also recommend using only fine-grained tokens for production usage. The impact, if leaked, will be reduced, and they can be shared among your organization without impacting your account.

For example, if your production application needs read access to a gated model, a member of your organization can request access to the model and then create a fine-grained token with read access to that model. This token can then be used in your production application without giving it access to all your private models.

### For Enterprise organizations

If your organization needs to programmatically issue tokens for members without requiring each user to create their own token, see [OAuth Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693). This Enterprise plan feature is ideal for building internal platforms, CI/CD pipelines, or custom integrations that need to access Hugging Face resources on behalf of organization members.
