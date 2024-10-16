# Use Ollama with any GGUF Model on Hugging Face Hub

![cover](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/ollama/cover.png)

Ollama is an application based on llama.cpp to interact with LLMs directly through your computer. You can use any GGUF quants created by the community ([bartowski](https://huggingface.co/bartowski), [MaziyarPanahi](https://huggingface.co/MaziyarPanahi) and many more) on Hugging Face directly with Ollama, without creating a new `Modelfile`. At the time of writing there are 45K public GGUF checkpoints on the Hub, you can run any of them with a single `ollama run` command. We also provide customisations like choosing quantization type, system prompt and more to improve your overall experience. 

Getting started is as simple as:

```sh
ollama run hf.co/{username}/{repository}
```

Please note that you can use both `hf.co` and `huggingface.co` as the domain name.

Here are some other models that you can try:

```sh
ollama run hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF
ollama run hf.co/mlabonne/Meta-Llama-3.1-8B-Instruct-abliterated-GGUF
ollama run hf.co/arcee-ai/SuperNova-Medius-GGUF
ollama run hf.co/bartowski/Humanish-LLama3-8B-Instruct-GGUF
```

## Custom Quantization

By default, the `Q4_K_M` quantization scheme is used. To select a different scheme, simply add a tag:

```sh
ollama run hf.co/{username}/{repository}:{quantization}
```

![guide](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/ollama/guide.png)

For example:

```sh
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:IQ3_M
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0

# the quantization name is case-insensitive, this will also work
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:iq3_m

# you can also select a specific file
ollama run hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Llama-3.2-3B-Instruct-IQ3_M.gguf
```

## Custom Chat Template and Parameters

By default, a template will be selected automatically from a list of commonly used templates. It will be selected based on the built-in `tokenizer.chat_template` metadata stored inside the GGUF file.

If your GGUF file doesn't have a built-in template or uses a custom chat template, you can create a new file called `template` in the repository. The template must be a Go template, not a Jinja template. Here's an example:

```
{{ if .System }}<|system|>
{{ .System }}<|end|>
{{ end }}{{ if .Prompt }}<|user|>
{{ .Prompt }}<|end|>
{{ end }}<|assistant|>
{{ .Response }}<|end|>
```

To know more about Go template format, please refer to [this documentation](https://github.com/ollama/ollama/blob/main/docs/template.md)

You can optionally configure a system prompt by putting it into a new file named `system` in the repository.

To change sampling parameters, create a file named `params` in the repository. The file must be in JSON format. For the list of all available parameters, please refer to [this documentation](https://github.com/ollama/ollama/blob/main/docs/modelfile.md#parameter).


## References

- https://github.com/ollama/ollama/blob/main/docs/README.md
- https://huggingface.co/docs/hub/en/gguf
