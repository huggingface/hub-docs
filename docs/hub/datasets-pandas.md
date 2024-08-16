# Pandas

[Pandas](https://github.com/pandas-dev/pandas) is a widely used Python data analysis toolkit.
Since it uses [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths ([`hf://`](https://huggingface.co/docs/huggingface_hub/guides/hf_file_system#integrations)) to read and write data on the Hub:

First you need to [Login with your Hugging Face account](https://huggingface.co/docs/huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

Then you can [Create a dataset repository](https://huggingface.co/docs/huggingface_hub/quick-start#create-a-repository), for example using:

```python
from huggingface_hub import HfApi

HfApi().create_repo(repo_id="username/my_dataset", repo_type="dataset")
```

Finally, you can use [Hugging Face paths](https://huggingface.co/docs/huggingface_hub/guides/hf_file_system#integrations) in Pandas:

```python
import pandas as pd

df.to_parquet("hf://datasets/username/my_dataset/data.parquet")

# or write in separate files if the dataset has train/validation/test splits
df_train.to_parquet("hf://datasets/username/my_dataset/train.parquet")
df_valid.to_parquet("hf://datasets/username/my_dataset/validation.parquet")
df_test .to_parquet("hf://datasets/username/my_dataset/test.parquet")
```

This creates a dataset repository `username/my_dataset` containing your Pandas dataset in Parquet format.
You can reload it later:

```python
import pandas as pd

df = pd.read_parquet("hf://datasets/username/my_dataset/data.parquet")

# or read from separate files if the dataset has train/validation/test splits
df_train = pd.read_parquet("hf://datasets/username/my_dataset/train.parquet")
df_valid = pd.read_parquet("hf://datasets/username/my_dataset/validation.parquet")
df_test  = pd.read_parquet("hf://datasets/username/my_dataset/test.parquet")
```

To have more information on the Hugging Face paths and how they are implemented, please refer to the [the client library's documentation on the HfFileSystem](https://huggingface.co/docs/huggingface_hub/guides/hf_file_system).
