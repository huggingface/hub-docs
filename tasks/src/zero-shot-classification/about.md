# Zero Shot Classification

## About the Task

Zero Shot Classification is a name for prompting a large language model with a task in natural language. This method, which leverages a pre-trained language model, can be thought of as an instance of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg) which generally refers to using a model trained for one task in a different application than what it was originally trained for. This is particularly useful for situations where there is little labeled data.

In Zero Shot Classification we provide a model with a prompt, a sequence of text that describes what we want our model to do in natural language. Zero shot classification does not include any examples of the desired task being completed. This differs from Single or Few Shot Classification, as these tasks include either a single or a few examples of the desired task being completed.

Zero, Single and Few Shot Classification seem to be an emergent feature of large language models. This feature seems to come about at around model sizes of +100M parameters. The effectiveness of a model at a zero, single or few-shot task seems to scale with model size, meaning that larger models (models with more trainable parameters and/or layers), generally do better at this task.


Here is an example of a zero-shot prompt for classifying the sentiment of a sequence of text:
```
Classify the following input text into one of the following three categories: [positive, negative, neutral]

Input Text: Hugging Face is awesome for making all of these State of the Art models available
Sentiment: positive

```

One great example of this task with a nice off-the-shelf model is available at the widget of this page, where the user can input a sequence of text and candidate labels to the model. This is a *token level* example of zero shot classification and more elaborate generations are available with larger models. Testing these models out and getting a feel for prompt engineering is the best way to learn. 


## Useful Resources
- [Zero Shot Learning](https://joeddav.github.io/blog/2020/05/29/ZSL.html)
- [Hugging Face on Transfer Learning](https://huggingface.co/course/en/chapter1/4?fw=pt#transfer-learning)

