# Getting a Xet File ID from the Hugging Face Hub

This section explains the Xet file ID used in the reconstruction API to download a file from the Hugging Face Hub using the xet protocol.

Given a particular namespace, repository and branch or commit hash and file path from the root of the repository, build the "resolve" URL for the file following this format:

```js
Define:
namespace: username/organization, e.g. Qwen
repository: the repository name e.g. Qwen-Image-Edit
branch: any git branch or commit hash e.g. main
filepath: filepath in repository e.g. transformer/diffusion_pytorch_model-00001-of-00009.safetensors 

resolve URL:

https://huggingface.co/{namespace}/{repository}/resolve/{branch}/{filepath}


Example:

https://huggingface.co/Qwen/Qwen-Image-Edit/resolve/main/transformer/diffusion_pytorch_model-00001-of-00009.safetensors
```

Then make a `GET` request to the resolve URL using your standard Hugging Face Hub credentials/token.

If the file is stored on the xet system then a successful response will have a `X-Xet-Hash` header.

The string value of this header is the Xet file ID and SHOULD be used in the path of the reconstruction API URL.
This is the string representation of the hash and can be used directly in the file reconstruction API on download.

> [!NOTE]
> The resolve URL will return a 302 redirect http status code, following the redirect will download the content via the old LFS compatible route rather than through the Xet protocol.
In order to use the Xet protocol you MUST NOT follow this redirect.
