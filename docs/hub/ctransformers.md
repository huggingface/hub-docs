# Using `ctransformers` at Hugging Face

`ctransformers` is a library that provides Python bindings for the Transformer models implemented in C/C++ using GGML library. It supports several state-of-the-art language [models](https://github.com/marella/ctransformers#supported-models).

## Exploring `ctransformers` in the Hub

You can find `ctransformers` models by filtering at the left of the [models page](https://huggingface.co/models?library=ctransformers&sort=downloads).

## Installation

```sh
pip install ctransformers
```

## Using existing models

Load model directly:

```py
from ctransformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("marella/gpt-2-ggml", hf=True)
tokenizer = AutoTokenizer.from_pretrained(model)
```

Use a pipeline as a high-level helper:

```py
from transformers import pipeline

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
```

[Run in Google Colab](https://colab.research.google.com/drive/1FVSLfTJ2iBbQ1oU2Rqz0MkpJbaB_5Got)

If you want to see how to load a specific model, you can click `Use in CTransformers` and you will be given a working snippet that you can load it!

## Additional resources

- CTransformers [library](https://github.com/marella/ctransformers).
