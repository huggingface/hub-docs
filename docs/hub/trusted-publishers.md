# Trusted Publishers

**Push to the Hub from CI without storing an `HF_TOKEN` secret.**

Your CI job proves its identity to Hugging Face using a short-lived OpenID Connect (OIDC) token from your CI provider, and gets back a short-lived Hugging Face token in exchange. No HF token to store as a secret or rotate.

| | Personal Access Token | Trusted Publisher |
| --- | --- | --- |
| Lifetime | Until revoked | 1 hour |
| Storage | CI secret | Nothing to store |
| Rotation | Manual | Automatic, every run |
| If leaked | Valid until you revoke | At most ~1 hour, and scoped to one repo |

Trusted Publishers are the same idea as PyPI's [Trusted Publishers](https://docs.pypi.org/trusted-publishers/) and [npm's Trusted Publishing](https://docs.npmjs.com/trusted-publishers).

## Quick example: publish a model from GitHub Actions

You maintain `acme/awesome-model` on the HF Hub and want CI in an externally-hosted `acme/awesome-model-training` repository (on GitHub, GitLab, or any OIDC-compliant provider) to push new checkpoints — no `HF_TOKEN` secret.

### 1. Configure the trusted publisher on the Hub

On `https://huggingface.co/acme/awesome-model/settings`, open **Trusted Publishers** and add:

- **Provider**: GitHub Actions
- **Claims** (all must match for the exchange to succeed):
  - `repository` = `acme/awesome-model-training`
  - `branch` = `main`
  - `workflow` = `publish.yml`

> [!TIP]
> `repository` alone scopes the publisher to a GitHub repo. Add `branch` and/or `workflow` to also pin it to a branch or workflow file — recommended.

### 2. Add the workflow to your GitHub repo

`.github/workflows/publish.yml`:

```yaml
name: Publish to Hugging Face

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest

    permissions:
      id-token: write  # required so the job can request an OIDC token
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Install the hf CLI
        run: |
          curl -LsSf https://hf.co/cli/install.sh | bash
          echo "$HOME/.local/bin" >> "$GITHUB_PATH"

      - name: Upload checkpoint
        env:
          # The HF repo to publish to. For non-model repos, prefix accordingly:
          #   datasets/acme/awesome-dataset, spaces/acme/awesome-space, kernels/acme/awesome-kernel
          HF_OIDC_RESOURCE: acme/awesome-model
        run: hf upload acme/awesome-model ./checkpoint . --commit-message "Publish from ${GITHUB_SHA::7}"
```

That's it. On GitHub Actions, the `hf` CLI (`huggingface_hub>=1.19.0`) detects the provider, performs the exchange, and uses the resulting token automatically. You only set `HF_OIDC_RESOURCE`.

> [!TIP]
> Publishing to several repos in one run (e.g. a model **and** a dataset)? Set `HF_OIDC_RESOURCE` per step so each token is scoped to the repo that step pushes to.

#### Other CI providers

The `hf` CLI mints the ID token natively on GitHub Actions only for now. On GitLab, CircleCI, Bitbucket, or any other provider, mint the ID token yourself (see [Supported CI providers](#supported-ci-providers)) and pass it via `HF_OIDC_ID_TOKEN` — the CLI exchanges it directly:

```yaml
# GitLab CI (.gitlab-ci.yml)
publish:
  id_tokens:
    HF_ID_TOKEN:
      aud: https://huggingface.co
  script:
    - curl -LsSf https://hf.co/cli/install.sh | bash
    - export PATH="$HOME/.local/bin:$PATH"
    - HF_OIDC_ID_TOKEN="$HF_ID_TOKEN" HF_OIDC_RESOURCE="acme/awesome-model" hf upload acme/awesome-model ./checkpoint .
```

Complete working examples:

- GitHub Actions — [`github.com/coyotte508/publish-to-hf`](https://github.com/coyotte508/publish-to-hf)
- GitLab CI — [`gitlab.com/coyotte508/publish-to-hf`](https://gitlab.com/coyotte508/publish-to-hf)

## Two flavors: repo vs. user

| Flavor | Configured on | What you get | Use it to… |
| --- | --- | --- | --- |
| **Repo publisher** | A repo's **Settings → Trusted Publishers** | A token with **write access to that one repo** | Publish a model, dataset, Space, kernel, or bucket from CI |
| **User publisher** | Your account's [**Authentication settings → CI/CD Access**](https://huggingface.co/settings/authentication#ci-cd-access) | A read-only token with the `gated-repos` scope | Read **gated repos you have access to** and use your rate limits from CI |

Both tokens expire after 60 minutes. You need the **Write** role on a Hub repo to manage its trusted publishers.

### Accessing gated repos from CI

If you only need to *read* gated repos (e.g. download a model from a job), configure a publisher on your account under [**Authentication settings → CI/CD Access**](https://huggingface.co/settings/authentication#ci-cd-access) instead of on a specific repo, then use your **username** as the resource.

On **GitHub Actions**, the `hf` CLI does the exchange for you, just set `HF_OIDC_RESOURCE`:

```yaml
      - name: Download a gated model
        env:
          HF_OIDC_RESOURCE: your-hf-username
        run: hf download acme/gated-model
```

On **other providers**, mint the ID token yourself (see [Other CI providers](#other-ci-providers)) and pass it via `HF_OIDC_ID_TOKEN`:

```bash
# $ID_TOKEN is the OIDC token your provider minted (e.g. $HF_ID_TOKEN on GitLab)
HF_OIDC_ID_TOKEN="$ID_TOKEN" HF_OIDC_RESOURCE="your-hf-username" hf download acme/gated-model
```

The resulting token can read gated repos you have access to and uses your account's rate limits. It **cannot** write anything, and **cannot** read your private repos.

## Supported CI providers

The settings UI ships with presets for the providers below, but any OIDC-compliant provider works (AWS, GCP, Buildkite, your own IdP, …).

| Provider | Issuer | How to get the ID token |
| --- | --- | --- |
| **GitHub Actions** | `https://token.actions.githubusercontent.com` | Set `permissions: id-token: write`, then call the metadata endpoint with `audience=https://huggingface.co`. [Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect). |
| **GitLab CI** | `https://gitlab.com` (or your self-hosted URL) | Declare `id_tokens: { HF_ID_TOKEN: { aud: https://huggingface.co } }` on the job; read `$HF_ID_TOKEN`. [Docs](https://docs.gitlab.com/ci/yaml/#id_tokens). |
| **CircleCI** | `https://oidc.circleci.com/org/<org-uuid>` | Use `$CIRCLE_OIDC_TOKEN_V2` (v2 lets you set the audience in project settings). [Docs](https://circleci.com/docs/openid-connect-tokens/). |
| **Bitbucket Pipelines** | `https://api.bitbucket.org/2.0/workspaces/<workspace>/pipelines-config/identity/oidc` | Set `oidc: true` on the step; read `$BITBUCKET_STEP_OIDC_TOKEN`. [Docs](https://support.atlassian.com/bitbucket-cloud/docs/integrate-pipelines-with-resource-servers-using-oidc/). |

Once you have the ID token, the exchange call is identical across providers — only the **claims** you configure on the Hub side differ.

## How it works

1. Your CI provider mints a short-lived **OIDC ID token** describing the job (which repo, which branch, which workflow, …).
2. Your workflow `POST`s that token to `https://huggingface.co/oauth/token`, along with a `resource` (the repo or username it wants to access).
3. The Hub checks the token's signature and claims against the publishers you configured for that resource, and returns a Hugging Face token.

```
┌──────────┐  1. mint ID token   ┌──────────┐  2. exchange   ┌────────────┐
│ CI job   │ ─────────────────▶  │ CI OIDC  │ ──────────────▶│ huggingface│
│          │                     │ issuer   │                │  /oauth/   │
│          │ ◀──────────────────────────────────────────────│  token     │
└──────────┘        3. short-lived HF token (valid 1 h)      └────────────┘
```

## API reference

<details>
<summary><strong>Endpoint, request, and response</strong></summary>

**Endpoint:** `POST https://huggingface.co/oauth/token` with `Content-Type: application/json`.

No client authentication is needed — the OIDC ID token authenticates the request. The exchange follows [RFC 8693 — OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).

**Request body:**

| Field | Required | Value |
| --- | --- | --- |
| `grant_type` | yes | `urn:ietf:params:oauth:grant-type:token-exchange` |
| `subject_token_type` | yes | `urn:ietf:params:oauth:token-type:id_token` |
| `subject_token` | yes | The raw OIDC ID token (JWT) from your CI provider. Its `aud` claim **must** be `https://huggingface.co`. |
| `resource` | yes | A Hub repo (`namespace/name`, `datasets/namespace/name`, `spaces/namespace/name`, `kernels/namespace/name`, `buckets/namespace/name`) or a Hub **username** (no slash) for a user-scoped token. |

**Success response:**

```json
{
  "access_token":      "hf_jwt_…",   // "hf_oauth_…" for user resources
  "token_type":        "bearer",
  "expires_in":        3600,
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

**Errors** — `400 Bad Request` with an OAuth-style body:

| `error` | Why |
| --- | --- |
| `invalid_request` | Missing/malformed parameter, or bad `resource` format. |
| `invalid_grant` | Repo or user not found; no publisher matches this issuer; configured claims don't match; signature or audience check failed; account locked. |

When the `hf` CLI performs the exchange, a failure surfaces the `error` code along with a `(Request ID: …)` — include that Request ID when reporting an issue so we can trace the exchange in our logs.

</details>

## Security model

- **Tokens are short-lived.** 60 minutes from the moment of exchange — the clock only starts when you call the endpoint, not when the workflow starts. There's no refresh token; long jobs should re-exchange.
- **Repo tokens are repo-scoped.** A token for `acme/awesome-model` cannot touch `acme/anything-else`. Pushes are attributed to a synthetic `[OIDC]` system user, with a reference to the originating issuer and subject.
- **User tokens are read-only.** Only the `gated-repos` scope — no writes, no private repos, no account management.
- - **Claims are matched exactly.** No regex, no prefix matching.
- **Audit logs.** Adding or removing a publisher is logged, and successful exchanges update last used time.

## See also

- [User Access Tokens](./security-tokens) — the right choice for humans and one-off scripts
- [OAuth / Sign in with HF](./oauth) — the same `/oauth/token` endpoint, used for interactive flows
- [Managing Spaces with GitHub Actions](./spaces-github-actions)
- [GitHub Actions integration for the Hub](./repositories-github-actions)
