# Evaluating models with Inspect
In this guide, we'll learn how to evaluate models using [Inspect](https://inspect.aisi.org.uk/), an open-source framework for language model evaluations created by the UK AI Security Institute.

## Installation
To get started:

1. Install Inspect:

```bash
pip install inspect-ai
```

2. If you're using VS Code or a compatible IDE, consider installing the [Inspect VS Code Extension](https://inspect.aisi.org.uk/vscode.html).


3. Set your `HF_TOKEN` as environment variable and install the `openai` package to call models using Inference Providers. 

```bash
export HF_TOKEN="your_token_here"
pip install openai
```

> [!TIP]
> The Hugging Face token will be used to authenticate your requests. If this is the first time you use Inference Providers, check [this section](https://huggingface.co/docs/inference-providers/index#authentication) to set your token up.

## Run your first evaluation
Let's start by running the ["Hello, Inspect"](https://inspect.aisi.org.uk/#sec-hello-inspect) example from Inspect's documentation. This example evaluates models on the Sally-Anne test, which assesses the ability to infer false beliefs in others. The test format is as follows:

| input | target |
|-------|--------|
| Jackson entered the hall. Chloe entered the hall. The boots is in the bathtub. Jackson exited the hall. Jackson entered the dining_room. Chloe moved the boots to the pantry. Where was the boots at the beginning? | bathtub |
| Hannah entered the patio. Noah entered the patio. The sweater is in the bucket. Noah exited the patio. Ethan entered the study. Ethan exited the study. Hannah moved the sweater to the pantry. Where will Hannah look for the sweater? |pantry |

Evaluations in Inspect are written in Python. The following code implements our evaluation. It will run the model over the inputs of the `theory_of_mind` dataset using our model of choice and grade the responses using the same model as `scorer` and the targets in the dataset. 

```python
from inspect_ai import Task, task
from inspect_ai.dataset import example_dataset
from inspect_ai.scorer import model_graded_fact
from inspect_ai.solver import generate

@task
def theory_of_mind():
    return Task(
        dataset=example_dataset("theory_of_mind"),
        solver=generate(),
        scorer=model_graded_fact()
    )
```
If we save the above to a file `theory.py`, we can use the `inspect eval` command from the terminal. Let's evaluate the [`gpt-oss-20b` model by Open AI](https://huggingface.co/openai/gpt-oss-20b):

```bash
inspect eval theory.py  --model hf-inference-providers/openai/gpt-oss-20b    
```
If everything went well we will see the following beautiful TUI:

![Screenshot of theory of mind's eval with gpt-oss-20b](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/evals-guide-first-eval.png)

To see the evaluation samples and inference in real time you can check the `Running samples` tab:

![Screenshot of running samples with gpt-oss-20b](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/evals-guide-running-samples.png)

Once it finishes, we'll see the evaluation results:

![Screenshot of theory of mind's eval results with gpt-oss-20b](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/evals-guide-first-eval-results.png).

Besides the command line report, Inspect comes with a nice viewer UI. We can launch it with the following command:

```bash
inspect viewer
```
![Screenshot of inspect viewer results with gpt-oss-20b](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/evals-guide-first-eval-viewer.png).

Nice! We have just evaluated our first model with Inspect and Inference Providers. Now let's look at more advanced examples.

## Example: Benchmarking several models for a task
In this section, we will evaluate several models for a specific task. This is useful for selecting the most suitable model for your project and establishing a baseline if you plan to fine-tune a model for your use case. Fortunately, Inspect and Inference Providers make this task very easy. We just need to:

1. **Select a list of target models**. The best place to select the model is the "Models" page on the Hub, where you can sort and filter the models by size, task, languages, and many other features. You can use [this link](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending) to browse all `text-generation` models with Inference Providers' support. For this guide, let's use the following models: `MiniMaxAI/MiniMax-M2`, `openai/gpt-oss-20b`, `openai/gpt-oss-120b`, and `moonshotai/Kimi-K2-Instruct-0905`.

2. **Write and run the evaluation**. To run the evaluation across different models, there are two options: (1) run the `inspect eval` command several times with different `--model` values, and (2) write a single Python file that runs the evaluation over the list of models. In the previous section we've seen how to run Inspect with the first approach, let's see how to write a single script for the second approach.

```python
from inspect_ai import eval
from inspect_ai import Task, task
from inspect_ai.dataset import example_dataset
from inspect_ai.scorer import model_graded_fact
from inspect_ai.solver import generate

@task
def theory_of_mind():
    return Task(
        dataset=example_dataset("theory_of_mind"),
        solver=generate(),
        scorer=model_graded_fact()
    )

target_models = [
    "MiniMaxAI/MiniMax-M2",
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b", 
    "moonshotai/Kimi-K2-Instruct-0905"
]
for model in target_models:
    eval(theory_of_mind(), model=f"hf-inference-providers/{model}")
```

If we save this to a file `models_bench.py` we can run it like this:

```bash
python models_bench.py
```

If everything went well we will see the evaluation running sequentially for each model on the list. To analyze the results, we can use the viewer:


```bash
inspect viewer
```
![Screenshot of inspect viewer results with gpt-oss-20b](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/evals-guide-model-bench-viewer.png).


## Example: Comparing several inference providers for a task
In this section, we will evaluate the same model across different providers. Inference Providers gives us access to many providers for the same model. As performance might vary across providers, this is a useful metric to select the provider, in addition to other important factors such as speed and cost.

If we don't specify a provider, like we did in our previous examples, the system automatically routes your request to the first available provider for the specified model, following your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). But we can also select the provider by appending the provider name to the model id (e.g. `openai/gpt-oss-120b:sambanova`).

Let's run the evaluations for `gpt-oss-120b` across several providers:

```python
from inspect_ai import eval
from inspect_ai import Task, task
from inspect_ai.dataset import example_dataset
from inspect_ai.scorer import model_graded_fact
from inspect_ai.solver import generate

@task
def theory_of_mind():
    return Task(
        dataset=example_dataset("theory_of_mind"),
        solver=generate(),
        scorer=model_graded_fact()
    )

target_providers = [
    "together",
    "sambanova", 
    "groq",
    "novita",
    "nebius",
    "cerebras",
    "nscale",
    "hyperbolic",
    "fireworks-ai",
    "scaleway"
]
for provider in target_providers:
    eval(theory_of_mind(), model=f"hf-inference-providers/openai/gpt-oss-120b:{provider}")
```

Launching the viewer and sorting by score, we can compare the performance across providers, similar to the table below:

| Model | Provider | Score |
|-------|----------|-------|
| openai/gpt-oss-120b | hyperbolic | 0.84 |
| openai/gpt-oss-120b | fireworks-ai | 0.82 |
| openai/gpt-oss-120b | nscale | 0.82 |
| openai/gpt-oss-120b | nebius | 0.82 |
| openai/gpt-oss-120b | scaleway | 0.81 |
| openai/gpt-oss-120b | together | 0.81 |
| openai/gpt-oss-120b | cerebras | 0.8 |
| openai/gpt-oss-120b | novita | 0.8 |
| openai/gpt-oss-120b | groq | 0.8 |
| openai/gpt-oss-120b | sambanova | 0.8 |

## Example: Writing a custom evaluation for Vision Language Models
In this section, we will write custom evaluation code and learn how to evaluate Vision Language Models (VLMs). Inference Providers give us access to dozens of VLMs. You can use [this link](https://huggingface.co/models?pipeline_tag=image-text-to-text&inference_provider=all&sort=trending) to browse all `image-text-to-text` models (VLMs) with Inference Providers' support.

In order to write a custom evaluation, we need to find or create a dataset. For this evaluation, we have created a new dataset called `animals_or_else`. This dataset is inspired by the popular "chihuahua or muffin" challenge that demonstrates how even state-of-the-art computer vision models can struggle with visually similar objects. The task tests whether VLMs can correctly identify and count animals in images, distinguishing them from similar-looking objects like food items. This fun but challenging benchmark helps assess a model's ability to handle ambiguous visual inputs. We can browse the dataset below:

<iframe
  src="https://huggingface.co/datasets/aisheets/animals_or_else/embed/viewer"
  frameborder="0"
  width="100%"
  height="560px"
></iframe>

As this dataset is available on the Hub, we can leverage Inspect's utility to read and get the samples from the dataset. The rest of the code is very similar to our previous examples, highlighting how easy it is to run custom evaluations with Inference Providers and Inspect:

```python
from typing import Any
import tempfile
from io import BytesIO
from PIL import Image

from inspect_ai import Task, task
from inspect_ai.dataset import Sample, hf_dataset
from inspect_ai.model import ChatMessageUser, ContentText, ContentImage
from inspect_ai.scorer import model_graded_fact
from inspect_ai.solver import generate

@task
def animal_or_else():
    return Task(
        dataset=hf_dataset(
           path="dvilasuero/animal_or_else",
           split="train",
           sample_fields=record_to_sample,
           shuffle=True,
        ),
        solver=generate(),
        scorer=model_graded_fact()
    )

def record_to_sample(record: dict[str, Any]) -> Sample:

    # Resize and save the image
    img = Image.open(BytesIO(record["image"]["bytes"]))
    img.thumbnail((1024, 1024))
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
        img.save(tmp_file.name, format='JPEG')
        image_path = tmp_file.name
    
    # We ask the VLM to count the number of images containing animals
    message = [
        ChatMessageUser(
            content=[
                ContentText(text="Count the number of images containing animals"),
                ContentImage(image=image_path),
            ]
        )
    ]
    
    # The scorer will compare the VLM response with the target values in the dataset
    return Sample(
        input=message,
        target=record["target"]
    )
```
We can now run the `inspect eval` command as before:

```bash
inspect eval animal_or_else.py --model hf-inference-providers/Qwen/Qwen3-VL-8B-Instruct
```

And compare the above model with a larger reasoning model:
```bash
inspect eval animal_or_else.py --model hf-inference-providers/Qwen/Qwen3-VL-30B-A3B-Thinking
```

| Model | Accuracy |
|-------|----------|
| Qwen/Qwen3-VL-8B-Instruct | 0.7 |
| Qwen/Qwen3-VL-30B-A3B-Thinking | 0.9 |

# Next Steps
* Explore [Inspect's documentation](https://inspect.aisi.org.uk/) to learn more about model evaluation.
* Browse models available through Inference Providers to find the best model for your needs and run your own evaluations.