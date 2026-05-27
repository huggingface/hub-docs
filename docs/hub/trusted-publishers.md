# Trusted Publishers (Workload Identity Federation)

Trusted Publishers let CI/CD workflows interact with the Hugging Face Hub **without storing a long-lived `HF_TOKEN`** as a CI secret. Instead, your workflow proves its identity to Hugging Face using a short-lived OpenID Connect (OIDC) token issued by your CI provider (GitHub Actions, GitLab CI, CircleCI, Bitbucket Pipelines, …) and exchanges it for a short-lived Hugging Face token, valid for one hour.

This is similar to PyPI's [Trusted Publishers](https://docs.pypi.org/trusted-publishers/) or [npm's Trusted Publishing](https://docs.npmjs.com/trusted-publishers): no secret to rotate, no secret that can leak, and you control exactly which CI workflow on which branch is allowed to act on which resource.

There are two complementary flavors:

| Flavor                        | Configured on                       | What you get                                                                                | Typical use case                                                                                       |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Repo trusted publisher**    | A specific repository's settings    | A token with **write access scoped to that one repo** (`hf_jwt_…`)                          | Publish a model, dataset, Space, or kernel from CI                                                     |
| **User trusted publisher**    | Your account settings (CI/CD Access)| A token that **acts on your behalf for read-only purposes** (`hf_oauth_…`, `gated-repos` scope) | Get your account's rate limits and access **your** gated repositories from CI without a personal token |

Both tokens are valid for **60 minutes** and are minted on demand: the clock only starts when your workflow actually calls the token-exchange endpoint, not when the workflow starts.

## How it works

1. Your CI provider mints a short-lived **OIDC ID token** for the running job. The token's claims describe the workflow (which repository it ran from, which branch, which workflow file, …).
2. Your workflow `POST`s that ID token to `https://huggingface.co/oauth/token` together with a `resource` describing what it wants to access.
3. Hugging Face:
   - extracts the `iss` (issuer) claim from the token,
   - checks that the target resource (repo or user) has a **trusted publisher** configured with that issuer,
   - verifies the token signature against the issuer's JWKS (with `audience = https://huggingface.co`),
   - matches the **claims** you configured (e.g. `repository = octocat/my-publisher`) against the verified claims in the token,
   - and finally issues a short-lived Hugging Face token.

If any step fails, the exchange returns `400 invalid_grant` and no token is issued. Successful exchanges update a `lastUsedAt` timestamp on the trusted publisher entry that you can see in the UI.

> [!NOTE]
> The exchanged token is **distinct from your personal User Access Token**. Repo tokens are scoped to a single repo and can only write to it; user tokens are limited to the `gated-repos` scope (rate limits & read access to your gated repos).

## Supported providers

Any OIDC provider that exposes `.well-known/openid-configuration` and a JWKS endpoint works. The settings UI ships with presets for:

- **GitHub Actions** — issuer `https://token.actions.githubusercontent.com`
- **GitLab CI** — issuer `https://gitlab.com` (or your self-hosted GitLab URL)
- **CircleCI** — issuer `https://oidc.circleci.com/org/<org-uuid>`
- **Bitbucket Pipelines** — issuer `https://api.bitbucket.org/2.0/workspaces/<workspace>/pipelines-config/identity/oidc`
- **Custom** — any OIDC-compliant provider (AWS, GCP, Buildkite, your own IdP, …)

## Configure a trusted publisher

### On a repository (to publish from CI)

Open your repository's **Settings → Trusted Publishers** and click **Add a trusted publisher**.

You will be asked for:

- **Issuer URL** — your CI provider's OIDC issuer. Must be served over HTTPS in production.
- **Claims** — one or more `key = value` pairs that the OIDC token **must** contain for the exchange to succeed. At least one claim is required, and you should always include a claim that scopes the publisher to a specific source repository (otherwise *any* workflow on that provider could push to your repo).

For example, to allow only GitHub Actions workflows running in `octocat/my-publisher` on the `main` branch:

| Claim         | Value                          |
| ------------- | ------------------------------ |
| `repository`  | `octocat/my-publisher`         |
| `ref`         | `refs/heads/main`              |
| `workflow`    | `publish.yml`                  |

All listed claims are matched with exact string equality. Claims you don't list are simply not checked.

> [!WARNING]
> Configuring `repository` alone is enough to scope to a specific GitHub repo, but adding `ref` and/or `workflow` lets you restrict pushes to a specific branch or workflow file. **Do not configure a publisher with only "soft" claims like `ref`** — that would allow any GitHub repository with a `main` branch to push to your Hub repo.

You need the **Write** role on the Hub repository to add or remove its trusted publishers.

### On your account (to access gated repos / get your rate limits)

Open [`huggingface.co/settings/trusted-publishers`](https://huggingface.co/settings/trusted-publishers) (**Settings → CI/CD Access**) and add a publisher the same way.

The exchanged token has only the `gated-repos` scope: it lets the workflow read your gated repositories and use your account's rate limits, but it cannot write to anything or read your private repos.

## Example: publish a model from GitHub Actions

Let's walk through the most common case end-to-end: you maintain a model at `acme/awesome-model` on the Hub, you have a GitHub repo `acme/awesome-model-training` that produces a new checkpoint, and you want the CI job to push the artifacts directly — no `HF_TOKEN` secret involved.

### 1. Add the trusted publisher on the Hub

On `https://huggingface.co/acme/awesome-model/settings` open the **Trusted Publishers** section and add:

- **Provider**: GitHub Actions
- **Issuer URL**: `https://token.actions.githubusercontent.com` (filled in automatically)
- **Claims**:
  - `repository` = `acme/awesome-model-training`
  - `ref` = `refs/heads/main`
  - `workflow` = `publish.yml`

### 2. Add the workflow to your GitHub repository

Create `.github/workflows/publish.yml` in `acme/awesome-model-training`:

```yaml
name: Publish to Hugging Face

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest

    # Required to let the job request an OIDC token from GitHub
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install huggingface_hub
        run: pip install --upgrade "huggingface_hub>=0.30"

      - name: Exchange GitHub OIDC token for a Hub token
        id: hf-token
        run: |
          # 1. Ask GitHub for an OIDC token with audience = https://huggingface.co
          ID_TOKEN=$(curl -sSf \
            -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
            "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=https://huggingface.co" \
            | jq -r .value)

          # 2. Exchange it for a short-lived Hugging Face token scoped to the target repo
          HF_TOKEN=$(curl -sSf -X POST "https://huggingface.co/oauth/token" \
            -H "Content-Type: application/json" \
            -d "$(jq -n \
                  --arg t  "$ID_TOKEN" \
                  --arg r  "acme/awesome-model" \
                  '{
                    grant_type:         "urn:ietf:params:oauth:grant-type:token-exchange",
                    subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
                    subject_token:      $t,
                    resource:           $r
                  }')" \
            | jq -r .access_token)

          # 3. Expose it to the next steps as a masked env var
          echo "::add-mask::$HF_TOKEN"
          echo "HF_TOKEN=$HF_TOKEN" >> "$GITHUB_ENV"

      - name: Upload checkpoint
        run: |
          huggingface-cli upload acme/awesome-model ./checkpoint . \
            --commit-message "Publish from ${GITHUB_SHA::7}"
        # HF_TOKEN is read from the environment by huggingface_hub
```

That's it. No `secrets.HF_TOKEN`, no token to rotate. Each run mints its own one-hour token, scoped to `acme/awesome-model` and nothing else.

### What the token looks like

The response from `/oauth/token` for a repo publisher is:

```json
{
  "access_token":      "hf_jwt_…",
  "token_type":        "bearer",
  "expires_in":        3600,
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

`hf_jwt_…` tokens are usable anywhere a normal `HF_TOKEN` is — `huggingface-cli`, the `huggingface_hub` Python library, `git push` over HTTPS, the REST API, etc. — as long as the operation only touches the resource you asked for. Any attempt to use it for another repo, or to read your private resources, will be rejected.

## Example: access gated repos from CI

If you only need to **read** gated repos or get your account's rate limits in CI, configure a publisher on your **user** account instead of on a specific repo.

After adding a publisher in [your account settings](https://huggingface.co/settings/trusted-publishers), use the same exchange — but pass your **username** as `resource`:

```bash
HF_TOKEN=$(curl -sSf -X POST "https://huggingface.co/oauth/token" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
        --arg t "$ID_TOKEN" \
        --arg r "your-hf-username" \
        '{
          grant_type:         "urn:ietf:params:oauth:grant-type:token-exchange",
          subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
          subject_token:      $t,
          resource:           $r
        }')" \
  | jq -r .access_token)
```

You'll get back an `hf_oauth_…` token, valid for 60 minutes, with the `gated-repos` scope.

## Token exchange reference

### Endpoint

```
POST https://huggingface.co/oauth/token
Content-Type: application/json
```

No client authentication is required — the OIDC ID token itself authenticates the request (this is what makes the flow "keyless"). The exchange follows [RFC 8693 — OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).

### Request body

| Field                | Required | Value                                                                                                                                                                                                          |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grant_type`         | yes      | `urn:ietf:params:oauth:grant-type:token-exchange`                                                                                                                                                              |
| `subject_token_type` | yes      | `urn:ietf:params:oauth:token-type:id_token`                                                                                                                                                                    |
| `subject_token`      | yes      | The raw OIDC ID token (JWT string) issued by your CI provider. Its `aud` claim **must** be `https://huggingface.co`.                                                                                           |
| `resource`           | yes      | What you want to access. Either a Hub repo (`namespace/name`, `datasets/namespace/name`, `spaces/namespace/name`, `kernels/namespace/name`) or a Hub **username** (no slash) to get a user-scoped OAuth token. |

### Successful response

```json
{
  "access_token":      "hf_jwt_…",   // or "hf_oauth_…" for user resources
  "token_type":        "bearer",
  "expires_in":        3600,
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

### Error responses

All errors are returned as `400 Bad Request` with an OAuth-style body:

```json
{ "error": "invalid_grant", "error_description": "…" }
```

Common errors:

| `error`           | Why                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `invalid_request` | Missing/malformed parameter; bad `resource` format.                                                       |
| `invalid_grant`   | Repo or user not found; no trusted publisher matches this issuer; configured claims do not match; signature or audience check failed; account locked. |

For security, the error description never reveals which specific claim or signature check failed.

## How OIDC tokens are obtained in CI

The exact way to obtain an OIDC ID token depends on your CI provider. Some quick pointers:

- **GitHub Actions** — set `permissions: id-token: write` on the job, then call the metadata endpoint as in the example above. Make sure to pass `audience=https://huggingface.co`. See [GitHub's docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect).
- **GitLab CI** — declare `id_tokens: { HF_ID_TOKEN: { aud: https://huggingface.co } }` on the job; the token is available as `$HF_ID_TOKEN`. See [GitLab's docs](https://docs.gitlab.com/ci/yaml/#id_tokens).
- **CircleCI** — the OIDC token is available as `$CIRCLE_OIDC_TOKEN_V2` (the v2 token lets you control the audience via project settings). See [CircleCI's docs](https://circleci.com/docs/openid-connect-tokens/).
- **Bitbucket Pipelines** — enable OIDC on the step (`oidc: true`); the token is available as `$BITBUCKET_STEP_OIDC_TOKEN`. See [Bitbucket's docs](https://support.atlassian.com/bitbucket-cloud/docs/integrate-pipelines-with-resource-servers-using-oidc/).

Once you have the ID token, the exchange call is identical across providers — only the `claims` you configured on the Hub side change.

## Security model

A few properties worth keeping in mind:

- **Exchange tokens are short-lived.** Sixty minutes from the moment of exchange. There is no refresh token; long-running CI jobs should re-exchange when needed.
- **Repo tokens are repo-scoped.** A token minted for `acme/awesome-model` cannot read or write `acme/anything-else`. The token is bound to a synthetic `[OIDC]` system user, and pushes are attributed to that user with a reference to the originating issuer and subject.
- **User tokens are read-scoped.** They have only the `gated-repos` scope — no write capability, no access to private repos, no ability to manage your account.
- **Claim matching is exact-string.** No regex, no prefix matching. If you configure `ref = refs/heads/main`, a token with `ref = refs/heads/main-backup` will be rejected.
- **Audit logs.** Adding or removing a trusted publisher emits an audit-log event on the repository or account, and successful exchanges update `lastUsedAt`.

## Comparison with User Access Tokens

| | Personal Access Token | Trusted Publisher |
| --- | --- | --- |
| Lifetime | Long-lived (until revoked) | 1 hour |
| Storage | Must be stored as a CI secret | Nothing to store |
| Rotation | Manual | Automatic (every run) |
| If leaked | Attacker has access until you revoke | Attacker has at most ~1 hour and is bound to a specific repo / scope |
| Scope | Whatever you grant | A single repo (repo publisher) or `gated-repos` only (user publisher) |
| Setup cost | Create + store the token | Add a publisher entry on the Hub |

For human users and one-off scripts, personal [User Access Tokens](./security-tokens) remain the right choice. For automated CI/CD pipelines, prefer Trusted Publishers.

## See also

- [User Access Tokens](./security-tokens)
- [OAuth / Sign in with HF](./oauth) — the same `/oauth/token` endpoint, used for interactive flows
- [Managing Spaces with GitHub Actions](./spaces-github-actions)
- [GitHub Actions integration for the Hub](./repositories-github-actions)
