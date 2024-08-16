# Using 🤗 Datasets

Once you've found an interesting dataset on the Hugging Face Hub, you can load the dataset using 🤗 Datasets. You can click on the [**Use in dataset library** button](https://huggingface.co/datasets/samsum?library=true) to copy the code to load a dataset.

First you need to [Login with your Hugging Face account](https://huggingface.co/docs/huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

And then you can load a dataset from the Hugging Face Hub using

```python
from datasets import load_dataset

dataset = load_dataset("username/my_dataset")

# or load the separate splits if the dataset has train/validation/test splits
train_dataset = load_dataset("username/my_dataset", split="train")
valid_dataset = load_dataset("username/my_dataset", split="validation")
test_dataset  = load_dataset("username/my_dataset", split="test")
```

You can also upload datasets to the Hugging Face Hub:

```python
my_new_dataset.push_to_hub("username/my_new_dataset")
```

This creates a dataset repository `username/my_new_dataset` containing your Dataset in Parquet format, that you can reload later.

For more information about using 🤗 Datasets, check out the [tutorials](https://huggingface.co/docs/datasets/tutorial) and [how-to guides](https://huggingface.co/docs/datasets/how_to) available in the 🤗 Datasets documentation.
