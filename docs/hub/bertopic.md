# Using BERTopic at Hugging Face

[BERTopic](https://github.com/MaartenGr/BERTopic) BERTopic is a topic modeling framework that leverages 🤗 transformers and c-TF-IDF to create dense clusters allowing for easily interpretable topics whilst keeping important words in the topic descriptions. 


BERTopic supports all kinds of topic modeling techniques:  
<table>
  <tr>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/guided/guided.html">Guided</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/supervised/supervised.html">Supervised</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/semisupervised/semisupervised.html">Semi-supervised</a></td>
 </tr>
   <tr>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/manual/manual.html">Manual</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/distribution/distribution.html">Multi-topic distributions</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/hierarchicaltopics/hierarchicaltopics.html">Hierarchical</a></td>
 </tr>
 <tr>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/topicsperclass/topicsperclass.html">Class-based</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/topicsovertime/topicsovertime.html">Dynamic</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/online/online.html">Online/Incremental</a></td>
 </tr>
 <tr>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/multimodal/multimodal.html">Multimodal</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/multiaspect/multiaspect.html">Multi-aspect</a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/representation/llm.html">Text Generation/LLM</a></td>
 </tr>
 <tr>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/zeroshot/zeroshot.html">Zero-shot <b>(new!)</b></a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/merge/merge.html">Merge Models <b>(new!)</b></a></td>
    <td><a href="https://maartengr.github.io/BERTopic/getting_started/seed_words/seed_words.html">Seed Words <b>(new!)</b></a></td>
 </tr>
</table>

## Exploring BERTopioc on the Hub

You can find BERTopic models by filtering at the left of the [models page](https://huggingface.co/models?library=bertopic&sort=trending).

BERTopic models hosted on the Hub have a model card with useful information about the models. Thanks to BERTopic Hugging Face Hub integration, you can load BERTopic models with a few lines of code. You can also deploy these models using [Inference Endpoints](https://huggingface.co/inference-endpoints).


## Installation

To get started, you can follow the [BERTopic installation guide](https://github.com/MaartenGr/BERTopic#installation).
You can also use the following one-line install through pip:

```
$ pip install bertopic
```

## Using existing models

All BERTopic models can easily be loaded from the Hub:

```py
from bertopic import BERTopic
topic_model = BERTopic.load("MaartenGr/BERTopic_Wikipedia")
```

Once loaded, you can use BERTopic's features to predict the topics for new instances:


```py
topic, prob = topic_model.transform("This is an incredible movie!")
topic_model.topic_labels_[topic]
```

Which gives us the following topic:

```text
64_rating_rated_cinematography_film
```

## Additional resources

* BERTopic [repository](https://github.com/MaartenGr/BERTopic)
* BERTopic [docs](https://maartengr.github.io/BERTopic/)
* BERTopic [models in the Hub](https://huggingface.co/models?library=bertopic&sort=trending)
