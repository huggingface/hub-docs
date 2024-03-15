# GGUF

Hugging Face Hub supports [GGUF format](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md), a binary format that is optimized for quick loading and saving of models, making it highly efficient for inference purposes. Models initially developed in frameworks like PyTorch can be converted to GGUF format. GGUF is designed for use with GGML and other executors. GGUF was developed by [@ggerganov](https://huggingface.co/ggerganov) who is also the developer of [llama.cpp](https://github.com/ggerganov/llama.cpp), a popular C/C++ LLM inference framework.

<div class="flex justify-center w-full">
<img style="max-width: 50em;" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-spec.png"/>
</div>

## Finding GGUF files

You can browse all models with GGUF files thanks to GGUF tag: [hf.co/models?library=gguf](https://huggingface.co/models?library=gguf).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-dark.png"/>
</div>

For example, you can check out [TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF](https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF) for seeing GGUF files in action. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-dark.png"/>
</div>

<Tip>

More features regarding GGUF support on Hugging Face Hub are coming soon 🚀

</Tip>

## Usage with llama.cpp

Llama.cpp has helper script `scripts/hf.sh` that makes it easy to download GGUF files from Hugging Face Hub.

```bash
/main \
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

## Usage with @huggingface/gguf

We've also created a javascript GGUF parser that works on remotely hosted files (e. Hugging Face Hub).

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