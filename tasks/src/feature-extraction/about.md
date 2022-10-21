## Use cases

### Sentence classification

For sentence classification, we’re only only interested in BERT’s output for the [CLS] token, so we get the sentence embedding using
`feature-extraction` pipeline which contain contextual knowledge of English language that can be used as input for Tree based classifiers like Random Forest, XGBoost, CatBoost.
(see https://towardsdatascience.com/feature-extraction-with-bert-for-text-classification-533dde44dc2f).


## Inference

You can infer with text data with the 🤗 Transformers library using the `feature-extraction` pipeline. This pipeline takes a string or a list of string input and generates features for each input. All models may be used for this pipeline (see a list of all models on https://huggingface.co/models).

```python
from transformers import pipeline
import numpy as np
import pandas as pd

feature_extraction = pipeline("feature-extraction")

# For single input
input_ = 'Hello world'
features = feature_extraction(input_)
features = np.squeeze(features,axis = 0)
features_df = pd.DataFrame(features)
print(features_df.shape)

# Output:
# (4, 768)

# For a list of inputs
input_list = ['Hello world','How are you?']
features_list = feature_extraction(input_list)

for index, features in enumerate(features_list):
    features = np.squeeze(features,axis = 0)
    features_df = pd.DataFrame(features)
    print(f'Shape of input: {input_list[index]} = {features_df.shape}')

# Output:
# Shape of input: Hello world = (4, 768)
# Shape of input: How are you? = (6, 768)
```
## Useful Resources
