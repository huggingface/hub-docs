# Inference Toolkit API

## Supported tasks

The [Sagemaker Hugging Face Inference Toolkit](https://github.com/aws/sagemaker-huggingface-inference-toolkit/tree/main) accepts inputs in the `inputs` key, and supports additional [`pipelines`](https://huggingface.co/docs/transformers/main_classes/pipelines) parameters in the `parameters` key. You can provide any of the supported `kwargs` from `pipelines` as `parameters`.

Tasks supported by the Inference Toolkit API include:

- **`text-classification`**
- **`sentiment-analysis`**
- **`token-classification`**
- **`feature-extraction`**
- **`fill-mask`**
- **`summarization`**
- **`translation_xx_to_yy`**
- **`text2text-generation`**
- **`text-generation`**
- **`audio-classificatin`**
- **`automatic-speech-recognition`**
- **`conversational`**
- **`image-classification`**
- **`image-segmentation`**
- **`object-detection`**
- **`table-question-answering`**
- **`zero-shot-classification`**
- **`zero-shot-image-classification`**


See the following request examples for some of the tasks:

**`text-classification`**

```json
{
  "inputs": "This sound track was beautiful! It paints the senery in your mind so well I would recommend it
  even to people who hate vid. game music!"
}
```

**`sentiment-analysis`**

```json
{
  "inputs": "Don't waste your time.  We had two different people come to our house to give us estimates for
a deck (one of them the OWNER).  Both times, we never heard from them.  Not a call, not the estimate, nothing."
}
```

**`token-classification`**

```json
{
  "inputs": "My name is Sylvain and I work at Hugging Face in Brooklyn."
}
```

**`question-answering`**

```json
{
  "inputs": {
    "question": "What is used for inference?",
    "context": "My Name is Philipp and I live in Nuremberg. This model is used with sagemaker for inference."
  }
}
```

**`zero-shot-classification`**

```json
{
  "inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
  "parameters": {
    "candidate_labels": ["refund", "legal", "faq"]
  }
}
```

**`table-question-answering`**

```json
{
  "inputs": {
    "query": "How many stars does the transformers repository have?",
    "table": {
      "Repository": ["Transformers", "Datasets", "Tokenizers"],
      "Stars": ["36542", "4512", "3934"],
      "Contributors": ["651", "77", "34"],
      "Programming language": ["Python", "Python", "Rust, Python and NodeJS"]
    }
  }
}
```

**`parameterized-request`**

```json
{
  "inputs": "Hugging Face, the winner of VentureBeat’s Innovation in Natural Language Process/Understanding Award for 2021, is looking to level the playing field. The team, launched by Clément Delangue and Julien Chaumond in 2016, was recognized for its work in democratizing NLP, the global market value for which is expected to hit $35.1 billion by 2026. This week, Google’s former head of Ethical AI Margaret Mitchell joined the team.",
  "parameters": {
    "repetition_penalty": 4.0,
    "length_penalty": 1.5
  }
}
```

## Environment variables

The Inference Toolkit implements various additional environment variables to simplify deployment. A complete list of Hugging Face specific environment variables is shown below:

**`HF_TASK`**

`HF_TASK` defines the task for the 🤗 Transformers pipeline used . See [here](https://huggingface.co/docs/transformers/main_classes/pipelines) for a complete list of tasks.

```bash
HF_TASK="question-answering"
```

**`HF_MODEL_ID`**

`HF_MODEL_ID` defines the model ID which is automatically loaded from [hf.co/models](https://huggingface.co/models) when creating a SageMaker endpoint. All of the 🤗 Hub's 10,000+ models are available through this environment variable.

```bash
HF_MODEL_ID="distilbert-base-uncased-finetuned-sst-2-english"
```

**`HF_MODEL_REVISION`**

`HF_MODEL_REVISION` is an extension to `HF_MODEL_ID` and allows you to define or pin a model revision to make sure you always load the same model on your SageMaker endpoint.

```bash
HF_MODEL_REVISION="03b4d196c19d0a73c7e0322684e97db1ec397613"
```

**`HF_API_TOKEN`**

`HF_API_TOKEN` defines your Hugging Face authorization token. The `HF_API_TOKEN` is used as a HTTP bearer authorization for remote files like private models. You can find your token under [Settings](https://huggingface.co/settings/tokens) of your Hugging Face account.

```bash
HF_API_TOKEN="api_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```
