## Use Cases

### Chatbot 💬

Chatbots are used to have conversations instead of providing direct contact with a live human. They are used to provide customer service, sales, and can even be used to play games (see [ELIZA](https://en.wikipedia.org/wiki/ELIZA) from 1966 for one of the earliest examples). 

## Voice Assistants 🎙️

Conversational response models are used as part of voice assistants to provide appropriate responses to voice based queries. 

## Task Variants

This place can be filled with variants of this task if there's any. 

## Inference

You can infer with Conversational models with the 🤗 Transformers library using the `conversational` pipeline. This pipeline takes a conversation prompt or a list of conversations and generates responses for each prompt. The models that this pipeline can use are models that have been fine-tuned on a multi-turn conversational task (see https://huggingface.co/models?filter=conversational for a list of updated Conversational models). 

```python
from transformers import pipeline, Conversation
converse = pipeline("conversational")

conversation_1 = Conversation("Going to the movies tonight - any suggestions?")
conversation_2 = Conversation("What's the last book you have read?")
converse([conversation_1, conversation_2])

## Output:
## Conversation 1
## user >> Going to the movies tonight - any suggestions? 
## bot >> The Big Lebowski ,
## Conversation 2
## user >> What's the last book you have read? 
## bot >> The Last Question
```

## Useful Resources

In this area, you can insert useful resources about how to train or use a model for this task.