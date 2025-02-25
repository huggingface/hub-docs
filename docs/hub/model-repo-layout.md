# Model repository files

A model repository holds all the files required to initialize a pretrained model for inference or training. The repository directory structure and files may vary depending on the library integration, but this guide covers what to expect in a Transformers or Diffusers model repository.

## Transformers

A [Transformers](https://hf.co/docs/transformers/index) model repository generally contains model files and preprocessor files.

<div class="flex justify-center">
  <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/model-files-repo.png"/>
</div>

### Model

- The **`config.json`** file stores details about the model architecture such as the number of hidden layers, vocabulary size, number of attention heads, the dimensions of each head, and more. This metadata is the model blueprint.
- The **`model.safetensors`** file stores the models pretrained layers and weights. For large models, the safetensors file is sharded to limit the amount of memory required to load it. Browse the **`model.safetensors.index.json`** file to see which safetensors file the model weights are being loaded from.

  ```json
  {
  "metadata": {
    "total_size": 16060522496
  },
  "weight_map": {
    "lm_head.weight": "model-00004-of-00004.safetensors",
    "model.embed_tokens.weight": "model-00001-of-00004.safetensors",
    ...
    }
  }
  ```

  You can also visualize this mapping by clicking on the ↗ button on the model card.

  <div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/model-files-safetensors-button.png"/>
  </div>

  [Safetensors](https://hf.co/docs/safetensors/index) is a safer and faster serialization format - compared to [pickle](./security-pickle#use-your-own-serialization-format) - for storing model weights. You may encounter weights pickled in formats such as **`bin`**, **`pth`**, or **`ckpt`**, but **`safetensors`** is increasingly adopted in the model ecosystem as a better alternative.

- A model may also have a **`generation_config.json`** file which stores details about how to generate text, such as whether to sample, the top tokens to sample from, the temperature, and the special tokens for starting and stopping generation.

### Preprocessor

- The **`tokenizer_config.json`** file stores the special tokens added by a model. These special tokens signal many things to a model such as the beginning of a sentence, specific formatting for chat templates, or indicating an image. This file also shows the maximum input sequence length the model can accept, the preprocessor class, and the outputs it returns.
- The **`tokenizer.json`** file stores the model's learned vocabulary.
- The **`special_tokens_map.json`** is a mapping of the special tokens. For example, in [Llama 3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct/blob/main/special_tokens_map.json), the beginning of string token is `"<|begin_of_text|>"`.

> [!TIP]
> For other modalities, the `tokenizer_config.json` file is replaced by `preprocessor_config.json`.

## Diffusers

A [Diffusers](https://hf.co/docs/diffusers/index) model repository contains all the required model sub-components such as the variational autoencoder for encoding images and decoding latents, text encoder, transformer model, and more. These sub-components are organized into a multi-folder layout.

<div class="flex justify-center">
  <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/diffusers-model-files-repo.png"/>
</div>

Each subfolder contains the weights and configuration - where applicable - for each component similar to a Transformers model.

Weights are usually stored as safetensors files and the configuration is usually a json file with information about the model architecture.
