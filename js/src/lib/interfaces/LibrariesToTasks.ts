import type { ModelLibraryKey } from "./Libraries";
import type { PipelineType } from "./Types";

/**
 * Mapping from library name (excluding Transformers) to its supported tasks. 
 * Inference API should be disabled for all other (library, task) pairs beyond this mapping.
 * As an exception, we assume Transformers supports all inference tasks.
 * This mapping is generated automatically by "python-api-export-tasks" action in huggingface/api-inference-community repo upon merge.
 * Ref: https://github.com/huggingface/api-inference-community/pull/158
 */
export const LIBRARY_TASK_MAPPING_EXCLUDING_TRANSFORMERS: Partial<Record<ModelLibraryKey, PipelineType[]>> = {
	"adapter-transformers": [
		"question-answering",
		"text-classification",
		"token-classification",
	],
	"allennlp": [
		"question-answering",
	],
	"asteroid": [
		// "audio-source-separation",
		"audio-to-audio",
	],
	"diffusers": [
		"text-to-image",
	],
	"doctr": [
		"object-detection",
	],
	"espnet": [
		"text-to-speech",
		"automatic-speech-recognition",
	],
	"fairseq": [
		"text-to-speech",
		"audio-to-audio",
	],
	"fastai": [
		"image-classification",
	],
	"fasttext": [
		"feature-extraction",
		"text-classification",
	],
	"flair": [
		"token-classification",
	],
	"k2": [
		"automatic-speech-recognition",
	],
	"keras": [
		"image-classification",
	],
	"nemo": [
		"automatic-speech-recognition",
	],
	"paddlenlp": [
		"conversational",
		"fill-mask",
		"summarization",
		"zero-shot-classification",
	],
	"pyannote-audio": [
		"automatic-speech-recognition",
	],
	"sentence-transformers": [
		"feature-extraction",
		"sentence-similarity",
	],
	"sklearn": [
		"tabular-classification",
		"tabular-regression",
		"text-classification",
	],
	"spacy": [
		"token-classification",
		"text-classification",
		"sentence-similarity",
	],
	"speechbrain": [
		"audio-classification",
		"audio-to-audio",
		"automatic-speech-recognition",
		"text-to-speech",
		"text2text-generation",
	],
	"stanza": [
		"token-classification",
	],
	"timm": [
		"image-classification",
	],
	"mindspore": [
		"image-classification",
	],
};
