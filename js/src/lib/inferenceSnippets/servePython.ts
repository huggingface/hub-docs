import type { PipelineType, ModelData } from "../interfaces/Types";
import { getModelInputSnippet } from "./inputs";

type ModelPartial = Pick<ModelData, 'id' | 'pipeline_tag' | 'mask_token' | 'widgetData'>;

export const snippetZeroShotClassification = (model: ModelPartial): string =>
	`def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
    "inputs": ${getModelInputSnippet(model)},
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
})`;

export const snippetBasic = (model: ModelPartial): string =>
	`def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": ${getModelInputSnippet(model)},
})`;

export const snippetFile = (model: ModelPartial): string =>
	`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

output = query(${getModelInputSnippet(model)})`;

export const snippetTextToImage = (model: ModelPartial): string =>
	`def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content
image_bytes = query({
	"inputs": ${getModelInputSnippet(model)},
})
# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))`;

export const pythonSnippets: Partial<Record<PipelineType, (model: ModelPartial) => string>> = {
	// Same order as in js/src/lib/interfaces/Types.ts
	"text-classification":          snippetBasic,
	"token-classification":         snippetBasic,
	"table-question-answering":     snippetBasic,
	"question-answering":           snippetBasic,
	"zero-shot-classification":     snippetZeroShotClassification,
	"translation":                  snippetBasic,
	"summarization":                snippetBasic,
	"conversational":               snippetBasic,
	"feature-extraction":           snippetBasic,
	"text-generation":              snippetBasic,
	"text2text-generation":         snippetBasic,
	"fill-mask":                    snippetBasic,
	"sentence-similarity":          snippetBasic,
	"automatic-speech-recognition": snippetFile,
	"text-to-image":                snippetTextToImage,
	"text-to-speech":               snippetBasic,
	"audio-to-audio":               snippetFile,
	"audio-classification":         snippetFile,
	"image-classification":         snippetFile,
	"image-to-text":                snippetFile,
	"object-detection":             snippetFile,
	"image-segmentation":           snippetFile,
};

export function getPythonInferenceSnippet(model: ModelPartial, accessToken: string): string {
	const body =
		model.pipeline_tag && model.pipeline_tag in pythonSnippets ? pythonSnippets[model.pipeline_tag]?.(model) ?? "" : "";

	return `import requests

API_URL = "https://api-inference.huggingface.co/models/${model.id}"
headers = {"Authorization": ${accessToken ? `"Bearer ${accessToken}"` : `f"Bearer {API_TOKEN}"`}}

${body}`;
}

export function hasPythonInferenceSnippet(model: ModelPartial): boolean {
	return !!model.pipeline_tag && model.pipeline_tag in pythonSnippets;
}
