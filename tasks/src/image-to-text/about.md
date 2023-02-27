## Use Cases
### Image Captioning
Image Captioning is the process of generating textual description of an image. 
This can help the visually impaired people to understand what's happening in their surroundings.

### Optical Character Recognition (OCR)
OCR models convert the text present in an image, e.g. a scanned document, to text.

## Task Variants

You can contribute variants of this task [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/image-to-text/about.md).

## Inference
### Image Captioning
You can use the 🤗 Transformers library's `image-to-text` pipeline to generate caption for the Image input.
```python
from transformers import pipeline

captioner = pipeline("image-to-text",model="ydshieh/vit-gpt2-coco-en")
captioner("https://huggingface.co/datasets/Narsil/image_dummy/raw/main/parrots.png")
## [{'generated_text': 'two birds are standing next to each other '}]
```

### OCR
This code snippet uses Microsoft’s TrOCR, an encoder-decoder model consisting of an image Transformer encoder and a text Transformer decoder for state-of-the-art optical character recognition (OCR) on single-text line images.
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

This page was made possible thanks to efforts of [Sukesh Perla](https://huggingface.co/hitchhiker3010) and [Johannes Kolbe](https://huggingface.co/johko).
