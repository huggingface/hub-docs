## About the Task

`Feature extraction` task is to start from initial set of measured data, and build features intended to be informative 
and non-redundant, facilitating the subsequent learning and generalization steps in text, image & audio processing.

## Use Cases
Feature extraction can be used to do transfer learning in natural language processing, computer vision and audio models.

## Inference

#### Feature Extraction

```python
from transformers import pipeline
#Fixing the chekpoint
checkpoint = "facebook/bart-base"
feature_extractor = pipeline("feature-extraction",framework="tf",model=checkpoint)
text = "Transformers is an awesome library!"
#Reducing along the first dimension to get a 768 dimensional array
feature_extractor(text,return_tensors = "tf")[0].numpy().mean(axis=0) 

```

## Useful resources

- [Documentation for feature extractor of 🤗Transformers](https://huggingface.co/docs/transformers/main_classes/feature_extractor)


