# Using MLX at Hugging Face

[MLX](https://github.com/ml-explore/mlx) is a model training and serving framework for Apple silicon made by Apple Machine Learning Research.

It comes with a variety of examples:

- [Generate text with MLX-LM](https://github.com/ml-explore/mlx-examples/tree/main/llms/mlx_lm) and [generating text with MLX-LM for models in GGUF format](https://github.com/ml-explore/mlx-examples/tree/main/llms/gguf_llm).
- Large-scale text generation with [LLaMA](https://github.com/ml-explore/mlx-examples/tree/main/llms/llama).
- Fine-tuning with [LoRA](https://github.com/ml-explore/mlx-examples/tree/main/lora).
- Generating images with [Stable Diffusion](https://github.com/ml-explore/mlx-examples/tree/main/stable_diffusion).
- Speech recognition with [OpenAI's Whisper](https://github.com/ml-explore/mlx-examples/tree/main/whisper).


## Exploring MLX on the Hub

You can find MLX models by filtering at the left of the [models page](https://huggingface.co/models?library=mlx&sort=trending).
There's also an open [MLX community](https://huggingface.co/mlx-community) of contributors converting and publishing weights for MLX format.

Thanks to MLX Hugging Face Hub integration, you can load MLX models with a few lines of code. 

## Installation

MLX comes as a standalone package, and there's a subpackage called MLX-LM with Hugging Face integration for Large Language Models.
To install MLX-LM, you can use the following one-line install through `pip`:

```bash
pip install mlx-lm
```

You can get more information about it [here](https://github.com/ml-explore/mlx-examples/blob/main/llms/README.md#generate-text-with-llms-and-mlx). 

If you install `mlx-lm`, you don't need to install `mlx`. If you don't want to use `mlx-lm` but only MLX, you can install MLX itself as follows.

With `pip`:

```bash
pip install mlx
```

With `conda`:

```bash
conda install -c conda-forge mlx
```

## Using Existing Models

MLX-LM has useful utilities to generate text. The following line directly downloads and loads the model and starts generating text.

```bash
python -m mlx_lm.generate --model mistralai/Mistral-7B-Instruct-v0.2 --prompt "hello"
```

For a full list of generation options, run

```bash
python -m mlx_lm.generate --help
```

You can also load a model and start generating text through Python like below:

```python
from mlx_lm import load, generate

model, tokenizer = load("mistralai/Mistral-7B-Instruct-v0.2")

response = generate(model, tokenizer, prompt="hello", verbose=True)
```

MLX-LM supports popular LLM architectures including LLaMA, Phi-2, Mistral, and Qwen. Models other than supported ones can easily be downloaded as follows:

```py
pip install huggingface_hub hf_transfer

export HF_HUB_ENABLE_HF_TRANSFER=1
huggingface-cli download --local-dir <LOCAL FOLDER PATH> <USER_ID>/<MODEL_NAME>
```

## Converting and Sharing Models

You can convert, and optionally quantize, LLMs from the Hugging Face Hub as follows: 

```bash
python -m mlx_lm.convert --hf-path mistralai/Mistral-7B-v0.1 -q 
```

If you want to directly push the model after the conversion, you can do it like below. 

```bash
python -m mlx_lm.convert \
    --hf-path mistralai/Mistral-7B-v0.1 \
    -q \
    --upload-repo <USER_ID>/<MODEL_NAME>
```

## Additional Resources

* [MLX Repository](https://github.com/ml-explore/mlx)
* [MLX Docs](https://ml-explore.github.io/mlx/)
* [MLX Examples](https://github.com/ml-explore/mlx-examples/tree/main)
* [MLX-LM](https://github.com/ml-explore/mlx-examples/tree/main/llms/mlx_lm)
* [All MLX models on Hub](https://huggingface.co/models?library=mlx&sort=trending)
