# Sign in with Hugging Face

You can use the HF OAuth / OpenID connect flow to create a **"Sign in with HF"** flow in any website or App.

This will allow users to sign in to your website or app using their HF account, by clicking a button similar to this one:

![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg)

After clicking this button your users will be presented with a permissions modal to authorize your app:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-accept-application.png)

## Creating an oauth app

You can create your application in your [settings](https://huggingface.co/settings/applications/new):

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-create-application.png)

### Public OAuth apps (no secret)

You can create or use OAuth apps without a client secret. This is useful for native apps, CLIs, or other contexts where keeping a secret is impractical.

- **At app creation**: When creating a new OAuth app, you can choose to create it without a secret.
- **After creation**: For an existing app, you can delete the client secret in the app settings. The app will then work as a public app.

Public apps authenticate using only the client ID (e.g. in device code or authorization code flows with PKCE). Apps that have a secret can still use the secret when needed (e.g. `Authorization: Basic` for token requests).

### If you are hosting in Spaces

> [!TIP]
> If you host your app on Spaces, then the flow will be even easier to implement (and built-in to Gradio directly); Check our [Spaces OAuth guide](https://huggingface.co/docs/hub/spaces-oauth).

### Automated oauth app creation

Hugging Face supports CIMD aka [Client ID Metadata Documents](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/), which allows you to create an oauth app for your website in an automated manner:

- Add an endpoint to your website `/.well-known/oauth-cimd` which returns the following JSON:

```json
{
  client_id:                  "[your website url]/.well-known/oauth-cimd",
  client_name:                "Your Website",
  redirect_uris:              ["[your website url]/oauth/callback/huggingface"],
  token_endpoint_auth_method: "none",
  logo_uri:                  "https://....", // optional
  client_uri:                 "[your website url]", // optional
}
```

- Use `"[your website url]/.well-known/oauth-cimd"` as client ID, and PCKE as auth mechanism

This is particularly useful for ephemeral environments or MCP clients. See an [implementation example](https://github.com/huggingface/chat-ui/pull/1978) in Hugging Chat.

## Device code OAuth

Device code flow lets users authorize an app on one device (e.g. a CLI) by entering a short code on another device (e.g. a phone or browser). No redirect URI or browser on the device running the app is required.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-device-first-step.png)

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-device-second-step.png)

### Testing with a sample script

You can test a device-code OAuth app with the following script. Replace `<Client ID>` with your app’s client ID. For **public apps** (no secret), the script works as-is. For **apps with a secret**, add an `Authorization: Basic` header (Base64 of `client_id:client_secret`) to both the device and token requests.

```sh
#!/bin/bash
CLIENT_ID="<Client ID>"

# Step 1: Get device code
RESPONSE=$(curl -s -X POST https://huggingface.co/oauth/device \
  -d "client_id=$CLIENT_ID")

DEVICE_CODE=$(echo $RESPONSE | jq -r '.device_code')
USER_CODE=$(echo $RESPONSE | jq -r '.user_code')
VERIFICATION_URI=$(echo $RESPONSE | jq -r '.verification_uri')

echo "Device Code: $DEVICE_CODE"
echo "User Code: $USER_CODE"
echo ""
echo "Open: ${VERIFICATION_URI}"
echo "Enter the user code: $USER_CODE"
echo ""
read -p "Press Enter after authorizing..."

# Step 3: Get token
curl -X POST https://huggingface.co/oauth/token \
  -d "grant_type=urn:ietf:params:oauth:grant-type:device_code" \
  -d "device_code=$DEVICE_CODE" \
  -d "client_id=$CLIENT_ID"
```

> [!NOTE]
> For OAuth apps that have a client secret, include an `Authorization: Basic` header (with Base64-encoded `client_id:client_secret`) on both the device code request and the token request.

## Currently supported scopes

The currently supported scopes are:

- `openid`: Get the ID token in addition to the access token.
- `profile`: Get the user's profile information (username, avatar, etc.)
- `email`: Get the user's email address.
- `read-billing`: Know whether the user has a payment method set up.
- `read-repos`: Get read access to the user's personal repos.
- `contribute-repos`: Can create repositories and access those created by this app. Cannot access any other repositories unless additional permissions are granted.
- `write-repos`: Get write/read access to the user's personal repos.
- `manage-repos`: Get full access to the user's personal repos. Also grants repo creation and deletion.
- `inference-api`: Get access to the [Inference Providers](https://huggingface.co/docs/inference-providers/index), you will be able to make inference requests on behalf of the user.
- `jobs`: Run [jobs](https://huggingface.co/docs/huggingface_hub/main/en/guides/jobs) 
- `webhooks`: Manage [webhooks](https://huggingface.co/docs/huggingface_hub/main/en/guides/webhooks)
- `write-discussions`: Open discussions and Pull Requests on behalf of the user as well as interact with discussions (including reactions, posting/editing comments, closing discussions, ...). To open Pull Requests on private repos, you need to request the `read-repos` scope as well.

All other information is available in the [OpenID metadata](https://huggingface.co/.well-known/openid-configuration).

> [!WARNING]
> Please contact us if you need any extra scopes.

## Accessing organization resources

By default, the oauth app does not need to access organization resources.

But some scopes like `read-repos` or `read-billing` apply to organizations as well.

The user can select which organizations to grant access to when authorizing the app. If you require access to a specific organization, you can add `orgIds=ORG_ID` as a query parameter to the OAuth authorization URL. You have to replace `ORG_ID` with the organization ID, which is available in the `organizations.sub` field of the userinfo response.

## Branding

You are free to use your own design for the button. Below are some SVG images helpfully provided.

Check out [our badges](https://huggingface.co/datasets/huggingface/badges#sign-in-with-hugging-face) with explanations for integrating them in markdown or HTML.

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-sm.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-sm-dark.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-md.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-md-dark.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-lg.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-lg-dark.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg)](https://huggingface.co/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=openid%20profile&state=STATE)

## Token Exchange for Organizations (RFC 8693)

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise</a> plan.

Token Exchange allows organizations to programmatically issue access tokens for their members without requiring interactive user consent. This is particularly useful for building internal tools, automation pipelines, and enterprise integrations that need to access Hugging Face resources on behalf of organization members.

This feature implements [RFC 8693 - OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html), a standard protocol for token exchange scenarios.

### Use cases

Token Exchange is designed for scenarios where your organization needs to:

- **Build internal platforms**: Create dashboards or portals that access Hugging Face resources on behalf of your team members, without requiring each user to manually authenticate.
- **Automate CI/CD pipelines**: Issue short-lived, scoped tokens for automated workflows that need to push models or datasets to organization repositories.
- **Integrate with enterprise identity systems**: Bridge your existing identity provider with Hugging Face by issuing tokens based on your internal user directory.
- **Implement custom access controls**: Build middleware that issues tokens with specific scopes based on your organization's internal policies.

### How it works

1. Your organization has an OAuth application bound to your organization with the `token-exchange` privilege.
2. Your backend service authenticates with this OAuth app using client credentials.
3. Your service requests an access token for a specific organization member (identified by email).
4. Hugging Face verifies the user is a member of your organization and issues a scoped token.
5. The issued token can only access resources within your organization's scope.

### Prerequisites

To use Token Exchange, you need an organization-bound OAuth application with the `token-exchange` privilege. Contact Hugging Face support to set up an eligible OAuth app for your organization.

Once configured, you will receive:
- A **Client ID** (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- A **Client Secret** (keep this secure!)

> [!WARNING]
> Organization administrators can manage the OAuth app after creation, including refreshing the client secret and configuring the token duration.

### Authentication

Token Exchange uses HTTP Basic Authentication with your OAuth app credentials. Create the authorization header by Base64-encoding your `client_id:client_secret`:

```bash
# Create the authorization header
export CLIENT_ID="your-client-id"
export CLIENT_SECRET="your-client-secret"
export AUTH_HEADER=$(echo -n "${CLIENT_ID}:${CLIENT_SECRET}" | base64)
```

### Issuing tokens by email

To issue an access token for an organization member using their email address:

```bash
curl -X POST "https://huggingface.co/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic ${AUTH_HEADER}" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  -d "subject_token=user@yourorg.com" \
  -d "subject_token_type=urn:huggingface:token-type:user-email"
```

### Response

A successful request returns an access token:

```json
{
  "access_token": "hf_oauth_...",
  "token_type": "bearer",
  "expires_in": 28800,
  "scope": "openid profile email read-repos",
  "id_token": "eyJhbGciOiJS...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

The `id_token` field is included when the `openid` scope is requested.

You can then use this token to make API requests on behalf of the user:

```bash
curl "https://huggingface.co/api/whoami-v2" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

### Scope control

By default, issued tokens inherit all scopes configured on the OAuth app. You can request specific scopes by adding the `scope` parameter. See [Currently supported scopes](#currently-supported-scopes) for available values.

The token's effective permissions are limited both by the requested scope and by the user's role within the organization.

```bash
curl -X POST "https://huggingface.co/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic ${AUTH_HEADER}" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  -d "subject_token=user@yourorg.com" \
  -d "subject_token_type=urn:huggingface:token-type:user-email" \
  -d "scope=openid profile"
```

> [!TIP]
> Follow the principle of least privilege: request only the scopes your application actually needs.

### Security considerations

Tokens issued via Token Exchange have built-in security restrictions:

- **Organization-scoped**: Tokens can only access resources within your organization (models, datasets, Spaces owned by the org).
- **No personal access**: Tokens cannot access the user's personal private repositories or resources from other organizations.
- **Short-lived**: Tokens expire after 8 hours by default. Organization administrators can configure the token duration (up to 30 days) in the OAuth app settings. No refresh tokens are provided.
- **Auditable**: All token exchanges are logged and visible in your organization's [audit logs](./audit-logs).

> [!WARNING]
> Protect your OAuth app credentials carefully. Anyone with access to your client secret can issue tokens for any member of your organization.

### Error responses

| Error | Description |
|-------|-------------|
| `invalid_client` | Client is not authorized to use token exchange, or the app is not bound to an organization |
| `invalid_grant` | User not found in the bound organization |
| `invalid_scope` | Requested scope is not valid |

### Reference

**Grant type:**
```
urn:ietf:params:oauth:grant-type:token-exchange
```

**Request parameter (`subject_token_type`):**

| Value | Description |
|-------|-------------|
| `urn:huggingface:token-type:user-email` | Identify the user by their email address |

**Response field (`issued_token_type`):**

| Value | Description |
|-------|-------------|
| `urn:ietf:params:oauth:token-type:access_token` | Indicates an access token was issued |

**Related documentation:**
- [RFC 8693 - OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)
- [Audit Logs](./audit-logs)
