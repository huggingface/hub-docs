# Using PEFT at Hugging Face

🤗 [Parameter-Efficient Fine-Tuning (PEFT)](https://huggingface.co/docs/peft/index) is a library for efficiently adapting pre-trained language models to various downstream applications without fine-tuning all the model’s parameters. 

## Exploring PEFT on the Hub

You can find PEFT models by filtering at the left of the [models page](https://huggingface.co/models?library=peft&sort=trending).


## Installation

To get started, you can check out the [Quick Tour in the PEFT docs](https://huggingface.co/docs/peft/quicktour). To install, follow the [PEFT installation guide](https://huggingface.co/docs/peft/install).
You can also use the following one-line install through pip:

```
$ pip install peft
```

## Using existing models

All PEFT models can be loaded from the Hub. To use a PEFT model you also need to load the base model that was fine-tuned, as shown below. Every fine-tuned model has the base model in its model card.

```py
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel, PeftConfig

base_model = "mistralai/Mistral-7B-v0.1"
adapter_model = "dfurman/Mistral-7B-Instruct-v0.2"

model = AutoModelForCausalLM.from_pretrained(base_model)
model = PeftModel.from_pretrained(model, adapter_model)
tokenizer = AutoTokenizer.from_pretrained(base_model)

model = model.to("cuda")
model.eval()
```

Once loaded, you can pass your inputs to the tokenizer to prepare them, and call `model.generate()` in regular `transformers` fashion.

```py
inputs = tokenizer("Tell me the recipe for chocolate chip cookie", return_tensors="pt")

with torch.no_grad():
    outputs = model.generate(input_ids=inputs["input_ids"].to("cuda"), max_new_tokens=10)
    print(tokenizer.batch_decode(outputs.detach().cpu().numpy(), skip_special_tokens=True)[0])
```

It outputs the following:

```text
Tell me the recipe for chocolate chip cookie dough.

1. Preheat oven to 375 degrees F (190 degrees C).
2. In a large bowl, cream together 1/2 cup (1 stick) of butter or margarine, 1/2 cup granulated sugar, and 1/2 cup packed brown sugar.
3. Beat in 1 egg and 1 teaspoon vanilla extract.
4. Mix in 1 1/4 cups all-purpose flour.
5. Stir in 1/2 teaspoon baking soda and 1/2 teaspoon salt.
6. Fold in 3/4 cup semisweet chocolate chips.
7. Drop by
```

If you want to load a specific PEFT model, you can click `Use in PEFT` in the model card and you will be given a working snippet!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/peft_repo_light_new.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/peft_repo.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/peft_snippet_light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/peft_snippet.png"/>
</div>

## Additional resources

* PEFT [repository](https://github.com/huggingface/peft)
* PEFT [docs](https://huggingface.co/docs/peft/index)
* PEFT [models](https://huggingface.co/models?library=peft&sort=trending)
