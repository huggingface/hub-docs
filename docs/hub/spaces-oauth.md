# Adding a Sign-In with HF button to your Space

You can enable a built-in sign-in flow to your Space so users can log in with their HF account. To do this, you can create an OAuth/OpenID connect app associated to your Space.

## Create an OAuth app

All you need to do is add `hf_oauth: true` to your Space's metadata, inside your README.md file.

Here's an example md file for a gradio space:

```markdown
---
title: Gradio Oauth Test
emoji: 🏆
colorFrom: pink
colorTo: pink
sdk: gradio
sdk_version: 3.36.1
python_version: 3.10.6
app_file: app.py
hf_oauth: true
---

You can check the full configuration in the [configuration reference docs](./spaces-config-reference).
```

This will add the following [environment variables](https://huggingface.co/docs/hub/spaces-overview#helper-environment-variables) to your space:

- `OAUTH_CLIENT_ID`: the client ID of your OAuth app (public)
- `OAUTH_CLIENT_SECRET`: the client secret of your OAuth app
- `OPENID_PROVIDER_URL`: The URL of the OpenID provider (Hugging Face), eg [https://huggingface.co](https://huggingface.co). The OpenID metadata will be available at [`{OPENID_PROVIDER_URL}/.well-known/openid-configuration`](https://huggingface.co/.well-known/openid-configuration)

As for any other environment variable, you can use them in your code by using `os.getenv("OAUTH_CLIENT_ID")` for example.

## Redirect URLs 

The allowed redirect URIs for your OAuth app are:

- `https://{SPACE_SUBDOMAIN}.hf.space/auth/callback`
- `https://{SPACE_SUBDOMAIN}.hf.space/login/callback`

Note that `SPACE_SUBDOMAIN` is also [available](https://huggingface.co/docs/hub/spaces-overview#helper-environment-variables) as an environment variable.

You can add `hf_oauth_redirect_path: /oauth/callback` to your space metadata to customize the relative redirect path.

## Scopes

The following scopes are available:

- `openid`: Get the ID token in addition to the access token.
- `profile`: Get the user's profile information (username, avatar, etc.)

You should use `"openid profile"` as the scope for your OAuth app.

## Adding the button to your space

You have all the information you need to add a "Sign-in with HF" button to your space, thanks to the OpenID metadata / various implementations of the protocol.

Basically, you need to:

- Redirect the user to `https://huggingface.co/oauth/authorize?redirect_uri={REDIRECT_URI}&scope=openid%20profile&client_id={CLIENT_ID}&state={STATE}`, where `STATE` is a random string that you will need to verify later.
- Handle the callback on `/auth/callback` or `/login/callback` (depending on the type of app you created) and verify the `state` parameter.
- Use the `code` query parameter to get an access token and id token from `https://huggingface.co/oauth/token` (POST request with `client_id`, `code`, `grant_type=authorization_code` and `redirect_uri` as form data, and with `Authorization: Basic {base64(client_id:client_secret)}` as a header)

<Tip warning={true}>

If the space is running inside an iframe, you should use `target=_blank` on the button to open the sign-in page in a new tab. Otherwise, you might encounter issues with the cookies on some browsers.

</Tip>

## Examples:

- [Gradio test app](https://huggingface.co/spaces/Wauplin/gradio-oauth-test)
- [Hugging Chat (NodeJS/SvelteKit)](https://huggingface.co/spaces/coyotte508/chat-ui)