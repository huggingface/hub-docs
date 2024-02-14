# Sign in with Hugging Face

You can use the HF OAuth / OpenID connect flow to create a **"Sign in with HF"** flow in any website or App.

This will allow users to sign in to your website or app using their HF account, by clicking a button similar to this one:

![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg)

After clicking this button your users will be presented with a permissions modal to authorize your app:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-accept-application.png)

## Creating an oauth app

You can create your application in your [settings](https://huggingface.co/settings/applications/new):

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/oauth-create-application.png)

### If you are hosting in Spaces

<Tip>

If you host your app on Spaces, then the flow will be even easier to implement (and built-in to Gradio directly); Check our [Spaces OAuth guide](https://huggingface.co/docs/hub/spaces-oauth).

</Tip>

## Currently supported scopes

The currently supported scopes are:

- `openid`: Get the ID token in addition to the access token.
- `profile`: Get the user's profile information (username, avatar, etc.)
- `email`: Get the user's email address.
- `read-repos`: Get read access to the user's personal repos.
- `write-repos`: Get write/read access to the user's personal repos.
- `manage-repos`: Get full access to the user's personal repos. Also grants repo creation and deletion.
- `inference-api`: Get access to the [Inference API](https://huggingface.co/docs/api-inference/index), you will be able to make inference requests on behalf of the user.

All other information is available in the [OpenID metadata](https://huggingface.co/.well-known/openid-configuration).

<Tip warning={true}>

Please contact us if you need any extra scopes.

</Tip>


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
