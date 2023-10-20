import type { PipelineType, ModelData } from "../interfaces/Types";
import { getModelInputSnippet } from "./inputs";

type ModelPartial =  Pick<ModelData, 'id' | 'pipeline_tag' | 'mask_token' | 'widgetData'>;

export const snippetBasic = (model: ModelPartial, accessToken: string): string =>
	`curl https://api-inference.huggingface.co/models/${model.id} \\
	-X POST \\
	-d '{"inputs": ${getModelInputSnippet(model, true)}}' \\
	-H 'Content-Type: application/json' \\
	-H "Authorization: Bearer ${accessToken || `{API_TOKEN}`}"
`;

export const snippetZeroShotClassification = (model: ModelPartial, accessToken: string): string =>
	`curl https://api-inference.huggingface.co/models/${model.id} \\
	-X POST \\
	-d '{"inputs": ${getModelInputSnippet(model, true)}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \\
	-H 'Content-Type: application/json' \\
	-H "Authorization: Bearer ${accessToken || `{API_TOKEN}`}"
`;

export const snippetFile = (model: ModelPartial, accessToken: string): string =>
	`curl https://api-inference.huggingface.co/models/${model.id} \\
	-X POST \\
	--data-binary '@${getModelInputSnippet(model, true, true)}' \\
	-H "Authorization: Bearer ${accessToken || `{API_TOKEN}`}"
`;

export const curlSnippets: Partial<Record<PipelineType, (model: ModelPartial, accessToken: string) => string>> = {
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
	"text-to-image":                snippetBasic,
	"text-to-speech":               snippetBasic,
	"text-to-audio":                snippetBasic,
	"audio-to-audio":               snippetFile,
	"audio-classification":         snippetFile,
	"image-classification":         snippetFile,
	"image-to-text":                snippetFile,
	"object-detection":             snippetFile,
	"image-segmentation":           snippetFile,
};

export function getCurlInferenceSnippet(model: ModelPartial, accessToken: string): string {
	return model.pipeline_tag && model.pipeline_tag in curlSnippets
		? curlSnippets[model.pipeline_tag]?.(model, accessToken) ?? ""
		: "";
}

export function hasCurlInferenceSnippet(model: ModelPartial): boolean {
	return !!model.pipeline_tag && model.pipeline_tag in curlSnippets;
}
