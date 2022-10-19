## Use Cases

###  Aid the Visually Impaired Persons
VQA models can be used to reduce visual barriers for visually impaired individuals by allowing them to get information about images from the web and the real world.

### Education
VQA models can be used to improve experiences at museums by allowing observers to directly ask questions they interested in.

### Improved Image Retrieval
Visual question answering models can be used to retrieve images with specific characteristics. For example, the user can ask "Is there a dog?" to find all images with dogs from a set of images.

## Task Variants 

### Video Question Answering
Video Question Answering aims to answer questions asked about the content of a video.

## Inference

You can infer with Visual Question Answering models using the `vqa` (or `visual-question-answering`) pipeline. This pipeline requires [the Python Image Library (PIL)](https://pillow.readthedocs.io/en/stable/) to process images. You can install it with (`pip install pillow`).

```python
from PIL import Image
from transformers import pipeline

vqa_pipeline = pipeline("visual-question-answering")

image =  Image.open("elephant.jpeg")
question = "Is there an elephant?"

vqa_pipeline(image, question, top_k=1)
#[{'score': 0.9998154044151306, 'answer': 'yes'}]
```

## Useful Resources

In this area, you can insert useful resources about how to train or use a model for this task.



