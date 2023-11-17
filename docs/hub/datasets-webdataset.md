# WebDataset

[WebDataset](https://github.com/webdataset/webdataset) is a library to write I/O pipelines for large datasets. 
Since it supports streaming data using HTTP, you can use the Hugging Face data files URLs to stream a dataset in WebDataset format:

First you need to [Login with your Hugging Face account](../huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

And then you can stream Hugging Face datasets in WebDataset:

```python
>>> import webdataset as wds
>>> from huggingface_hub import HfFolder

>>> hf_token = HfFolder().get_token()
>>> dataset = wds.WebDataset(f"pipe:curl -s -L https://huggingface.co/datasets/username/my_wds_dataset/resolve/main/train-000000.tar -H 'Authorization:Bearer {hf_token}'")
```
