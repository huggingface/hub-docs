## Use Cases

### Automatic Medical Diagnostic
Visual Question Answering (VQA) models can be used to diagnose illnesses, helping clinical staff make decisions. For example, a doctor could feed the model an MRI scan and ask ¿what does this MRI scan show?

###  Aid to the Blind
VQA models can be used to reduce visual barriers for visually impaired individuals by allowing them to get information about images from the web and the real world.

### Unattended Surveillance
Video Question Answering can be used to quickly extract valuable information from surveillance recordings. It can also be used to raise alarms in case it detects anomalous situations.

### Education
VQA models can be used to improve experiences at museums by allowing observers to directly ask questions they interested in.

### Improved Image Retrieval
Models can be used to retrieve images with specific characteristics. For example, to find all images with dogs, you could aks "Is there a dog?".

## Task Variants 

### Video Question Answering
Video Question Answering aims to answer natural language questions based on videos.

## Inference

You can infer with Visual Question Answering models using the `vqa` (or `visual-question-answering`) pipeline. You need to install PIL first  (`pip install pillow`).

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



