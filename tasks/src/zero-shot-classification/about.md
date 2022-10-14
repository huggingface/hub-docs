## Use Cases

###  Human Level understanding of Text

In pretrained language models like BERT , model is to finetuned according to the kind of task we want our model do to like sentimental analysis by providing a proper dataset for specific task . But us humans can tell wether a news article is postive or negative , related to science or politics without fine-tuning it . Similar to that a trained Zero Shot Model aims to perform any general task on a language

## Task Variants 

### Latent Embedding

A word embedding is a learned representation of a text where words with similar meanings have similar representations. individual words are represented as real-valued vectors in a predefined vector space. 

If we are given a sentence, we can convert all of its words as embedding vectors and take a mean of all the vectors to get a representation of sentence . We can encode this vector using a text encoder like BERT in our embedding space . Now we can classify our sentence on one of the labels like ['sports'  , 'politics' , 'science' ] 

By defining a similarity parameter, we can see the similarity between embedding of our sentence and the embeddings of the labels, and return the label that is most similar to the sentence.

This way, we can easily classify sentences without training a separate model.

#### Inference

We can use pre-trained BERT model to create the embeddings, as follows:

```python
from transformers import pipeline

pipe = pipeline("feature-extraction" , model = "deepset/sentence_bert")

sentence = "Jupiter is the largest planet in our solar system."
labels = ['sports' , 'politics' , 'science' ]

#Mean Pooling across sentence
sentence_vector = np.array(pipe(sentence).mean(axis=1))
label_vector = [np.array(pipe(l).mean(axis=1)) for l in labels]

from scipy import spatial
#Using cosine similarity between sentence vector and label vector
dist = [spatial.distance.cosine(sentence_vector , lv) for lv in label_vector]

print(labels[np.argmin(dist)])

```
## Natural Language Inference (NLI)

In natural language inference, the model determines the relationship between two given texts. Concretely, the model takes a premise (context given in a sentence) and a hypothesis (inference one can draw from given premise) and returns a class that can either be:

- **entailment**, which means the hypothesis is true.
- **contraction**, which means the hypothesis is false.
- **neutral**, which means there's no relation between the hypothesis and the premise.

The implementation of `zero-shot-classification` pipeline of Hugging Face is different. It uses Natural Language Inference models to carry out classification by a bit of creative prompt engineering.

#### Inference

```python
from transformers import pipeline

pipe = pipeline("zero-shot-classification" , model="facebook/bart-large-mnli")

sentence = "Jupiter is the largest planet in our solar system."
labels = ['sports' , 'politics' , 'science' ]

pipe(sentence , labels)
```


## Useful Resources

Would you like to learn more about the topic? Awesome! Here you can find some curated resources that you may find helpful!

- [A GitHub repository that contains important papers, datasets and more about zero-shot classification](https://github.com/sbharadwajj/awesome-zero-shot-learning)
- [Pytorch Implementation](https://github.com/edgarschnfld/CADA-VAE-PyTorch)