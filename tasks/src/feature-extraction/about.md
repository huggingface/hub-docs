## Use Cases

Feature extraction is the task of extracting meaningful data from the given dataset. It is instrumental in reducing redundant/garbage data. Feature extraction is one of the most trivial steps in machine learning and is used heavily in NLP. In simple terms, Feature Extraction is transforming textual data into numerical data.
 
## Task Variants 
The task of feature extraction can be divided into three different variants:

### Countvectorizer 
CountVectorizer is a feature extraction technique that converts a collection of text documents to a vector of term/token counts. It is also known as the bag-of-words model. This model is widely used in text mining and information retrieval. 
### TF-IDF Vectorizer
TF-IDF stands for Term Frequency-Inverse Document Frequency. It is a numerical statistic that echoes a word's importance to a document in a corpus. In order to account for the fact that some words are used more frequently than others, the TF-IDF value rises according to the number of times a word occurs in the text and is offset by the number of documents in the corpus that contain the term.

### Word Embeddings
Word embeddings are a type of word representation that allows words with similar meanings to have an equivalent representation. Each word is transformed into a real-valued vector in a lower-dimensional space. Word embedding preserves contexts and relationships of words so that it detects similar words more accurately.


## Inference

You can infer with feature extraction through the 🤗 Transformers library using the [`feature-extraction`](https://huggingface.co/docs/transformers/en/main_classes/pipelines#transformers.FeatureExtractionPipeline) pipeline. The pipeline returns a list of feature vectors, one for each input text.

```python

#importing the library 
import numpy as np
from transformers import pipeline


#creating a pipeline for feature extraction and passing the model name
features = pipeline("feature-extraction",model="bert-base-cased")

#passing the input text
input_ = "Ayush is here"

#extracting the features
input_features = features(input_)


#converting the features into numpy array
np_features = np.array(input_features)
np_features = np.squeeze(np_features)


#printing the shape of the features
print(np_features.shape)

#output
(7, 768)

```

## Useful Resources

Want to learn more about feature extraction? Here are some resources to get you started:

- [Feature Extraction](https://www.analyticsvidhya.com/blog/2021/07/feature-extraction-and-embeddings-in-nlp-a-beginners-guide-to-understand-natural-language-processing/)

- [Getting sentence embeddings](https://stackoverflow.com/questions/64685243/getting-sentence-embedding-from-huggingface-feature-extraction-pipeline)

- [Hugging face Transformers Pipeline](https://www.analyticsvidhya.com/blog/2022/01/hugging-face-transformers-pipeline-functions-advanced-nlp/)

