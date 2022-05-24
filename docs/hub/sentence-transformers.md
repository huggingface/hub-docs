---
title: Sentence Transformers
---

# Using Sentence Transformers at Hugging Face

`sentence-transformers` is a library that provides easy methods to compute embeddings (dense vector representations) for sentences, paragraphs and images. Things are embedded in a vector space such that similar text is close, which enables applications such as semantic search, clustering, and retrieval. 

## Exploring sentence-transformers in the Hub

You can find over 500 hundred `sentence-transformer` models by filtering at the left of the [models page](https://huggingface.co/models?library=sentence-transformers&sort=downloads). Most of these models support different tasks, such as doing [`feature-extraction`](https://huggingface.co/models?library=sentence-transformers&pipeline_tag=feature-extraction&sort=downloads) to generate the embedding, and [`sentence-similarity`](https://huggingface.co/models?library=sentence-transformers&pipeline_tag=sentence-similarity&sort=downloads) as a way to determine how similar is a given sentence to other. You can also find an overview of the official pre-trained models in [the official docs](https://www.sbert.net/docs/pretrained_models.html).

All models on the Hub come up with useful features
1. An automatically generated model card with a description, example code snippets, architecture overview, and more. 
2. Metadata tags that help for discoverability and contain information such as license.
3. An interactive widget you can use to play out with the model directly in the browser.
4. An Inference API that allows to make inference requests.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_widget-dark.png"/>
</div>

## Using existing models

The pre-trained models on the Hub can be loaded with a single line of code

```py
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('model_name')
```

Here is an example that encodes sentences and then computes the distance between them for doing semantic search.

```py
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')

query_embedding = model.encode('How big is London')
passage_embedding = model.encode(['London has 9,787,426 inhabitants at the 2011 census',
                                  'London is known for its finacial district'])

print("Similarity:", util.dot_score(query_embedding, passage_embedding))
```

If you want to see how to load a specific model, you can click `Use in sentence-transformers` and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-sentence_transformers_snippet2-dark.png"/>
</div>

## Sharing your models

You can share your Sentence Transformers by using the `save_to_hub` method from a trained model.

```py
from sentence_transformers import SentenceTransformer

# Load or train a model
model.save_to_hub("my_new_model")
```

This command creates a repository with an automatically generated model card, an inference widget, example code snippets, and more! [Here](https://huggingface.co/osanseviero/my_new_model) is an example.

## Additional resources

* [Sentence Transformers](https://github.com/UKPLab/sentence-transformers) library.
* [Sentence Transformers](https://www.sbert.net/) docs.
* [Integration with Hub](https://huggingface.co/blog/sentence-transformers-in-the-hub) announcement.
