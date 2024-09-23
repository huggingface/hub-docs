# Using TRL with Hugging Face

TRL is a library to post-train LLMs and diffusion models with methods such as Supervised Fine-tuning (SFT), Proximal Policy Optimization (PPO), and Direct Preference Optimization (DPO).

The library is built on top of [🤗 Transformers](https://github.com/huggingface/transformers) and is compatible with any model architecture available there.


## Highlights

- **`Efficient and scalable`**:
    - [🤗 Accelerate](https://github.com/huggingface/accelerate) is the backbone of TRL that model training to scale from a single GPU to a large scale multi-node cluster with methods such as DDP and DeepSpeed.
    - [`PEFT`](https://github.com/huggingface/peft) is fully integrated and allows to train even the largest models on modest hardware with quantisation and methods such as LoRA or QLoRA.
    - [Unsloth](https://github.com/unslothai/unsloth) is also integrated and allows to significantly speed up training with dedicated kernels.
- **`CLI`**: With the [CLI](https://huggingface.co/docs/trl/clis) you can fine-tune and chat with LLMs without writing any code using a single command and a flexible config system.
- **`Trainers`**: The trainer classes are an abstraction to apply many fine-tuning methods with ease such as the [`SFTTrainer`](https://huggingface.co/docs/trl/sft_trainer), [`DPOTrainer`](https://huggingface.co/docs/trl/dpo_trainer), [`RewardTrainer`](https://huggingface.co/docs/trl/reward_trainer), [`PPOTrainer`](https://huggingface.co/docs/trl/ppov2_trainer), and [`ORPOTrainer`](https://huggingface.co/docs/trl/orpo_trainer).
- **`AutoModels`**: The [`AutoModelForCausalLMWithValueHead`](https://huggingface.co/docs/trl/models#trl.AutoModelForCausalLMWithValueHead) & [`AutoModelForSeq2SeqLMWithValueHead`](https://huggingface.co/docs/trl/models#trl.AutoModelForSeq2SeqLMWithValueHead) classes add an additional value head to the model which allows to train them with RL algorithms such as PPO.
- **`Examples`**: Fine-tune Llama for chat applications or apply full RLHF using adapters etc, following the [examples](https://github.com/huggingface/trl/tree/main/examples).

## Exploring TRL on the Hub

You can find TRL models by filtering at the left of the [models page](https://huggingface.co/models?library=trl).

All models on the Hub come with these useful features:
1. An automatically generated model card with a brief description.
2. An interactive widget you can use to play with the model directly in the browser.
3. An Inference API that allows you to make inference requests.

## Installation

To get started, you can follow the [TRL installation guide](https://huggingface.co/docs/trl/installation). You can also use the following one-line install through pip:

```
pip install -U trl
```

## Using existing models

All `trl` models can easily be loaded from the Hub as `transformers` models:

```py
# pip install accelerate

import torch
from transformers import pipeline

pipe = pipeline("text-generation", model="HuggingFaceH4/zephyr-7b-beta", torch_dtype=torch.bfloat16, device_map="auto")
```

Once loaded, you can use the `pipeline()` to perform inference as follows:

```py
messages = [
    {
        "role": "system",
        "content": "You are a friendly chatbot who always responds in the style of a pirate",
    },
    {"role": "user", "content": "How many helicopters can a human eat in one sitting?"},
]
outputs = pipe(messages, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
print(outputs[0]["generated_text"])
```
```bash
<|system|>
You are a friendly chatbot who always responds in the style of a pirate.</s>
<|user|>
How many helicopters can a human eat in one sitting?</s>
<|assistant|>
Ah, me hearty matey! But yer question be a puzzler! A human cannot eat a helicopter in one sitting, as helicopters are not edible. They be made of metal, plastic, and other materials, not food!
```

If you want to load a specific TRL model, you can click `Use this model` and you will be given a working code snippet!

## Additional resources

* [All TRL models available on the Hub](https://huggingface.co/models?library=trl)
* TRL [repository](https://github.com/huggingface/trl)
* TRL [docs](https://huggingface.co/docs/trl)
