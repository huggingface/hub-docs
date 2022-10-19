# Zero Shot Classification

## About the Task

Zero Shot Text Classification ([ZSC](https://joeddav.github.io/blog/2020/05/29/ZSL.html)) is a subset of [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning), effectively we use a large pretrained language model to predict output a token that classifies a sequence of text. 
- Zero Shot differs from Single-Shot or Few-Shot (learning/classification, both terms are used) as there are *no demonstrations* of the task explicitly presented in the prompt. For Single, Few or N -Shot classification a User provides several correct demonstrations of the desired task (the ideal mapping of inputs > outputs in the prompt) to the model. 
- This feature of language models is a seemingly emergent one that comes about at around model sizes of +100M. The effectiveness at zero-shot tasks seems to [scale with model size](https://arxiv.org/pdf/2005.14165.pdf)


Here is an example of a zero-shot prompt for classifying the sentiment of a sequence of text:
```
Classify the following Input Text into one of the following 3 categories: [positive, negative, neutral]

Input Text: Hugging Face is awesome for making all of these SOTA models available
Sentiment: positive

```

One great example of this task with a nice off the shelf model is available at- https://huggingface.co/facebook/bart-large-mnli wherein a User supplies a sequence of text and candidate labels to the model for classification.

