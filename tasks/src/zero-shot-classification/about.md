# Zero Shot Classification

## About the Task

Zero Shot Classification is a name for prompting a large language model with a task in natural language.  This method, which leverages a pre-trained language model, can be thought of as an instance of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg) which generally refers to the act of using a model trained for a task in a different application than what it was originally trained for. 

In Zero Shot Classification we provide a model with a prompt, a sequence of text that describes what we want our model to do in natural language. Zero shot classification does not include any examples of the desired task being completed. This differs from Single or Few Shot Classification, as these tasks include either a single or a few examples of the desired task being completed.

Zero, Single and Few Shot Classification seem to be an emergent feature of large language models. This feature seems to come about at around model sizes of +100M parameters. The effectiveness of a model at a zero, single or few-shot task seems to [scale with model size](), meaning that larger models (models with more trainable parameters and/or layers), generally do better at this task.


Here is an example of a zero-shot prompt for classifying the sentiment of a sequence of text:
```
Classify the following Input Text into one of the following 3 categories: [positive, negative, neutral]

Input Text: Hugging Face is awesome for making all of these State of the Art models available
Sentiment: positive

```

One great example of this task with a nice off the shelf model is available at [this repository](https://huggingface.co/facebook/bart-large-mnli), where a user can input a sequence of text and candidate labels, to the model. This is an token level example of zero shot classification -- more elaborate generations are available with larger models, testing these out and getting a feel for prompt engineering is the best way to learn and a nice way to develop that feel is available in this [HF Post](https://huggingface.co/tasks/text-generation) or with GPT-3 over at [OpenAI](https://beta.openai.com/playground).




## Useful Resources

- Zero Shot Learning- https://joeddav.github.io/blog/2020/05/29/ZSL.html
- Wikipedia on Transfer Learning- https://en.wikipedia.org/wiki/Transfer_learning
- Wikipedia on Prompt Engineering- https://en.wikipedia.org/wiki/Prompt_engineering

