## About the Task

Zero-shot image classification is a computer vision task to classify images into one of several classes, without any prior training or knowledge of the classes. 

Zero shot image classification works by transferring knowledge learnt during training of one model, to classify novel classes that was not present in the training data. So this is a variation of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg). For instance, a model trained to differentiate cars from airplanes can be used to classify images of ships.

The data in this learning paradigm consists of

- Seen data - images and their corresponding labels
- Unseen data -  only labels and no images
- Auxiliary information - additional information given to the model during training connecting the unseen and seen data. This can be in the form of textual description or word embeddings.


## Use Cases

### Image Retrieval
Zero-shot learning resolves several challenges in image retrieval systems. For example, with the rapid growth of categories on the web, it is challenging to index images based on unseen categories. With zero-shot learning we can associate unseen categories to images by exploiting attributes to model the relationships among visual features and labels.

### Action Recognition
Action recognition is the task of identifying when a person in an image/video is performing a given action from a set of actions. If all the possible actions are not known beforehand, conventional deep learning models fail. With zero-shot learning, for a given domain of a set of actions, we can create a mapping connecting low-level features and a semantic description of auxiliary data to classify unknown classes of actions.


## Task Variants 

You can contribute variants of this task [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/zero-shot-image-classification/about.md).

## Inference

```python
# Import pipeline from transformers
from transformers import pipeline

# More models in the models hub.
model_name = "openai/clip-vit-large-patch14-336"

# Create a zero shot image classification pipeline.
classifier = pipeline("zero-shot-image-classification", model=model_name)

image_to_classify = "path_to_cat_and_dog_image"
labels_for_classification =  ["cat and dog", "lion and cheetah"]
classifier(image_to_classify, labels_for_classification)

# Output
[{'score': 0.9999114274978638, 'label': 'cat and dog'},
 {'score': 8.859939407557249e-05, 'label': 'lion and cheetah'}]
```

## Useful Resources

You can contribute useful resources about this task [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/zero-shot-image-classification/about.md).

This page was made possible thanks to the efforts of [Shamima Hossain](https://huggingface.co/Shamima).

