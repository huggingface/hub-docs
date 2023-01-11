## About the Task

`Feature-Extraction` starts from initial set of measured data and builds derived values (features) intended to be informative and non-redundant, facilitating the subsequent learning and generalization steps in text, image & audio processing.
The Hub contains over 2000 models for [feature-extraction](https://huggingface.co/models?pipeline_tag=feature-extraction&p=2&sort=downloads).

## Use Cases
It is used for downstream  tasks like 
- Unsupervised Learning
- Sentiment/Text classification
- Image classification 
- Audio Classification

## Inference

#### Feature Extraction

```python
## Loading the modules
from transformers import pipeline
#Fixing the chekpoint
checkpoint = "facebook/bart-base"
feature_extractor = pipeline("feature-extraction",framework="tf")
text = "\U0001F917 Transformers is an awesome library!"
print(text)
# 🤗 Transformers is an awesome library!
feature_extractor(text,return_tensors = "tf")[0].numpy().mean(axis=0) ##Reducing along the first dimension to get a 768 dimensional array

```

## Useful resources

- [Feature-extractor](https://huggingface.co/docs/transformers/main_classes/feature_extractor)


