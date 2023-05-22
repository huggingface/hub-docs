This task covers guides on both [text-generation](https://huggingface.co/models?pipeline_tag=text-generation&sort=downloads) and [text-to-text generation](https://huggingface.co/models?pipeline_tag=text2text-generation&sort=downloads) models. Popular large language models that are used for chats or following instructions are also covered in this task. You can find the list of selected open-source large language models [here](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard), ranked by their performance scores.

## Use Cases

### Instruction Models

A model trained for text generation can be later adapted to follow instructions. One of the most used open-source models for instruction is OpenAssistant, which you can try [at Hugging Chat](https://huggingface.co/chat).

### Code Generation

A Text Generation model, also known as a causal language model, can be trained on code from scratch to help the programmers in their repetitive coding tasks. One of the most popular open-source models for code generation is StarCoder, which can generate code in 80+ languages. You can try it [here](https://huggingface.co/spaces/bigcode/bigcode-playground).

### Stories Generation

A story generation model can receive an input like "Once upon a time" and proceed to create a story-like text based on those first words. You can try [this application](https://huggingface.co/spaces/mosaicml/mpt-7b-storywriter) which contains a model trained on story generation, by MosaicML.

If your generative model training data is different than your use case, you can train a causal language model from scratch. Learn how to do it in the free transformers [course](https://huggingface.co/course/chapter7/6?fw=pt)!

## Task Variants

### Completion Generation Models

A popular variant of Text Generation models predicts the next word given a bunch of words. Word by word a longer text is formed that results in for example:

- Given an incomplete sentence, complete it.
- Continue a story given the first sentences.
- Provided a code description, generate the code.

The most popular models for this task are GPT-based models (such as [GPT-2](https://huggingface.co/gpt2)). These models are trained on data that has no labels, so you just need plain text to train your own model. You can train GPT models to generate a wide variety of documents, from code to stories.

### Text-to-Text Generation Models

These models are trained to learn the mapping between a pair of texts (e.g. translation from one language to another). The most popular variants of these models are [T5](https://huggingface.co/docs/transformers/model_doc/t5), [T0](https://huggingface.co/bigscience/T0pp) and [BART](https://huggingface.co/docs/transformers/model_doc/bart). Text-to-Text models are trained with multi-tasking capabilities, they can accomplish a wide range of tasks, including summarization, translation, and text classification.

## Inference

You can use the 🤗 Transformers library `text-generation` pipeline to do inference with Text Generation models. It takes an incomplete text and returns multiple outputs with which the text can be completed.

```python
from transformers import pipeline
generator = pipeline('text-generation', model = 'gpt2')
generator("Hello, I'm a language model", max_length = 30, num_return_sequences=3)
## [{'generated_text': "Hello, I'm a language modeler. So while writing this, when I went out to meet my wife or come home she told me that my"},
##  {'generated_text': "Hello, I'm a language modeler. I write and maintain software in Python. I love to code, and that includes coding things that require writing"}, ...
```

[Text-to-Text generation models](https://huggingface.co/models?pipeline_tag=text2text-generation&sort=downloads) have a separate pipeline called `text2text-generation`. This pipeline takes an input containing the sentence including the task and returns the output of the accomplished task.

```python
from transformers import pipeline

text2text_generator = pipeline("text2text-generation")
text2text_generator("question: What is 42 ? context: 42 is the answer to life, the universe and everything")
[{'generated_text': 'the answer to life, the universe and everything'}]

text2text_generator("translate from English to French: I'm very happy")
[{'generated_text': 'Je suis très heureux'}]
```

The [T0 model](https://huggingface.co/bigscience/T0) is even more robust and flexible on task prompts.

```python
text2text_generator = pipeline("text2text-generation", model = "bigscience/T0")

text2text_generator("Is the word 'table' used in the same meaning in the two previous sentences? Sentence A: you can leave the books on the table over there. Sentence B: the tables in this book are very hard to read." )
## [{"generated_text": "No"}]

text2text_generator("A is the son's of B's brother. What is the family relationship between A and B?")
## [{"generated_text": "brother"}]

text2text_generator("Is this review positive or negative? Review: this is the best cast iron skillet you will ever buy")
## [{"generated_text": "positive"}]

text2text_generator("Reorder the words in this sentence: justin and name bieber years is my am I 27 old.")
##  [{"generated_text": "Justin Bieber is my name and I am 27 years old"}]
```

## Useful Resources

Would you like to learn more about the topic? Awesome! Here you can find some curated resources that you may find helpful!

- [Course Chapter on Training a causal language model from scratch](https://huggingface.co/course/chapter7/6?fw=pt)
- [TO Discussion with Victor Sanh](https://www.youtube.com/watch?v=Oy49SCW_Xpw&ab_channel=HuggingFace)
- [Hugging Face Course Workshops: Pretraining Language Models & CodeParrot](https://www.youtube.com/watch?v=ExUR7w6xe94&ab_channel=HuggingFace)
- [Training CodeParrot 🦜 from Scratch](https://huggingface.co/blog/codeparrot)
- [How to generate text: using different decoding methods for language generation with Transformers](https://huggingface.co/blog/how-to-generate)
- [Guiding Text Generation with Constrained Beam Search in 🤗 Transformers](https://huggingface.co/blog/constrained-beam-search)
- [Code generation with Hugging Face](https://huggingface.co/spaces/codeparrot/code-generation-models)
- [🌸 Introducing The World's Largest Open Multilingual Language Model: BLOOM 🌸](https://huggingface.co/blog/bloom)
- [The Technology Behind BLOOM Training](https://huggingface.co/blog/bloom-megatron-deepspeed)
- [Faster Text Generation with TensorFlow and XLA](https://huggingface.co/blog/tf-xla-generate)
- [Assisted Generation: a new direction toward low-latency text generation](https://huggingface.co/blog/assisted-generation)
- [Introducing RWKV - An RNN with the advantages of a transformer](https://huggingface.co/blog/rwkv)
- [Creating a Coding Assistant with StarCoder](https://huggingface.co/blog/starchat-alpha)
- [StarCoder: A State-of-the-Art LLM for Code](https://huggingface.co/blog/starcoder)
- 

### Notebooks

- [Training a CLM in Flax](https://github.com/huggingface/notebooks/blob/master/examples/causal_language_modeling_flax.ipynb)
- [Training a CLM in TensorFlow](https://github.com/huggingface/notebooks/blob/master/examples/language_modeling_from_scratch-tf.ipynb)
- [Training a CLM in PyTorch](https://github.com/huggingface/notebooks/blob/master/examples/language_modeling_from_scratch.ipynb)

### Scripts for training

- [Training a CLM in PyTorch](https://github.com/huggingface/transformers/tree/main/examples/pytorch/language-modeling)
- [Training a CLM in TensorFlow](https://github.com/huggingface/transformers/tree/main/examples/tensorflow/language-modeling)
- [Text Generation in PyTorch](https://github.com/huggingface/transformers/tree/main/examples/pytorch/text-generation)

### Documentation

- [Causal language modeling task guide](https://huggingface.co/docs/transformers/tasks/language_modeling)
- [Text generation strategies](https://huggingface.co/docs/transformers/generation_strategies)