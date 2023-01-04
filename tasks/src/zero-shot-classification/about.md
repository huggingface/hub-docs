# Zero Shot Classification

## About the Task

Zero Shot Classification is the task of predicting a class that wasn't seen by the model during training. This method, which leverages a pre-trained language model, can be thought of as an instance of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg) which generally refers to using a model trained for one task in a different application than what it was originally trained for. This is particularly useful for situations where the amount of labeled data is small.

In zero shot classification, we provide the model with a prompt and a sequence of text that describes what we want our model to do, in natural language. Zero-shot classification excludes any examples of the desired task being completed. This differs from single or few-shot classification, as these tasks include a single or a few examples of the selected task.

Zero, Single and Few Shot Classification seem to be an emergent feature of large language models. This feature seems to come about at around model sizes of +100M parameters. The effectiveness of a model at a zero, single or few-shot task seems to scale with model size, meaning that larger models (models with more trainable parameters and/or layers), generally do better at this task.


Here is an example of a zero-shot prompt for classifying the sentiment of a sequence of text:
```
Classify the following input text into one of the following three categories: [positive, negative, neutral]

Input Text: Hugging Face is awesome for making all of these 
state of the art models available!
Sentiment: positive

```

One great example of this task with a nice off-the-shelf model is available at the widget of this page, where the user can input a sequence of text and candidate labels to the model. This is a *word level* example of zero shot classification, more elaborate and lengthy generations are available with larger models. Testing these models out and getting a feel for prompt engineering is the best way to learn how to use them. 


## Useful Resources
- [Zero Shot Learning](https://joeddav.github.io/blog/2020/05/29/ZSL.html)
- [Hugging Face on Transfer Learning](https://huggingface.co/course/en/chapter1/4?fw=pt#transfer-learning)

