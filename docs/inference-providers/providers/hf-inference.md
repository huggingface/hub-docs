<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to hf-inference's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/hf-inference.handlebars`.

### Logos

If you want to update hf-inference's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `hf-inference-light.png` and `hf-inference-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# HF Inference

<div class="flex justify-center">
    <a href="https://huggingface.co/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hf-inference-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hf-inference-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/hf-inference" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

HF Inference is the serverless Inference API powered by Hugging Face. This service used to be called "Inference API (serverless)" prior to Inference Providers.
If you are interested in deploying models to a dedicated and autoscaling infrastructure managed by Hugging Face, check out [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) instead.

## Supported tasks


### Audio Classification

Find out more about Audio Classification [here](../tasks/audio_classification).

<InferenceSnippet
    pipeline=audio-classification
    providersMapping={ {"hf-inference":{"modelId":"ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition","providerModelId":"ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"} } }
/>


### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic_speech_recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"hf-inference":{"modelId":"openai/whisper-large-v3-turbo","providerModelId":"openai/whisper-large-v3-turbo"} } }
/>


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hf-inference":{"modelId":"Qwen/Qwen3-235B-A22B","providerModelId":"Qwen/Qwen3-235B-A22B"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"hf-inference":{"modelId":"meta-llama/Llama-3.2-11B-Vision-Instruct","providerModelId":"meta-llama/Llama-3.2-11B-Vision-Instruct"} } }
conversational />


### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature_extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"hf-inference":{"modelId":"intfloat/multilingual-e5-large","providerModelId":"intfloat/multilingual-e5-large"} } }
/>


### Fill Mask

Find out more about Fill Mask [here](../tasks/fill_mask).

<InferenceSnippet
    pipeline=fill-mask
    providersMapping={ {"hf-inference":{"modelId":"google-bert/bert-base-uncased","providerModelId":"google-bert/bert-base-uncased"} } }
/>


### Image Classification

Find out more about Image Classification [here](../tasks/image_classification).

<InferenceSnippet
    pipeline=image-classification
    providersMapping={ {"hf-inference":{"modelId":"Falconsai/nsfw_image_detection","providerModelId":"Falconsai/nsfw_image_detection"} } }
/>


### Image Segmentation

Find out more about Image Segmentation [here](../tasks/image_segmentation).

<InferenceSnippet
    pipeline=image-segmentation
    providersMapping={ {"hf-inference":{"modelId":"mattmdjaga/segformer_b2_clothes","providerModelId":"mattmdjaga/segformer_b2_clothes"} } }
/>


### Question Answering

Find out more about Question Answering [here](../tasks/question_answering).

<InferenceSnippet
    pipeline=question-answering
    providersMapping={ {"hf-inference":{"modelId":"deepset/roberta-base-squad2","providerModelId":"deepset/roberta-base-squad2"} } }
/>


### Summarization

Find out more about Summarization [here](../tasks/summarization).

<InferenceSnippet
    pipeline=summarization
    providersMapping={ {"hf-inference":{"modelId":"facebook/bart-large-cnn","providerModelId":"facebook/bart-large-cnn"} } }
/>


### Table Question Answering

Find out more about Table Question Answering [here](../tasks/table_question_answering).

<InferenceSnippet
    pipeline=table-question-answering
    providersMapping={ {"hf-inference":{"modelId":"google/tapas-base-finetuned-wtq","providerModelId":"google/tapas-base-finetuned-wtq"} } }
/>


### Text Classification

Find out more about Text Classification [here](../tasks/text_classification).

<InferenceSnippet
    pipeline=text-classification
    providersMapping={ {"hf-inference":{"modelId":"NousResearch/Minos-v1","providerModelId":"NousResearch/Minos-v1"} } }
/>


### Text Generation

Find out more about Text Generation [here](../tasks/text_generation).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hf-inference":{"modelId":"Qwen/Qwen3-235B-A22B","providerModelId":"Qwen/Qwen3-235B-A22B"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"hf-inference":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/FLUX.1-dev"} } }
/>


### Token Classification

Find out more about Token Classification [here](../tasks/token_classification).

<InferenceSnippet
    pipeline=token-classification
    providersMapping={ {"hf-inference":{"modelId":"blaze999/Medical-NER","providerModelId":"blaze999/Medical-NER"} } }
/>


### Translation

Find out more about Translation [here](../tasks/translation).

<InferenceSnippet
    pipeline=translation
    providersMapping={ {"hf-inference":{"modelId":"google-t5/t5-base","providerModelId":"google-t5/t5-base"} } }
/>


### Zero Shot Classification

Find out more about Zero Shot Classification [here](../tasks/zero_shot_classification).

<InferenceSnippet
    pipeline=zero-shot-classification
    providersMapping={ {"hf-inference":{"modelId":"facebook/bart-large-mnli","providerModelId":"facebook/bart-large-mnli"} } }
/>

