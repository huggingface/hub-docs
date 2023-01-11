## About the Task

`Text2Text-generation` is about reframing all NLP tasks into a unified text-to-text-format where the input and output are always text strings, in contrast to BERT-style models that can only 
output either a class label or a span of the input.
The Hub contains over 8000 models for [text2text generation ](https://huggingface.co/models?pipeline_tag=text2text-generation&sort=downloads).

## Use Cases
It includes NLP tasks like 
- summarization 
- question answering 
- question generation
- translation
- paraphrasing etc.

## Inference

#### Question Answering

```python
task = 'text2text-generation'
checkpoint = 'google/flan-t5-base'
text2text_generator = pipeline(task,model= checkpoint)
print(text2text_generator("question: What is the capital of India? context: New Delhi is the capital of India"))
#[{'generated_text': 'New Delhi'}]
```
#### Language Translation

```python
task = 'text2text-generation'
checkpoint = 'google/flan-t5-base'
task_prefix = "translate English to German"
text2text_generator = pipeline(task,model= checkpoint)
print(text2text_generator(f"{task_prefix} New Delhi is the capital of India"))
#[{'generated_text': 'New Delhi ist das Hauptstadt der Indien.'}]
```

## Useful resources

- [T5-Base](https://huggingface.co/t5-base)
- [Question-answering](https://huggingface.co/docs/transformers/tasks/question_answering)
- [Translation](https://huggingface.co/docs/transformers/tasks/translation)




