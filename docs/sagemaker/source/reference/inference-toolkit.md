# Inference Toolkit API

> [!WARNING]
> The SageMaker Hugging Face Inference Toolkit is in maintenance mode and will be deprecated. For new deployments, prefer the engine-based DLCs — [vLLM, SGLang, TEI, or llama.cpp](../get-started/dlcs) — which offer better performance and active development. [hf-serve](https://github.com/huggingface/hf-serve) is the experimental successor.

The [SageMaker Hugging Face Inference Toolkit](https://github.com/aws/sagemaker-huggingface-inference-toolkit) is the zero-code serving layer inside the Hugging Face PyTorch inference DLC. It loads a model from the Hub — or from your own `model.tar.gz` — and serves it through a 🤗 Transformers [`pipeline`](https://huggingface.co/docs/transformers/main_classes/pipelines), so you can deploy without writing any serving code. See [Deploy models with the SageMaker SDK](../tutorials/sagemaker-sdk/deploy-sagemaker-sdk) for the deployment flow.

Requests take the model input in the `inputs` key and optional `pipeline` parameters in the `parameters` key. You can provide any of the supported `kwargs` from `pipelines` as `parameters`.

## Supported tasks

- **`text-classification`**
- **`sentiment-analysis`**
- **`token-classification`**
- **`feature-extraction`**
- **`fill-mask`**
- **`summarization`**
- **`translation_xx_to_yy`**
- **`text2text-generation`**
- **`text-generation`**
- **`audio-classification`**
- **`automatic-speech-recognition`**
- **`conversational`**
- **`image-classification`**
- **`image-segmentation`**
- **`object-detection`**
- **`table-question-answering`**
- **`zero-shot-classification`**
- **`zero-shot-image-classification`**

## Request examples

**`text-classification`**

```json
{
  "inputs": "The documentation was clear and the deployment worked on the first try."
}
```

**`question-answering`**

```json
{
  "inputs": {
    "question": "Where is the model served?",
    "context": "The model is served on a SageMaker endpoint inside your AWS account."
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

**Parameterized request** (any `pipeline` kwargs go in `parameters`):

```json
{
  "inputs": "Hugging Face makes open-source AI tools and hosts a large catalog of models and datasets.",
  "parameters": {
    "repetition_penalty": 4.0,
    "length_penalty": 1.5
  }
}
```

## Environment variables

The Inference Toolkit reads Hugging Face specific environment variables at deploy time:

**`HF_TASK`**

`HF_TASK` defines the task for the 🤗 Transformers `pipeline`. See [here](https://huggingface.co/docs/transformers/main_classes/pipelines) for a complete list of tasks.

```bash
HF_TASK="question-answering"
```

**`HF_MODEL_ID`**

`HF_MODEL_ID` defines the model ID which is automatically loaded from [hf.co/models](https://huggingface.co/models) when creating a SageMaker endpoint. Any public model on the Hub can be loaded this way.

```bash
HF_MODEL_ID="cardiffnlp/twitter-roberta-base-sentiment-latest"
```

**`HF_MODEL_REVISION`**

`HF_MODEL_REVISION` is an extension to `HF_MODEL_ID` and allows you to define or pin a model revision to make sure you always load the same model on your SageMaker endpoint.

```bash
HF_MODEL_REVISION="03b4d196c19d0a73c7e0322684e97db1ec397613"
```

**`HF_API_TOKEN`**

`HF_API_TOKEN` defines your Hugging Face authorization token. The `HF_API_TOKEN` is used as a HTTP bearer authorization for remote files like private models. You can find your token under [Settings](https://huggingface.co/settings/tokens) of your Hugging Face account.

```bash
HF_API_TOKEN="hf_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```
