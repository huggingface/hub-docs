# Spaces Configuration Reference

Spaces are configured through the `YAML` block at the top of the **README.md** file at the root of the repository. All the accepted parameters are listed below.

<!-- Trailing whitespaces are intended : they render as a newline in the hub documentation -->

**`title`** : _string_  
Display title for the Space.  

**`emoji`** : _string_  
Space emoji (emoji-only character allowed).  

**`colorFrom`** : _string_  
Color for Thumbnail gradient (red, yellow, green, blue, indigo, purple, pink, gray).  

**`colorTo`** : _string_  
Color for Thumbnail gradient (red, yellow, green, blue, indigo, purple, pink, gray).  

**`sdk`** : _string_  
Can be either `gradio`, `streamlit`, `docker`, or `static`.  

**`python_version`**: _string_  
Any valid Python `3.x` or `3.x.x` version.  
Defaults to `3.10`.  

**`sdk_version`** : _string_  
Specify the version of the selected SDK (Streamlit or Gradio).  
All versions of Gradio are supported.  
All versions of Streamlit from `0.79.0` are supported.

**`suggested_hardware`** : _string_  
Specify the suggested [hardware](https://huggingface.co/docs/hub/spaces-gpus) on which this Space must be run.  
Useful for Spaces that are meant to be duplicated by other users.  
Setting this value will not automatically assign an hardware to this Space.  
Value must be a valid hardware flavor (e.g. `"cpu-upgrade"`, `"t4-small"`, `"t4-medium"`, `"a10g-small"`, `"a10g-large"` or `"a100-large"`).  

**`suggested_storage`** : _string_  
Specify the suggested [permanent storage](https://huggingface.co/docs/hub/spaces-storage) on which this Space must be run.  
Useful for Spaces that are meant to be duplicated by other users.  
Setting this value will not automatically assign a permanent storage to this Space.  
Value must be one of `"small"`, `"medium"` or `"large"`.  

**`app_file`** : _string_  
Path to your main application file (which contains either `gradio` or `streamlit` Python code, or `static` html code).  
Path is relative to the root of the repository.  

**`app_port`** : _int_  
Port on which your application is running. Used only if `sdk` is `docker`. Default port is `7860`.

**`base_path`**: _string_
For non-static Spaces, initial url to render. Needs to start with `/`. For static Spaces, use `app_file` instead.

**`fullWidth`**: _boolean_  
Whether your Space is rendered inside a full-width (when `true`) or fixed-width column (ie. "container" CSS) inside the iframe.
Defaults to false in `gradio`, and to true for other sdks.

**`models`** : _List[string]_  
HF model IDs (like `gpt2` or `deepset/roberta-base-squad2`) used in the Space.  
Will be parsed automatically from your code if not specified here.  

**`datasets`** : _List[string]_  
HF dataset IDs (like `common_voice` or `oscar-corpus/OSCAR-2109`) used in the Space.  
Will be parsed automatically from your code if not specified here.  

**`tags`** : _List[string]_  
List of terms that describe your Space task or scope.  

**`pinned`** : _boolean_  
Whether the Space stays on top of your profile. Can be useful if you have a lot of Spaces so you and others can quickly see your best Space.  

**`hf_oauth`** : _boolean_
Whether a connected OAuth app is associated to this Space. See [Adding a Sign-In with HF button to your Space](https://huggingface.co/docs/hub/spaces-oauth) for more details.

**`hf_oauth_redirect_path`** : _string_
Authorized relative redirect path of the connected OAuth app. `/login/callback` and `/auth/callback` are authorized by default and do not need this parameter. See [Adding a Sign-In with HF button to your space](https://huggingface.co/docs/hub/spaces-oauth) for more details.

**`disable_embedding`** : _boolean_  
Whether the Space iframe can be embedded in other websites.
Defaults to false, i.e. Spaces *can* be embedded.

**`custom_headers`** : _Dict[string, string]_  
Set custom HTTP headers that will be added to all HTTP responses when serving your Space.  
For now, only the [cross-origin-embedder-policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) (COEP), [cross-origin-opener-policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) (COOP), and [cross-origin-resource-policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy) (CORP) headers are allowed. These headers can be used to set up a cross-origin isolated environment and enable powerful features like `SharedArrayBuffer`, for example:

```yaml
custom_headers:
  cross-origin-embedder-policy: require-corp
  cross-origin-opener-policy: same-origin
  cross-origin-resource-policy: cross-origin
```

*Note:* all headers and values must be lowercase.
