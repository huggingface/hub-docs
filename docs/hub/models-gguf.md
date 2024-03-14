# GGUF

Hugging Face Hub supports [GGUF format](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md), which is specifically designed for use with GGML and its associated executors. The GGUF format, being a binary format, is optimized for quick loading and saving of models, making it highly efficient for inference purposes. Models initially developed in frameworks like PyTorch can be converted to GGUF format. GGUF was developed by [@ggerganov](https://huggingface.co/ggerganov) who is also the developer of [llama.cpp](https://github.com/ggerganov/llama.cpp), a popular C/C++ ML-inference framework.

<div class="flex justify-center w-full">
<img style="max-width: 50em;" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-spec.png"/>
</div>

## Finding GGUF files

You can browse all models with GGUF weights thanks to GGUF tag: [hf.co/models?library=gguf](hf.co/models?library=gguf).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-filter-dark.png"/>
</div>

For example, you can check out [TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF](https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF) for seeing GGUF weights in action. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-repo-dark.png"/>
</div>

