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

The Hub has a viewer for GGUF files that lets a user check out metadata & tensors info (name, shape, precison). The viewer is available on model page ([example](https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF?show_tensors=mixtral-8x7b-instruct-v0.1.Q4_0.gguf)) & files page ([example](https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF/tree/main?show_tensors=mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf)).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-tensortable-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-tensortable-dark.png"/>
</div>

## Usage with open-source tools

* [llama.cpp](./gguf-llamacpp)
* [GPT4All](./gguf-gpt4all)

<!-- empty html divs with ids not to break previous hashlinks -->
<div id="usage-with-llamacpp" />
<div id="usage-with-gpt4all" />

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

## Quantization Types

| type         | source | description |
|---------------------------|--------|-------------|
| F32  | [Wikipedia](https://en.wikipedia.org/wiki/Single-precision_floating-point_format) | 32-bit standard IEEE 754 single-precision floating-point number. |
| F16  | [Wikipedia](https://en.wikipedia.org/wiki/Half-precision_floating-point_format) | 16-bit standard IEEE 754 half-precision floating-point number. |
| Q4_0 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557654249) | 4-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale. Legacy quantization method (not used widely as of today) |
| Q4_1 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557682290) | 4-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale + block_minimum. Legacy quantization method (not used widely as of today) |
| Q5_0 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557654249) | 5-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale. Legacy quantization method (not used widely as of today) |
| Q5_1 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557682290) | 5-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale + block_minimum. Legacy quantization method (not used widely as of today) |
| Q8_0 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557654249) | 8-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale. Legacy quantization method (not used widely as of today) |
| Q8_1 | [GitHub Discussion](https://github.com/huggingface/huggingface.js/pull/615#discussion_r1557682290) | 8-bit round-to-nearest quantization (q). Each block has 32 weights. Weight formula: w = q * block_scale + block_minimum. Legacy quantization method (not used widely as of today) |
| Q2_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 2-bit quantization (q). Super-blocks with 16 blocks, each block has 16 weight. Weight formula: w = q * block_scale(4-bit) + block_min(4-bit), resulting in 2.5625 bits-per-weight. |
| Q3_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 3-bit quantization (q). Super-blocks with 16 blocks, each block has 16 weights. Weight formula: w = q * block_scale(6-bit), resulting. 3.4375 bits-per-weight |
| Q4_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 4-bit quantization (q). Super-blocks with 8 blocks, each block has 32 weights. Weight formula: w = q * block_scale(6-bit) + block_min(6-bit), resulting in 4.5 bits-per-weight. |
| Q5_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 5-bit quantization (q). Super-blocks with 8 blocks, each block has 32 weights. Weight formula: w = q * block_scale(6-bit) + block_min(6-bit), resulting in 5.5 bits-per-weight. |
| Q6_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 6-bit quantization (q). Super-blocks with 16 blocks, each block has 16 weights. Weight formula: w = q * block_scale(8-bit), resulting in 6.5625 bits-per-weight. |
| Q8_K | [GitHub Pull Request](https://github.com/ggerganov/llama.cpp/pull/1684#issue-1739619305) | 8-bit quantization (q). Each block has 256 weights. Only used for quantizing intermediate results. All 2-6 bit dot products are implemented for this quantization type. Weight formula: w = q * block_scale. |
| IQ2_XXS | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 2-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 2.06 bits-per-weight. |
| IQ2_XS | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 2-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 2.31 bits-per-weight. |
| IQ3_XXS | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 3-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 3.06 bits-per-weight. |
| IQ1_S | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 1-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 1.56 bits-per-weight. |
| IQ4_NL | | 4-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix |
| IQ3_S | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 3-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 3.44 bits-per-weight. |
| IQ2_S | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 2-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 2.5 bits-per-weight. |
| IQ4_XS | [Hugging Face](https://huggingface.co/CISCai/OpenCodeInterpreter-DS-6.7B-SOTA-GGUF/blob/main/README.md?code=true#L59-L70) | 4-bit quantization (q). Super-blocks with 256 weights. Weight w is obtained using super_block_scale & importance matrix, resulting in 4.25 bits-per-weight. |

*if there's any inaccuracy on the table above, please open a PR on [this file](https://github.com/huggingface/huggingface.js/blob/main/packages/gguf/src/quant-descriptions.ts).*