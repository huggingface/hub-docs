# WebDataset

[WebDataset](https://github.com/webdataset/webdataset) is a library to write I/O pipelines for large datasets. 
Since it supports streaming data using HTTP, you can use the Hugging Face data files URLs to stream a dataset in WebDataset format:

First you need to [Login with your Hugging Face account](../huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

And then you can stream Hugging Face datasets in WebDataset. Here is an example of how to load [timm/imagenet-12k-wds](https://huggingface.co/datasets/timm/imagenet-12k-wds):

```python
>>> import webdataset as wds
>>> from huggingface_hub import get_token

>>> hf_token = get_token()
>>> dataset = wds.WebDataset(f"pipe:curl -s -L https://huggingface.co/datasets/timm/imagenet-12k-wds/resolve/main/imagenet12k-train-{{0000..1023}}.tar -H 'Authorization:Bearer {hf_token}'")
```
