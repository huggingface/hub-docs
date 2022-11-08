# Use cases

## Sentence classification

For sentence classification, we are interested in BERT’s hidden layer output (embeddings), so we get the sentence embedding using
`feature-extraction` pipeline which contain contextual knowledge of English language that can be used as input for Tree based classifiers like Random Forest, XGBoost, CatBoost. 
(see https://towardsdatascience.com/feature-extraction-with-bert-for-text-classification-533dde44dc2f).

This guide will show you how to train a Random Forest classifier over the feature extraction pipeline.

We would be using basic libraries like Pandas, Numpy and Sklearn for performing modeling over the features extracted (embeddings)
```python
import numpy as np
import pandas as pd
from transformers import pipeline, AutoTokenizer
from sklearn import datasets
from sklearn.model_selection import train_test_split
from tqdm import tqdm
from sklearn.ensemble import RandomForestClassifier
```

Using the Huggingface pipeline for feature extraction

```python
feature_extraction = pipeline("feature-extraction")
```

Taking top 100 rows from Newsgroup classification data from Sklearn

```python
dataset =  datasets.fetch_20newsgroups()
X = dataset.data[:100]
y = dataset.target[:100]
```
This function creates a sparse embedding for each token present in the sentence. Please remember to use the same tokenizer that you would be using while calling the `feature-extraction` pipeline. As the default, BERT tokenizer used in the pipeline is bert-base-cased, so we use the same for initializing the dataframe with number of columns equal to vocabulary size of the tokenizer. We are using a dataframe within the function for ease of understanding, and it returns an `np.array` of size `(n_samples,vocab_size)`.

```python
def get_features(X,feature_extraction):

    # Initializing the input dataframe
    tokenizer = AutoTokenizer.from_pretrained('bert-base-cased')
    df = pd.DataFrame(columns = sorted(tokenizer.vocab.values()))

    # Looping over the input data
    for i in tqdm(X):
        tokenized_input = tokenizer(i)

        # Getting embeddings for each token
        features = feature_extraction(input_)
        features = np.squeeze(features,axis = 0)

        # Calculating mean of embeddings for each token over 768 embedding values
        features = np.mean(features,axis = 1)

        # Mapping token embeddings to their specific column in the data-frame
        features_dict = dict(zip(tokenized_input['input_ids'],features))
        df = df.append(features_dict, ignore_index=True)

    # Filling NaN values with 0
    df = df.fillna(0)
    return df.values
```
Below we perform a 80:20 train-test split for modeling

```python
X_features = get_features(X,feature_extraction)
X_train, X_test, y_train, y_test = train_test_split(X_features, y,stratify = y, test_size=0.2, random_state=42)
```

Performing Multi-class classification using sklearn Random Forest

```python
model = RandomForestClassifier(random_state=42)
model.fit(X_train,y_train)
y_pred = model.predict(X_test)
print(f'Test Accuracy is {accuracy_score(y_test,y_pred)*100} %')

# Output:
# Test Accuracy is 95.0 %
```
This exercise shows the potential of using embeddings as input to a classifier. For an imbalanced dataset, we can use performance metrics like F1-score and ROC AUC.


# Task Variants

## Inference

This pipeline extracts the hidden states from the base transformer, which can be used as features in downstream tasks. You can infer the text data with the 🤗 Transformers library using the `feature-extraction` pipeline. This pipeline takes a string or a list of string input and generates features for each input. All models may be used for this pipeline (see a list of all models on https://huggingface.co/models).

The output generated for a single input is a shape of a dataframe, which contains 768 embeddings for each token. See the use-case above, where we calculate mean of these embeddings and use them as input to a classifier.

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

https://huggingface.co/docs/transformers/v4.24.0/en/main_classes/pipelines#transformers.FeatureExtractionPipeline

https://huggingface.co/docs/transformers/tasks/token_classification