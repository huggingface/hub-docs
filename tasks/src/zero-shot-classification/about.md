# Zero Shot Classification

## About the Task

Zero Shot Classification ([ZSC](https://joeddav.github.io/blog/2020/05/29/ZSL.html)) is a subset of [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning) and an attribute of Large Language Models (LLM/s), effectively we use a large pretrained language model to generate a sequence of text that answers an informal question in the form of a prompt. The "prompt" is basically context for some task, [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) is a task in and of itself and involves coaxing the correct generations out of a LLM.
- Zero Shot differs from Single-Shot or Few-Shot (learning/classification, both terms are used) as there are *no demonstrations* of the task explicitly presented in the prompt. For Single, Few or N -Shot classification a User provides several correct demonstrations of the desired task (the ideal mapping of inputs > outputs in the prompt) to the model. 
- This feature of language models is a seemingly emergent one that comes about at around model sizes of +100M. The effectiveness at zero-shot tasks seems to [scale with model size](https://arxiv.org/pdf/2005.14165.pdf) and "discovered" as a byproduct of training GPT-3


Here is an example of a zero-shot prompt for classifying the sentiment of a sequence of text:
```
Classify the following Input Text into one of the following 3 categories: [positive, negative, neutral]

Input Text: Hugging Face is awesome for making all of these SOTA models available
Sentiment: positive

```

One great example of this task with a nice off the shelf model is available at- https://huggingface.co/facebook/bart-large-mnli wherein a User supplies a sequence of text and candidate labels to the model for classification. This is a token level zero-shot example (wherein we provide candidate tokens for the model to select from) -- more elaborate generations are available with larger models, testing these out and getting a feel for prompt engineering is the best way to learn and you can get a feel for it via this [HF Post](https://huggingface.co/tasks/text-generation) or with GPT-3 over at [OpenAI](https://beta.openai.com/playground)

