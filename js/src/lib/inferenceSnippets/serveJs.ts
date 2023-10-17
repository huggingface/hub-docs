import type { PipelineType, ModelData } from "../interfaces/Types";
import { getModelInputSnippet } from "./inputs";

type ModelPartial = Pick<ModelData, 'id' | 'pipeline_tag' | 'widgetData'>;

export const snippetBasic = (model: ModelPartial, accessToken: string): string =>
	`async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/${model.id}",
		{
			headers: { Authorization: "Bearer ${accessToken || `{API_TOKEN}`}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": ${getModelInputSnippet(model)}}).then((response) => {
	console.log(JSON.stringify(response));
});`;

export const snippetZeroShotClassification = (model: ModelPartial, accessToken: string): string =>
	`async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/${model.id}",
		{
			headers: { Authorization: "Bearer ${accessToken || `{API_TOKEN}`}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": ${getModelInputSnippet(
		model
	)}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}).then((response) => {
	console.log(JSON.stringify(response));
});`;

export const snippetTextToImage = (model: ModelPartial, accessToken: string): string =>
	`async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/${model.id}",
		{
			headers: { Authorization: "Bearer ${accessToken || `{API_TOKEN}`}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
query({"inputs": ${getModelInputSnippet(model)}}).then((response) => {
	// Use image
});`;

export const snippetFile = (model: ModelPartial, accessToken: string): string =>
	`async function query(filename) {
	const data = fs.readFileSync(filename);
	const response = await fetch(
		"https://api-inference.huggingface.co/models/${model.id}",
		{
			headers: { Authorization: "Bearer ${accessToken || `{API_TOKEN}`}" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}

query(${getModelInputSnippet(model)}).then((response) => {
	console.log(JSON.stringify(response));
});`;

export const jsSnippets: Partial<Record<PipelineType, (model: ModelPartial, accessToken: string) => string>> = {
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

export function getJsInferenceSnippet(model: ModelPartial, accessToken: string): string {
	return model.pipeline_tag && model.pipeline_tag in jsSnippets
		? jsSnippets[model.pipeline_tag]?.(model, accessToken) ?? ""
		: "";
}

export function hasJsInferenceSnippet(model: ModelPartial): boolean {
	return !!model.pipeline_tag && model.pipeline_tag in jsSnippets;
}
