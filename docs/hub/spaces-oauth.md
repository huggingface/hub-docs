# Adding a Sign-In with HF button to your Space

You can enable a built-in sign-in flow in your Space by seamlessly creating and associating an [OAuth/OpenID connect](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) app so users can log in with their HF account.

This enables new use cases for your Space. For instance, when combined with [Persistent Storage](https://huggingface.co/docs/hub/spaces-storage), a generative AI Space could allow users to log in to access their previous generations, only accessible to them.

<Tip>

This guide will take you through the process of integrating a *Sign-In with HF* button into any Space. If you're seeking a fast and simple method to implement this in a **Gradio** Space, take a look at its [built-in integration](https://www.gradio.app/guides/sharing-your-app#o-auth-login-via-hugging-face).

</Tip>

<Tip>

You can also use the HF OAuth flow to create a "Sign in with HF" flow in any website or App, outside of Spaces. [Read our general OAuth page](./oauth).

</Tip>

## Create an OAuth app

All you need to do is add `hf_oauth: true` to your Space's metadata inside your `README.md` file.

Here's an example of metadata for a Gradio Space:

```yaml
title: Gradio Oauth Test
emoji: 🏆
colorFrom: pink
colorTo: pink
sdk: gradio
sdk_version: 3.40.0
python_version: 3.10.6
app_file: app.py

hf_oauth: true
# optional, see "Scopes" below. "openid profile" is always included.
hf_oauth_scopes:
 - read-repos
 - write-repos
 - manage-repos
 - inference-api
```

You can check out the [configuration reference docs](./spaces-config-reference) for more information.

This will add the following [environment variables](https://huggingface.co/docs/hub/spaces-overview#helper-environment-variables) to your space:

- `OAUTH_CLIENT_ID`: the client ID of your OAuth app (public)
- `OAUTH_CLIENT_SECRET`: the client secret of your OAuth app
- `OAUTH_SCOPES`: scopes accessible by your OAuth app.
- `OPENID_PROVIDER_URL`: The URL of the OpenID provider. The OpenID metadata will be available at [`{OPENID_PROVIDER_URL}/.well-known/openid-configuration`](https://huggingface.co/.well-known/openid-configuration).

As for any other environment variable, you can use them in your code by using `os.getenv("OAUTH_CLIENT_ID")`, for example.

## Redirect URLs 

You can use any redirect URL you want, as long as it targets your Space.

Note that `SPACE_HOST` is [available](https://huggingface.co/docs/hub/spaces-overview#helper-environment-variables) as an environment variable.

For example, you can use `https://{SPACE_HOST}/login/callback` as a redirect URI.

## Scopes

The following scopes are always included for Spaces:

- `openid`: Get the ID token in addition to the access token.
- `profile`: Get the user's profile information (username, avatar, etc.)

Those scopes are optional and can be added by setting `hf_oauth_scopes` in your Space's metadata:

- `email`: Get the user's email address.
- `read-repos`: Get read access to the user's personal repos.
- `write-repos`: Get write/read access to the user's personal repos.
- `manage-repos`: Get full access to a repo. Also grants repo creation and deletion.
- `inference-api`: Get access to the [Inference API](https://huggingface.co/docs/api-inference/index), you will be able to make inference requests on behalf of the user.

## Adding the button to your Space

You now have all the information to add a "Sign-in with HF" button to your Space. Some libraries ([Python](https://github.com/lepture/authlib), [NodeJS](https://github.com/panva/node-openid-client)) can help you implement the OpenID/OAuth protocol. 

Gradio and hugginface.js also provide **built-in support**, making implementing the Sign-in with HF button a breeze; you can check out the associated guides with [gradio](https://www.gradio.app/guides/sharing-your-app#o-auth-login-via-hugging-face) and with [hugginface.js](https://huggingface.co/docs/huggingface.js/hub/README#oauth-login). 

Basically, you need to:

- Redirect the user to `https://huggingface.co/oauth/authorize?redirect_uri={REDIRECT_URI}&scope=openid%20profile&client_id={CLIENT_ID}&state={STATE}`, where `STATE` is a random string that you will need to verify later.
- Handle the callback on `/auth/callback` or `/login/callback` (or your own custom callback URL) and verify the `state` parameter.
- Use the `code` query parameter to get an access token and id token from `https://huggingface.co/oauth/token` (POST request with `client_id`, `code`, `grant_type=authorization_code` and `redirect_uri` as form data, and with `Authorization: Basic {base64(client_id:client_secret)}` as a header).

<Tip warning={true}>

You should use `target=_blank` on the button to open the sign-in page in a new tab, unless you run the space outside its `iframe`. Otherwise, you might encounter issues with cookies on some browsers.

</Tip>

## Examples:

- [Gradio test app](https://huggingface.co/spaces/Wauplin/gradio-oauth-test)
- [Hugging Chat (NodeJS/SvelteKit)](https://huggingface.co/spaces/huggingchat/chat-ui)
- [Inference Widgets (Auth.js/SvelteKit)](https://huggingface.co/spaces/huggingfacejs/inference-widgets), uses the `inference-api` scope to make inference requests on behalf of the user.
- [Client-Side in a Static Space (huggingface.js)](https://huggingface.co/spaces/huggingfacejs/client-side-oauth) - very simple JavaScript example.

JS Code example:

```js
import { oauthLoginUrl, oauthHandleRedirectIfPresent } from "@huggingface/hub";

const oauthResult = await oauthHandleRedirectIfPresent();

if (!oauthResult) {
  // If the user is not logged in, redirect to the login page
  window.location.href = await oauthLoginUrl();
}

// You can use oauthResult.accessToken, oauthResult.userInfo among other things
console.log(oauthResult);
```
