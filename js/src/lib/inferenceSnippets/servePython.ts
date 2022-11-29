import type { PipelineType, ModelData } from "../interfaces/Types";
import { getModelInputSnippet } from "./inputs";

export const snippetZeroShotClassification = (model: ModelData): string =>
	`def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
    "inputs": ${getModelInputSnippet(model)},
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
})`;

export const snippetBasic = (model: ModelData): string =>
	`def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": ${getModelInputSnippet(model)},
})`;

export const snippetFile = (model: ModelData): string =>
	`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))

output = query(${getModelInputSnippet(model)})`;

export const pythonSnippets:
	Partial<Record<PipelineType, (model: ModelData) => string>> =
{
	// Same order as in js/src/lib/interfaces/Types.ts
	"image-classification":         snippetFile,
	"translation":                  snippetBasic,
	"image-segmentation":           snippetFile,
	"fill-mask":                    snippetBasic,
	"automatic-speech-recognition": snippetFile,
	"token-classification":         snippetBasic,
	"sentence-similarity":          snippetBasic,
	"audio-classification":         snippetFile,
	"question-answering":           snippetBasic,
	"summarization":                snippetBasic,
	"zero-shot-classification":     snippetZeroShotClassification,
	"feature-extraction":           snippetBasic,
	"text-classification":          snippetBasic,
	"text2text-generation":         snippetBasic,
	"text-to-speech":               snippetBasic,
	"object-detection":             snippetFile,
	"audio-to-audio":               snippetFile,
	"text-generation":              snippetBasic,
	"conversational":               snippetBasic,
	"table-question-answering":     snippetBasic,	
};

export function getPythonInferenceSnippet(model: ModelData, accessToken: string): string {
	const body = model.pipeline_tag && model.pipeline_tag in pythonSnippets
		? pythonSnippets[model.pipeline_tag]?.(model) ?? ""
		: "";

	return `import requests

API_URL = "https://api-inference.huggingface.co/models/${model.id}"
headers = {"Authorization": ${accessToken ? `"Bearer ${accessToken}"` : `f"Bearer {API_TOKEN}"`}}

${body}`;
}

export function hasPythonInferenceSnippet(model: ModelData): boolean {
	return !!model.pipeline_tag && model.pipeline_tag in pythonSnippets;
}
