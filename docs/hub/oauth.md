# Sign in with Hugging Face

Besides [spaces](https://huggingface.co/docs/hub/spaces-oauth), it's also possible to create an OAuth / OpenID connect app for your website. This will allow users to sign-in to your website using their HF account.

The currently supported scopes are:

- `openid`: Get the ID token in addition to the access token.
- `profile`: Get the user's profile information (username, avatar, etc.)
- `email`: Get the user's email address.

Contact us at [website@huggingface.co](mailto:website@huggingface.co) with the desired name, logo url, scope and redirect urls for the OAuth app. We will provide you with the client ID and client secret.

All other information is available in the [OpenID metadata](https://huggingface.co/.well-known/openid-configuration).

## Branding

You are free to use your own design for the button. Below are some SVG images helpfully provided.

Check out [our baddges](https://huggingface.co/datasets/huggingface/badges#sign-in-with-hugging-face) with explanations for integrating them in both markdown and HTML.

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-sm.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-sm-dark.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-md.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-md-dark.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-lg.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-lg-dark.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})

[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-xl.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})
[![Sign in with Hugging Face](https://huggingface.co/datasets/huggingface/badges/raw/main/sign-in-with-huggingface-xl-dark.svg)](https://huggingface.co/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20profile&state={STATE})
