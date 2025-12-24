# Frameworks Setups

Here is the list of frameworks that provide ready-to-use Docker images with UV that you can use in Jobs.

These Docker images already have uv installed but if you want to use an image + uv for an image without uv insalled you’ll need to make sure uv is installed first. This will work well in many cases but for LLM inference libraries which can have quite specific requirements, it can be useful to use a specific image that has the library installed.

## vLLM

vLLM is a very well known and heavily used inference engine. It is known for its ability to scale inference for LLMs.
They provide the `vllm/vllm-openai` Docker image with vLLM and UV ready. This image is ideal to run batch inference.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image vllm/vllm-openai --flavor l4x4 generate-responses.py
```

You can find more information on vLLM batch inference on Jobs in [Daniel Van Strien's blog post](https://danielvanstrien.xyz/posts/2025/hf-jobs/vllm-batch-inference.html).

## TRL

TRL is a library designed for post-training models using techniques like Supervised Fine-Tuning (SFT), Group Relative Policy Optimization (GRPO), and Direct Preference Optimization (DPO). An up-to-date Docker image with UV and all TRL dependencies is available at `huggingface/trl` and can be used directly with Hugging Face Jobs.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image huggingface/trl --flavor a100-large -s HF_TOKEN train.py
```
