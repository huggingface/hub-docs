# GGUF

Hugging Face Hub supports all file formats, but has built-in features for [GGUF format](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md), a binary format that is optimized for quick loading and saving of models, making it highly efficient for inference purposes. GGUF is designed for use with GGML and other executors. GGUF was developed by [@ggerganov](https://huggingface.co/ggerganov) who is also the developer of [llama.cpp](https://github.com/ggerganov/llama.cpp), a popular C/C++ LLM inference framework. Models initially developed in frameworks like PyTorch can be converted to GGUF format for use with those engines.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-spec.png"/>
</div>

As we can see in this graph, unlike tensor-only file formats like [safetensors](https://huggingface.co/docs/safetensors) – which is also a recommended model format for the Hub – GGUF encodes both the tensors and a standardized set of metadata.

## Finding GGUF files

You can browse all models with GGUF files filtering by the GGUF tag: [hf.co/models?library=gguf](https://huggingface.co/models?library=gguf).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-dark.png"/>
</div>

For example, you can check out [TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF](https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF) for seeing GGUF files in action. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-dark.png"/>
</div>

## Viewer for metadata & tensors info

The Hub has a viewer for GGUF files that lets a user check out metadata & tensors info (name, shape, precison).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-tensortable-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-tensortable-dark.png"/>
</div>

## Usage with llama.cpp

Llama.cpp has a helper script, [`scripts/hf.sh`](https://github.com/ggerganov/llama.cpp/blob/master/scripts/hf.sh), that makes it easy to download GGUF files from Hugging Face Hub. You can use it with a repo and file name, or with a URL to the GGUF file entry on the Hub:

```bash
./main \
  -m $(./scripts/hf.sh --repo TheBloke/Mixtral-8x7B-v0.1-GGUF --file mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64

./main \
  -m $(./scripts/hf.sh https://huggingface.co/TheBloke/Mixtral-8x7B-v0.1-GGUF/blob/main/mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64

./main \
  -m $(./scripts/hf.sh --url https://huggingface.co/TheBloke/Mixtral-8x7B-v0.1-GGUF/blob/main/mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64
```

Find more information [here](https://github.com/ggerganov/llama.cpp/pull/5501).

## Parsing the metadata with @huggingface/gguf

We've also created a javascript GGUF parser that works on remotely hosted files (e.g. Hugging Face Hub).

```bash
npm install @huggingface/gguf
```

```ts
import { gguf } from "@huggingface/gguf";
// remote GGUF file from https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF
const URL_LLAMA = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/191239b/llama-2-7b-chat.Q2_K.gguf";
const { metadata, tensorInfos } = await gguf(URL_LLAMA);
```

Find more information [here](https://github.com/huggingface/huggingface.js/tree/main/packages/gguf).