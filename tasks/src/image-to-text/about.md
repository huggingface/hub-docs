## Use Cases
### Image Captioning

Image Captioning is the process of generating textual description of an image. 
This can help the visually impaired to understand what's happening in their surroundings.

 

### Optical Character Recognition (OCR)

OCR models convert the text present in an image, e.g. a scanned document, to text.

Try it on [🤗 Spaces](https://huggingface.co/microsoft/trocr-base-handwritten)

## Task Variants

You can contribute variants of this task [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/image-to-text/about.md).


## Inference
### Image Captioning
```python
from transformers import pipeline

captioner = pipeline(model="ydshieh/vit-gpt2-coco-en")
captioner("https://huggingface.co/datasets/Narsil/image_dummy/raw/main/parrots.png")
## [{'generated_text': 'two birds are standing next to each other '}]
```

### OCR
```python
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import requests

# load image from the IAM database
url = 'https://fki.tic.heia-fr.ch/static/img/a01-122-02-00.jpg'
image = Image.open(requests.get(url, stream=True).raw).convert("RGB")

processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-base-handwritten')
pixel_values = processor(images=image, return_tensors="pt").pixel_values

generated_ids = model.generate(pixel_values)
generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

```

## Useful Resources
- [Image Captioning](https://huggingface.co/docs/transformers/main/en/tasks/image_captioning)
- [Image captioning use case](https://blog.google/outreach-initiatives/accessibility/get-image-descriptions/)
- [Train Image Captioning model on your dataset](https://github.com/NielsRogge/Transformers-Tutorials/blob/master/GIT/Fine_tune_GIT_on_an_image_captioning_dataset.ipynb)
- [Train OCR model on your dataset ](https://github.com/NielsRogge/Transformers-Tutorials/tree/master/TrOCR)