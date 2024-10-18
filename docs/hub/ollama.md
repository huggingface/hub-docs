# Use Ollama with any GGUF Model on Hugging Face Hub

![cover](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/ollama/cover.png)

Ollama is an application based on llama.cpp to interact with LLMs directly through your computer. You can use any GGUF quants created by the community ([bartowski](https://huggingface.co/bartowski), [MaziyarPanahi](https://huggingface.co/MaziyarPanahi) and [many more](https://huggingface.co/models?pipeline_tag=text-generation&library=gguf&sort=trending)) on Hugging Face directly with Ollama, without creating a new `Modelfile`. At the time of writing there are 45K public GGUF checkpoints on the Hub, you can run any of them with a single `ollama run` command. We also provide customisations like choosing quantization type, system prompt and more to improve your overall experience. 

Getting started is as simple as:

1. Enable `ollama` under your [Local Apps settings](https://huggingface.co/settings/local-apps).
2. On a model page, choose `ollama` from `Use this model` dropdown. For example: [bartowski/Llama-3.2-1B-Instruct-GGUF](https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/ollama-modelpage-light.gif"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/ollama-modelpage-dark.gif"/>
</div>

The snippet would be in format:

```sh
ollama run hf.co/{username}/{repository}
```

Please note that you can use both `hf.co` and `huggingface.co` as the domain name.

Here are some models you can try:

```sh
ollama run hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF
ollama run hf.co/mlabonne/Meta-Llama-3.1-8B-Instruct-abliterated-GGUF
ollama run hf.co/arcee-ai/SuperNova-Medius-GGUF
ollama run hf.co/bartowski/Humanish-LLama3-8B-Instruct-GGUF
```

## Custom Quantization

By default, the `Q4_K_M` quantization scheme is used, when it's present inside the model repo. If not, we default to picking one reasonable quant type present inside the repo.

To select a different scheme, simply:

1. From `Files and versions` tab on a model page, open GGUF viewer on a particular GGUF file.
2. Choose `ollama` from `Use this model` dropdown.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/ollama-modeltree-light.gif"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/ollama-modeltree-dark.gif"/>
</div>

The snippet would be in format (quantization tag added):

```sh
ollama run hf.co/{username}/{repository}:{quantization}
```

For example:

```sh
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:IQ3_M
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0

# the quantization name is case-insensitive, this will also work
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:iq3_m

# you can also directly use the full filename as a tag
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Llama-3.2-3B-Instruct-IQ3_M.gguf
```

## Custom Chat Template and Parameters

By default, a template will be selected automatically from a list of commonly used templates. It will be selected based on the built-in `tokenizer.chat_template` metadata stored inside the GGUF file.

If your GGUF file doesn't have a built-in template or if you want to customize your chat template, you can create a new file called `template` in the repository. The template must be a Go template, not a Jinja template. Here's an example:

```
{{ if .System }}<|system|>
{{ .System }}<|end|>
{{ end }}{{ if .Prompt }}<|user|>
{{ .Prompt }}<|end|>
{{ end }}<|assistant|>
{{ .Response }}<|end|>
```

To know more about the Go template format, please refer to [this documentation](https://github.com/ollama/ollama/blob/main/docs/template.md)

You can optionally configure a system prompt by putting it into a new file named `system` in the repository.

To change sampling parameters, create a file named `params` in the repository. The file must be in JSON format. For the list of all available parameters, please refer to [this documentation](https://github.com/ollama/ollama/blob/main/docs/modelfile.md#parameter).


## References

- https://github.com/ollama/ollama/blob/main/docs/README.md
- https://huggingface.co/docs/hub/en/gguf
