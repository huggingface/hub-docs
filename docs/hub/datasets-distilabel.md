# Distilabel

Distilabel is a framework for synthetic data and AI feedback for engineers who need fast, reliable and scalable pipelines based on verified research papers.

Distilabel can be used for generating synthetic data and AI feedback for a wide variety of projects including traditional predictive NLP (classification, extraction, etc.), or generative and large language model scenarios (instruction following, dialogue generation, judging etc.). Distilabel's programmatic approach allows you to build scalable pipelines data generation and AI feedback. The goal of distilabel is to accelerate your AI development by quickly generating high-quality, diverse datasets based on verified research methodologies for generating and judging with AI feedback.

## What do people build with distilabel?

The Argilla community uses distilabel to create amazing [datasets](https://huggingface.co/datasets?other=distilabel) and [models](https://huggingface.co/models?other=distilabel).

- The [1M OpenHermesPreference](https://huggingface.co/datasets/argilla/OpenHermesPreferences) is a dataset of ~1 million AI preferences that have been generated using the [teknium/OpenHermes-2.5](https://huggingface.co/datasets/teknium/OpenHermes-2.5) LLM. It is a great example on how you can use distilabel to scale and increase dataset development.
- [distilabeled Intel Orca DPO dataset](https://huggingface.co/datasets/argilla/distilabel-intel-orca-dpo-pairs) used to fine-tune the [improved OpenHermes model](https://huggingface.co/argilla/distilabeled-OpenHermes-2.5-Mistral-7B). This dataset was built by combining human curation in Argilla with AI feedback from distilabel, leading to an improved version of the Intel Orca dataset and outperforming models fine-tuned on the original dataset.
- The [haiku DPO data](https://github.com/davanstrien/haiku-dpo) is an example how anyone can create a synthetic dataset for a specific task, which after curation and evaluation can be used for fine-tuning custom LLMs.

## Prerequisites

First [login with your Hugging Face account](/docs/huggingface_hub/quick-start#login):

```bash
huggingface-cli login
```

Make sure you have `distilabel` installed:

```bash
pip install -U distilabel[vllm]
```

## Distilabel pipelines

Distilabel pipelines can be built with any number of interconnected steps or tasks. The output of one step or task is fed as input to another. A series of steps can be chained together to build complex data processing and generation pipelines with LLMs. The input of each step is a batch of data, containing a list of dictionaries, where each dictionary represents a row of the dataset, and the keys are the column names. To feed data from and to the Hugging Face hub, we've defined a `Distiset` class as an abstraction of a `datasets.DatasetDict`.

## Distiset as dataset object

A Pipeline in distilabel returns a special type of Hugging Face `datasets.DatasetDict` which is called `Distiset`.

The Pipeline can output multiple subsets in the Distiset, which is a dictionary-like object with one entry per subset. A Distiset can then be pushed seamlessly to the Hugging face Hub, with all the subsets in the same repository.

## Load data from the Hub to a Distiset

To showcase an example of loading data from the Hub, we will reproduce the [Prometheus 2 paper](https://arxiv.org/pdf/2405.01535) and use the PrometheusEval task implemented in distilabel. The Prometheus 2 and Prometheuseval task  direct assessment and pairwise ranking tasks i.e. assessing the quality of a single isolated response for a given instruction with or without a reference answer, and assessing the quality of one response against another one for a given instruction with or without a reference answer, respectively. We will use these task on a dataset loaded from the Hub, which was created by the Hugging Face H4 team named [HuggingFaceH4/instruction-dataset](https://huggingface.co/datasets/HuggingFaceH4/instruction-dataset). 

```python
from distilabel.llms import vLLM
from distilabel.pipeline import Pipeline
from distilabel.steps import KeepColumns, LoadDataFromHub
from distilabel.steps.tasks import PrometheusEval

if __name__ == "__main__":
    with Pipeline(name="prometheus") as pipeline:
        load_dataset = LoadDataFromHub(
            name="load_dataset",
            repo_id="HuggingFaceH4/instruction-dataset",
            split="test",
            output_mappings={"prompt": "instruction", "completion": "generation"},
        )

        task = PrometheusEval(
            name="task",
            llm=vLLM(
                model="prometheus-eval/prometheus-7b-v2.0",
                chat_template="[INST] {{ messages[0]['content'] }}\n{{ messages[1]['content'] }}[/INST]",
            ),
            mode="absolute",
            rubric="factual-validity",
            reference=False,
            num_generations=1,
            group_generations=False,
        )

        keep_columns = KeepColumns(
            name="keep_columns",
            columns=["instruction", "generation", "feedback", "result", "model_name"],
        )

        load_dataset >> task >> keep_columns
```

Then we need to call `pipeline.run` with the runtime parameters so that the pipeline can be launched and data can be stores in the `Distiset` object.

```python
distiset = pipeline.run(
    parameters={
        task.name: {
            "llm": {
                "generation_kwargs": {
                    "max_new_tokens": 1024,
                    "temperature": 0.7,
                },
            },
        },
    },
)
```

## Push a distilabel Distiset to the Hub

Push the `Distiset` to a Hugging Face repository, where each one of the subsets will correspond to a different configuration:

```python
distiset.push_to_hub(
    "my-org/my-dataset",
    commit_message="Initial commit",
    private=False,
    token=os.getenv("HF_TOKEN"),
)
```

## 📚 Resources

- [🚀 Distilabel Docs](https://distilabel.argilla.io/latest/)
- [🚀 Distilabel Docs - distiset](https://distilabel.argilla.io/latest/sections/how_to_guides/advanced/distiset/)
- [🚀 Distilabel Docs - prometheus](https://distilabel.argilla.io/1.2.0/sections/pipeline_samples/papers/prometheus/)
- [🆕 Introducing distilabel](https://argilla.io/blog/introducing-distilabel-1/)
