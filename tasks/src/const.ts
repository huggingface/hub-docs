import type { ModelLibraryKey } from "../../js/src/lib/interfaces/Libraries";
import type { PipelineType } from "../../js/src/lib/interfaces/Types";

/*
 * Model libraries compatible with each ML task
 */
export const TASKS_MODEL_LIBRARIES: Record<PipelineType, ModelLibraryKey[]> = {
	"audio-classification":           ["speechbrain", "transformers"],
	"audio-to-audio":                 ["asteroid", "speechbrain"],
	"automatic-speech-recognition":   ["espnet", "nemo", "speechbrain", "transformers"],
	"conversational":                 ["transformers"],
	"depth-estimation":               ["transformers"],
	"document-question-answering":    ["transformers"],
	"feature-extraction":             ["sentence-transformers", "transformers"],
	"fill-mask":                      ["transformers"],
	"image-classification":           ["keras", "timm", "transformers"],
	"image-segmentation":             ["transformers"],
	"image-to-image":                 [],
	"image-to-text":                  [],
	"video-classification":           [],
	"multiple-choice":                ["transformers"],
	"object-detection":               ["transformers"],
	"other":                          [],
	"question-answering":             ["adapter-transformers", "allennlp", "transformers"],
	"robotics":                       [],
	"reinforcement-learning":         ["transformers", "stable-baselines3", "ml-agents", "sample-factory"],
	"sentence-similarity":            ["sentence-transformers", "spacy"],
	"summarization":                  ["transformers"],
	"table-question-answering":       ["transformers"],
	"table-to-text":                  ["transformers"],
	"tabular-classification":         ["sklearn"],
	"tabular-regression":             ["sklearn"],
	"tabular-to-text":                ["transformers"],
	"text-classification":            ["adapter-transformers", "spacy", "transformers"],
	"text-generation":                ["transformers"],
	"text-retrieval":                 [],
	"text-to-image":                  [],
	"text-to-speech":                 ["espnet", "tensorflowtts"],
	"text2text-generation":           ["transformers"],
	"time-series-forecasting":        [],
	"token-classification":           ["adapter-transformers", "flair", "spacy", "stanza", "transformers"],
	"translation":                    ["transformers"],
	"unconditional-image-generation": [],
	"visual-question-answering":      [],
	"voice-activity-detection":       [],
	"zero-shot-classification":       ["transformers"],
	"zero-shot-image-classification": [],
};

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
};
