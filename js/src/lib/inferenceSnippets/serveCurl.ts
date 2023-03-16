import type { EndpointBase, JSONValue } from "$lib/types";
import type { PipelineType, ModelData } from "$lib/moon-landing/interfaces/Types";
import { MIME_TYPE_MAP } from "$lib/config/constants";
import { getModelInputSnippet } from "./inputs";
import { ENDPOINTS_ENTRY } from "$lib/config/constants";
import { MAPPING_DEFAULT_WIDGET } from "$lib/moon-landing/interfaces/DefaultWidget";

const escapeInputQuotes = (input: string | {[key: string]: unknown}): string => {
	if (typeof input === "string") {
		input = JSON.parse(input);
	}

	const escape = (obj: { [key: string]: unknown}) => {
		for (const key of Object.keys(obj)) {
			if (typeof obj[key] === "string") {
				obj[key] = (<string>obj[key]).replace(/'/g, "'\\''");
			}

			if (typeof obj[key] === "object" && obj[key] !== null) {
				escape(<typeof obj>obj[key]);
			}
		}

		return obj;
	};

	return JSON.stringify(escape(input as {[key: string]: unknown})).replace(/\\\\/g, '\\');
};

/* We use String.raw`` to avoid needing to escape escaped chracters, e.g. \\n and \\
   Only ${expressions} will be interpolated; everything else is treated as-is */

export const snippetBasic = (_: ModelData, url: string, accessToken: string, prompt: string): string => String.raw`curl ${url || '<URL>'} \
-X POST \
-d '{"inputs": ${prompt ? JSON.stringify(prompt.trim()).replace(/(?<!\\)'/g, "\\'") : '"<prompt>"'}}' \
-H "Authorization: Bearer <hf_token>" \
-H "Content-Type: application/json"`;

export const snippetJson = (_: ModelData, url: string, accessToken: string, body: JSONValue): string => String.raw`curl ${url || '<URL>'} \
-X POST \
-d '${ escapeInputQuotes(JSON.stringify(body)) || '{"inputs": ""}'}' \
-H "Authorization: Bearer <hf_token>" \
-H "Content-Type: application/json"`;

export const snippetSentenceSimilarity = (
	model: ModelData,
	url: string,
	accessToken: string,
	prompt: string | undefined
): string => {
	let escapedPrompt = prompt;

	if (!prompt) {
		let language = model?.cardData?.language || "en";
		language = MAPPING_DEFAULT_WIDGET.has(language) ? language : "en";

		escapedPrompt = escapeInputQuotes(MAPPING_DEFAULT_WIDGET.get(language)
																			?.get('sentence-similarity')?.[0]
																			|| '"<prompt>"');
	} else {
		const promptObj = JSON.parse(prompt);
		if (Array.isArray(promptObj)) {
			escapedPrompt = escapeInputQuotes(promptObj[0]);
		}
	}

	return String.raw`curl ${url || '<URL>'} \
-X POST \
-d '{"inputs": ${escapedPrompt}}' \
-H "Authorization: Bearer <hf_token>" \
-H "Content-Type: application/json"`;
};

export const snippetZeroShotClassification = (model: ModelData, url: string, accessToken: string): string => String.raw`curl ${url} \
-X POST \
-d '{"inputs": ${getModelInputSnippet(model, true)}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \
-H "Authorization: Bearer <hf_token>" \
-H "Content-Type: application/json"`;

export const snippetFile = (model: ModelData, url: string, accessToken: string): string => {
	const sampleFile = getModelInputSnippet(model, true, true);

	const content_type = MIME_TYPE_MAP[sampleFile.split(".")[1]] || null;
	return String.raw`curl ${url} \
-X POST \
--data-binary '@${getModelInputSnippet(model, true, true)}' \
-H "Authorization: Bearer <hf_token>" \
-H "Content-Type: ${content_type}"`;
};

export const snippetCreate = (config: EndpointBase, accessToken = '<HF_TOKEN>'): string => String.raw`curl ${ENDPOINTS_ENTRY}/endpoint \
-X POST \
-d '${JSON.stringify(config)}' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <hf_token>"`;

export const curlSnippets:
	Partial<Record<PipelineType, (model: ModelData, url: string, accessToken: string, prompt: string) => string>> =
{
	// Same order as in js/src/lib/interfaces/Types.ts
	"text-classification": snippetBasic,
	"text-to-image": snippetBasic,
	"token-classification": snippetBasic,
	"table-question-answering": snippetBasic,
	"question-answering": snippetBasic,
	"zero-shot-classification": snippetZeroShotClassification,
	"translation": snippetBasic,
	"summarization": snippetBasic,
	"conversational": snippetBasic,
	"feature-extraction": snippetBasic,
	"text-generation": snippetBasic,
	"text2text-generation": snippetBasic,
	"fill-mask": snippetBasic,
	"sentence-similarity": snippetSentenceSimilarity,
	"automatic-speech-recognition": snippetFile,
	"text-to-speech": snippetBasic,
	"audio-to-audio": snippetFile,
	"audio-classification": snippetFile,
	"image-classification": snippetFile,
	"object-detection": snippetFile,
	"image-segmentation": snippetFile,
	"custom": snippetJson,
};

export function getCurlInferenceSnippet(
	model: ModelData,
	url: string,
	accessToken: string,
	body: JSONValue | { file: File | Blob },
	inputType?: string
): string {
	if (inputType === 'json') {
		return snippetJson(model, url, accessToken, body as JSONValue);
	}
	if (inputType === 'file') {
		return snippetFile(model, url, accessToken);
	}

	return `Didn't specify json nor file type`;
}

export function hasCurlInferenceSnippet(model: ModelData): boolean {
	return !!model.pipeline_tag && model.pipeline_tag in curlSnippets;
}
