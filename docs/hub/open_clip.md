# Using OpenCLIP at Hugging Face

[OpenCLIP](https://github.com/mlfoundations/open_clip) is an open-source implementation of OpenAI's CLIP.

## Exploring OpenCLIP on the Hub

You can find OpenCLIP models by filtering at the left of the [models page](https://huggingface.co/models?library=open_clip&sort=trending).

OpenCLIP models hosted on the Hub have a model card with useful information about the models. Thanks to OpenCLIP Hugging Face Hub integration, you can load OpenCLIP models with a few lines of code. You can also deploy these models using [Inference Endpoints](https://huggingface.co/inference-endpoints).


## Installation

To get started, you can follow the [OpenCLIP installation guide](https://github.com/mlfoundations/open_clip#usage).
You can also use the following one-line install through pip:

```
$ pip install open_clip_torch
```

## Using existing models

All OpenCLIP models can easily be loaded from the Hub:

```py
import open_clip

model, preprocess_train, preprocess_val = open_clip.create_model_and_transforms('hf-hub:laion/CLIP-ViT-g-14-laion2B-s12B-b42K')
tokenizer = open_clip.get_tokenizer('hf-hub:laion/CLIP-ViT-g-14-laion2B-s12B-b42K')
```

Once loaded, you can encode the image and text to do zero-shot classification:

```py
import torch
from PIL import Image

url = 'http://images.cocodataset.org/val2017/000000039769.jpg'
image = Image.open(requests.get(url, stream=True).raw)
image = preprocess_train(image).unsqueeze(0)
text = tokenizer(["a diagram", "a dog", "a cat"])

with torch.no_grad(), torch.cuda.amp.autocast():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)

    text_probs = (100.0 * image_features @ text_features.T).softmax(dim=-1)

print("Label probs:", text_probs) 
```

It outputs the following:

```text
Label probs: tensor([[0.0020, 0.0034, 0.9946]])
```

If you want to load a specific OpenCLIP model, you can click `Use in OpenCLIP` in the model card and you will be given a working snippet!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/openclip_repo_light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/openclip_repo.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/openclip_snippet_light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/openclip_snippet.png"/>
</div>


## Additional resources

* OpenCLIP [repository](https://github.com/mlfoundations/open_clip)
* OpenCLIP [docs](https://github.com/mlfoundations/open_clip/tree/main/docs)
