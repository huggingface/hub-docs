# Using mlx-image at Hugging Face

[`mlx-image`](https://github.com/riccardomusmeci/mlx-image) is an image models library developed by Riccardo Musmeci built on Apple [MLX](https://github.com/ml-explore/mlx). It tries to replicate the great [timm](https://github.com/huggingface/pytorch-image-models) from Ross Wightman, but for MLX models.


## Exploring mlx-image on the Hub

You can find `mlx-image` models by filtering using the `mlx-image` library name, like in [this query](https://huggingface.co/models?library=mlx-image&sort=trending).
There's also an open [mlx-vision](https://huggingface.co/mlx-vision) community for contributors converting and publishing weights for MLX format.

## Installation

```bash
pip install mlx-image
```

## Models

Model weights are available on the [`mlx-vision`](https://huggingface.co/mlx-vision) community on HuggingFace.

To load a model with pre-trained weights:
```python
from mlxim.model import create_model

# loading weights from HuggingFace (https://huggingface.co/mlx-vision/resnet18-mlxim)
model = create_model("resnet18") # pretrained weights loaded from HF

# loading weights from local file
model = create_model("resnet18", weights="path/to/resnet18/model.safetensors")
```

To list all available models:

```python
from mlxim.model import list_models
list_models()
```
> [!WARNING]
> As of today (2024-03-08) mlx does not support `group` param for nn.Conv2d. Therefore, architectures such as `resnext`, `regnet` or `efficientnet` are not yet supported in `mlx-image`.

## ImageNet-1K Results

Go to [results-imagenet-1k.csv](https://github.com/riccardomusmeci/mlx-image/blob/main/results/results-imagenet-1k.csv) to check every model converted to `mlx-image` and its performance on ImageNet-1K with different settings.

> **TL;DR** performance is comparable to the original models from PyTorch implementations.


## Similarity to PyTorch and other familiar tools

`mlx-image` tries to be as close as possible to PyTorch:
- `DataLoader` -> you can define your own `collate_fn` and also use `num_workers` to speed up data loading
- `Dataset` -> `mlx-image` already supports `LabelFolderDataset` (the good and old PyTorch `ImageFolder`) and `FolderDataset` (a generic folder with images in it)
- `ModelCheckpoint` -> keeps track of the best model and saves it to disk (similar to PyTorchLightning). It also suggests early stopping

## Training

Training is similar to PyTorch. Here's an example of how to train a model:

```python
import mlx.nn as nn
import mlx.optimizers as optim
from mlxim.model import create_model
from mlxim.data import LabelFolderDataset, DataLoader

train_dataset = LabelFolderDataset(
    root_dir="path/to/train",
    class_map={0: "class_0", 1: "class_1", 2: ["class_2", "class_3"]}
)
train_loader = DataLoader(
    dataset=train_dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4
)
model = create_model("resnet18") # pretrained weights loaded from HF
optimizer = optim.Adam(learning_rate=1e-3)

def train_step(model, inputs, targets):
    logits = model(inputs)
    loss = mx.mean(nn.losses.cross_entropy(logits, target))
    return loss

model.train()
for epoch in range(10):
    for batch in train_loader:
        x, target = batch
        train_step_fn = nn.value_and_grad(model, train_step)
        loss, grads = train_step_fn(x, target)
        optimizer.update(model, grads)
        mx.eval(model.state, optimizer.state)
```

## Additional Resources

* [mlx-image repository](https://github.com/riccardomusmeci/mlx-image)
* [mlx-vision community](https://huggingface.co/mlx-vision)

## Contact

If you have any questions, please email `riccardomusmeci92@gmail.com`.