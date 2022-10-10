## Use Cases

###  Human Level understanding of Text

In pretrained language models like BERT , model is to finetuned according to the kind of task we want our model do to like sentimental analysis by providing a proper dataset for specific task . But us humans can tell wether a news article is postive or negative , related to science or politics without fine-tuning it . Similar to that a trained Zero Shot Model aims to perform any general task on a language

## Task Variants 

### Latent Embedding

A word embedding is a learned representation for text where words that have the same meaning have a similar representation. individual words are represented as real-valued vectors in a predefined vector space. 

So if we are given a sentence we can convert all it's words as embedding vector and take a mean of all the vectors to get a representation of sentence and given the labels like ['postive' , 'negative' , 'politics' , 'science' ] on which we want to classify and run them to the simailar text encoder like BERT

By defining a similarity parameter we can see the similarity between embedding of our sentence and that of labels and return the label with most similarity

In this way we can eaisly classify sentences without training the model

#### Inference

We can use pretrained BERT model from 

```python
from transformers import pipeline

encoder = pipeline("feature-extraction" , model = "deepset/sentence_bert")

sentence = "Artificial Science will revolutnize the world"
labels = ['postive' , 'negative' , 'politics' , 'science' ]

#Mean Pooling across sentence
sentence_vector = np.array(encoder(sentence).mean(axis=1))
label_vector = [np.array(encoder(l).mean(axis=1)) for l in labels]

from scipy import spatial
#Using cosine similarity between sentence vector and label vector
dist = [spatial.distance.cosine(sentence_vector , lv) for lv in label_vector]

print(labels[np.argmin(dist)])

```
## Natural Language Inference (NLI)

In NLI the model determines the relationship between two given texts. Concretely, the model takes a premise and a hypothesis and returns a class that can either be:

- **entailment**, which means the hypothesis is true.
- **contraction**, which means the hypothesis is false.
- **neutral**, which means there's no relation between the hypothesis and the premise.

Hugging face has implemented a Zero-Shot Classification pipeline which travels a slightly different route . It uses Natural Language Inference models to carry out classification by a bit of creative prompt engineering

#### Inference

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification" , model="facebook/bart-large-mnli")

sentence = "Artificial Science will revolutnize the world"
labels = ['postive' , 'negative' , 'politics' , 'science' ]

classifier(sentence , labels)
```


## Useful Resources

Would you like to learn more about the topic? Awesome! Here you can find some curated resources that you may find helpful!

- [Github Repositery contaning all important papers , datasets and other resource in ZSL](https://github.com/sbharadwajj/awesome-zero-shot-learning)
- [Pytorch Implementation](https://github.com/edgarschnfld/CADA-VAE-PyTorch)